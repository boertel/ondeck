from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth import get_user_model

from auth.providers import GithubOAuth2Provider, SlackOAuth2Provider

User = get_user_model()


class Identity(models.Model):
    class Provider:
        GITHUB = GithubOAuth2Provider.SLUG
        SLACK = SlackOAuth2Provider.SLUG

        @classmethod
        def as_choices(cls):
            return ((cls.GITHUB, "Github"), (cls.SLACK, "Slack"))

    uid = models.CharField(max_length=255)
    provider = models.CharField(max_length=40, choices=Provider.as_choices())
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    parameters = JSONField()

    def get_api(self):
        if self.provider == self.Provider.GITHUB:
            api = GithubOAuth2Provider.api
            api.set_access_token(access_token=self.parameters["access_token"])
            return api
