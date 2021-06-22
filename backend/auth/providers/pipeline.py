from django.contrib.auth import get_user_model
from django.contrib.auth import login as django_login
from django.http.response import HttpResponseRedirect

User = get_user_model()


def get_access_token(provider, request, api, **kwargs):
    access_token = provider.fetch_access_token(request.GET.get("code"))
    api.set_access_token(access_token)


def fetch_user(api, state, **kwargs):
    state.update({"user": api.get_user()})


def login(state, request, **kwargs):
    identity = state["identity"]
    django_login(request, identity.user)
    return HttpResponseRedirect("/")


def create_identity(api, state, provider, request, **kwargs):
    from identity.models import Identity

    uid = state["user"]["uid"]
    filters = {"provider": provider.SLUG, "uid": uid}
    parameters = {"access_token": api.access_token}
    parameters.update(state.get("extra_parameters", {}))
    defaults = {"parameters": parameters}
    identity, created = Identity.objects.update_or_create(defaults=defaults, **filters)

    is_authenticated = request.user.is_authenticated
    if is_authenticated:
        if created:
            # association
            identity.user = request.user
            identity.save()
        elif identity.user != request.user:
            # TODO better error handling
            raise Exception("")
    else:
        if created:
            user, user_created = User.objects.get_or_create(
                username=uid,
                email=state["user"]["email"],
                defaults={"name": state["user"]["name"]},
            )
            if user_created:
                identity.user = user
                identity.save()
                user.set_unusable_password()
    state["identity"] = identity
