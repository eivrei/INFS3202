import django.contrib.auth.password_validation as validators
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers


class User(AbstractUser):
    @staticmethod
    def validate_password(password):
        try:
            validators.validate_password(password=password)
        except DjangoValidationError as err:
            raise serializers.ValidationError(
                {"errors": [e for e in err]}
            )
