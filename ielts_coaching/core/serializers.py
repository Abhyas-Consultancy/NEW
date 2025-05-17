from rest_framework import serializers
from .models import User, RecordedClass, StudyMaterial, MockAssignment, Submission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class RecordedClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordedClass
        fields = ['id', 'title', 'description', 'video_file', 'uploaded_by', 'uploaded_at']
        read_only_fields = ['uploaded_by', 'uploaded_at']
class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyMaterial
        fields = '__all__'

class MockAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockAssignment
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'