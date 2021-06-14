import requests

from django.db import models
from django.contrib.postgres.fields import JSONField

from ondeck.models import User


class GithubApi(object):
    def __init__(self, access_token):
        self.access_token = access_token

    def request(self, method, path, **kwargs):
        headers = {
            "Authorization": f"token {self.access_token}",
            "Accept": "application/vnd.github.v3+json",
        }
        headers |= kwargs.get("headers", {})
        if not path.startswith("/"):
            raise Error("path argument must start with a /")
        url = f"https://api.github.com{path}"
        response = requests.request(method, url, headers=headers, **kwargs)
        response.raise_for_status()
        if response.headers.get("Content-Type", "").startswith("application/json"):
            return response.json()

    def post(self, *args, **kwargs):
        return self.request("post", *args, **kwargs)

    def get(self, *args, **kwargs):
        return self.request("get", *args, **kwargs)

    def put(self, *args, **kwargs):
        return self.request("put", *args, **kwargs)

    def patch(self, *args, **kwargs):
        return self.request("patch", *args, **kwargs)

    def delete(self, *args, **kwargs):
        return self.request("delete", *args, **kwargs)


class Identity(models.Model):
    class Provider:
        GITHUB = "github"
        SLACK = "slack"

        @classmethod
        def as_choices(cls):
            return ((cls.GITHUB, "Github"), (cls.SLACK, "Slack"))

    uid = models.CharField(max_length=255)
    provider = models.CharField(max_length=40, choices=Provider.as_choices())
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    parameters = JSONField()

    def get_api(self):
        if self.provider == self.Provider.GITHUB:
            return GithubApi(**self.parameters)
