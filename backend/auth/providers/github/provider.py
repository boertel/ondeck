from django.conf import settings

from ..base import OAuth2Provider
from .api import GithubApi
from ..pipeline import get_access_token, fetch_user, create_identity, login


class GithubOAuth2Provider(OAuth2Provider):
    SLUG = "github"
    CLIENT_ID = settings.GITHUB_CLIENT_ID
    CLIENT_SECRET = settings.GITHUB_CLIENT_SECRET
    SCOPE = ["user", "user:email", "admin:repo_hook"]
    AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
    ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"

    PIPELINE = [
        get_access_token,
        fetch_user,
        create_identity,
        login,
    ]

    def parse_access_token(self, payload):
        return payload["access_token"][0]

    api = GithubApi()
