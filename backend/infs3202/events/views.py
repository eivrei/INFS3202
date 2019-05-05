from rest_framework import viewsets

from .models import Event
from .serializers import EventListSerializer, EventCreateSerializer, EventDetailSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return EventCreateSerializer
        if self.action == 'retrieve':
            return EventDetailSerializer
        if self.action == 'list':
            return EventListSerializer
        return super().get_serializer_class()
