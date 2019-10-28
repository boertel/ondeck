from .viewsets import RootViewSet
from ..serializers import TagSerializer
from ..models import Tag


class TagViewSet(RootViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_queryset(self):
        return self.queryset.filter(board=self.board)

    def perform_create(self, serializer):
        return serializer.save(board=self.board)
