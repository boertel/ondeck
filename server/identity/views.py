import requests

from django.http import HttpResponseRedirect, JsonResponse

from auth.providers.github.provider import GithubOAuth2Provider


PROVIDERS = {"github": GithubOAuth2Provider}


def login(request, slug):
    provider = PROVIDERS.get(slug)()
    redirect_uri = request.build_absolute_uri("/identity/callback/{}".format(slug))
    authorization_url = provider.authorize(redirect_uri)
    return HttpResponseRedirect(authorization_url)


def callback(request, slug):
    provider = PROVIDERS.get(slug)()
    payload = provider.get_access_token(request.GET.get("code"))

    response = requests.get(
        "https://api.github.com/user", params={"access_token": access_token}
    )
    data = response.json()
    where = {"provider": self.provider, "uid": data["login"]}
    defaults = {parameters: {"access_token": access_token}}

    identity, created = Identity.objects.get_or_create(defaults=defaults, **where)
    if created:
        user, user_created = User.objects.get_or_create(
            username=data["email"], email=data["email"], defaults={"name": data["name"]}
        )
        if user_created:
            user.set_unusable_password()
    return JsonResponse({})
