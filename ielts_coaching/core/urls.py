# # 1.First Working
# from django.urls import path
# from .views import RegisterView, LoginView, RecordedClassListCreate, StudyMaterialListCreate, MockAssignmentListCreate, SubmissionListCreate, EvaluateSubmission

# urlpatterns = [
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('recorded-classes/', RecordedClassListCreate.as_view(), name='recorded-class-list'),
#     path('study-materials/', StudyMaterialListCreate.as_view(), name='study-material-list'),
#     path('mock-assignments/', MockAssignmentListCreate.as_view(), name='mock-assignment-list'),
#     path('submissions/', SubmissionListCreate.as_view(), name='submission-list'),
#     path('evaluate-submission/', EvaluateSubmission.as_view(), name='evaluate-submission'),
# ]

# 2.Second Working but not able view video

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('courses/', views.CourseListCreate.as_view(), name='course-list-create'),
    path('assign-course/', views.AssignCourseToStudent.as_view(), name='assign-course'),
    path('create-course-bundle/', views.CreateCourseBundle.as_view(), name='create-course-bundle'),
    path('recorded-classes/', views.RecordedClassListCreate.as_view(), name='recorded-class-list-create'),
    path('study-materials/', views.StudyMaterialListCreate.as_view(), name='study-material-list-create'),
    path('mock-assignments/', views.MockAssignmentListCreate.as_view(), name='mock-assignment-list-create'),
    path('student-mock-assignments/', views.StudentMockAssignmentList.as_view(), name='student-mock-assignment-list'),
    path('submissions/', views.SubmissionListCreate.as_view(), name='submission-list-create'),
    path('evaluate-submission/', views.EvaluateSubmission.as_view(), name='evaluate-submission'),
]

# 3.Third

# from django.urls import path
# from .views import (
#     UserRegister, RecordedClassListCreate, StudyMaterialListCreate,
#     MockAssignmentListCreate, SubmissionListCreate, CourseListCreate,
#     CourseBundleCreate, StudentCourseList
# )

# urlpatterns = [
#     path('register/', UserRegister.as_view(), name='register'),
#     path('recorded-classes/', RecordedClassListCreate.as_view(), name='recorded-classes'),
#     path('study-materials/', StudyMaterialListCreate.as_view(), name='study-materials'),
#     path('mock-assignments/', MockAssignmentListCreate.as_view(), name='mock-assignments'),
#     path('submissions/', SubmissionListCreate.as_view(), name='submissions'),
#     path('courses/', CourseListCreate.as_view(), name='courses'),
#     path('create-course-bundle/', CourseBundleCreate.as_view(), name='create-course-bundle'),
#     path('student-courses/', StudentCourseList.as_view(), name='student-courses'),
# ]