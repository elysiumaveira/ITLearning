from rest_framework.serializers import ModelSerializer

from mainapp.models import Group, Course, MaterialsForLesson, Themes, Lesson, TrialLesson


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'goal',
            'description',
            'teacher',
            'image',
            'course_type',
            'period',
            'price'
        ]

    def create(self, validated_data):
        teachers_data = validated_data.pop('teacher')
        course = Course.objects.create(**validated_data)
        course.teacher.set(teachers_data)

        return course

    def update(self, instance, validated_data):
        teachers_data = validated_data.get('teacher', None)

        if teachers_data:
            instance.teacher.set(teachers_data)

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.course_type = validated_data.get('course_type', instance.course_type)
        instance.period = validated_data.get('period', instance.period)
        instance.price = validated_data.get('price', instance.price)
        instance.goal = validated_data.get('goal', instance.goal)

        instance.save()
        return instance


class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

    def create(self, validated_data):
        themes_data = validated_data.pop('themes')
        lesson = Lesson.objects.create(**validated_data)
        lesson.themes.set(themes_data)

        return lesson

    def update(self, instance, validated_data):
        themes_data = validated_data.get('themes', None)

        if themes_data:
            instance.themes.set(themes_data)

        instance.name = validated_data.get('name', instance.name)
        instance.course = validated_data.get('course', instance.course)

        instance.save()
        return instance


class ThemesSerializer(ModelSerializer):
    class Meta:
        model = Themes
        fields = '__all__'

    def create(self, validated_data):
        materials_data = validated_data.pop('materials')
        theme = Themes.objects.create(**validated_data)
        theme.materials.set(materials_data)

        return theme

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)

        materials_data = validated_data.get('materials', None)
        if materials_data:
            instance.materials.set(materials_data)

        instance.save()
        return instance


class MaterialsSerializer(ModelSerializer):
    class Meta:
        model = MaterialsForLesson
        fields = '__all__'

    def create(self, validated_data):
        return MaterialsForLesson.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.file = validated_data.get('file', instance.file)
        instance.video = validated_data.get('video', instance.video)

        instance.save()
        return instance


class TrialLessonSerializer(ModelSerializer):
    class Meta:
        model = TrialLesson
        fields = [
            'id',
            'course',
            'name',
            'email'
        ]

    def create(self, validated_data):
        return TrialLesson.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.course = validated_data.get('course', instance.course)
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)

        instance.save()
        return instance
