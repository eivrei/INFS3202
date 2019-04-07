from rest_framework import routers

from infs3202.users.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='users')
