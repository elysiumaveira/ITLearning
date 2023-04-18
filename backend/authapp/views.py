from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from authapp.serializers import CustomUserSerializer
from authapp.models import CustomUser


class CustomUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

