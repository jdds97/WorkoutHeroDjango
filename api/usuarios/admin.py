"""
Sitio de administración
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Cliente


class ClienteUserAdmin(UserAdmin):
    model = Usuario
    fieldsets = UserAdmin.fieldsets + (
        (
            "Campos adicionales",
            {
                "fields": (
                    # Campos de Cliente
                    "rutina_asignada",
                    "clases_apuntadas",
                    "fecha_baja",
                    "membresia",
                    "perfil",
                )
            },
        ),
    )
    def perfil(self, obj):
        perfil_obj = obj.perfil()
        return str(perfil_obj)  

    perfil.short_description = 'Perfil'

class CustomUserAdmin(UserAdmin):
    model = Usuario
    fieldsets = UserAdmin.fieldsets + (
        (
            "Campos adicionales",
            {
                "fields": (
                    # Campos de Instructor
                    "clases_asignadas",
                )
            },
        ),
    )


admin.site.register(Usuario, CustomUserAdmin)
admin.site.register(Cliente, ClienteUserAdmin)
