from django.urls import path

from .views import sign_s3_upload

urlpatterns = [path("", sign_s3_upload)]
