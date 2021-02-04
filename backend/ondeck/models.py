import re
import requests

from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

import django_meilisearch as search

import tsvector_field
import reversion


# u = User.objects.create_user(username="ben", email="ben@comediadesign.com");
# w = Workspace.objects.create(name="On deck", slug="ondeck", owner=u);
# b = Board.objects.create(name="Parking Lot", slug="parking-lot", workspace=w)


def search_workspace_uid(workspace):
    return "workspace-{}".format(workspace.pk)


class User(AbstractUser):
    name = models.CharField(max_length=250)


class Organization(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=120, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class WorkspaceMembership(models.Model):
    class Role:
        OWNER = "owner"

        @classmethod
        def as_choices(cls):
            return ((cls.OWNER, "Owner"),)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    workspace = models.ForeignKey("Workspace", on_delete=models.CASCADE)
    role = models.CharField(max_length=100, choices=Role.as_choices())
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Workspace(models.Model):
    name = models.CharField(max_length=80)
    key = models.CharField(max_length=12)
    slug = models.SlugField(max_length=80, unique=True)
    last_index = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    members = models.ManyToManyField(User, through=WorkspaceMembership)
    search = tsvector_field.SearchVectorField([
        tsvector_field.WeightedColumn("name", "A"),
        tsvector_field.WeightedColumn("slug", "B"),
        tsvector_field.WeightedColumn("key", "C"),
    ], "english")
    # organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    # TODO protected slug (actions)

    def __str__(self):
        return "{} ({})".format(self.slug, self.pk)

    def add_owner(self, user):
        owner = WorkspaceMembership.objects.create(
            user=user, workspace=self, role=WorkspaceMembership.Role.OWNER
        )
        return owner


class Board(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=80, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="boards"
    )
    position = models.PositiveIntegerField(null=True)
    search = tsvector_field.SearchVectorField([
        tsvector_field.WeightedColumn("name", "A"),
        tsvector_field.WeightedColumn("slug", "B"),
    ], "english")

    def __str__(self):
        return "{} ({})".format(self.slug, self.pk)

    class Meta:
        unique_together = [["slug", "workspace"]]
        ordering = ("position",)

    def save(self, *args, **kwargs):
        # TODO what to do when renaming an board?
        if self.slug == "":
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self):
        return 'Tag(id={}, name="{}")'.format(self.pk, self.name)


class Column(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="columns")

    def __str__(self):
        return 'Column(id={}, name="{}")'.format(self.pk, self.name)


class TicketMembership(models.Model):
    class Role:
        OWNER = "owner"
        ASSIGNEE = "assignee"

        @classmethod
        def as_choices(cls):
            return ((cls.OWNER, "Owner"), (cls.ASSIGNEE, "Assignee"))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey("Ticket", on_delete=models.CASCADE)
    role = models.CharField(max_length=100, choices=Role.as_choices(), null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


@reversion.register(exclude=["position"])
class Ticket(models.Model):
    index = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True)
    column = models.ForeignKey(Column, on_delete=models.SET_NULL, null=True)
    board = models.ForeignKey(Board, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag)
    members = models.ManyToManyField(User, through=TicketMembership)
    position = models.IntegerField(null=True)
    search = tsvector_field.SearchVectorField([
        tsvector_field.WeightedColumn("title", "A"),
        tsvector_field.WeightedColumn("description", "B"),
    ], "english")

    def add_owner(self, user):
        owner = TicketMembership.objects.create(
            user=user, ticket=self, role=TicketMembership.Role.OWNER
        )
        return owner

    @property
    def key(self):
        return "{}-{}".format(self.board.workspace.key, self.index)


"""
search.register(
    Board,
    ("name", "slug",),
    uid: lambda instance: search_worksace_uid(instance.workspace)
)
"""
search.register(
    Ticket,
    ("title", "description", "key", "board__slug", "pk"),
    distinct="key",
    uid=lambda instance: search_workspace_uid(instance.board.workspace),
)


@receiver(pre_save, sender=Ticket)
def assign_last_key(sender, instance, **kwargs):
    if instance.pk is None:
        instance.index = instance.board.workspace.last_index
        instance.position = instance.column.ticket_set.count()


@receiver(post_save, sender=Ticket)
def save_new_last_index(sender, instance, created, **kwargs):
    # TODO handle if the index doesn't exist
    workspace = instance.board.workspace
    if created:
        workspace.last_index = instance.index + 1
        workspace.save()


class Comment(models.Model):
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
