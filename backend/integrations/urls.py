from django.urls import path, include


urlpatterns = [
    path("github/", include("integrations.github.urls")),
    path("slack/", include("integrations.slack.urls")),
]
