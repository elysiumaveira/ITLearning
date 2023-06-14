import stripe
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from authapp.models import UserAccount
from django.utils.translation import gettext_lazy as _


class DefaultManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()


class Course(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Course Name'))
    goal = models.CharField(max_length=255, null=True, blank=True, verbose_name=_('Course goal'))
    description = models.TextField(verbose_name=_('Course Description'))
    teacher = models.ManyToManyField(UserAccount, related_name='teachers', verbose_name=_('Teachers'))
    image = models.ImageField(upload_to='coursesImages', null=True, blank=True)
    course_type = models.CharField(max_length=64, verbose_name=_('Course type'), null=True, blank=True)
    period = models.PositiveIntegerField(null=True, blank=True, verbose_name=_('Course period'))
    price = models.PositiveIntegerField(null=True, blank=True, verbose_name=_('Course price'))

    objects = DefaultManager


class Group(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Group Name'))
    teacher = models.ForeignKey(UserAccount,  on_delete=models.CASCADE, related_name='approved_teacher', verbose_name=_('Approved Teacher'))
    students = models.ManyToManyField(UserAccount, related_name='students', verbose_name=_('Students'))
    course = models.ForeignKey(Course, null=True, blank=True, related_name='group_course', on_delete=models.CASCADE, verbose_name=_('Course'))

    objects = DefaultManager


class MaterialsForLesson(models.Model):
    file = models.FileField(upload_to='materials for lessons/%Y/%m/%d', null=True, blank=True)
    video = models.FileField(upload_to='video lessons/%Y/%m/%d', null=True, blank=True)

    objects = DefaultManager


class Themes(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Name of theme'))
    materials = models.ManyToManyField(MaterialsForLesson, null=True, blank=True, related_name='materials_for_lesson', verbose_name=_('Materials'))

    objects = DefaultManager


class Lesson(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Lesson name'))
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lesson_of_course', verbose_name=_('Lesson of Course'))
    themes = models.ManyToManyField(Themes, related_name='themes_of_lesson', verbose_name=_('Themes of Lesson'))

    objects = DefaultManager


class TrialLesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='trial_lesson_course', verbose_name=_('Trial lesson of Course'))
    email = models.EmailField(max_length=255, verbose_name=_('Email'))
    name = models.CharField(max_length=255, verbose_name=_('First name'))

    objects = DefaultManager
