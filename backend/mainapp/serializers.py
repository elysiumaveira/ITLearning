from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer, CharField
from mainapp.models import *

from authapp.serializers import CustomUserSerializer


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        return Course.objects.create(**validated_data)


class LectureSerializer(ModelSerializer):
    class Meta:
        model = Lecture
        fields = '__all__'

    def create(self, validated_data):
        return Lecture.objects.create(**validated_data)


class TestSerializer(ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

    def create(self, validated_data):
        return Test.objects.create(**validated_data)
