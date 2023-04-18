from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.db import models


class CustomUser(AbstractUser):
    birth_date = models.DateField(blank=True, help_text=_('birth date'), verbose_name=_('Birth date'))
    avatar = models.ImageField(upload_to='usersAvatars', null=True, blank=True, help_text=_('avatar'), verbose_name=_('Avatar'))
    is_teacher = models.BooleanField(default=False, help_text=_('teacher status'), verbose_name=_('Teacher status'))

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
