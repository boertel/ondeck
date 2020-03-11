from .viewsets import RootViewSet
from ..serializers import BoardSerializer
from ..models import Board


class BoardViewSet(RootViewSet):
    lookup_field = "slug"
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def perform_update(self, serializer):
        serializer.save(workspace=self.workspace)

    def perform_create(self, serializer):
        instance = serializer.save(workspace=self.workspace)
        instance.add_owner(self.request.user)

    def get_queryset(self):
        return self.queryset.filter(workspace=self.workspace).order_by("position")
