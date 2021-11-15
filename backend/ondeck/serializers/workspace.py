from django.template.defaultfilters import slugify
from rest_framework import serializers

from .board import BoardSerializer
from ..models import Workspace


class WorkspaceSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    slug = serializers.CharField(allow_blank=True, required=False)
    key = serializers.CharField(allow_blank=True, required=False)
    boards = BoardSerializer(many=True, read_only=True)

    def create(self, validated_data):
        name = validated_data["name"]
        slug = validated_data.get("slug", slugify(name))
        key = validated_data.get("key", name[0:2].upper())
        workspace = Workspace.objects.create(name=name, slug=slug, key=key)
        return workspace

    class Meta:
        model = Workspace
        fields = ("name", "slug", "created_at", "updated_at", "boards", "key")
