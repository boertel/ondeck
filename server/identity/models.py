from django.db import models
from django.contrib.postgres.fields import JSONField

from ondeck.models import User


class Identity(models.Model):
    class Provider:
        GITHUB = "github"

        @classmethod
        def as_choices(cls):
            return ((cls.GITHUB, "Github"),)

    uid = models.CharField(max_length=255)
    provider = models.CharField(max_length=40, choices=Provider.as_choices())
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    parameters = JSONField()
