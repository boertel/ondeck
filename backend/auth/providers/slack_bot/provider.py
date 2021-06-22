from django.conf import settings
from django.http import HttpResponseRedirect

from ..base import OAuth2Provider
from ..pipeline import get_access_token
from ..slack.api import SlackApi


def create_bot(provider, request, state, **kwargs):
    from integrations.models import Bot
    payload = state['payload']
    filters = {
            "bot_id": payload["bot_user_id"],
            "provider": provider.SLUG,
            "owner_id": request.user.id,
    }
    defaults = {
            "parameters": {
                "app_id": payload["app_id"],
                "team": payload["team"]["id"],
                "access_token": payload["access_token"]
                }
    }
    bot, _ = Bot.objects.update_or_create(defaults=defaults, **filters)
    return HttpResponseRedirect('/?bot=true')


class SlackBotOAuth2Provider(OAuth2Provider):
    SLUG = "slack"
    CLIENT_ID = settings.SLACK_CLIENT_ID
    CLIENT_SECRET = settings.SLACK_CLIENT_SECRET
    SCOPE = ["chat:write"]
    AUTHORIZE_URL = "https://slack.com/oauth/v2/authorize"
    ACCESS_TOKEN_URL = "https://slack.com/api/oauth.v2.access"

    PIPELINE = [
        create_bot,
    ]

    api = SlackApi()

    def get_redirect_uri(self, request):
        redirect_uri = request.build_absolute_uri(
            f"/identity/callback/{self.SLUG}"
        )
        return redirect_uri

    def parse_access_token(self, payload):
        return payload['access_token']
