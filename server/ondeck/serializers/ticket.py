from rest_framework import serializers

from ..models import Ticket


class ParentTicketSerializer(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        workspace = self.context.get("view").workspace
        queryset = super().get_queryset()
        if not workspace or not queryset:
            return None
        queryset = queryset.filter(board__in=workspace.boards.all())
        pk = self.context.get("view").kwargs.get("pk")
        if pk:
            queryset = queryset.exclude(pk=pk)
        return queryset


class TicketSerializer(serializers.ModelSerializer):
    key = serializers.CharField(read_only=True)
    board = serializers.PrimaryKeyRelatedField(read_only=True)
    parent = ParentTicketSerializer(
        allow_null=True, queryset=Ticket.objects, required=False
    )
    tags = serializers.PrimaryKeyRelatedField(
        many=True, allow_null=True, read_only=True
    )

    class Meta:
        model = Ticket
        fields = (
            "id",
            "key",
            "title",
            "description",
            "column",
            "board",
            "tags",
            "parent",
            "assignees",
            "created_at",
            "updated_at",
            "assignees",
        )
