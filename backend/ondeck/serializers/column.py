from rest_framework import serializers

from ..models import Column


class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ("id", "name", "created_at", "updated_at")
