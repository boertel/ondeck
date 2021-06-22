from django.urls import path

from .views import install

urlpatterns = [
    path("install", install),
]
