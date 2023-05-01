from django.shortcuts import render
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from authapp.serializers import CustomUserSerializer
from authapp.models import CustomUser


class CustomUserView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, *args, **kwargs):
        queryset = CustomUser.objects.all()
        serializer = CustomUserSerializer(queryset, many=True)

        return Response({"users": serializer.data})

    def post(self, request):
        user = request.data

        serializer = CustomUserSerializer(data=user)
        if serializer.is_valid(raise_exception=True):
            user_saved = serializer.save()

        return Response({"users": "User {} created successfully".format(user_saved.id)})

    def put(self, request, pk):
        saved_user = get_object_or_404(CustomUser.objects.all(), pk=pk)
        data = request.data
        serializer = CustomUserSerializer(instance=saved_user, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            user_saved = serializer.save()

        return Response({
            "success": "User '{}' updated successfully".format(user_saved.id)
        })
