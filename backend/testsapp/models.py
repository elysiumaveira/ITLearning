from django.db import models
from authapp.models import UserAccount

from django.utils.translation import gettext_lazy as _


class DefaultManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()


class Test(models.Model):
    name = models.CharField(max_length=64, verbose_name=_('Test name'))
    description = models.CharField(max_length=255, verbose_name=_('Test description'))

    objects = DefaultManager


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name=('test_question'), verbose_name=_('Test question'))
    question = models.CharField(max_length=64, verbose_name=_('Question'))

    objects = DefaultManager


class Answer(models.Model):
    answer = models.CharField(max_length=64, verbose_name=_('Answer'))
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name=('answer_of_question'), verbose_name=_('Answer'))
    is_correct = models.BooleanField(default=False)

    objects = DefaultManager


class UserTest(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name=('tested_user'), verbose_name=_('Tested user'))
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name=('test_for_user'), verbose_name=_('Test for user'))

    objects = DefaultManager


class UsersAnswers(models.Model):
    user_test = models.ForeignKey(UserTest, on_delete=models.CASCADE, related_name=('users_test'), verbose_name=_('User test'))
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name=('users_answer'), verbose_name=_('Users answer'))

    objects = DefaultManager
