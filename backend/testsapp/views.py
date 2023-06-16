from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

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
        serializer = TestSerializer(test, many=True)

        return Response(serializer.data)

    def post(self, request):
        test = request.data

        serializer = TestSerializer(data=test)
        if serializer.is_valid(raise_exception=True):
            test_saved = serializer.save()

        return Response({"test": "Test {} created successfully".format(test_saved.id)})

    def put(self, request, id):
        saved_test = get_object_or_404(Test.objects.all(), pk=id)
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

        question = Question.objects.all()
        serializer = QuestionSerializer(question, many=True)

        return Response(serializer.data)

    def post(self, request):
        question = request.data

        serializer = QuestionSerializer(data=question)
        if serializer.is_valid(raise_exception=True):
            question_saved = serializer.save()

        return Response({"question": "Question {} created successfully".format(question_saved.id)})

    def put(self, request, id):
        saved_question = get_object_or_404(Question.objects.all(), pk=id)
        data = request.data
        serializer = QuestionSerializer(instance=saved_question, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            question_saved = serializer.save()

        return Response({
            "success": "Question '{}' updated successfully".format(question_saved.id)
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
        serializer = AnswerSerializer(answer, many=True)

        return Response(serializer.data)

    def post(self, request):
        answer = request.data

        serializer = AnswerSerializer(data=answer)
        if serializer.is_valid(raise_exception=True):
            answer_saved = serializer.save()

        return Response({"answer": "Answer {} created successfully".format(answer_saved.id)})

    def put(self, request, id):
        saved_answer = get_object_or_404(Answer.objects.all(), pk=id)
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
        serializer = UserTestSerializer(user_test,  many=True)

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
        serializer = UsersAnswersSerializer(users_answers, many=True)

        return Response(serializer.data)

    def post(self, request):
        users_answers = request.data

        serializer = UsersAnswersSerializer(data=users_answers)
        if serializer.is_valid(raise_exception=True):
            users_answers_saved = serializer.save()

        return Response({"users_answers": "Users answers {} created successfully".format(users_answers_saved.id)})

    def put(self, request, id):
        saved_users_answers = get_object_or_404(UsersAnswers.objects.all(), pk=id)
        data = request.data
        serializer = UsersAnswersSerializer(instance=saved_users_answers, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            users_answers_saved = serializer.save()

        return Response({
            "success": "Users answers '{}' updated successfully".format(users_answers_saved.id)
        })


class TestQuestionView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request):
        def _get_question_id(od_items):
            for item in od_items:
                if item[0] == 'id':
                    return item[1]

            return None

        test = request.GET.get('test')
        question_queryset = Question.objects.all().filter(test=test)
        question_serializer = QuestionSerializer(instance=question_queryset, many=True)

        for d in range(len(question_serializer.data)):
            answer_queryset = Answer.objects.all().filter(question=_get_question_id(question_serializer.data[d].items()))
            answer_serializer = AnswerSerializer(instance=answer_queryset, many=True)
            question_serializer.data[d]["answers"] = answer_serializer.data

        return Response(question_serializer.data)


class SaveUserTestView(APIView):
    def post(self, request):
        data = request.data
        answers = data['answers']

        user_test_serializer = UserTestSerializer(data={
            'user': data['user'],
            'test': data['test'],
        })

        if user_test_serializer.is_valid(raise_exception=True):
            user_test_serializer.save()

        for answer in answers:
            user_test_queryset = UserTest.objects.all().filter(user=data['user'], test=data['test'])
            user_test_serializer = UserTestSerializer(instance=user_test_queryset, many=True)

            question_queryset = Question.objects.all().filter(question=answer['question'])
            question_serializer = QuestionSerializer(instance=question_queryset, many=True)

            answer_queryset = Answer.objects.all().filter(answer=answer['answer'])
            answer_serializer = AnswerSerializer(instance=answer_queryset, many=True)

            user_answer_serializer = UsersAnswersSerializer(data={
                'user_test': user_test_serializer.data[-1]['id'],
                'question': question_serializer.data[-1]['id'],
                'answer': answer_serializer.data[-1]['id'],
            })

            if user_answer_serializer.is_valid(raise_exception=True):
                user_answer_serializer.save()

        return Response('ok')


class CreateTestView(APIView):
    def post(self, request):
        test_serializer = TestSerializer(data={
            'name': request.data['test_name'],
            'description': request.data['test_description']
        })
        if test_serializer.is_valid(raise_exception=True):
            saved_test = test_serializer.save()

            for i in range(len(request.data['question'])):
                print(request.data['question'][i])
                print(request.data['correct_answer'][i])
                print(request.data['uncorrect_answer'][i])
                question_serializer = QuestionSerializer(data={
                    'test': saved_test.id,
                    'question': request.data['question'][i]
                })

                if question_serializer.is_valid(raise_exception=True):
                    saved_question = question_serializer.save()

                    correct_answer_serializer = AnswerSerializer(data={
                        'question': saved_question.id,
                        'answer': request.data['correct_answer'][i],
                        'is_correct': True
                    })

                    if correct_answer_serializer.is_valid(raise_exception=True):
                        correct_answer_serializer.save()

                        uncorrect_answer_serializer = AnswerSerializer(data={
                            'question': saved_question.id,
                            'answer': request.data['uncorrect_answer'][i],
                        })

                        if uncorrect_answer_serializer.is_valid(raise_exception=True):
                            uncorrect_answer_serializer.save()

        return Response('created successfully')


class GetUserTests(APIView):
    def get(self, request, id):
        def _get_id(od_items):
            for item in od_items:
                if item[0] == 'id':
                    return item[1]

            return None

        result = []

        if not id:
            return Response('id is undefined')

        user_tests = UserTest.objects.all().filter(user=id)
        user_tests_serializer = UserTestSerializer(instance=user_tests, many=True)

        for d in range(len(user_tests_serializer.data)):
            tests = Test.objects.filter(id=_get_id(user_tests_serializer.data[d].items()))
            tests_serializer = TestSerializer(instance=tests, many=True)

            result.append(tests_serializer.data)

        return Response(result)
