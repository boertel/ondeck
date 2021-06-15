from django.http import HttpResponseRedirect, JsonResponse, HttpResponseForbidden
from django.db import transaction
from django.contrib.auth import get_user_model

from auth.providers import SlackBotOAuth2Provider


def install(request):
    provider = SlackBotOAuth2Provider()
    authorization_url = provider.authorize(request)
    return HttpResponseRedirect(authorization_url)


@transaction.atomic
def callback(request):
    provider = SlackBotOAuth2Provider()
    bot = provider.execute_pipeline(request)
    return JsonResponse({"bot": bot.bot_id})
