from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
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
            'created_at'
            'image',
            'max_number_of_tickets',
            'visible'
        )


class EventCreateSerializer(serializers.ModelSerializer):
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