import os

from .base import *  # noqa
from .infs3202 import *  # noqa
from .rest_framework import *  # noqa

if os.environ.get('ENV_CONFIG') in ['1', 'True', 'true']:
    from .production import *  # noqa
else:
    try:
        from .local import *  # noqa
    except ImportError:
        raise ImportError('Couldn\'t load local settings infs3202.settings.local')
