from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Workspace(models.Model):
    name = models.CharField(max_length=80)
    slug = models.CharField(max_length=80)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Membership(models.Model):
    class Role:
        owner = "owner"

        @classmethod
        def as_choices(cls):
            return ((cls.owner, "Owner"),)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    board = models.ForeignKey("Board", on_delete=models.CASCADE)
    role = models.CharField(max_length=100, choices=Role.as_choices())
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Board(models.Model):
    name = models.CharField(max_length=255)
    key = models.CharField(max_length=12)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    organization = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, through=Membership)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)


class Column(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)


class Assignee(models.Model):
    class Role:
        owner = "owner"

        @classmethod
        def as_choices(cls):
            return ((cls.owner, "Owner"),)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey("Ticket", on_delete=models.CASCADE)
    role = models.CharField(max_length=100, choices=Role.as_choices())
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Ticket(models.Model):
    key = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True)
    column = models.ForeignKey(Column, on_delete=models.CASCADE)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    assignees = models.ManyToManyField(User, through=Assignee)
