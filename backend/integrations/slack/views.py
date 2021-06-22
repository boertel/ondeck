from django.http import HttpResponseRedirect, JsonResponse, HttpResponseForbidden
from django.db import transaction
from django.contrib.auth import get_user_model

from auth.providers import SlackBotOAuth2Provider


def install(request):
    provider = SlackBotOAuth2Provider()
    authorization_url = provider.authorize(request)
    return HttpResponseRedirect(authorization_url)
