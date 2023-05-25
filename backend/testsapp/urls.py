from django.urls import path

from testsapp.views import TestView, QuestionView, AnswerView, UserTestView, UsersAnswersView

urlpatterns = [
    path('tests/', TestView.as_view()),
    path('test/<int:id>/', TestView.as_view()),

    path('questions/', QuestionView.as_view()),
    path('question/<int:id>/', QuestionView.as_view()),

    path('answers/', AnswerView.as_view()),
    path('answer/<int:id>/', AnswerView.as_view()),

    path('users_tests/', UserTestView.as_view()),
    path('user_test/<int:id>/', UserTestView.as_view()),

    path('users_answers/', UsersAnswersView.as_view()),
    path('user_answer/<int:id>/', UsersAnswersView.as_view()),
]
