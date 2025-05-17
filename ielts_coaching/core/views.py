from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, User
from .serializers import RecordedClassSerializer, StudyMaterialSerializer, MockAssignmentSerializer, SubmissionSerializer, UserSerializer
from transformers import pipeline

# Custom permission for teachers
class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'teacher'

# Custom permission for students
class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'student'

# Register view
class RegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login view
class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': {'id': user.id, 'username': user.username, 'role': user.role}})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# View for listing and creating recorded classes
class RecordedClassListCreate(generics.ListCreateAPIView):
    queryset = RecordedClass.objects.all()
    serializer_class = RecordedClassSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return RecordedClass.objects.filter(uploaded_by=self.request.user)
        return RecordedClass.objects.all()

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

# View for listing and creating study materials
class StudyMaterialListCreate(generics.ListCreateAPIView):
    queryset = StudyMaterial.objects.all()
    serializer_class = StudyMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return StudyMaterial.objects.filter(uploaded_by=self.request.user)
        return StudyMaterial.objects.all()

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

# View for listing and creating mock assignments
class MockAssignmentListCreate(generics.ListCreateAPIView):
    queryset = MockAssignment.objects.all()
    serializer_class = MockAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# View for listing and creating submissions
class SubmissionListCreate(generics.ListCreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'student':
            return Submission.objects.filter(student=self.request.user)
        elif self.request.user.role == 'teacher':
            return Submission.objects.filter(mock_assignment__created_by=self.request.user)
        return Submission.objects.all()

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

# View for evaluating submissions (AI-based)
class EvaluateSubmission(views.APIView):
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def post(self, request):
        submission_id = request.data.get('submission_id')
        evaluate_by_teacher = request.data.get('evaluate_by_teacher', False)
        submission = Submission.objects.get(id=submission_id, student=request.user)

        # AI Evaluation for writing or speaking submissions
        if submission.mock_assignment.skill in ['writing', 'speaking']:
            text = submission.submission_text or "Sample text for evaluation"
            classifier = pipeline('text-classification', model='distilbert-base-uncased')
            result = classifier(text)
            submission.ai_score = result[0]['score'] * 9  # Scale to IELTS band (0-9)
            submission.ai_feedback = "AI Feedback: Improve coherence and grammar."
            submission.save()

        # Mark for teacher evaluation if requested
        if evaluate_by_teacher:
            submission.teacher_score = None  # Placeholder for teacher to evaluate
            submission.teacher_feedback = "Pending teacher evaluation."
            submission.save()

        return Response({'ai_score': submission.ai_score, 'ai_feedback': submission.ai_feedback})