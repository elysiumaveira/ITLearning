from rest_framework.serializers import ModelSerializer
from authapp.models import CustomUser


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'username', 'password', 'first_name', 'last_name', 'birth_date',
            'email', 'avatar', 'is_superuser', 'is_staff', 'is_teacher'
        ]

    def create(self, validated_data):
        return CustomUser.objects.create(**validated_data)
