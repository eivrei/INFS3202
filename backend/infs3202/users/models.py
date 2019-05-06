import django.contrib.auth.password_validation as validators
import uuid

from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from django.dispatch import receiver

from infs3202.utils.email import send_validation_email


def get_default_email_verification_key():
    return str(uuid.uuid4())


class User(AbstractUser):
    email_is_validated = models.BooleanField(
        default=False, help_text='Is sat to true when user verifies email.'
    )
    email_verification_key = models.CharField(
        max_length=36, default=get_default_email_verification_key,
        help_text='UUID used to verify the users email.'
    )

    @staticmethod
    def validate_password(password):
        try:
            validators.validate_password(password=password)
        except DjangoValidationError as err:
            raise serializers.ValidationError(
                {"errors": [e for e in err]}
            )


@receiver(post_save, sender=User, dispatch_uid='send_verification_mail')
def email_verification(sender, instance, created, **kwargs):
    if created:
        send_validation_email(instance.email_verification_key, instance.email)
