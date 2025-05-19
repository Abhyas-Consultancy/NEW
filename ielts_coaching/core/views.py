# # 1.First workin
# from rest_framework import generics, permissions, views, status
# from rest_framework.response import Response
# from rest_framework.authtoken.models import Token
# from rest_framework import generics
# from django.contrib.auth import authenticate
# from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, User
# from .serializers import RecordedClassSerializer, StudyMaterialSerializer, MockAssignmentSerializer, SubmissionSerializer, UserSerializer
# from transformers import pipeline

# # Custom permission for teachers
# class IsTeacher(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.role == 'teacher'

# # Custom permission for students
# class IsStudent(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.role == 'student'

# # Register view
# class RegisterView(views.APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             token, created = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Login view
# class LoginView(views.APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = authenticate(username=username, password=password)
#         if user:
#             token, created = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key, 'user': {'id': user.id, 'username': user.username, 'role': user.role}})
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# # View for listing and creating recorded classes
# class RecordedClassListCreate(views.APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         recorded_classes = RecordedClass.objects.all()
#         serializer = RecordedClassSerializer(recorded_classes, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = RecordedClassSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(uploaded_by=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # View for listing and creating study materials
# class StudyMaterialListCreate(generics.ListCreateAPIView):
#     queryset = StudyMaterial.objects.all()
#     serializer_class = StudyMaterialSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         if self.request.user.role == 'teacher':
#             return StudyMaterial.objects.filter(uploaded_by=self.request.user)
#         return StudyMaterial.objects.all()

#     def perform_create(self, serializer):
#         serializer.save(uploaded_by=self.request.user)

# # View for listing and creating mock assignments
# class MockAssignmentListCreate(generics.ListCreateAPIView):
#     queryset = MockAssignment.objects.all()
#     serializer_class = MockAssignmentSerializer
#     permission_classes = [permissions.IsAuthenticated, IsTeacher]

#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)

# # View for listing and creating submissions
# class SubmissionListCreate(generics.ListCreateAPIView):
#     queryset = Submission.objects.all()
#     serializer_class = SubmissionSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         if self.request.user.role == 'student':
#             return Submission.objects.filter(student=self.request.user)
#         elif self.request.user.role == 'teacher':
#             return Submission.objects.filter(mock_assignment__created_by=self.request.user)
#         return Submission.objects.all()

#     def perform_create(self, serializer):
#         serializer.save(student=self.request.user)

# # View for evaluating submissions (AI-based)
# class EvaluateSubmission(views.APIView):
#     permission_classes = [permissions.IsAuthenticated, IsStudent]

#     def post(self, request):
#         submission_id = request.data.get('submission_id')
#         evaluate_by_teacher = request.data.get('evaluate_by_teacher', False)
#         submission = Submission.objects.get(id=submission_id, student=request.user)

#         # AI Evaluation for writing or speaking submissions
#         if submission.mock_assignment.skill in ['writing', 'speaking']:
#             text = submission.submission_text or "Sample text for evaluation"
#             classifier = pipeline('text-classification', model='distilbert-base-uncased')
#             result = classifier(text)
#             submission.ai_score = result[0]['score'] * 9  # Scale to IELTS band (0-9)
#             submission.ai_feedback = "AI Feedback: Improve coherence and grammar."
#             submission.save()

#         # Mark for teacher evaluation if requested
#         if evaluate_by_teacher:
#             submission.teacher_score = None  # Placeholder for teacher to evaluate
#             submission.teacher_feedback = "Pending teacher evaluation."
#             submission.save()

#         return Response({'ai_score': submission.ai_score, 'ai_feedback': submission.ai_feedback})

# 2.Second Working but cannot play video in student dashboard
from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, User, Course, StudentCourse
from .serializers import RecordedClassSerializer, StudyMaterialSerializer, MockAssignmentSerializer, SubmissionSerializer, UserSerializer, CourseSerializer, StudentCourseSerializer
from transformers import pipeline

# Custom permission for teachers
class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'teacher'

# Custom permission for students
class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'

# Custom permission for admins
class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

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

# User list for admin
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

