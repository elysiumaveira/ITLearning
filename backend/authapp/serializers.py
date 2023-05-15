from djoser.serializers import UserCreateSerializer
from authapp.models import UserAccount


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')
