from rest_framework.viewsets import ModelViewSet
from ..serializers import WorkspaceSerializer
from ..models import Workspace, WorkspaceMembership


class WorkspaceViewSet(ModelViewSet):
    queryset = Workspace.objects.all()
    lookup_field = "slug"
    serializer_class = WorkspaceSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.add_owner(self.request.user)
        return instance

    def get_queryset(self):
        return self.request.user.workspace_set.all()
