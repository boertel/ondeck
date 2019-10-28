from rest_framework import serializers

from ..models import Tag


class TagSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    color = serializers.CharField()

    class Meta:
        model = Tag
        fields = ("name", "color", "created_at", "updated_at")
