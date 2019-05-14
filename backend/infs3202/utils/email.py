import uuid
from django.utils import timezone

from django.conf import settings
from django.core.mail import send_mail

from infs3202.password_reset.models import PasswordReset


def send_validation_email(key, recipient_mail):
    frontend = settings.FRONTEND_URL
    text = (
        'Hi!\n\n'
        'You get this email because you have signed up on thebigevent.xyz '
        'To finish this registration you have to verify your email by clicking this link:'
        f'\n\n {frontend}/verify-email?key={key}&email={recipient_mail}'
        '\n\nKind Regards\nThe Big Event'
    )
    send_mail('The Big Event - Sign up', text, 'noreply@thebigevent.xyz', [recipient_mail])


def send_password_reset_request(user, origin):
    guid = uuid.uuid4()
    timestamp = timezone.now()
    PasswordReset.objects.create(timestamp=timestamp, uuid=guid, user=user)

    text = (
        f'Hi!\n\n'
        f'You get this email because someone requested a password reset for the account with this email address on thebigevent.xyz. '
        f'If you did not make this request, you can safely ignore this email.\n'
        '\nClick this link to reset your password:\n\n'
        f'{origin}/?key={guid}\n\n'
        'The link is only available for 12 hours.'
    )

    send_mail('The Big Event -  Password reset request', text, 'noreply@thebigevent.xyz', [user.email])

