from rest_framework.routers import DefaultRouter
from authapp.views import UserCreateSerializer


router = DefaultRouter()
router.register('users', UserCreateSerializer, basename='user_create')

urlpatterns = [

]
