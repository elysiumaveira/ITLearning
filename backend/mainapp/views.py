from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from payments.models import Purchases

from mainapp.serializers import (
    GroupSerializer,
    CourseSerializer,
    MaterialsSerializer,
    ThemesSerializer,
    LessonSerializer,
    TrialLessonSerializer
)
from mainapp.models import (
    Group,
    Course,
    MaterialsForLesson,
    Themes,
    Lesson,
    TrialLesson
)
from authapp.models import (
    UserAccount,
    UserRole,
    AccountRoles
)
from authapp.serializers import UserSerializer
from roles.serializers import (
    UserRoleSerializer,
    AccountRolesSerializer
)
from payments.serializers import PurchasesSerializer


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
        saved_materials = get_object_or_404(MaterialsForLesson.objects.all(), id=id)
        data = request.data
        serializer = MaterialsSerializer(instance=saved_materials, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            materials_saved = serializer.save()

        return Response({"success": "Material {} updated successfully".format(materials_saved.id)})


class ThemesView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            theme = Themes.objects.get(pk=id)
            serializer = ThemesSerializer(theme)

            return Response(serializer.data)

        themes = Themes.objects.all()
        serializer = ThemesSerializer(themes, many=True)

        return Response(serializer.data)

    def post(self, request):
        theme = request.data

        serializer = ThemesSerializer(data=theme)
        if serializer.is_valid(raise_exception=True):
            theme_saved = serializer.save()

        return Response({"themes": "Theme {} created successfully".format(theme_saved.id)})

    def put(self, request, id):
        saved_theme = get_object_or_404(Themes.objects.all(), pk=id)
        data = request.data
        serializer = ThemesSerializer(instance=saved_theme, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            theme_saved = serializer.save()

        return Response({
            "success": "Theme '{}' updated successfully".format(theme_saved.id)
        })


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

    def post(self, request):
        lesson = request.data

        serializer = LessonSerializer(data=lesson)
        if serializer.is_valid(raise_exception=True):
            lesson_saved = serializer.save()

        return Response({"lesson": "Lesson {} created successfully".format(lesson_saved.id)})


class TrialLessonView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            trial_lesson = TrialLesson.objects.get(pk=id)
            serializer = TrialLessonSerializer(trial_lesson)

            return Response(serializer.data)

        trial_lessons = TrialLesson.objects.all()
        serializer = TrialLessonSerializer(trial_lessons, many=True)

        return Response(serializer.data)

    def post(self, request):
        trial_lesson = request.data

        serializer = TrialLessonSerializer(data=trial_lesson)
        if serializer.is_valid(raise_exception=True):
            trial_lesson_saved = serializer.save()

        return Response({"trial_lesson": "Trial lesson {} created successfully".format(trial_lesson_saved.id)})

    def put(self, request, id):
        saved_trial_lesson = get_object_or_404(TrialLesson.objects.all(), id=id)
        data = request.data
        serializer = MaterialsSerializer(instance=saved_trial_lesson, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            trial_lesson_saved = serializer.save()

        return Response({"success": "Trial lesson {} updated successfully".format(trial_lesson_saved.id)})


class GetCourseAndLessonView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, user_id):
        def _get_course_id(od_items):
            for item in od_items:
                if item[0] == 'course':
                    return item[1]

            return

        purchases = Purchases.objects.all().filter(user=user_id)
        purchases_serializer = PurchasesSerializer(instance=purchases, many=True)

        for d in range(len(purchases_serializer.data)):
            lesson_queryset = Lesson.objects.all().filter(course=_get_course_id(purchases_serializer.data[d].items()))
            lesson_serializer = LessonSerializer(instance=lesson_queryset, many=True)
            purchases_serializer.data[d]['lesson'] = lesson_serializer.data

            course_queryset = Course.objects.filter(id=_get_course_id(purchases_serializer.data[d].items()))
            course_serializer = CourseSerializer(instance=course_queryset, many=True)
            purchases_serializer.data[d]['course'] = course_serializer.data

        return Response(purchases_serializer.data)


class GetThemesForLessonView(APIView):
    def get(self, request, lesson_id, theme_id):
        lesson = Lesson.objects.filter(id=lesson_id)
        serializer = LessonSerializer(instance=lesson, many=True)

        themes_list = []

        for d in range(len(serializer.data)):
            for theme in serializer.data[d]['themes']:
                theme_queryset = Themes.objects.all().filter(id=theme)
                theme_serializer = ThemesSerializer(instance=theme_queryset, many=True)
                themes_list += theme_serializer.data

            serializer.data[d]['themes'] = themes_list

            for item in serializer.data[d]['themes']:
                for material in item['materials']:
                    materials_queryset = MaterialsForLesson.objects.all().filter(id=material)
                    materials_serializer = MaterialsSerializer(instance=materials_queryset, many=True)

                    serializer.data[d]['materials'] = materials_serializer.data

        return Response(serializer.data)


class GetTeachersView(APIView):
    def get(self, request):
        account_roles = AccountRoles.objects.filter(system_name='teacher')
        account_roles_serializer = AccountRolesSerializer(account_roles, many=True)

        users = []

        for d in range(len(account_roles_serializer.data)):
            user_role = UserRole.objects.all().filter(role=account_roles_serializer.data[d]['id'])
            user_role_serializer = UserRoleSerializer(user_role, many=True)

            for i in range(len(user_role_serializer.data)):
                user = UserAccount.objects.all().filter(id=user_role_serializer.data[i]['user'])
                user_serializer = UserSerializer(user, many=True)

                users += user_serializer.data

            account_roles_serializer.data[d]['users'] = users

        return Response(account_roles_serializer.data)


class CreateCourseView(APIView):
    def post(self, request):
        def _get_id(od_items):
            for item in od_items:
                if item[0] == 'id':
                    return item[1]

            return

        themes_id = []

        course = Course.objects.filter(name=request.data['course'])
        course_serializer = CourseSerializer(instance=course, many=True)

        for d in range(len(course_serializer.data)):
            for i in range(len(request.data['themes_name'])):
                theme_serializer = ThemesSerializer(data={
                    'name': f'{request.data["themes_name"][i]}',
                    'materials': []
                })

                if theme_serializer.is_valid(raise_exception=True):
                    saved_theme = theme_serializer.save()

                    themes_id.append(saved_theme.id)

            lesson_serializer = LessonSerializer(data={
                'name': request.data['lesson'],
                'course': _get_id(course_serializer.data[d].items()),
                'themes': themes_id
            })

            if lesson_serializer.is_valid(raise_exception=True):
                lesson_serializer.save()

        return Response('ok')
