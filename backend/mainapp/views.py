from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from authapp.models import CustomUser
from mainapp.serializers import GroupSerializer, CourseSerializer, LectureSerializer, TestSerializer
from mainapp.models import Group, Course, Lecture, Test


class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class LectureViewSet(ModelViewSet):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer


class TestViewSet(ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
