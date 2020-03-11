from rest_framework import serializers

from ..models import Board


class BoardSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Board
        fields = ("id", "name", "slug", "position", "created_at", "updated_at")
