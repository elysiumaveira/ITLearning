from django.http import Http404

from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from mainapp.serializers import GroupSerializer, CourseSerializer, MaterialsSerializer, ThemesSerializer, \
    LessonSerializer

from mainapp.models import Group, Course, MaterialsForLesson, Themes, Lesson


class GroupView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, *args, **kwargs1):
        queryset = Group.objects.all()
        serializer = GroupSerializer(queryset, many=True)

        return Response({"group": serializer.data})


class CoursesListView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(instance=courses, many=True)

        return Response(serializer.data)

    def post(self, request):
        course = request.data

        serializer = CourseSerializer(data=course)
        if serializer.is_valid(raise_exception=True):
            course_saved = serializer.save()

        return Response({"courses": "Course {} created successfully".format(course_saved.id)})

    def put(self, request, pk):
        saved_course = get_object_or_404(Course.objects.all(), pk=pk)
        data = request.data
        serializer = CourseSerializer(instance=saved_course, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            course_saved = serializer.save()

        return Response({
            "success": "Course '{}' updated successfully".format(course_saved.id)
        })


class CourseDetailView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            course = Course.objects.get(id=id)
            serializer = CourseSerializer(course)

            return Response(serializer.data)

        course_type = request.GET.get('course_type')
        queryset = Course.objects.all().filter(course_type=course_type)
        serializer = CourseSerializer(instance=queryset, many=True)

        return Response(serializer.data)

    def put(self, request, id):
        saved_course = get_object_or_404(Course.objects.all(), id=id)
        data = request.data
        serializer = CourseSerializer(instance=saved_course, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            course_saved = serializer.save()

        return Response({
            "success": "Course '{}' updated successfully".format(course_saved.id)
        })


class MaterialsView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            materials = MaterialsForLesson.objects.get(id=id)
            serializer = MaterialsSerializer(materials)

            return Response(serializer.data)

        materials = MaterialsForLesson.objects.all()
        serializer = MaterialsSerializer(materials, many=True)

        return Response(serializer.data)

    def post(self, request):
        materials = request.data

        serializer = MaterialsSerializer(data=materials)
        if serializer.is_valid(raise_exception=True):
            course_saved = serializer.save()

        return Response({"materials": "Material {} created successfully".format(course_saved.id)})

    def put(self, request, id):
        pass

    def put(self, request, id):
        saved_materials = get_object_or_404(MaterialsForLesson.objects.all(), id=id)
        data = request.data
        serializer = MaterialsSerializer(instance=saved_materials, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            materials_saved = serializer.save()

        return Response({"success": "Material {} updated successfully".format(materials_saved.id)})


class LessonView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            lesson = Lesson.objects.get(id=id)
            serializer = LessonSerializer(lesson)

            return Response(serializer.data)

        lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)

        return Response(serializer.data)
