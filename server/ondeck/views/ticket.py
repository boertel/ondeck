from .viewsets import RootViewSet
from ..serializers import TicketSerializer
from ..models import Ticket


class TicketViewSet(RootViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_queryset(self):
        return self.queryset.filter(board=self.board)

    def perform_create(self, serializer):
        instance = serializer.save(board=self.board)
        instance.add_owner(self.request.user)
