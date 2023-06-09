# Generated by Django 4.2 on 2023-05-18 10:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Course Name')),
                ('goal', models.CharField(blank=True, max_length=255, null=True, verbose_name='Course goal')),
                ('description', models.TextField(verbose_name='Course Description')),
                ('image', models.ImageField(blank=True, null=True, upload_to='coursesImages')),
                ('course_type', models.CharField(blank=True, max_length=64, null=True, verbose_name='Course type')),
                ('period', models.PositiveIntegerField(blank=True, null=True, verbose_name='Course period')),
                ('price', models.PositiveIntegerField(blank=True, null=True, verbose_name='Course price')),
                ('teacher', models.ManyToManyField(related_name='teachers', to=settings.AUTH_USER_MODEL, verbose_name='Teachers')),
            ],
        ),
        migrations.CreateModel(
            name='Lecture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveIntegerField(verbose_name='Lecture Number')),
                ('title', models.CharField(max_length=255, verbose_name='Lecture Title')),
                ('description', models.TextField(verbose_name='Lecture Description')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lectures', to='mainapp.course', verbose_name='Course')),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Test Name')),
                ('description', models.TextField(verbose_name='Test Description')),
                ('lecture', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tests', to='mainapp.lecture', verbose_name='Lecture')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(verbose_name='Review Text')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL, verbose_name='Author')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='mainapp.course', verbose_name='Course')),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.course', verbose_name='Course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchases', to=settings.AUTH_USER_MODEL, verbose_name='Student')),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(verbose_name='Notification Text')),
                ('is_read', models.BooleanField(default=False, verbose_name='Is Read')),
                ('recipients', models.ManyToManyField(related_name='notifications', to=settings.AUTH_USER_MODEL, verbose_name='Recipients')),
            ],
        ),
        migrations.CreateModel(
            name='Homework',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Homework Name')),
                ('description', models.TextField(verbose_name='Homework Description')),
                ('lecture', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='homeworks', to='mainapp.lecture', verbose_name='Lecture')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Group Name')),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='group_course', to='mainapp.course', verbose_name='Course')),
                ('students', models.ManyToManyField(related_name='students', to=settings.AUTH_USER_MODEL, verbose_name='Students')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='approved_teacher', to=settings.AUTH_USER_MODEL, verbose_name='Approved Teacher')),
            ],
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_complete', models.BooleanField(default=False, verbose_name='Is Course Complete')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrollments', to='mainapp.course', verbose_name='Course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrollments', to=settings.AUTH_USER_MODEL, verbose_name='Student')),
            ],
        ),
    ]
