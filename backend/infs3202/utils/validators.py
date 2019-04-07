import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


class MinimumNumberOfSymbolsValidator:
    def __init__(self, min_number_of_symbols=1, valid_symbols='!@#$%^&*.,;:'):
        self.min_number_of_symbols = min_number_of_symbols
        self.valid_symbols = valid_symbols

    def validate(self, password, user=None):
        number_of_symbols = 0
        for char in password:
            if char in self.valid_symbols:
                number_of_symbols += 1

        if number_of_symbols < self.min_number_of_symbols:
            raise ValidationError(
                _("This password must contain at least %(min_number_of_symbols)d symbols. "
                  "The valid symbols are %(valid_symbols)s"),
                code='password_too_few_symbols',
                params={'min_number_of_symbols': self.min_number_of_symbols, 'valid_symbols': self.valid_symbols},
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least %(min_number_of_symbols)d symbols. "
            "The valid symbols are %(valid_symbols)s"
            % {'min_number_of_symbols': self.min_number_of_symbols,  'valid_symbols': self.valid_symbols}
        )


class UppercaseValidator:
    def __init__(self, min_number_of_capital_letters=1):
        self.min_number_of_capital_letters = min_number_of_capital_letters

    def validate(self, password, user=None):
        if sum(1 for char in password if char.isupper()) < self.min_number_of_capital_letters:
            raise ValidationError(
                _("This password must contain at least %(min_number_of_capital_letters)d capital letters."),
                code='password_too_few_capital_letters',
                params={'min_number_of_capital_letters': self.min_number_of_capital_letters},
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least %(min_number_of_capital_letters)d capital letters."
            % {'min_number_of_capital_letters': self.min_number_of_capital_letters}
        )


class NumberValidator(object):
    def __init__(self, min_digits=1):
        self.min_digits = min_digits

    def validate(self, password, user=None):
        if not len(re.findall('\d', password)) >= self.min_digits:
            raise ValidationError(
                _("The password must contain at least %(min_digits)d digit(s), 0-9."),
                code='password_no_number',
                params={'min_digits': self.min_digits},
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least %(min_digits)d digit(s), 0-9." % {'min_digits': self.min_digits}
        )
