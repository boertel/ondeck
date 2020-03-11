from .viewsets import RootViewSet
from ..serializers import TicketSerializer
from ..models import Ticket, Board


class TicketViewSet(RootViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_serializer_class(self):
        return self.serializer_class

    def get_queryset(self):
        if hasattr(self, "board"):
            return self.queryset.filter(board=self.board)
        return self.queryset

    def perform_update(self, serializer):
        kwargs = {}
        data = self.request.data
        if "board" in data:
            # TODO limit that to valid board
            board = Board.objects.get(pk=data["board"])
            first_column = board.columns.first()
            kwargs["column_id"] = first_column.id
        serializer.save(**kwargs)

    def perform_create(self, serializer):
        kwargs = {}
        if hasattr(self, "board"):
            kwargs["board"] = self.board
        instance = serializer.save(**kwargs)
        instance.add_owner(self.request.user)
