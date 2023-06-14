from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from authapp.serializers import (
    UserCreateSerializer,
    UserSerializer
)
from authapp.models import (
    UserAccount,
)


class UserView(APIView):
    def get(self, request, id=None):
        if id:
            user = UserAccount.objects.filter(id=id)
            serializer = UserSerializer(user)

            return Response(serializer.data)

        users = UserAccount.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)
