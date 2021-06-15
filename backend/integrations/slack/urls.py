from django.urls import path

from .views import install, callback

urlpatterns = [
    path("install", install),
    path("callback", callback),
]
