"""Core URLs module."""
from django.urls import path
from .views import welcome

app_name = "core"

urlpatterns = [
    path("", welcome, name="welcome"),
]
