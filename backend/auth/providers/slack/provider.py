from django.conf import settings

from ..base import OAuth2Provider
from ..pipeline import get_access_token, fetch_user, create_identity
from .api import SlackApi



class SlackOAuth2Provider(OAuth2Provider):
    SLUG = "slack"
    CLIENT_ID = settings.SLACK_CLIENT_ID
    CLIENT_SECRET = settings.SLACK_CLIENT_SECRET
    SCOPE = ["identity.basic", "identity.email"]
    AUTHORIZE_URL = "https://slack.com/oauth/authorize"
    ACCESS_TOKEN_URL = "https://slack.com/api/oauth.access"

    PIPELINE = [
        get_access_token,
        fetch_user,
        create_identity,
    ]

    api = SlackApi()
