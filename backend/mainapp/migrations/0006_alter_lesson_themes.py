# Generated by Django 4.2 on 2023-06-08 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_alter_themes_materials'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='themes',
            field=models.ManyToManyField(related_name='themes_of_lesson', to='mainapp.themes', verbose_name='Themes of Lesson'),
        ),
    ]
