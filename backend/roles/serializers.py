from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from authapp.models import (
    AccountRoles,
    UserRole
)


class UserRoleSerializer(ModelSerializer):
    class Meta:
        model = UserRole
        fields = [
            'id',
            'role',
            'user'
        ]

    def create(self, validated_data):
        return UserRole.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.role = validated_data.get('role', instance.role)
        instance.user = validated_data.get('user', instance.user)

        instance.save()
        return instance


class AccountRolesSerializer(ModelSerializer):
    class Meta:
        model = AccountRoles
        fields = [
            'id',
            'name',
            'system_name'
        ]

    def create(self, validated_data):
        return AccountRoles.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.system_name = validated_data.get('system_name', instance.system_name)

        instance.save()
        return instance
