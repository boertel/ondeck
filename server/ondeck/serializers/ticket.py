from rest_framework import serializers

from ..models import Ticket, Board, User, TicketMembership
from .ticket_membership import TicketMembershipSerializer


class ParentTicketSerializer(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        workspace = self.context.get("view").workspace
        queryset = super().get_queryset()
        if not workspace or not queryset:
            return None
        queryset = queryset.filter(board__in=workspace.boards.all())
        # FIXME: here pk is `OD-122` instead of `id`. Which one makes more
        """
        pk = self.context.get("view").kwargs.get("pk")
        # sense?
        if pk:
            queryset = queryset.exclude(pk=pk)
        """
        return queryset


class BoardSerializer(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        workspace = self.context.get("view").workspace
        queryset = super().get_queryset()
        if not workspace or not queryset:
            return None
        queryset = queryset.filter(workspace=workspace)
        return queryset


class TicketSerializer(serializers.ModelSerializer):
    key = serializers.CharField(read_only=True)
    pk = serializers.CharField(read_only=True, source="key")
    board = BoardSerializer(allow_null=True, queryset=Board.objects, required=False)
    members = TicketMembershipSerializer(
        source="ticketmembership_set", many=True, read_only=True
    )
    parent = ParentTicketSerializer(
        allow_null=True, queryset=Ticket.objects, required=False
    )
    tags = serializers.PrimaryKeyRelatedField(
        many=True, allow_null=True, read_only=True
    )

    def update(self, instance, validated_data):
        # TODO deal with position here?
        # TODO do the same for create
        if "members" in self.initial_data:
            members = self.initial_data.get("members")
            user_ids = [member["id"] for member in members]
            users = User.objects.filter(pk__in=user_ids)
            # TODO handle other roles
            role = TicketMembership.Role.ASSIGNEE
            instance.members.set(users, through_defaults={"role": role})
        # from https://github.com/encode/django-rest-framework/blob/master/rest_framework/serializers.py#L974-L979
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = Ticket
        fields = (
            "id",
            "key",
            "pk",
            "title",
            "description",
            "column",
            "board",
            "tags",
            "parent",
            "members",
            "created_at",
            "updated_at",
            "members",
            "position",
        )
