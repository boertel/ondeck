from ..base import ProviderApi


class GithubApi(ProviderApi):
    def get_url(self, path):
        if not path.startswith("/"):
            raise Exception("path argument must start with a /")
        return f"https://api.github.com{path}"

    def get_headers(self):
        return {
            "Authorization": f"token {self.access_token}",
            "Accept": "application/vnd.github.v3+json",
        }

    def get_user(self):
        user = self.get("/user")
        emails = self.get("/user/emails")
        user["email"] = emails[0]["email"]
        user["uid"] = user["login"]
        return user
