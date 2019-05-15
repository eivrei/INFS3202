import json
from datetime import datetime, timedelta
from pytz import timezone

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from infs3202.users.models import User
from infs3202.users.serializers import UserCreateAndUpdateSerializer, UserGetSerializer
from infs3202.password_reset.models import PasswordReset

from infs3202.utils.email import send_password_reset_request


class UserViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        if self.action == 'retrieve':
            return User.objects.filter(username=self.request.user)
        elif self.action == 'list':
            return User.objects.all()
        return None

    def get_permissions(self):
        permission_classes = []
        if self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated]
        if self.action == 'list':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        return UserCreateAndUpdateSerializer

    def retrieve(self, request, pk=None):
        if pk == 'current':
            serializer = UserGetSerializer(request.user)
            return Response(serializer.data)
        serializer = UserGetSerializer(User.objects.get(pk=pk))
        return Response(serializer.data)

    def update(self, request, pk=None, partial=True):
        user = User.objects.filter(username=request.user)[0]

        if user.id != int(pk) or request.user != user:
            return Response({'error': 'Cannot change information of other users'}, status=403)

        key_set = request.data.keys()
        if 'email' not in key_set:
            return Response({'error': 'New email must be provided.'}, status=400)

        new_email = request.data['email']

        user.username = new_email
        user.email = new_email
        user.save()
        serializer = UserCreateAndUpdateSerializer(user)
        return Response(serializer.data)

    @action(detail=False)
    def verify_email(self, request):
        key = request.GET.get('key', None)
        # Account for the extra "/" appended on get-requests frontend.
        pk = request.GET.get('email', None).split('/')[0]
        usr = User.objects.get(email=pk)

        if usr.email_verification_key == key:
            usr.email_is_validated = True
            usr.save()
            return Response(data={'message': 'Email verified!'})
        else:
            return Response(status=400, data={'message': 'Invalid Key'})

    @action(detail=False, methods=['POST'])
    def request_reset_password(self, request, pk=None):
        values = json.loads(request.body)
        origin = request.META.get('HTTP_REFERER')
        if 'username' not in values.keys():
            return Response({'username': 'is required'}, status=400)

        username = values['username']
        user = User.objects.filter(username=username).first()

        if not user:
            return Response({'username': 'does not exist'}, status=400)

        send_password_reset_request(user, origin)
        return Response(status=201)

    @action(detail=False, methods=['POST'])
    def perform_password_reset(self, request, pk=None):
        values = json.loads(request.body)
        if 'uuid' not in values.keys() or 'password' not in values.keys():
            return Response({'uuid': 'is required', 'password': 'is required'}, 400)

        now = datetime.now().replace(tzinfo=timezone('Australia/Brisbane'))
        reset_request = PasswordReset.objects.filter(uuid=values['uuid']).first()

        if not reset_request:
            return Response(status=404)

        delta = now - reset_request.timestamp

        max_age = timedelta(hours=12)

        if delta > max_age:
            return Response(status=410)

        user = reset_request.user

        password = values['password']

        User.validate_password(password)
        user.set_password(password)

        user.save()

        return Response()
