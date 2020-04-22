from django.core.management.base import BaseCommand, CommandError

from ondeck.models import Workspace, Ticket
from search import search


class Command(BaseCommand):
    help = ""

    def add_arguments(self, parser):
        parser.add_argument("workspaces", nargs="*", type=str)

    def handle(self, *args, **options):
        workspace_slugs = options["workspaces"]
        workspaces = Workspace.objects.all()
        if workspace_slugs:
            workspaces = workspaces.filter(slug__in=workspace_slugs)
        for workspace in workspaces:
            boards = workspace.boards.all()
            tickets = Ticket.objects.filter(board__in=boards)

            documents = [ticket.to_search_document() for ticket in tickets]
            if len(documents) > 0:
                index = workspace.create_tickets_search_index(list(documents[0].keys()))
                index.add_documents(documents)
