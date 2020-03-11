from django.urls import path


from .views import login, callback

urlpatterns = [path("login/<slug:slug>", login), path("callback/<slug:slug>", callback)]
