import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


from integrations.models import Repository, Bot


@csrf_exempt
def pull_request(request):
    data = {}
    if request.body:
        data = json.loads(request.body)

    print(data)

    message = (
        f"{data['action']} {data['pull_request']['url']} by {data['sender']['login']}"
    )
    repositories = Repository.objects.filter(repo_id=data["repository"]["full_name"])
    # TODO Probably could do better than that!
    for repository in repositories:
        bots = Bot.objects.filter(workspaces__in=repository.workspaces.all())
        for bot in bots:
            for watcher in repository.watchers.all():
                bot.send(watcher.uid, message)
    return JsonResponse(data)
