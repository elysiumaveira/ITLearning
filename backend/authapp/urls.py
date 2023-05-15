from django.urls import path, include

from rest_framework.routers import DefaultRouter
from authapp.views import UserCreateSerializer


router = DefaultRouter()
router.register('users', UserCreateSerializer)

urlpatterns = [

]
