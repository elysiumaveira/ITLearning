# Generated by Django 4.2 on 2023-04-18 10:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group',
            old_name='approved_teachers',
            new_name='teacher',
        ),
        migrations.RemoveField(
            model_name='group',
            name='description',
        ),
        migrations.AddField(
            model_name='group',
            name='students',
            field=models.ManyToManyField(related_name='students', to=settings.AUTH_USER_MODEL, verbose_name='Students'),
        ),
    ]
