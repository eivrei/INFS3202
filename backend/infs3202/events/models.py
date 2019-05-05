from django.db import models
from datetime import datetime

from infs3202.events.constants import EVENT_TYPE_CHOICES


class Event(models.Model):
    title = models.CharField(max_length=70)
    short_description = models.CharField(max_length=150)
    description = models.TextField()
    type = models.CharField(max_length=30, choices=EVENT_TYPE_CHOICES)
    location = models.CharField(max_length=70)
    start_time = models.DateTimeField()
    created_at = models.DateTimeField(default=datetime.now)
    image = models.ImageField(default="default.jpg", blank=True)
    max_number_of_tickets = models.IntegerField()
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.title + '-' + str(self.start_time)


class Ticket(models.Model):
    event = models.ForeignKey(Event, related_name='tickets', on_delete='CASCADE')
    created_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return str(self.id) + '-' + self.event.title
