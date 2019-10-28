from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import WorkspaceView, BoardView, TicketViewSet, ColumnViewSet, TagViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(
    r"(?P<workspace_slug>[\w-]+)/(?P<board_slug>[\w-]+)/tickets", TicketViewSet
)
router.register(
    r"(?P<workspace_slug>[\w-]+)/(?P<board_slug>[\w-]+)/columns", ColumnViewSet
)
router.register(r"(?P<workspace_slug>[\w-]+)/(?P<board_slug>[\w-]+)/tags", TagViewSet)

urlpatterns = [
    path("<slug:workspace_slug>/", WorkspaceView.as_view()),
    path("<slug:workspace_slug>/<slug:board_slug>/", BoardView.as_view()),
]

# The API URLs are now determined automatically by the router.
urlpatterns += [path("", include(router.urls))]
