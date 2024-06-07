from rest_framework import serializers
from clases.models import Clase, Reserva
from usuarios.models import Usuario, Cliente,Membresia,Perfil
from workout_hero.models import Chat, Contador, Ejercicio, Notificaciones, Rutina
# pylint: disable=no-member
class ClaseSerializer(serializers.ModelSerializer):
    """
    Serializer para Clase model.
    """

    class Meta:
        """
        Meta class para ClaseSerializer.
        """

        model = Clase
        fields = "__all__"


class ReservaSerializer(serializers.ModelSerializer):
    """
    Serializer para Reserva model.
    """

    class Meta:
        """
        Meta class para ReservaSerializer.
        """

        model = Reserva
        fields = "__all__"


class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para Usuario model.
    """

    class Meta:
        """
        Meta class para UsuarioSerializer.
        """

        model = Usuario
        fields = "__all__"


class ClienteSerializer(serializers.ModelSerializer):
    """
    Serializer para Cliente model.
    """

    class Meta:
        """
        Meta class para ClienteSerializer.
        """

        model = Cliente
        fields = "__all__"
        
class MembresiaSerializer(serializers.ModelSerializer):
    """
    Serializer para Membresia model.
    """

    class Meta:
        """
        Meta class para MembresiaSerializer.
        """

        model = Membresia
        fields = "__all__"
class PerfilSerializer(serializers.ModelSerializer):
    """
    Serializer para Perfil model.
    """

    class Meta:
        """
        Meta class para PerfilSerializer.
        """

        model = Perfil
        fields = "__all__"

class ChatSerializer(serializers.ModelSerializer):
    perfil_destinatario = PerfilSerializer(read_only=True)
    perfil_transmisor = PerfilSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = "__all__"

    def create(self, validated_data):
        perfil_transmisor = validated_data.pop('perfil_transmisor')
        perfil_destinatario = validated_data.pop('perfil_destinatario')
        chat = Chat.objects.create(**validated_data)
        chat.perfil_transmisor = perfil_transmisor
        
        chat.perfil_destinatario = perfil_destinatario
        chat.save()
        return chat

    def update(self, instance, validated_data):
        instance.mensaje = validated_data.get('mensaje', instance.mensaje)
        instance.leido = validated_data.get('leido', instance.leido)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.save()
        return instance
    
class NotificacionesSerializer(serializers.ModelSerializer):
    """
    Serializer para Notificaciones model.
    """

    class Meta:
        """
        Meta class para NotificacionesSerializer.
        """

        model = Notificaciones
        fields = "__all__"

class ContadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contador
        fields = '__all__'

class EjercicioSerializer(serializers.ModelSerializer):
    contador = ContadorSerializer()

    class Meta:
        model = Ejercicio
        fields = '__all__'

    def create(self, validated_data):
        contador_data = validated_data.pop('contador', None)
        contador = None
        if contador_data:
            contador_serializer = ContadorSerializer(data=contador_data)
            if contador_serializer.is_valid():
                contador = contador_serializer.save()
            else:
                raise serializers.ValidationError(contador_serializer.errors)

        ejercicio = Ejercicio.objects.create(contador=contador, **validated_data)
        return ejercicio

    def update(self, instance, validated_data):
        contador_data = validated_data.pop('contador', None)
        contador = instance.contador
        if contador_data:
            contador_serializer = ContadorSerializer(contador, data=contador_data)
            if contador_serializer.is_valid():
                contador = contador_serializer.save()
            else:
                raise serializers.ValidationError(contador_serializer.errors)

        instance.contador = contador
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.save()
        return instance

class RutinaSerializer(serializers.ModelSerializer):
    ejercicios = EjercicioSerializer(many=True)

    class Meta:
        model = Rutina
        fields = "__all__"

    def create(self, validated_data):
        ejercicios_data = validated_data.pop('ejercicios')
        rutina = Rutina.objects.create(**validated_data)
        for ejercicio_data in ejercicios_data:
            contador_data = ejercicio_data.pop('contador')
            contador = Contador.objects.create(**contador_data)
            ejercicio_data['contador'] = contador
            ejercicio= Ejercicio.objects.create(**ejercicio_data)
            rutina.ejercicios.add(ejercicio)
        return rutina

    def update(self, instance, validated_data):
        ejercicios_data = validated_data.pop('ejercicios')
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.save()

        ejercicios_ids = {d['id'] for d in ejercicios_data if 'id' in d}
        for ejercicio in instance.ejercicios.all():
            if ejercicio.id not in ejercicios_ids:
                ejercicio.delete()

        for ejercicio_data in ejercicios_data:
            contador_data = ejercicio_data.pop('contador')
            contador, _ = Contador.objects.get_or_create(**contador_data)
            ejercicio_data['contador'] = contador
            ejercicio_id = ejercicio_data.get('id', None)
            if ejercicio_id:
                Ejercicio.objects.filter(id=ejercicio_id, rutina=instance).update(**ejercicio_data)
            else:
                Ejercicio.objects.get_or_create(rutina=instance, **ejercicio_data)

        return instance