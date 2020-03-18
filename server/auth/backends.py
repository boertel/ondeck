from django.contrib.auth.backends import BaseBackend

from ondeck.models import User


class IdentityBackend(BaseBackend):
    def authenticate(self, *args, **kwargs):
        return None

    def get_user(self, *args, **kwargs):
        try:
            return User.objects.get(user=kwargs.get('user_id')
        except:
            return None

