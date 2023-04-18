# Generated by Django 4.2 on 2023-04-18 15:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_rename_approved_teachers_group_teacher_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='coursesImages'),
        ),
        migrations.AddField(
            model_name='group',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='group_course', to='mainapp.course', verbose_name='Course'),
        ),
    ]
