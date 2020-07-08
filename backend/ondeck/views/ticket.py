import reversion
from django.db.models import F
from reversion.models import Version
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from rest_framework.response import Response

from .viewsets import RootViewSet
from ..serializers import TicketSerializer, UserSerializer, CommentSerializer
from ..models import Ticket, Board, Comment


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
        return self.get_queryset().get(index=index)

    def get_queryset(self):
        if hasattr(self, "board"):
            return self.queryset.filter(board=self.board)
        return self.queryset

    def perform_update(self, serializer):
        with reversion.create_revision():
            data = self.request.data
            kwargs = {}
            if "column" in data:
                kwargs["column_id"] = data["column"]
            if "board" in data:
                kwargs["board_id"] = data["board"]
            if "position" in data:
                kwargs["position"] = data["position"]
            before = self.get_object()

            updates = []
            if kwargs.get("board_id") and before.board.pk != kwargs["board_id"]:
                # TODO limit that to valid board
                board = Board.objects.get(pk=kwargs["board_id"])
                first_column = board.columns.first()
                # TODO what happens when there is no column?!?!
                kwargs["column_id"] = first_column.pk
                kwargs["position"] = first_column.ticket_set.count()

            if kwargs.get("column_id") and before.column.pk != kwargs["column_id"]:
                # TODO what if I dont have a position?
                # update other tickets inside *new* column
                # (the ones after the inserted one move 1 up)
                filters = {
                    "position__gte": kwargs["position"],
                    "column": kwargs["column_id"],
                }
                if kwargs.get("board_id"):
                    filters["board"] = kwargs["board_id"]
                updates.append({"filters": filters, "increment": 1})
                # update other tickets inside *old* column
                # (the ones after the inserted one move 1 down)
                updates.append(
                    {
                        "filters": {
                            "column": before.column.pk,
                            "position__gte": before.position,
                        },
                        "increment": -1,
                    }
                )
            elif "position" in data and before.position != data["position"]:
                if data["position"] < before.position:
                    # the ticket moved down
                    # move up tickets between *old* and *new* position
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
                    # the ticket moved up
                    # move down tickets between *old* and *new* position
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
                        "column": kwargs.get("column_id", before.column.pk),
                        "board": data.get("board", before.board.pk),
                    }
                    filters.update(update["filters"])
                    Ticket.objects.filter(**filters).update(
                        position=F("position") + update["increment"]
                    )

            instance = serializer.save(**kwargs)
            reversion.set_user(self.request.user)

    def perform_create(self, serializer):
        with reversion.create_revision():
            kwargs = {}
            if hasattr(self, "board"):
                kwargs["board"] = self.board
            instance = serializer.save(**kwargs)
            instance.add_owner(self.request.user)
            reversion.set_user(self.request.user)

    @action(detail=True, methods=["get", "post"])
    def comments(self, request, **kwargs):
        if request.method == "GET":
            ticket = self.get_object()
            comments = Comment.objects.filter(ticket=ticket)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        else:
            ticket = self.get_object()
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(ticket=ticket, user=request.user)
                return Response(serializer.data)
            else:
                return Response(serializer.errors)

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
