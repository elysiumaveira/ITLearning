from django.db import models
from authapp.models import UserAccount
from django.utils.translation import gettext_lazy as _


class DefaultManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()


class Course(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Course Name'))
    goal = models.CharField(max_length=255, verbose_name=_('Course goal'), null=True, blank=True)
    description = models.TextField(verbose_name=_('Course Description'))
    teacher = models.ForeignKey(UserAccount, related_name='courses', on_delete=models.CASCADE, verbose_name=_('Teacher'))
    image = models.ImageField(upload_to='coursesImages', null=True, blank=True)
    course_type = models.CharField(max_length=64, verbose_name=_('Course type'), null=True, blank=True)
    period = models.PositiveIntegerField(null=True, blank=True, verbose_name=_('Course period'))
    price = models.PositiveIntegerField(null=True, blank=True, verbose_name=_('Course price'))

    objects = DefaultManager


class Group(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Group Name'))
    students = models.ManyToManyField(UserAccount, related_name='students', verbose_name=_('Students'))
    teacher = models.ManyToManyField(UserAccount, related_name='approved_teacher', verbose_name=_('Approved Teacher'))
    course = models.ForeignKey(Course, null=True, blank=True, related_name='group_course', on_delete=models.CASCADE, verbose_name=_('Course'))

    objects = DefaultManager


class Lecture(models.Model):
    number = models.PositiveIntegerField(verbose_name=_('Lecture Number'))
    title = models.CharField(max_length=255, verbose_name=_('Lecture Title'))
    description = models.TextField(verbose_name=_('Lecture Description'))
    course = models.ForeignKey(Course, related_name='lectures', on_delete=models.CASCADE, verbose_name=_('Course'))

    objects = DefaultManager


class Test(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Test Name'))
    description = models.TextField(verbose_name=_('Test Description'))
    lecture = models.ForeignKey(Lecture, related_name='tests', on_delete=models.CASCADE, verbose_name=_('Lecture'))

    objects = DefaultManager


class Homework(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Homework Name'))
    description = models.TextField(verbose_name=_('Homework Description'))
    lecture = models.ForeignKey(Lecture, related_name='homeworks', on_delete=models.CASCADE, verbose_name=_('Lecture'))

    objects = DefaultManager


class Enrollment(models.Model):
    student = models.ForeignKey(UserAccount, related_name='enrollments', on_delete=models.CASCADE, verbose_name=_('Student'))
    course = models.ForeignKey(Course, related_name='enrollments', on_delete=models.CASCADE, verbose_name=_('Course'))
    is_complete = models.BooleanField(default=False, verbose_name=_('Is Course Complete'))

    objects = DefaultManager


class Purchase(models.Model):
    student = models.ForeignKey(UserAccount, related_name='purchases', on_delete=models.CASCADE, verbose_name=_('Student'))
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name=_('Course'))

    objects = DefaultManager


class Notification(models.Model):
    text = models.TextField(verbose_name=_('Notification Text'))
    recipients = models.ManyToManyField(UserAccount, related_name='notifications', verbose_name=_('Recipients'))
    is_read = models.BooleanField(default=False, verbose_name=_('Is Read'))

    objects = DefaultManager


class Review(models.Model):
    text = models.TextField(verbose_name=_('Review Text'))
    course = models.ForeignKey(Course, related_name='reviews', on_delete=models.CASCADE, verbose_name=_('Course'))
    author = models.ForeignKey(UserAccount, related_name='reviews', on_delete=models.CASCADE, verbose_name=_('Author'))

    objects = DefaultManager
