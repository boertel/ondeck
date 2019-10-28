from rest_framework.generics import RetrieveAPIView

from .generics import RootAPIView
from ..serializers import WorkspaceSerializer
from ..models import Workspace


class WorkspaceView(RootAPIView, RetrieveAPIView):
    lookup_field = "workspace_slug"
    serializer_class = WorkspaceSerializer

    def get_object(self):
        return self.workspace
