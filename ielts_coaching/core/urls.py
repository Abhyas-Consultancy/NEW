from django.urls import path
from .views import RegisterView, LoginView, RecordedClassListCreate, StudyMaterialListCreate, MockAssignmentListCreate, SubmissionListCreate, EvaluateSubmission

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('recorded-classes/', RecordedClassListCreate.as_view(), name='recorded-class-list'),
    path('study-materials/', StudyMaterialListCreate.as_view(), name='study-material-list'),
    path('mock-assignments/', MockAssignmentListCreate.as_view(), name='mock-assignment-list'),
    path('submissions/', SubmissionListCreate.as_view(), name='submission-list'),
    path('evaluate-submission/', EvaluateSubmission.as_view(), name='evaluate-submission'),
]