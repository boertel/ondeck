from rest_framework import serializers

from ..models import Resource


class ResourceSerializer(serializers.ModelSerializer):
    type = serializers.CharField()
    value = serializers.CharField()

    class Meta:
        model = Resource
        fields = ("type", "value", "created_at", "updated_at")
