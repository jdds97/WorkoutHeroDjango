from rest_framework import viewsets
from clases.models import Clase, Reserva
from usuarios.models import Usuario, Cliente, Membresia, Perfil
from workout_hero.models import Chat, Ejercicio, Notificaciones, Rutina, Contador
from django.db.models import Q, Subquery, OuterRef
from .serializers import ChatSerializer
from workout_hero.models import Chat, Ejercicio, Notificaciones, Rutina, Contador
from .serializers import (
    ClaseSerializer,
    ReservaSerializer,
    UsuarioSerializer,
    ClienteSerializer,
    MembresiaSerializer,
    PerfilSerializer,
    NotificacionesSerializer,
    RutinaSerializer,
    EjercicioSerializer,
    ContadorSerializer,
    )
# pylint: disable=no-member
class ClaseViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Clase model.
    """

    queryset = Clase.objects.all()
    serializer_class = ClaseSerializer


class ReservaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Reserva model.
    """

    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Usuario model.
    """

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Cliente model.
    """

    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class MembresiaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Membresia model.
    """

    queryset = Membresia.objects.all()
    serializer_class = MembresiaSerializer


class PerfilViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Perfil model.
    """

    serializer_class = PerfilSerializer
    def get_queryset(self):
        user = self.request.user
        queryset = Perfil.objects.filter(usuario=user)
        return queryset
    


class NotificacionesViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Notificaciones model.
    """

    queryset = Notificaciones.objects.all()
    serializer_class = NotificacionesSerializer


class RutinaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Rutina model.
    """

    serializer_class = RutinaSerializer
    def get_queryset(self):
        user = self.request.user
        queryset = Rutina.objects.filter(usuario=user)
        return queryset

class EjercicioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Ejercicio model.
    """

    queryset = Ejercicio.objects.all()
    serializer_class = EjercicioSerializer

class ContadorViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Contador model.
    """

    queryset = Contador.objects.all()
    serializer_class = ContadorSerializer
class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSerializer

    def get_queryset(self):
        user_id = self.request.user.id

        messages = Chat.objects.filter(
            id__in=Subquery(
                Chat.objects.filter(
                    Q(transmisor__id=user_id) |
                    Q(destinatario__id=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        Chat.objects.filter(
                            Q(transmisor=OuterRef('id'), destinatario__id=user_id) |
                            Q(destinatario=OuterRef('id'), transmisor__id=user_id)
                        ).order_by('-fecha')[:1].values_list('id', flat=True)
                    )
                ).values_list('last_msg', flat=True).order_by("-fecha")
            )
        ).order_by("-fecha")

        return messages


