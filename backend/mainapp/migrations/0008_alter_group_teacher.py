# Generated by Django 4.2 on 2023-05-10 06:13

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mainapp', '0007_alter_course_goal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='teacher',
            field=models.ManyToManyField(related_name='approved_teacher', to=settings.AUTH_USER_MODEL, verbose_name='Approved Teacher'),
        ),
    ]