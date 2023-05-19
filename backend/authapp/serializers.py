from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer

from authapp.models import UserAccount


class UserCreateSerializer(UserCreateSerializer):
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'
