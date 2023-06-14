from django.urls import path
from rest_framework.routers import DefaultRouter

from authapp.views import (
    UserCreateSerializer,
    UserView
)

router = DefaultRouter()
router.register('users', UserCreateSerializer, basename='user_create')

urlpatterns = [
    path('user/', UserView.as_view()),
    path('user/<int:id>/', UserView.as_view()),
]
