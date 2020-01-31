from rest_framework import serializers

from ..models import Ticket
from .column import ColumnSerializer


class TicketSerializer(serializers.ModelSerializer):
    key = serializers.CharField(read_only=True)
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
            "tags",
            "assignees",
            "created_at",
            "updated_at",
        )
