"""
Django settings for ondeck project.

Generated by 'django-admin startproject' using Django 2.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import dj_database_url
from dotenv import load_dotenv
from decouple import config

load_dotenv()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=False, cast=bool)

HOST = config("HOST", config("RAILWAY_STATIC_URL", "ondeck.test"))
ALLOWED_HOSTS = [
    HOST,
]

COOKIE_DOMAIN = HOST
CSRF_COOKIE_DOMAIN = COOKIE_DOMAIN
SESSION_COOKIE_DOMAIN = COOKIE_DOMAIN

CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.postgres",
    "corsheaders",
    "storages",
    "django_meilisearch",
    "django_extensions",
    "reversion",
    "rest_framework",
    "ondeck",
    "identity",
    "integrations",
    "web",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ORIGIN_WHITELIST = ["http://localhost:3004"]

ROOT_URLCONF = "config.urls"

TEMPLATE_DIRS = []
LOCAL_FRONTEND = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend/"))
TEMPLATE_DIRS.append(LOCAL_FRONTEND)
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": TEMPLATE_DIRS,
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    },
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "NAME": "s3",
        "DIRS": [],
        "APP_DIRS": False,
        "OPTIONS": {
            "loaders": [
                (
                    "django.template.loaders.cached.Loader",
                    ["web.loaders.S3TemplateLoader"],
                )
            ],
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {"default": dj_database_url.config(default=config("DATABASE_URL"))}
DATABASES["default"]["ENGINE"] = "db"


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

AUTH_USER_MODEL = "ondeck.User"

AUTHENTICATION_BACKENDS = ("django.contrib.auth.backends.ModelBackend",)

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication"
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
}

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.3/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

WEB_DIRECTORY = config("COMMIT", default="build")
STATICFILES_DIRS = [os.path.join(LOCAL_FRONTEND, "build/static/")]

GITHUB_CLIENT_ID = config("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = config("GITHUB_CLIENT_SECRET")

SLACK_CLIENT_ID = config("SLACK_CLIENT_ID")
SLACK_CLIENT_SECRET = config("SLACK_CLIENT_SECRET")

STATIC_URL = "/static/"
STATICFILES_LOCATION = "static"
STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
STATICFILES_DIRS = []

DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"

AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID", default=None)
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY", default=None)
AWS_STORAGE_BUCKET_NAME = config("AWS_S3_BUCKET_NAME", default=None)
AWS_DEFAULT_ACL = "public-read"
AWS_QUERYSTRING_AUTH = False


MEILISEARCH_URL = config("MEILISEARCH_URL", default="http://127.0.0.1:7700")
MEILISEARCH_MASTER_KEY = config("MEILISEARCH_MASTER_KEY", default=None)

WEBHOOK_SECRET = config("WEBHOOK_SECRET", default=None)
