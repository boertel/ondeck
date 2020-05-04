from rest_framework import serializers

from .board import BoardSerializer
from ..models import Workspace


class WorkspaceSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    slug = serializers.CharField()
    boards = BoardSerializer(many=True, read_only=True)

    class Meta:
        model = Workspace
        fields = ("name", "slug", "created_at", "updated_at", "boards", "key")
