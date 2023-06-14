from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from mainapp.views import CoursesListView, CourseDetailView, GroupView, MaterialsView, LessonView, ThemesView, \
    TrialLessonView, GetCourseAndLessonView, GetThemesForLessonView, GetTeachersView

router = DefaultRouter()

urlpatterns = [
    path('courses/', CoursesListView.as_view()),
    path('course/', CourseDetailView.as_view()),
    path('course/<int:id>/', CourseDetailView.as_view()),

    path('group/', GroupView.as_view()),

    path('materials/', MaterialsView.as_view()),
    path('material/<int:id>/', MaterialsView.as_view()),

    path('lessons/', LessonView.as_view()),
    path('lesson/<int:id>/', LessonView.as_view()),
    path('get-course-and-lesson/<int:user_id>/', GetCourseAndLessonView.as_view()),
    path('get-themes-for-lesson/<int:lesson_id>/<int:theme_id>/', GetThemesForLessonView.as_view()),

    path('themes/', ThemesView.as_view()),
    path('theme', ThemesView.as_view()),

    path('trial_lessons/', TrialLessonView.as_view()),
    path('trial_lesson/<int:id>/', TrialLessonView.as_view()),

    path('get-teachers/', GetTeachersView.as_view()),
]
