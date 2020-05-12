from rest_framework import serializers

from ..models import TicketMembership

# https://stackoverflow.com/questions/17256724/include-intermediary-through-model-in-responses-in-django-rest-framework
# https://codereview.stackexchange.com/questions/164616/django-rest-framework-manytomany-relationship-through-intermediate-model


class TicketMembershipSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source="user.id")
    role = serializers.CharField()

    class Meta:
        model = TicketMembership
        fields = ("id", "role")
