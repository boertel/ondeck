import reversion
from reversion.models import Version
from deepdiff import DeepDiff
from rest_framework.decorators import action
from rest_framework.response import Response

from .viewsets import RootViewSet
from ..serializers import TicketSerializer, UserSerializer
from ..models import Ticket, Board


class TicketViewSet(RootViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_serializer_class(self):
        return self.serializer_class

    # TODO if we want to use <KEY>-<INDEX> as Ticket identifier
    def get_object(self):
        pk = self.kwargs.get("pk")
        index = pk.split("-")[1]
        return self.queryset.get(index=index)

    def get_queryset(self):
        if hasattr(self, "board"):
            return self.queryset.filter(board=self.board)
        return self.queryset

    def perform_update(self, serializer):
        with reversion.create_revision():
            kwargs = {}
            data = self.request.data
            if "board" in data:
                # TODO limit that to valid board
                board = Board.objects.get(pk=data["board"])
                first_column = board.columns.first()
                kwargs["column_id"] = first_column.id
            serializer.save(**kwargs)
            reversion.set_user(self.request.user)

    def perform_create(self, serializer):
        with reversion.create_revision():
            kwargs = {}
            if hasattr(self, "board"):
                kwargs["board"] = self.board
            instance = serializer.save(**kwargs)
            instance.add_owner(self.request.user)
            reversion.set_user(self.request.user)

    @action(detail=True, methods=["get"])
    def versions(self, request, **kwargs):
        ticket = self.get_object()
        versions = Version.objects.get_for_object(ticket)
        previous = None
        index = 0
        output = []
        # TODO abstract that somewhere we could improve and test easily
        for version in versions:
            changes = {}
            current = version.field_dict
            if previous and version != versions[versions.count() - 1]:
                for k, v in current.items():
                    if k not in [
                        "updated_at",
                        "created_at",
                    ] and v != previous.field_dict.get(k):
                        changes.update(
                            {k: {"old": v, "new": previous.field_dict.get(k)}}
                        )
            if changes:
                output.append(
                    {
                        "id": version.id,
                        "at": version.revision.date_created,
                        "by": UserSerializer(version.revision.user).data,
                        "changes": changes,
                    }
                )
            previous = version
            index += 1
        return Response(output)
