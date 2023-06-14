from rest_framework.serializers import ModelSerializer
from .models import Purchases


class PurchasesSerializer(ModelSerializer):
    class Meta:
        model = Purchases
        fields = [
            'id',
            'user',
            'course',
        ]

    def create(self, validated_data):
        return Purchases.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user )
        instance.course = validated_data.get('course', instance.course)

        instance.save()
        return instance
