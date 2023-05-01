from rest_framework.serializers import ModelSerializer
from authapp.models import CustomUser


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'first_name', 'last_name', 'birth_date',
            'email', 'avatar', 'is_superuser', 'is_staff', 'is_teacher'
        ]

    def create(self, validated_data):
        return CustomUser.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.password = validated_data.get('password', instance.password)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.email = validated_data.get('email', instance.email)
        instance.avatar = validated_data.get('avatar', instance.avatar)

        instance.save()
        return instance