# Course creation and listing
class CourseListCreate(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeacher | IsAdmin]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# Assign course to student
class AssignCourseToStudent(views.APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def post(self, request):
        student_id = request.data.get('student_id')
        course_id = request.data.get('course_id')
        if not student_id or not course_id:
            return Response({'error': 'student_id and course_id are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            student = User.objects.get(id=student_id, role='student')
            course = Course.objects.get(id=course_id)
            enrollment, created = StudentCourse.objects.get_or_create(student=student, course=course)
            return Response({'message': 'Course assigned to student successfully'}, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

# Create course bundle
class CreateCourseBundle(views.APIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacher | IsAdmin]

    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description', '')
        recorded_class_ids = request.data.get('recorded_classes', [])
        study_material_ids = request.data.get('study_materials', [])
        mock_assignment_ids = request.data.get('mock_assignments', [])

        if not title:
            return Response({'error': 'Title is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the course
        course = Course.objects.create(title=title, description=description, created_by=request.user)

        # Associate existing recorded classes
        recorded_classes = RecordedClass.objects.filter(id__in=recorded_class_ids)
        recorded_classes.update(course=course)

        # Associate existing study materials
        study_materials = StudyMaterial.objects.filter(id__in=study_material_ids)
        study_materials.update(course=course)

        # Associate existing mock assignments
        mock_assignments = MockAssignment.objects.filter(id__in=mock_assignment_ids)
        mock_assignments.update(course=course)

        serializer = CourseSerializer(course)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# View for listing and creating recorded classes
class RecordedClassListCreate(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role == 'student':
            # Students only see recorded classes from their assigned courses
            courses = StudentCourse.objects.filter(student=request.user).values_list('course', flat=True)
            recorded_classes = RecordedClass.objects.filter(course__in=courses)
        elif request.user.role == 'teacher':
            recorded_classes = RecordedClass.objects.filter(uploaded_by=request.user)
        else:
            recorded_classes = RecordedClass.objects.all()
        serializer = RecordedClassSerializer(recorded_classes, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role != 'teacher':
            return Response({'error': 'Only teachers can upload recorded classes'}, status=status.HTTP_403_FORBIDDEN)
        serializer = RecordedClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View for listing and creating study materials
class StudyMaterialListCreate(generics.ListCreateAPIView):
    serializer_class = StudyMaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'student':
            # Students only see study materials from their assigned courses
            courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
            return StudyMaterial.objects.filter(course__in=courses)
        elif self.request.user.role == 'teacher':
            return StudyMaterial.objects.filter(uploaded_by=self.request.user)
        return StudyMaterial.objects.all()

    def perform_create(self, serializer):
        if self.request.user.role != 'teacher':
            raise permissions.PermissionDenied('Only teachers can upload study materials')
        serializer.save(uploaded_by=self.request.user)

# View for listing and creating mock assignments
class MockAssignmentListCreate(generics.ListCreateAPIView):
    serializer_class = MockAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeacher]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return MockAssignment.objects.filter(created_by=self.request.user)
        return MockAssignment.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# View for listing mock assignments for students
class StudentMockAssignmentList(generics.ListAPIView):
    serializer_class = MockAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        # Students only see mock assignments from their assigned courses
        courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
        return MockAssignment.objects.filter(course__in=courses)

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

# 3.Third

# from rest_framework import generics, permissions
# from rest_framework.response import Response
# from .models import RecordedClass, StudyMaterial, MockAssignment, Submission, User, Course, StudentCourse
# from .serializers import (
#     RecordedClassSerializer, StudyMaterialSerializer, MockAssignmentSerializer,
#     SubmissionSerializer, UserSerializer, CourseSerializer, StudentCourseSerializer
# )

# class UserRegister(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.AllowAny]

# class RecordedClassListCreate(generics.ListCreateAPIView):
#     serializer_class = RecordedClassSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         if self.request.user.role == 'student':
#             courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
#             return RecordedClass.objects.filter(course__in=courses)
#         elif self.request.user.role == 'teacher':
#             return RecordedClass.objects.filter(uploaded_by=self.request.user)
#         return RecordedClass.objects.all()

#     def perform_create(self, serializer):
#         if self.request.user.role != 'teacher':
#             raise permissions.PermissionDenied('Only teachers can upload recorded classes')
#         serializer.save(uploaded_by=self.request.user)

# class StudyMaterialListCreate(generics.ListCreateAPIView):
#     serializer_class = StudyMaterialSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         if self.request.user.role == 'student':
#             courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
#             return StudyMaterial.objects.filter(course__in=courses)
#         elif self.request.user.role == 'teacher':
#             return StudyMaterial.objects.filter(uploaded_by=self.request.user)
#         return StudyMaterial.objects.all()

#     def perform_create(self, serializer):
#         if self.request.user.role != 'teacher':
#             raise permissions.PermissionDenied('Only teachers can upload study materials')
#         serializer.save(uploaded_by=self.request.user)

# class MockAssignmentListCreate(generics.ListCreateAPIView):
#     serializer_class = MockAssignmentSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         if self.request.user.role == 'student':
#             courses = StudentCourse.objects.filter(student=self.request.user).values_list('course', flat=True)
#             return MockAssignment.objects.filter(course__in=courses)
#         elif self.request.user.role == 'teacher':
#             return MockAssignment.objects.filter(created_by=self.request.user)
#         return MockAssignment.objects.all()

#     def perform_create(self, serializer):
#         if self.request.user.role != 'teacher':
#             raise permissions.PermissionDenied('Only teachers can create mock assignments')
#         serializer.save(created_by=self.request.user)

# class SubmissionListCreate(generics.ListCreateAPIView):
#     serializer_class = SubmissionSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         if self.request.user.role == 'student':
#             return Submission.objects.filter(student=self.request.user)
#         elif self.request.user.role == 'teacher':
#             return Submission.objects.all()
#         return Submission.objects.none()

#     def perform_create(self, serializer):
#         if self.request.user.role != 'student':
#             raise permissions.PermissionDenied('Only students can submit assignments')
#         serializer.save(student=self.request.user)

# class CourseListCreate(generics.ListCreateAPIView):
#     serializer_class = CourseSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Course.objects.all()

#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)

# class CourseBundleCreate(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         if request.user.role != 'teacher':
#             return Response({'error': 'Only teachers can create course bundles'}, status=403)

#         recorded_classes = request.data.get('recorded_classes', [])
#         study_materials = request.data.get('study_materials', [])
#         mock_assignments = request.data.get('mock_assignments', [])

#         course = Course.objects.create(
#             title=request.data.get('title'),
#             description=request.data.get('description'),
#             created_by=request.user
#         )

#         if recorded_classes:
#             RecordedClass.objects.filter(id__in=recorded_classes).update(course=course)
#         if study_materials:
#             StudyMaterial.objects.filter(id__in=study_materials).update(course=course)
#         if mock_assignments:
#             MockAssignment.objects.filter(id__in=mock_assignments).update(course=course)

#         serializer = CourseSerializer(course)
#         return Response(serializer.data, status=201)

# class StudentCourseList(generics.ListAPIView):
#     serializer_class = StudentCourseSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         if self.request.user.role != 'student':
#             raise permissions.PermissionDenied('Only students can view their enrolled courses')
#         return StudentCourse.objects.filter(student=self.request.user)