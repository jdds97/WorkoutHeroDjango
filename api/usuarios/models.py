"""
Módulo de clases de modelos de la aplicación usuarios.
"""
from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.dispatch import receiver
from django.apps import apps

# pylint: disable=no-member
class Usuario(AbstractUser):
    """
    Modelo para representar un usuario.
    """

    imagen = models.ImageField(upload_to="usuarios", blank=True, null=True)
    clases_asignadas = models.ManyToManyField(
        "clases.Clase", related_name="clases_asignadas", blank=True
    )
    groups = models.ManyToManyField(
        Group,
        verbose_name=("groups"),
        blank=True,
        help_text=(
            "The groups this user belongs to. A user will get all permissions "
            "granted to each of their groups."
        ),
        related_name="usuario_groups",
        related_query_name="user",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=("user permissions"),
        blank=True,
        help_text=("Specific permissions for this user."),
        related_name="usuario_user_permissions",
        related_query_name="user",
    )

    def __str__(self):
        return str(self.username)

    class Meta:
        """
        Clase Meta para el modelo Usuario.
        """
        verbose_name_plural = "Usuarios"
        verbose_name = "Usuario"
    def perfil(self):
        perfil = Perfil.objects.get(usuario=self)
        return perfil

class Cliente(Usuario):
    """
    Modelo para representar un cliente.
    """
    usuario_ptr = models.OneToOneField(
        Usuario, on_delete=models.CASCADE, parent_link=True, default=None
    )
    clases_apuntadas = models.ManyToManyField(
        "clases.Clase", related_name="clientes", blank=True
    )
    fecha_baja = models.DateField(blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    membresia = models.ForeignKey(
        "Membresia", on_delete=models.SET_NULL, null=True, blank=True
    )
    def __str__(self):
        return str(self.username)

    def is_client(self):
        """
        Método para determinar si el usuario es un cliente.
        """
        return True

    class Meta:
        """
        Clase Meta para el modelo Cliente.
        """
        verbose_name_plural = "Clientes"
        verbose_name = "Cliente"
        
class Perfil(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nombre_completo = models.CharField(max_length=1000)
    biografia = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to="imagenes_usuario", default="default.jpg")
    verificado = models.BooleanField(default=False)
    membresia= models.ForeignKey(
        "Membresia", on_delete=models.SET_NULL, null=True, blank=True
    )
    def save(self, *args, **kwargs):
        if self.nombre_completo == "" or self.nombre_completo == None:
            self.nombre_completo = self.usuario.username
        super(Perfil, self).save(*args, **kwargs)


@receiver(post_save, sender=Usuario)
def crear_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(usuario=instance)

@receiver(post_save, sender=Usuario)
def guardar_perfil_usuario(sender, instance, **kwargs):
    instance.perfil.save()

post_save.connect(crear_perfil_usuario, sender=Usuario)
post_save.connect(guardar_perfil_usuario, sender=Usuario)

class Membresia(models.Model):
    """
    Modelo para representar una membresia.
    """

    nombre = models.CharField(
        max_length=100, unique=True, help_text="Nombre de la membresia"
    )
    precio = models.DecimalField(
        max_digits=10, decimal_places=2, help_text="Precio de la membresia"
    )
    duracion = models.IntegerField(
        help_text="Duración de la membresia en días"
    )
    ESTADO_CHOICES = [
        ("Activa", "Activa"),
        ("Inactiva", "Inactiva"),
        ("Suspendida", "Suspendida"),
    ]

    estado = models.CharField(
        max_length=10,
        choices=ESTADO_CHOICES,
        default="Activa",
    )
    def __str__(self):
        return str(self.nombre)

    class Meta:
        """
        Clase Meta para el modelo Membresia.
        """
        verbose_name_plural = "Membresias"
        verbose_name = "Membresia"