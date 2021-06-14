from django.urls import path, include


urlpatterns = [path("github/", include("integrations.github.urls"))]
