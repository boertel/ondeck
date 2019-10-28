from rest_framework import serializers

from ..models import Board


class BoardSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Board
        fields = ("name", "slug", "key", "created_at", "updated_at")
