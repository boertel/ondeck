from django.contrib.postgres.fields import JSONField
from django.db import models


class Identity(models.Model):
    provider = models.CharField(max_length=20)
    parameters = JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey("User", on_delete=models.CASCADE)
