from django.urls import path

from .views import (
    UserRoleView,
    AccountRolesView,
    GetUserRole,
    GetUserAndRoleView,
    CreateUserRoleView
)

urlpatterns = [
    path('user-role/', UserRoleView.as_view()),
    path('user-role/<int:id>/', UserRoleView.as_view()),
    path('get-user-role/<int:user_id>/', GetUserRole.as_view()),
    path('get-user-and-role/', GetUserAndRoleView.as_view()),
    path('create-user-role/', CreateUserRoleView.as_view()),

    path('account-role/', AccountRolesView.as_view()),
    path('account-role/<int:id>/', AccountRolesView.as_view()),
]