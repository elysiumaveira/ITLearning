from rest_framework.serializers import ModelSerializer

from mainapp.models import Group, Course, Lecture, Test


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        return Course.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.teacher = validated_data.get('teacher', instance.teacher)
        instance.course_type = validated_data.get('course_type', instance.course_type)
        instance.period = validated_data.get('period', instance.period)
        instance.price = validated_data.get('price', instance.price)
        instance.goal = validated_data.get('goal', instance.goal)

        instance.save()
        return instance


class LectureSerializer(ModelSerializer):
    class Meta:
        model = Lecture
        fields = '__all__'

    def create(self, validated_data):
        return Lecture.objects.create(**validated_data)


class TestSerializer(ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

    def create(self, validated_data):
        return Test.objects.create(**validated_data)
