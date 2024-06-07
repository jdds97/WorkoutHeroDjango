import requests
from django.conf import settings
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.shortcuts import render
from django.views.generic import CreateView, ListView, UpdateView, DeleteView
from .models import Ejercicio, Rutina

# region welcome
def welcome(request):
    """
    Vista para la página de bienvenida.
    """
    return render(request,co/index.html", {})

# def obtener_ejercicios(request):
    termino = request.GET.get('termino', '')
    url = f'https://wger.de/api/v2/exercise/search/?language=es&term={termino}'
    response = requests.get(url, headers={
        'Authorization': f'Token {settings.VITE_TOKEN_WGER}',
    }, timeout=5)

    if response.status_code == 200:
        data = response.json()
        ejercicios = data.get('suggestions', [])
        nuevos_ejercicios = []

        for ejercicio_externo in ejercicios:
            try:
                ejercicio_interno = Ejercicio(
                    nombre=ejercicio_externo['data']['name'],
                    descripcion="",  
                    grupo_muscular=ejercicio_externo['data']['category'],
                    imagen=ejercicio_externo['data']['image'],
                    imagen_miniatura=ejercicio_externo['data']['image_thumbnail'],
                )
                ejercicio_interno.save()
                nuevos_ejercicios.append(ejercicio_interno)
            except Exception as e:
                print(f"Error al guardar ejercicio: {e}")

        # Serializar y retornar los ejercicios guardados
        ejercicios_internos = Ejercicio.objects.filter(grupo_muscular=termino)
        serializer = EjercicioSerializer(ejercicios_internos, many=True)
        datos_ejercicios = serializer.data
        return JsonResponse({'ejercicios': datos_ejercicios})

    return JsonResponse({'error': 'Error al obtener ejercicios'}, status=response.status_code)

# def importar_ejercicios_desde_yaml(api):
#     with open(api, 'r', encoding='utf-8') as archivo:
#         datos = yaml.safe_load(archivo)

#     for ejercicio_data in datos:
#         # Crear o obtener los grupos musculares
#         grupos_musculares = []
#         for grupo_muscular_nombre in ejercicio_data['grupos_musculares']:
#             grupo_muscular, _ = GrupoMuscular.objects.get_or_create(nombre=grupo_muscular_nombre)
#             grupos_musculares.append(grupo_muscular)

#         # Crear o actualizar el ejercicio
#         ejercicio, creado = Ejercicio.objects.update_or_create(
#             nombre=ejercicio_data['nombre'],
#             defaults={
#                 'descripcion': ejercicio_data['descripcion'],
#                 'idioma': ejercicio_data['idioma'],
#             }
#         )

#         # Asociar los grupos musculares con el ejercicio
#         ejercicio.grupos_musculares.set(grupos_musculares)

#     print(f"Importación de ejercicios desde {archivo_yaml} completada.")
class CrearEjercicio(CreateView):
    """
    Vista para crear un ejercicio.
    """

    model = Ejercicio
    fields = "__all__"
    success_url = reverse_lazy("listar_ejercicios")


class ListarEjercicios(ListView):
    """
    Vista para listar los ejercicios.
    """

    model = Ejercicio

class EditarEjercicio(UpdateView):
    """
    Vista para editar un ejercicio.
    """

    model = Ejercicio
    fields = "__all__"
    success_url = reverse_lazy("listar_ejercicios")


class EliminarEjercicio(DeleteView):
    """
    Vista para eliminar un ejercicio.
    """

    model = Ejercicio
    success_url = reverse_lazy("listar_ejercicios")


# endregion
# region CRUD de Rutina
class CrearRutina(CreateView):
    """
    Vista para crear una rutina.
    """

    model = Rutina
    fields = "__all__"
    success_url = reverse_lazy("listar_rutinas")


class ListarRutinas(ListView):
    """
    Vista para listar las rutinas.
    """

    model = Rutina


class EditarRutina(UpdateView):
    """
    Vista para editar una rutina.
    """

    model = Rutina
    fields = "__all__"
    success_url = reverse_lazy("listar_rutinas")


class EliminarRutina(DeleteView):
    """
    Vista para eliminar una rutina.
    """

    model = Rutina
    success_url = reverse_lazy("listar_rutinas")

# endregion
from typing import Optional

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

from api.models import Organisation
from api.serializers import (
    OrganisationSerializer,
    OrganisationListSerializer,
    EditOrganisationSerializer,
)
from api.views.mixins import OrganisationMixin
from api.views.decorators import (
    organisation_admin_required,
    organisation_owner_required,
    organisation_membership_required,
)





class OrganisationDetail(OrganisationMixin, APIView):
    """Retrieve, update, or delete organisations."""

    permission_classes = [IsAuthenticated]

    @extend_schema(
        operation_id='organisation_detail',
        tags=['organisations'],
        responses={
            200: OrganisationSerializer,
        },
    )
    @organisation_membership_required
    def get(
        self,
        request: Request,
        org_id: int,
        format: Optional[str] = None,
    ) -> Response:
        """Retrieve the details for an organisation."""
        serializer = OrganisationSerializer(
            self.get_organisation(),
            context={'request': request},
        )

        return Response(serializer.data)

    @extend_schema(
        operation_id='organisation_delete',
        tags=['organisations'],
        responses={
            204: None,
            400: None,
        }
    )
    @organisation_membership_required
    @organisation_owner_required
    def delete(
        self,
        request: Request,
        org_id: int,
        format: Optional[str] = None,
    ) -> Response:
        """Delete an organisation."""
        org = self.get_organisation()

        if org.slug == request.data.get("confirmation"):
            org.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(
            {"detail": "Confirmation missing or incorrect."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @extend_schema(
        operation_id='organisation_patch',
        tags=['organisations'],
        request=EditOrganisationSerializer,
        responses={
            204: EditOrganisationSerializer,
            400: None,
        }
    )
    @organisation_membership_required
    @organisation_admin_required
    def patch(
        self,
        request: Request,
        org_id: int,
        format: Optional[str] = None,
    ) -> Response:
        """Update an organisation."""
        org = self.get_organisation()
        serializer = EditOrganisationSerializer(
            org,
            data=request.data,
            partial=True,
            context={'request': request},
        )

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
