import reversion
from django.db import transaction
from django.db.models import F
from reversion.models import Version
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from rest_framework.response import Response

from .viewsets import RootViewSet
from ..serializers import TicketSerializer, UserSerializer, ResourceSerializer
from ..models import Ticket, Board, Resource


class TicketViewSet(RootViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ["position", "index"]
    ordering = ["position"]

    def get_serializer_class(self):
        return self.serializer_class

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
            before = self.get_object()

            updates = []
            if "column" in data and before.column.pk != data["column"]:
                # TODO what if I dont have a position?
                updates.append(
                    {
                        "filters": {
                            "position__gte": data["position"],
                            "column": data["column"],
                        },
                        "increment": 1,
                    }
                )
                updates.append(
                    {
                        "filters": {
                            "column": before.column,
                            "position__gte": before.position,
                        },
                        "increment": -1,
                    }
                )
            elif "position" in data and before.position != data["position"]:
                if data["position"] < before.position:
                    updates.append(
                        {
                            "filters": {
                                "position__gte": data["position"],
                                "position__lt": before.position,
                            },
                            "increment": 1,
                        }
                    )
                else:
                    updates.append(
                        {
                            "filters": {
                                "position__lte": data["position"],
                                "position__gt": before.position,
                            },
                            "increment": -1,
                        }
                    )

            if len(updates) > 0:
                for update in updates:
                    filters = {
                        "column": data.get("column", before.column),
                        "board": data.get("board", before.board),
                    }
                    filters.update(update["filters"])
                    Ticket.objects.filter(**filters).update(
                        position=F("position") + update["increment"]
                    )

            instance = serializer.save(**kwargs)
            reversion.set_user(self.request.user)
            # TODO move to a queue
            transaction.on_commit(instance.create_resources)

    def perform_create(self, serializer):
        with reversion.create_revision():
            kwargs = {}
            if hasattr(self, "board"):
                kwargs["board"] = self.board
            instance = serializer.save(**kwargs)
            instance.add_owner(self.request.user)
            reversion.set_user(self.request.user)
            # TODO move to a queue
            transaction.on_commit(instance.create_resources)

    @action(detail=True, methods=["get"])
    def resources(self, request, **kwargs):
        ticket = self.get_object()
        resources = Resource.objects.filter(ticket=ticket)
        serializer = ResourceSerializer(resources, many=True)
        return Response(serializer.data)

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
            if previous:
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
        # TODO use a serializer
        return Response(output)
