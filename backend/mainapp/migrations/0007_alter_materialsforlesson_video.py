# Generated by Django 4.2 on 2023-06-27 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0006_alter_lesson_themes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='materialsforlesson',
            name='video',
            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='Video'),
        ),
    ]
