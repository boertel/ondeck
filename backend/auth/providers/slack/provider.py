from django.conf import settings

from ..base import OAuth2Provider
from ..pipeline import fetch_user, create_identity, login
from .api import SlackApi

from ..slack_bot.provider import SlackBotOAuth2Provider


def define_extra_parameters(state, **kwargs):
    state["extra_parameters"] = {"team_id": state["user"]["team"]["id"]}


class SlackOAuth2Provider(OAuth2Provider):
    SLUG = "slack"
    CLIENT_ID = settings.SLACK_CLIENT_ID
    CLIENT_SECRET = settings.SLACK_CLIENT_SECRET
    SCOPE = ["identity.basic", "identity.email"]
    AUTHORIZE_URL = "https://slack.com/oauth/v2/authorize"
    ACCESS_TOKEN_URL = "https://slack.com/api/oauth.v2.access"

    PIPELINE = [
        fetch_user,
        define_extra_parameters,
        create_identity,
        login,
    ]

    def get_scope(self):
        return {"user_scope": " ".join(self.SCOPE)}

    def execute_pipeline(self, request):
        # slack oauth can be use for user or bot
        payload = self.fetch_access_token(request.GET.get("code"))
        print(payload)
        pipeline = self.get_pipeline()
        access_token = payload.get("access_token")
        if payload.get("token_type") != "bot":
            access_token = payload["authed_user"]["access_token"]
        pipeline.kwargs["api"].set_access_token(access_token)
        if payload.get("token_type") == "bot":
            pipeline = SlackBotOAuth2Provider().get_pipeline()
            pipeline.state["payload"] = payload
        return pipeline.execute(request=request)

    api = SlackApi()
