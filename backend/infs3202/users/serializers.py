from rest_framework import serializers

from infs3202.users.models import User


class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name',
        )


class UserCreateAndUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'password',
        )

    def create(self, validated_data):
        password = validated_data['password']

        User.validate_password(password)

        email = validated_data['email']
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                'This email address is already in use by another account'
            )

        user = super(UserCreateAndUpdateSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.username = email
        user.save()
        return user
