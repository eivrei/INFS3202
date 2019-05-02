from rest_framework import routers

from infs3202.users.views import UserViewSet
from infs3202.events.views import EventViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='users')
router.register(r'events', EventViewSet, base_name='events')
