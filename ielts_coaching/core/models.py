# 1. First 
# from django.db import models
# from django.contrib.auth.models import AbstractUser

# class User(AbstractUser):
#     ROLE_CHOICES = (
#         ('student', 'Student'),
#         ('teacher', 'Teacher'),
#         ('admin', 'Admin'),
#     )
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

# class RecordedClass(models.Model):
#     title = models.CharField(max_length=100)
#     video_file = models.FileField(upload_to='recorded_classes/')
#     uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
#     uploaded_at = models.DateTimeField(auto_now_add=True)

# class StudyMaterial(models.Model):
#     title = models.CharField(max_length=100)
#     file = models.FileField(upload_to='study_materials/')
#     uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
#     uploaded_at = models.DateTimeField(auto_now_add=True)

# class MockAssignment(models.Model):
#     SKILL_CHOICES = (
#         ('speaking', 'Speaking'),
#         ('listening', 'Listening'),
#         ('reading', 'Reading'),
#         ('writing', 'Writing'),
#     )
#     title = models.CharField(max_length=100)
#     skill = models.CharField(max_length=10, choices=SKILL_CHOICES)
#     description = models.TextField()
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
#     created_at = models.DateTimeField(auto_now_add=True)

# class Submission(models.Model):
#     student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
#     mock_assignment = models.ForeignKey(MockAssignment, on_delete=models.CASCADE)
#     submission_file = models.FileField(upload_to='submissions/', null=True, blank=True)
#     submission_text = models.TextField(null=True, blank=True)
#     submitted_at = models.DateTimeField(auto_now_add=True)
#     ai_score = models.FloatField(null=True, blank=True)
#     ai_feedback = models.TextField(null=True, blank=True)
#     teacher_score = models.FloatField(null=True, blank=True)
#     teacher_feedback = models.TextField(null=True, blank=True)

# 2. Second Working and checked
# from django.db import models
# from django.contrib.auth.models import AbstractUser

# class User(AbstractUser):
#     # Define user roles
#     ROLE_CHOICES = (
#         ('student', 'Student'),
#         ('teacher', 'Teacher'),
#         ('admin', 'Admin'),
#     )
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

#     def __str__(self):
#         return self.username

# class RecordedClass(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True)  # Add description field
#     video_file = models.FileField(upload_to='recorded_classes/')
#     uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title

# class StudyMaterial(models.Model):
#     # Study material details
#     title = models.CharField(max_length=100)
#     file = models.FileField(upload_to='study_materials/')
#     uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title

# class MockAssignment(models.Model):
#     # Mock assignment details
#     SKILL_CHOICES = (
#         ('speaking', 'Speaking'),
#         ('listening', 'Listening'),
#         ('reading', 'Reading'),
#         ('writing', 'Writing'),
#     )
#     title = models.CharField(max_length=100)
#     skill = models.CharField(max_length=10, choices=SKILL_CHOICES)
#     description = models.TextField()
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.title} ({self.skill})"

# class Submission(models.Model):
#     # Submission details for mock assignments
#     student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
#     mock_assignment = models.ForeignKey(MockAssignment, on_delete=models.CASCADE)
#     submission_file = models.FileField(upload_to='submissions/', null=True, blank=True)
#     submission_text = models.TextField(null=True, blank=True)
#     submitted_at = models.DateTimeField(auto_now_add=True)
#     ai_score = models.FloatField(null=True, blank=True)
#     ai_feedback = models.TextField(null=True, blank=True)
#     teacher_score = models.FloatField(null=True, blank=True)
#     teacher_feedback = models.TextField(null=True, blank=True)

#     def __str__(self):
#         return f"Submission by {self.student.username} for {self.mock_assignment.title}"
    
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_courses')

    def __str__(self):
        return self.title

class RecordedClass(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    video_file = models.FileField(upload_to='recorded_classes/')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='recorded_classes')

    def __str__(self):
        return self.title

class StudyMaterial(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='study_materials/')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='study_materials')

    def __str__(self):
        return self.title

class MockAssignment(models.Model):
    SKILL_CHOICES = (
        ('speaking', 'Speaking'),
        ('listening', 'Listening'),
        ('reading', 'Reading'),
        ('writing', 'Writing'),
    )
    title = models.CharField(max_length=200)
    skill = models.CharField(max_length=20, choices=SKILL_CHOICES)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='mock_assignments')

    def __str__(self):
        return self.title

class Submission(models.Model):
    mock_assignment = models.ForeignKey(MockAssignment, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    submission_text = models.TextField(blank=True, null=True, default="")
    submission_file = models.FileField(upload_to='submissions/', blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    ai_score = models.FloatField(blank=True, null=True)
    ai_feedback = models.TextField(blank=True, null=True)
    teacher_score = models.FloatField(blank=True, null=True)
    teacher_feedback = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Submission by {self.student.username} for {self.mock_assignment.title}"

class StudentCourse(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrolled_courses')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_students')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student.username} enrolled in {self.course.title}"