from django.urls import path, include

from rest_framework.routers import DefaultRouter
from authapp.views import CustomUserViewSet


router = DefaultRouter()
router.register('users', CustomUserViewSet)

urlpatterns = [

]
