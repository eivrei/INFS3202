from .base import INSTALLED_APPS, MIDDLEWARE
from .rest_framework import REST_FRAMEWORK

DEBUG = True
DEVELOPMENT = True

SERVER_URL = 'http://127.0.0.1:8000'
FRONTEND_URL = 'http://127.0.0.1:3000'
ENVIRONMENT_NAME = 'development'

SECRET_KEY = 'secret'
DUMP_SECRET = 'secret'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': '127.0.0.1',
        'NAME': 'infs3202',
        'USER': 'infs3202',
        'PASSWORD': '',
        'PORT': '',
    }
}

INTERNAL_IPS = ['127.0.0.1']
INSTALLED_APPS += [
    'debug_toolbar',
    'django_extensions',
]
MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]
DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
]

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += ['rest_framework.renderers.BrowsableAPIRenderer']
REST_FRAMEWORK['DEFAULT_PARSER_CLASSES'] += [
    'rest_framework.parsers.FormParser', 'rest_framework.parsers.MultiPartParser'
]

CORS_ORIGIN_WHITELIST = list({'127.0.0.1:3000', 'localhost:3000'})
