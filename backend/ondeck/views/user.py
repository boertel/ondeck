from .viewsets import RootViewSet
from ..serializers import UserSerializer
from ..models import User


class UserViewSet(RootViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.workspace.members.all()
