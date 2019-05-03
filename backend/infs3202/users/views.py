from rest_framework import viewsets, permissions
from rest_framework.response import Response

from infs3202.users.models import User
from infs3202.users.serializers import UserCreateAndUpdateSerializer, UserGetSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        if self.action == 'retrieve':
            return User.objects.filter(username=self.request.user)
        elif self.action == 'list':
            return User.objects.all()
        return None

    def get_serializer_class(self):
        return UserCreateAndUpdateSerializer

    def retrieve(self, request, pk=None):
        if pk == 'current':
            serializer = UserGetSerializer(request.user)
            return Response(serializer.data)
        serializer = UserGetSerializer(User.objects.get(pk=pk))
        return Response(serializer.data)
