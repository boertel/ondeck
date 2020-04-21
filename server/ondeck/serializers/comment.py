from rest_framework import serializers

from ..models import Comment
from .user import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    message = serializers.CharField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("id", "message", "user", "created_at", "updated_at")
