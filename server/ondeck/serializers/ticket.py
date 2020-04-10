from rest_framework import serializers

from ..models import Ticket, Board


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
            "pk",
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
            "position",
        )
