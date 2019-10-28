from .viewsets import RootViewSet
from ..serializers import ColumnSerializer
from ..models import Column


class ColumnViewSet(RootViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

    def get_queryset(self):
        return self.queryset.filter(board=self.board)

    def perform_create(self, serializer):
        return serializer.save(board=self.board)
