from .viewsets import RootViewSet
from ..serializers import CommentSerializer
from ..models import Comment


class CommentViewSet(RootViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
