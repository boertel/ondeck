from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver


# u = User.objects.create_user(username="ben", email="ben@comediadesign.com");
# w = Workspace.objects.create(name="On deck", slug="ondeck", owner=u);
# b = Board.objects.create(name="Parking Lot", slug="parking-lot", workspace=w)


class User(AbstractUser):
    pass


class Organization(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=120, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Workspace(models.Model):
    name = models.CharField(max_length=80)
    key = models.CharField(max_length=12)
    slug = models.SlugField(max_length=80, unique=True)
    last_index = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    # organization = models.ForeignKey(Organization, on_delete=models.CASCADE)


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
    slug = models.SlugField(max_length=80, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="boards"
    )
    members = models.ManyToManyField(User, through=Membership)


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
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self):
        return 'Column(id={}, name="{}")'.format(self.pk, self.name)


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
    index = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True)
    column = models.ForeignKey(Column, on_delete=models.CASCADE)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    assignees = models.ManyToManyField(User, through=Assignee)

    @property
    def key(self):
        return "{}-{}".format(self.board.workspace.key, self.index)


@receiver(pre_save, sender=Ticket)
def assign_last_key(sender, instance, **kwargs):
    instance.index = instance.board.workspace.last_index


@receiver(post_save, sender=Ticket)
def save_new_last_index(sender, instance, **kwargs):
    workspace = instance.board.workspace
    workspace.last_index = instance.index + 1
    workspace.save()


class Activity(models.Model):
    class Type:
        comment = "comment"
        link = "link"

        @classmethod
        def as_choices(cls):
            return ((cls.comment, "Comment"), (cls.link, "Link"))

    type = models.CharField(max_length=100, choices=Type.as_choices())
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
