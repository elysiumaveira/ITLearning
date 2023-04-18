from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from authapp.views import CustomUserViewSet
from mainapp.views import GroupViewSet, CourseViewSet, LectureViewSet, TestViewSet


router = DefaultRouter()
router.register('users', CustomUserViewSet)
router.register('groups', GroupViewSet)
router.register('courses', CourseViewSet)
router.register('lecture', LectureViewSet)
router.register('tests', TestViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls')),
]
