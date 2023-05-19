from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from mainapp.views import CoursesListView, CourseDetailView, GroupView, MaterialsView, LessonView

router = DefaultRouter()

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls')),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    re_path(r'^auth', include('djoser.urls.authtoken')),

    path('courses/', CoursesListView.as_view()),
    path('course/', CourseDetailView.as_view()),
    path('course/<int:id>/', CourseDetailView.as_view()),

    path('group/', GroupView.as_view(), name=""),

    path('materials/', MaterialsView.as_view()),
    path('material/<int:id>/', MaterialsView.as_view()),

    path('lessons/', LessonView.as_view())
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
