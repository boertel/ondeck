from rest_framework.viewsets import ModelViewSet

from .generics import RootAPIView


class RootViewSet(ModelViewSet, RootAPIView):
    pass
