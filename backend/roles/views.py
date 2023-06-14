from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    UserRoleSerializer,
    AccountRolesSerializer
)

from authapp.models import (
    UserRole,
    AccountRoles,
    UserAccount
)

from authapp.serializers import UserSerializer


class UserRoleView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            user_role = UserRole.objects.get(id=id)
            user_role_serializer = UserRoleSerializer(user_role)

            return Response(user_role_serializer.data)

        user_roles = UserRole.objects.all()
        serializer = UserRoleSerializer(user_roles, many=True)

        return Response(serializer.data)

    def post(self, request):
        try:
            user_role = request.data

            serializer = UserRoleSerializer(data=user_role)
            if serializer.is_valid(raise_exception=True):
                saved_user_role = serializer.save()

            return Response({'user_role': f'User Role {saved_user_role.id} created successfully'})
        except Exception as e:
            return Response(e)

    def put(self, request, id):
        try:
            saved_user_role = get_object_or_404(UserRole.objects.all(), id=id)
            data = request.data
            serializer = UserRoleSerializer(instance=saved_user_role, data=data, partial=True)

            if serializer.is_valid(raise_exception=True):
                updated_user_role = serializer.save()

            return Response({'user_role': f'User role {updated_user_role.id} updated successfully'})
        except Exception as e:
            return Response(e)


class AccountRolesView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            account_role = AccountRoles.objects.get(id=id)
            account_role_serializer = AccountRolesSerializer(account_role)

            return Response(account_role_serializer.data)

        account_roles = AccountRoles.objects.all()
        serializer = AccountRolesSerializer(account_roles, many=True)

        return Response(serializer.data)

    def post(self, request):
        try:
            account_role = request.data

            serializer = AccountRolesSerializer(data=account_role)
            if serializer.is_valid(raise_exception=True):
                saved_account_role = serializer.save()

            return Response({'account_role': f'Account Role {saved_account_role.id} created successfully'})
        except Exception as e:
            return Response(e)

    def put(self, request, id):
        try:
            saved_account_role = get_object_or_404(AccountRoles.objects.all(), id=id)
            data = request.data
            serializer = AccountRolesSerializer(instance=saved_account_role, data=data, partial=True)

            if serializer.is_valid(raise_exception=True):
                updated_account_role = serializer.save()

            return Response({'account_role': f'Account role {updated_account_role.id} updated successfully'})
        except Exception as e:
            return Response(e)


class GetUserRole(APIView):
    def get(self, request, user_id):
        user_role = UserRole.objects.all().filter(user=user_id)
        user_role_serializer = UserRoleSerializer(instance=user_role, many=True)

        for d in range(len(user_role_serializer.data)):
            role = AccountRoles.objects.filter(id=user_role_serializer.data[d]['role'])
            role_serializer = AccountRolesSerializer(instance=role, many=True)

        return Response(role_serializer.data)


class GetUserAndRoleView(APIView):
    def get(self, request):
        result = []

        users = UserAccount.objects.all()
        users_serializer = UserSerializer(instance=users, many=True)

        for d in range(len(users_serializer.data)):

            user_role = UserRole.objects.all().filter(user=users_serializer.data[d]['id'])
            user_role_serializer = UserRoleSerializer(instance=user_role, many=True)

            for i in range(len(user_role_serializer.data)):
                role = AccountRoles.objects.filter(id=user_role_serializer.data[i]['role'])
                role_serializer = AccountRolesSerializer(instance=role, many=True)
                result.append({
                    'user_id': users_serializer.data[d]['id'],
                    'user': f'{users_serializer.data[d]["first_name"]} {users_serializer.data[d]["last_name"]}',
                    'role': f'{role_serializer.data[i]["name"]}',
                    'user_role_id': user_role_serializer.data[i]['id']
                })

        print('result', result)

        return Response(result)


class CreateUserRoleView(APIView):
    def post(self, request):
        def _get_role_id(od_items):
            for item in od_items:
                if item[0] == 'course':
                    return item[1]

            return

        print(request.data['role'])
        user_id = request.data['user']
        role_name = request.data['role']

        role = AccountRoles.objects.filter(name=role_name)
        role_serializer = AccountRolesSerializer(instance=role, many=True)

        user_role_serializer = UserRoleSerializer(data={
            'user': user_id,
            'role': role_serializer.data[0]['id']
        })

        if user_role_serializer.is_valid(raise_exception=True):
            user_role_serializer.save()

        return Response('ok')
