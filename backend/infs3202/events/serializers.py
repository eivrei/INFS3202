from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from .models import Event


class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'id',
            'title',
            'short_description',
            'start_time',
            'image',
        )


class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'id',
            'title',
            'description',
            'type',
            'location',
            'start_time',
            'created_at',
            'image',
            'max_number_of_tickets',
            'visible'
        )


class EventCreateSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)

    class Meta:
        model = Event
        fields = (
            'id',
            'title',
            'short_description',
            'description',
            'type',
            'location',
            'start_time',
            'image',
            'max_number_of_tickets',
            'visible'
        )