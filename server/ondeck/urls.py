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
    CommentViewSet,
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
router.register(r"workspaces/(?P<workspace_slug>[\w-]+)/users", UserViewSet)
router.register(r"workspaces/(?P<workspace_slug>[\w-]+)/comments", CommentViewSet)
router.register(r"workspaces", WorkspaceViewSet)

# TODO update that to support only one user? more global user API
# router.register(r"users", UserViewSet)

urlpatterns = []

# The API URLs are now determined automatically by the router.
urlpatterns += [path("", include(router.urls))]
