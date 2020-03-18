import requests

from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth import login as django_login
from django.db import transaction

from auth.providers.github.provider import GithubOAuth2Provider
from identity.models import Identity
from ondeck.models import User


PROVIDERS = {"github": GithubOAuth2Provider}


def login(request, slug):
    provider = PROVIDERS.get(slug)()
    redirect_uri = request.build_absolute_uri("/identity/callback/{}".format(slug))
    authorization_url = provider.authorize(redirect_uri)
    return HttpResponseRedirect(authorization_url)


@transaction.atomic
def callback(request, slug):
    provider = PROVIDERS.get(slug)()
    payload = provider.get_access_token(request.GET.get("code"))

    # START GITHUB
    access_token = payload["access_token"]
    params = {"access_token": access_token}
    response = requests.get("https://api.github.com/user", params=params)
    data = response.json()
    where = {"provider": "github", "uid": data["login"]}
    defaults = {"parameters": {"access_token": access_token}}
    # END GITHUB

    identity, created = Identity.objects.get_or_create(defaults=defaults, **where)
    if created:
        emails = requests.get(
            "https://api.github.com/user/emails", params=params
        ).json()
        # TODO auth pipeline to chooose/confirm/update emails
        user, user_created = User.objects.get_or_create(
            username=data["login"],
            email=emails[0]["email"],
            defaults={"name": data["name"]},
        )
        if user_created:
            identity.user = user
            identity.save()
            user.set_unusable_password()

    django_login(request, identity.user)
    return JsonResponse({"user": identity.user.id})
