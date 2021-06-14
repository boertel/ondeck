from django.urls import path

from .views import pull_request

urlpatterns = [
    path('pull_request', pull_request),
]
