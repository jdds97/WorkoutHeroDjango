"""
Módulo de modelos de la aplicación core
"""

from django.db import models
from usuarios.models import Usuario, Cliente

class Gimnasio(models.Model):
    """
    Modelo para Gimnasio
    """

    nombre = models.CharField(
        max_length=100, unique=True, help_text="Nombre del gimnasio"
    )
    direccion = models.CharField(max_length=255, help_text="Dirección del gimnasio")
    descripcion = models.TextField(
        blank=True, null=True, help_text="Descripción del gimnasio"
    )
    instructores = models.ManyToManyField(
        Usuario,
        related_name="gimnasios_instructores",
        blank=True,
        help_text="Instructores del gimnasio",
    )
    miembros = models.ManyToManyField(
        Cliente,
        related_name="gimnasios_miembros",
        blank=True,
        help_text="Miembros del gimnasio",
    )
    logo = models.ImageField(
        upload_to="gimnasio_logos/",
        blank=True,
        null=True,
        help_text="Logo del gimnasio",
    )
    trabajadores = models.ManyToManyField(
        Usuario,
        related_name="gimnasios_trabajadores",
        blank=True,
        help_text="Trabajadores del gimnasio",
    )
    eventos = models.ManyToManyField(
        "Eventos",
        related_name="gimnasios_eventos",
        blank=True,
        help_text="Eventos del gimnasio",
    )
    def __str__(self):
        return str(self.nombre)

    class Meta:
        """
        Metadatos para el modelo Gimnasio
        """

        verbose_name = "Gimnasio"
        verbose_name_plural = "Gimnasios"
class Eventos(models.Model):
    """
    Modelo para Eventos
    """

    nombre = models.CharField(
        max_length=100, unique=True, help_text="Nombre del evento"
    )
    descripcion = models.TextField(
        blank=True, null=True, help_text="Descripción del evento"
    )
    fecha_inicio = models.DateTimeField(
        help_text="Fecha de inicio del evento"
    )
    fecha_fin = models.DateTimeField(
        help_text="Fecha de fin del evento"
    )
    imagen = models.ImageField(
        upload_to="eventos/",
        blank=True,
        null=True,
        help_text="Imagen del evento",
    )
    def __str__(self):
        return str(self.nombre)

    class Meta:
        """
        Metadatos para el modelo Eventos
        """
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"
        