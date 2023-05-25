from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from mainapp.views import CoursesListView, CourseDetailView, GroupView, MaterialsView, LessonView

router = DefaultRouter()

urlpatterns = [
    path('courses/', CoursesListView.as_view()),
    path('course/', CourseDetailView.as_view()),
    path('course/<int:id>/', CourseDetailView.as_view()),

    path('group/', GroupView.as_view()),

    path('materials/', MaterialsView.as_view()),
    path('material/<int:id>/', MaterialsView.as_view()),

    path('lessons/', LessonView.as_view()),
]
