"""
Este archivo contiene las clases que representan los modelos de la aplicación.
"""
from django.db import models

class Rutina(models.Model):
    """
    Esta clase representa las rutinas de entrenamiento de los usuarios.
    Incluye la fecha de la rutina, el tipo de entrenamiento, y los ejercicios 
    que se realizan en la rutina.
    """
    nombre = models.CharField(max_length=100)
    fecha = models.DateField()
    ejercicios = models.ManyToManyField('Ejercicio')
    unidad_peso=models.CharField(max_length=100,default="kg")
    tiempo_duracion = models.DurationField(null=True, blank=True)
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE,null=True)
    def __str__(self):
        return f"Rutina - {self.nombre} - {self.fecha} "

class Ejercicio(models.Model):
    """
    Esta clase representa los ejercicios disponibles en el sistema.
    Incluye el nombre, la descripción, y los grupos musculares que se trabajan en el ejercicio.
    """
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    grupos_muscular = models.CharField(max_length=20, blank=True, null=True, default="")
    contador=models.OneToOneField('Contador',on_delete=models.CASCADE,null=True,blank=True)
    imagen_thumbnail = models.URLField(null=True, blank=True)
    imagen = models.URLField(null=True, blank=True)
    def __str__(self):
        return str(self.nombre)

class Contador(models.Model):
    """
    Esta clase representa el contador de ejercicios.
    Incluye el contador de ejercicios.
    """
    repeticiones = models.IntegerField(default=0)
    peso=models.IntegerField(default=0)
    descanso=models.IntegerField(default=0)
    class Meta:
        verbose_name_plural = "Contadores"

    def __str__(self):
        return f"Contador - {self.pk} "


class Chat(models.Model):
    usuario = models.ForeignKey(
        'usuarios.Usuario', on_delete=models.SET_NULL, null=True, related_name="usuario")
    transmisor = models.ForeignKey(
        'usuarios.Usuario', on_delete=models.SET_NULL, null=True, related_name="remitente")
    destinatario = models.ForeignKey(
        'usuarios.Usuario', on_delete=models.SET_NULL, null=True, related_name="destinatario")

    mensaje = models.TextField()

    leido = models.BooleanField(default=False)
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['fecha']
        verbose_name_plural = "Mensaje"

    def __str__(self):
        return f"{self.transmisor} - {self.destinatario}"

class Notificaciones(models.Model):
    """
    Esta clase representa las notificaciones de los usuarios.
    Incluye las notificaciones de los usuarios.
    """
    mensaje = models.CharField(max_length=100)
    fecha=models.DateField()
    TIPO_CHOICES = (
        ("info", "Información"),
        ("alerta", "Alerta"),
        ("error", "Error"),
    )
    tipo=models.CharField(max_length=100,choices=TIPO_CHOICES,default="info")
    duracion=models.DateTimeField()
    repeticiones=models.IntegerField()
    class Meta:
        verbose_name_plural = "Notificaciones"
    def __str__(self):
        return f"Notificaciones - {self.mensaje} "
