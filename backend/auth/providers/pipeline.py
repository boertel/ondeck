from django.contrib.auth import get_user_model

User = get_user_model()


def get_access_token(provider, request, api, **kwargs):
    payload = provider.get_access_token(request.GET.get("code"))
    print(payload)
    access_token = payload["access_token"]
    if type(access_token) == list:
        access_token = payload["access_token"][0]
    api.set_access_token(access_token)


def fetch_user(api, state, **kwargs):
    state.update({"user": api.get_user()})


def create_identity(api, state, provider, request, **kwargs):
    from identity.models import Identity

    uid = state["user"]["uid"]
    filters = {"provider": provider.SLUG, "uid": uid}
    defaults = {"parameters": {"access_token": api.access_token}}
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
    return identity
