from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from testsapp.models import Test, Question, Answer, UserTest, UsersAnswers
from testsapp.serializers import TestSerializer, QuestionSerializer, AnswerSerializer, UserTestSerializer, \
    UsersAnswersSerializer


class TestView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            course = Test.objects.get(id=id)
            serializer = TestSerializer(course)

            return Response(serializer.data)

        test = Test.objects.all()
        serializer = TestSerializer(test)

        return Response(serializer.data)

    def post(self, request):
        test = request.data

        serializer = TestSerializer(data=test)
        if serializer.is_valid(raise_exception=True):
            test_saved = serializer.save()

        return Response({"test": "Test {} created successfully".format(test_saved.id)})

    def put(self, request, pk):
        saved_test = get_object_or_404(Test.objects.all(), pk=pk)
        data = request.data
        serializer = TestSerializer(instance=saved_test, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            test_saved = serializer.save()

        return Response({
            "success": "Test '{}' updated successfully".format(test_saved.id)
        })


class QuestionView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            question = Question.objects.get(id=id)
            serializer = QuestionSerializer(question)

            return Response(serializer.data)

        test = Question.objects.all()
        serializer = QuestionSerializer(test)

        return Response(serializer.data)

    def post(self, request):
        question = request.data

        serializer = QuestionSerializer(data=question)
        if serializer.is_valid(raise_exception=True):
            question_saved = serializer.save()

        return Response({"question": "Question {} created successfully".format(question_saved.id)})

    def put(self, request, pk):
        saved_question = get_object_or_404(Test.objects.all(), pk=pk)
        data = request.data
        serializer = QuestionSerializer(instance=saved_question, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            question_saved = serializer.save()

        return Response({
            "success": "Question '{}' updated successfully".format(question_saved.id)
        })

    class TestView(APIView):
        @classmethod
        def get_extra_actions(cls):
            return []

        def get(self, request, id=None):
            if id:
                course = Test.objects.get(id=id)
                serializer = TestSerializer(course)

                return Response(serializer.data)

            test = Test.objects.all()
            serializer = TestSerializer(test)

            return Response(serializer.data)

        def post(self, request):
            test = request.data

            serializer = TestSerializer(data=test)
            if serializer.is_valid(raise_exception=True):
                test_saved = serializer.save()

            return Response({"tests": "Test {} created successfully".format(test_saved.id)})

        def put(self, request, pk):
            saved_test = get_object_or_404(Test.objects.all(), pk=pk)
            data = request.data
            serializer = TestSerializer(instance=saved_test, data=data, partial=True)

            if serializer.is_valid(raise_exception=True):
                test_saved = serializer.save()

            return Response({
                "success": "Course '{}' updated successfully".format(test_saved.id)
            })


class AnswerView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            answer = Answer.objects.get(id=id)
            serializer = AnswerSerializer(answer)

            return Response(serializer.data)

        answer = Answer.objects.all()
        serializer = AnswerSerializer(answer)

        return Response(serializer.data)

    def post(self, request):
        answer = request.data

        serializer = AnswerSerializer(data=answer)
        if serializer.is_valid(raise_exception=True):
            answer_saved = serializer.save()

        return Response({"answer": "Answer {} created successfully".format(answer_saved.id)})

    def put(self, request, pk):
        saved_answer = get_object_or_404(Test.objects.all(), pk=pk)
        data = request.data
        serializer = AnswerSerializer(instance=saved_answer, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            answer_saved = serializer.save()

        return Response({
            "success": "Answer '{}' updated successfully".format(answer_saved.id)
        })


class UserTestView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            user_test = UserTest.objects.get(id=id)
            serializer = UserTestSerializer(user_test)

            return Response(serializer.data)

        user_test = UserTest.objects.all()
        serializer = UserTestSerializer(user_test)

        return Response(serializer.data)

    def post(self, request):
        user_test = request.data

        serializer = UserTestSerializer(data=user_test)
        if serializer.is_valid(raise_exception=True):
            user_test_saved = serializer.save()

        return Response({"user_test": "User test {} created successfully".format(user_test_saved.id)})

    def put(self, request, pk):
        saved_user_test = get_object_or_404(Test.objects.all(), pk=pk)
        data = request.data
        serializer = UserTestSerializer(instance=saved_user_test, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            user_test_saved = serializer.save()

        return Response({
            "success": "User test '{}' updated successfully".format(user_test_saved.id)
        })


class UsersAnswersView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, id=None):
        if id:
            users_answers = UsersAnswers.objects.get(id=id)
            serializer = UsersAnswersSerializer(users_answers)

            return Response(serializer.data)

        users_answers = UsersAnswers.objects.all()
        serializer = UsersAnswersSerializer(users_answers)

        return Response(serializer.data)

    def post(self, request):
        users_answers = request.data

        serializer = UsersAnswersSerializer(data=users_answers)
        if serializer.is_valid(raise_exception=True):
            users_answers_saved = serializer.save()

        return Response({"users_answers": "Users answers {} created successfully".format(users_answers_saved.id)})

    def put(self, request, pk):
        saved_users_answers = get_object_or_404(UsersAnswers.objects.all(), pk=pk)
        data = request.data
        serializer = UsersAnswersSerializer(instance=saved_users_answers, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            users_answers_saved = serializer.save()

        return Response({
            "success": "Users answers '{}' updated successfully".format(users_answers_saved.id)
        })
