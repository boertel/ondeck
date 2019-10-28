from rest_framework.generics import RetrieveAPIView, UpdateAPIView

from .generics import RootAPIView
from ..serializers import BoardSerializer
from ..models import Board


class BoardView(RootAPIView, RetrieveAPIView, UpdateAPIView):
    lookup_field = "board_slug"
    serializer_class = BoardSerializer

    def get_object(self):
        return self.board
