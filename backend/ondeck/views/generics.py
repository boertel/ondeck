from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView
from ..models import Workspace, Board


class RootAPIView(GenericAPIView):
    def initial(self, request, *args, **kwargs):
        workspace_slug = self.kwargs["workspace_slug"]
        workspace = get_object_or_404(Workspace, slug=workspace_slug)
        self.workspace_slug = workspace_slug
        self.workspace = workspace

        board_slug = self.kwargs.get("board_slug")
        if board_slug:
            board = get_object_or_404(Board, slug=board_slug, workspace=workspace)
            self.board_slug = board_slug
            self.board = board
        return super().initial(request, *args, **kwargs)
