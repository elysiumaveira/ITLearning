from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from mainapp.views import CoursesListView, CourseDetailView, GroupView

router = DefaultRouter()

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls')),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    # path('users/', CustomUserView.as_view()),
    # path('users/<int:pk>/', CustomUserView.as_view(), name=""),

    path('courses/', CoursesListView.as_view(), name=""),
    path('course/', CourseDetailView.as_view(), name=""),
    path('course/<int:id>/', CourseDetailView.as_view(), name=""),

    path('group/', GroupView.as_view(), name=""),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
