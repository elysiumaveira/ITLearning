from django.db import models
from django.utils.translation import gettext_lazy as _
from authapp.models import UserAccount
from mainapp.models import Course


class DefaultManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()


class Purchases(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name=('Customer'), verbose_name=_('Customer'))
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name=('Product'), verbose_name=_('Product'))

    objects = DefaultManager
