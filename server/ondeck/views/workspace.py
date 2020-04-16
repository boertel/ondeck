from rest_framework.viewsets import ModelViewSet
from ..serializers import WorkspaceSerializer
from ..models import Workspace, WorkspaceMembership


class WorkspaceViewSet(ModelViewSet):
    queryset = Workspace.objects.all()
    lookup_field = "slug"
    serializer_class = WorkspaceSerializer

    def get_queryset(self):
        return self.request.user.workspace_set.all()
