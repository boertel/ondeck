from django.http import HttpResponseRedirect
from django.db import transaction
from django.contrib.auth import get_user_model

from auth.providers import (
    GithubOAuth2Provider,
    SlackOAuth2Provider,
)

User = get_user_model()


PROVIDERS = {
    provider.SLUG: provider for provider in [GithubOAuth2Provider, SlackOAuth2Provider]
}


def provider(func):
    def wrapper(*args, **kwargs):
        slug = kwargs.pop("slug")
        kwargs["provider"] = PROVIDERS.get(slug)()
        return func(*args, **kwargs)

    return wrapper


@provider
def login(request, provider):
    authorization_url = provider.authorize(request)
    return HttpResponseRedirect(authorization_url)


@provider
@transaction.atomic
def callback(request, provider):
    return provider.execute_pipeline(request)
