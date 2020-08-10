from django.contrib.postgres.search import SearchVector
from django.http import JsonResponse

from ondeck.models import Workspace, Board, Ticket, WorkspaceMembership

from psycopg2.extensions import adapt
from django.contrib.postgres.search import SearchQuery


class PrefixedPhraseQuery(SearchQuery):
    """
    Alter the tsquery executed by SearchQuery
    """

    def as_sql(self, compiler, connection):
        # Or <-> available in Postgres 9.6
        value = adapt("%s:*" % " & ".join(self.value.split()))

        if self.config:
            config_sql, config_params = compiler.compile(self.config)
            template = "to_tsquery({}::regconfig, {})".format(config_sql, value)
            params = config_params

        else:
            template = "to_tsquery({})".format(value)
            params = []

        if self.invert:
            template = "!!({})".format(template)

        return template, params


def query(request):
    # TODO Unauthorized for unauthenticated user
    user = request.user

    q = request.GET.get("q")

    context = {
        "workspace": request.GET.get("workspace"),
        "board": request.GET.get("board"),
    }

    # TODO filter only for current user
    user_workspaces = user.workspace_set.all()
    user_boards = Board.objects.filter(workspace__in=user_workspaces)
    user_tickets = Ticket.objects.none()

    if q:
        ws_query = PrefixedPhraseQuery(q, config="simple")
        workspaces = user_workspaces.annotate(
            vector=SearchVector("name", "key", "slug", config="simple")
        ).filter(vector=ws_query)

        board_query = PrefixedPhraseQuery(q, config="simple")
        boards = user_boards.annotate(
            vector=SearchVector("name", "slug", config="simple")
        ).filter(vector=board_query)

        ticket_query = PrefixedPhraseQuery(q, config="simple")
        tickets = Ticket.objects.annotate(
            vector=SearchVector("title", "description", config="simple")
        ).filter(vector=ticket_query, board__in=user_boards)
    else:
        workspaces = user_workspaces
        boards = user_boards
        tickets = user_tickets

    output = []
    for workspace in workspaces:
        rank = 0.0
        output.append(
            {
                "rank": rank,
                "name": workspace.name,
                "subtitle": "workspace",
                "to": "/workspaces/{}".format(workspace.slug),
            }
        )

    for board in boards:
        rank = 0.0
        workspace = board.workspace
        if context["workspace"] and context["workspace"] == workspace.slug:
            rank = 1.0
        output.append(
            {
                "rank": rank,
                "name": board.name,
                "subtitle": "board",
                "to": "/workspaces/{}/{}".format(workspace.slug, board.slug),
            }
        )

    for ticket in tickets:
        board = ticket.board
        workspace = board.workspace
        key = "{}-{}".format(workspace.key, ticket.index)
        rank = 0.1
        if context["workspace"] and context["workspace"] == workspace.slug:
            rank += 0.3
        if context["board"] and context["board"] == board.slug:
            rank += 0.5
        output.append(
            {
                "rank": rank,
                "name": ticket.title,
                "subtitle": "ticket",
                "to": "/workspaces/{}/{}/{}".format(
                    board.workspace.slug, board.slug, key
                ),
            }
        )

        output.sort(key=lambda item: item["rank"])

    return JsonResponse({"results": output})
