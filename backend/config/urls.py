"""ondeck URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings

from ondeck import urls
from identity import urls as identity_urls
from upload import urls as upload_urls

from web.views import index

urlpatterns = [
    path("api/v1/", include(urls)),
    path("admin/", admin.site.urls),
    path("identity/", include(identity_urls)),
    path("upload/", include(upload_urls)),
]

if settings.DEBUG:
    urlpatterns += [path("api-auth/", include("rest_framework.urls"))]

urlpatterns += [re_path(r"^.*$", index)]
