# Generated by Django 4.2 on 2023-05-25 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testsapp', '0002_alter_test_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='question',
            field=models.CharField(max_length=255, verbose_name='Question'),
        ),
    ]
