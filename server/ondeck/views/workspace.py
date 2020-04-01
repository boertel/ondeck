from rest_framework.viewsets import ModelViewSet
from ..serializers import WorkspaceSerializer
from ..models import Workspace, Membership


class WorkspaceViewSet(ModelViewSet):
    queryset = Workspace.objects.all()
    lookup_field = "workspace_slug"
    serializer_class = WorkspaceSerializer

    def get_queryset(self):
        memberships = Membership.objects.filter(user=self.request.user).select_related(
            "board"
        )
        workspace_ids = [membership.board.workspace_id for membership in memberships]
        return self.queryset.filter(pk__in=workspace_ids)

    def get_object(self):
        return self.workspace
