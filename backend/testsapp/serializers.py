from rest_framework.serializers import ModelSerializer

from testsapp.models import Test, Question, Answer, UserTest, UsersAnswers


class TestSerializer(ModelSerializer):
    class Meta:
        model = Test
        fields = [
            'id',
            'name',
            'description'
        ]

    def create(self, validated_data):
        return Test.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id',
            'test',
            'question'
        ]

    def create(self, validated_data):
        return Question.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.test = validated_data.get('test', instance.test)
        instance.question = validated_data.get('question', instance.question)

        instance.save()
        return instance


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = [
            'id',
            'answer',
            'question',
            'is_correct'
        ]

    def create(self, validated_data):
        return Answer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.answer = validated_data.get('answer', instance.answer)
        instance.question = validated_data.get('question', instance.question)
        instance.is_correct = validated_data.get('is_correct', instance.is_correct)

        instance.save()
        return instance


class UserTestSerializer(ModelSerializer):
    class Meta:
        model = UserTest
        fields = [
            'id',
            'user',
            'test'
        ]

    def create(self, validated_data):
        return UserTest.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.test = validated_data.get('test', instance.test)

        instance.save()
        return instance


class UsersAnswersSerializer(ModelSerializer):
    class Meta:
        model = UsersAnswers
        fields = [
            'id',
            'user_test',
            'question',
            'answer'
        ]

    def create(self, validated_data):
        return UsersAnswers.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user_test = validated_data.get('user_test', instance.user_test)
        instance.question = validated_data.get('question', instance.question)
        instance.answer = validated_data.get('answer', instance.answer)

        instance.save()
        return instance
