from urllib.parse import parse_qs
import requests
from requests_oauthlib import OAuth2Session


class Pipeline(object):
    def __init__(self, provider, steps):
        self.state = {}
        self.kwargs = {
            "state": self.state,
            "api": provider.api,
            "provider": provider,
        }
        self.steps = steps

    def execute(self, request, **kwargs):
        self.kwargs["request"] = request
        self.kwargs.update(kwargs)
        for step in self.steps:
            response = step(**self.kwargs)
            if response:
                return response


class OAuth2Provider:
    def get_authorize_url(self):
        return self.AUTHORIZE_URL

    def authorize(self, request):
        redirect_uri = self.get_redirect_uri(request)
        print(redirect_uri)
        self.session = OAuth2Session(self.CLIENT_ID, redirect_uri=redirect_uri)
        scopes = self.get_scope()
        scope = None
        if "scope" in scopes:
            scope = scopes.pop("scope")
        self.session.scope = scope
        authorization_url, state = self.session.authorization_url(
            self.get_authorize_url(),
            **scopes,
        )
        return authorization_url

    def get_scope(self):
        return {"scope": " ".join(self.SCOPE)}

    def fetch_access_token(self, code):
        data = {
            "client_id": self.CLIENT_ID,
            "client_secret": self.CLIENT_SECRET,
            "code": code,
        }

        response = requests.post(self.ACCESS_TOKEN_URL, data)
        payload = response
        if response.headers.get("Content-Type", "").startswith("application/json"):
            payload = response.json()
        else:
            payload = parse_qs(response.text)
        return self.parse_access_token(payload)

    def parse_access_token(self, payload):
        return payload

    def get_redirect_uri(self, request):
        redirect_uri = request.build_absolute_uri(
            "/identity/callback/{}".format(self.SLUG)
        )
        return redirect_uri

    def get_pipeline(self):
        return Pipeline(self, self.PIPELINE)

    def execute_pipeline(self, request):
        pipeline = self.get_pipeline()
        return pipeline.execute(request=request)


class ProviderApi(object):
    def __init__(self, access_token=None):
        self.access_token = access_token

    def set_access_token(self, access_token):
        self.access_token = access_token

    def get_headers(self):
        return {}

    def get_url(self, path):
        return path

    def get_user(self, *args, **kwargs):
        raise NotImplementedError(
            "get_user must be implemented in order to be use in auth pipeline"
        )

    def request(self, method, path, **kwargs):
        url = self.get_url(path)
        headers = self.get_headers()
        headers |= kwargs.get("headers", {})
        try:
            response = requests.request(method, url, headers=headers, **kwargs)
            response.raise_for_status()
            if response.headers.get("Content-Type", "").startswith("application/json"):
                return response.json()
        except Exception as exception:
            print(exception)
            raise exception

    def post(self, *args, **kwargs):
        return self.request("post", *args, **kwargs)

    def get(self, *args, **kwargs):
        return self.request("get", *args, **kwargs)

    def put(self, *args, **kwargs):
        return self.request("put", *args, **kwargs)

    def patch(self, *args, **kwargs):
        return self.request("patch", *args, **kwargs)

    def delete(self, *args, **kwargs):
        return self.request("delete", *args, **kwargs)
