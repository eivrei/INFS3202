from django.conf import settings
from django.core.mail import send_mail


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
