from pprint import pprint
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


from integrations.models import Repository


@csrf_exempt
def pull_request(request):
    data = {}
    if request.body:
        data = json.loads(request.body)

    repositories = Repository.objects.filter(repo_id=data["repo"]["full_name"])
    print(data)
    return JsonResponse(data)
