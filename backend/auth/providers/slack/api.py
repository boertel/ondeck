from ..base import ProviderApi


class SlackApi(ProviderApi):
    def get_url(self, path):
        return f"https://slack.com/api/{path}"

    def get_headers(self):
        return {
            "Authorization": f"Bearer {self.access_token}",
        }

    def get_user(self):
        user = self.get("users.identity")
        print(user)
        user["uid"] = user["user"]["id"]
        return user
