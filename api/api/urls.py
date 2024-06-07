from rest_framework import routers
from django.urls import include, path
from api.views import (
    ClaseViewSet,
    ReservaViewSet,
    UsuarioViewSet,
    ClienteViewSet,
    MembresiaViewSet,
    PerfilViewSet,
    # MensajeViewSet,
    NotificacionesViewSet,
    RutinaViewSet,
    EjercicioViewSet,
    ContadorViewSet,
    # BandejaEntradaViewSet
)
app_name = "api"
router = routers.DefaultRouter(trailing_slash=False)
router.register("clases", ClaseViewSet, basename="clases")
router.register("reservas", ReservaViewSet, basename="reservas")
router.register("usuarios", UsuarioViewSet, basename="usuarios")
router.register("clientes", ClienteViewSet, basename="clientes")
router.register("membresias", MembresiaViewSet, basename="membresias")
router.register("perfiles", PerfilViewSet, basename="perfiles")
# router.register("chats", MensajeViewSet, basename="chats")
router.register("notificaciones", NotificacionesViewSet, basename="notificaciones")
router.register("ejercicios", EjercicioViewSet, basename="ejercicios")
router.register("rutinas", RutinaViewSet, basename="rutinas")
router.register("contador", ContadorViewSet, basename="contador")
# router.register("chat", MensajeViewSet,basename="chat")
# router.register(r'bandejaentrada/(?P<pk>\d+)', BandejaEntradaViewSet, basename='bandejaentrada')
urlpatterns = router.urls
# endregion
