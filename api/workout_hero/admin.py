from django.contrib import admin
from .models import Chat, Ejercicio, Notificaciones, Contador, Rutina
# Register your models here.
class ChatAdmin(admin.ModelAdmin):
    list_editable = ['leido', 'mensaje']
    list_display = ['usuario','transmisor', 'destinatario', 'leido', 'mensaje']
class NotificacionAdmin(admin.ModelAdmin):
    list_display=['mensaje','fecha','tipo']
class ContadorAdmin(admin.ModelAdmin):
    list_display = ['repeticiones', 'peso', 'descanso']
class RutinaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'fecha', 'unidad_peso', 'tiempo_duracion', 'usuario']

class EjercicioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'descripcion', 'grupos_muscular', 'contador']


admin.site.register(Ejercicio, EjercicioAdmin)
admin.site.register(Rutina, RutinaAdmin)
admin.site.register(Contador, ContadorAdmin)
admin.site.register(Chat, ChatAdmin)
admin.site.register(Notificaciones, NotificacionAdmin)
