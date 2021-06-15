from identity.models import Identity

from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField

from config.base import BaseModel
from ondeck.models import Workspace
from identity.models import Identity

from auth.providers.slack.api import SlackApi

User = get_user_model()


class Bot(BaseModel):
    class Provider:
        SLACK = "slack"

        @classmethod
        def as_choices(cls):
            return ((cls.SLACK, "Slack"),)

    provider = models.CharField(
        max_length=255, choices=Provider.as_choices(), null=True
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    bot_id = models.CharField(max_length=255)
    parameters = JSONField()
    workspaces = models.ManyToManyField(Workspace)

    @property
    def api(self):
        if hasattr(self, "_api") is False:
            self._api = SlackApi(access_token=self.parameters["access_token"])
        return self._api

    def send(self, to, message):
        data = {
            "channel": to,
            "text": message,
        }
        return self.api.post("chat.postMessage", json=data)


class Repository(BaseModel):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    repo_id = models.CharField(max_length=255)
    workspaces = models.ManyToManyField(Workspace)
    watchers = models.ManyToManyField(Identity)

    class Meta:
        unique_together = ("owner", "repo_id")

    @property
    def api(self):
        if hasattr(self, "_api") is False:
            identity = Identity.objects.get(
                user=self.owner, provider=Identity.Provider.GITHUB
            )
            self._api = identity.get_api()
        return self._api

    def create_webhook(self, url, events):
        data = {
            "name": "web",
            "config": {
                "url": url,
                "content_type": "json",
                "secret": settings.WEBHOOK_SECRET,
            },
            "events": events,
        }
        response = self.api.post(f"/repos/{self.repo_id}/hooks", json=data)
        return response

    def delete_webhook(self, webhook_id):
        response = self.api.delete(f"/repos/{self.repo_id}/hooks/{webhook_id}")
        return response

    def test_webhook(self, webhook_id):
        response = self.api.post(f"/repos/{self.repo_id}/hooks/{webhook_id}/tests")
        return response

    def get_webhook(self, webhook_id=None):
        path = f"/repos/{self.repo_id}/hooks"
        if webhook_id is not None:
            path += f"/{webhook_id}"
        response = self.api.get(path)
        return response

    def __str__(self):
        return f"Repository object ({self.id}) ({self.repo_id})"
