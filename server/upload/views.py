import boto
import mimetypes
from uuid import uuid4

from django.conf import settings
from django.http import JsonResponse


s3 = boto.connect_s3(settings.AWS_ACCESS_KEY_ID, settings.AWS_SECRET_ACCESS_KEY)


def sign_s3_upload(request):
    filename = request.GET["filename"]
    extension = filename.split(".")[-1]
    content_type = request.GET.get("filetype", mimetypes.guess_type(filename)[0])
    folder = request.GET.get("path")

    key = "{}.{}".format(uuid4(), extension).lower()

    src = "{}/{}/{}".format(settings.AWS_S3_ENDPOINT_URL, folder, key)

    signed_url = s3.generate_url(
        300,
        "PUT",
        settings.AWS_STORAGE_BUCKET_NAME,
        "{}/{}".format(folder, key),
        headers={"Content-Type": content_type, "x-amz-acl": "public-read"},
    )

    return JsonResponse(
        {"signedUrl": signed_url, "src": src, "contentType": content_type}
    )
