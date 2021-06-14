from urllib.parse import parse_qs
from django.views import View
from django.conf import settings

import requests
from requests_oauthlib import OAuth2Session


class AuthHelper(object):
    def __init__(self):
        self.state = {}

    def data(self, data):
        self.state.update(data)


class AuthView(object):
    def __init__(self):
        self.helper = AuthHelper()


class OAuth2Provider(AuthView):
    def get_authorize_url(self):
        return self.AUTHORIZE_URL

    def authorize(self, redirect_uri):
        self.session = OAuth2Session(
            self.CLIENT_ID, redirect_uri=redirect_uri, scope=self.SCOPE
        )
        authorization_url, state = self.session.authorization_url(
            self.get_authorize_url()
        )
        return authorization_url

    def get_access_token(self, code):
        data = {
            "client_id": self.CLIENT_ID,
            "client_secret": self.CLIENT_SECRET,
            "code": code,
        }
        response = requests.post(self.ACCESS_TOKEN_URL, data)
        payload = parse_qs(response.text)
        return payload


class AuthPipeline(object):
    pass


class FetchUser(AuthPipeline):
    def dispatch(self, request, access_token, **kwargs):
        response = requests.get("https://api.github.com/user")
        return response.json()


class CreateIdentity(AuthPipeline):
    def __init__(self, provider):
        self.provider = provider

    def dispatch(self, request, access_token, data, **kwargs):
        filters = {"provider": self.provider, "uid": data["login"]}
        defaults = {parameters: {"access_token": access_token}}
        identity = Identity.objects.get_or_create(defaults=defaults, **filters)
        self.helper.data({"identity": identity})


class GithubOAuth2Provider(OAuth2Provider):
    CLIENT_ID = settings.GITHUB_CLIENT_ID
    CLIENT_SECRET = settings.GITHUB_CLIENT_SECRET
    SCOPE = ["user", "user:email", "admin:repo_hook"]
    AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
    ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"

    def get_auth_pipeline(self):
        return [
            # OAuth2Login(authorize_url=self.AUTHORIZE_URL, client_id=self.CLIENT_ID, scope=self.SCOPE)
            FetchUser(),
            CreateIdentity(provider="github"),
        ]

    def execute_pipeline(self, request, access_token=None):
        for step in self.get_auth_pipeline():
            step.dispatch(request)
