from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    WorkspaceViewSet,
    BoardViewSet,
    TicketViewSet,
    ColumnViewSet,
    TagViewSet,
    UserViewSet,
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(
    r"workspaces/(?P<workspace_slug>[\w-]+)/boards/(?P<board_slug>[\w-]+)/tickets",
    TicketViewSet,
)
router.register(
    r"workspaces/(?P<workspace_slug>[\w-]+)/boards/(?P<board_slug>[\w-]+)/columns",
    ColumnViewSet,
)
router.register(
    r"workspaces/(?P<workspace_slug>[\w-]+)/boards/(?P<board_slug>[\w-]+)/tags",
    TagViewSet,
)
router.register(r"workspaces/(?P<workspace_slug>[\w-]+)/boards", BoardViewSet)
router.register(r"workspaces/(?P<workspace_slug>[\w-]+)/tickets", TicketViewSet)
router.register(r"workspaces", WorkspaceViewSet)

router.register(r"users", UserViewSet)

urlpatterns = []

# The API URLs are now determined automatically by the router.
urlpatterns += [path("", include(router.urls))]
