from django.conf import settings
from django.db import models


class PasswordReset(models.Model):
    timestamp = models.DateTimeField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    uuid = models.CharField(max_length=36)

    class Meta:
        verbose_name_plural = 'Password resets'
        ordering = ['timestamp']

    def __str__(self):
        return str(self.user) + ' - ' + str(self.timestamp)
