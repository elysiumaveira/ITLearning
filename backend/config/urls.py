from django.contrib import admin
from django.urls import path, include

from rest_framework.urlpatterns import format_suffix_patterns

from authapp.views import CustomUserView
from mainapp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include(router.urls)),
    # path('api/', include('rest_framework.urls')),

    path('users/', CustomUserView.as_view()),
    path('users/<int:pk>/', CustomUserView.as_view(), name=""),

    path('courses/', CoursesListView.as_view(), name=""),
    path('course/', CourseDetailView.as_view(), name=""),
    path('course/<int:id>/', CourseDetailView.as_view(), name=""),
]

urlpatterns = format_suffix_patterns(urlpatterns)
