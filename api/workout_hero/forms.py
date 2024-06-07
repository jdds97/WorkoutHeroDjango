from django import forms
from .models import Rutina, Ejercicio
class RutinaForm(forms.ModelForm):
    ejercicios = forms.ModelMultipleChoiceField(queryset=Ejercicio.objects.all())

    class Meta:
        model = Rutina
        fields = ['fecha', 'tipo_entrenamiento', 'ejercicios', 'dia_semanal', 'unidad_peso', 'idioma']