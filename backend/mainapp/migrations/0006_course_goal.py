# Generated by Django 4.2 on 2023-05-04 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_course_period_course_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='goal',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Course goal'),
        ),
    ]
