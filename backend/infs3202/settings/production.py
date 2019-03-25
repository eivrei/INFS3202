import os
from urllib.parse import urlparse

import environ

from infs3202.settings import BASE_DIR

env = environ.Env()
environ.Env.read_env(os.path.join(os.path.dirname(BASE_DIR), '.env'))

DEBUG = env('DEBUG')
DEBUG = DEBUG if isinstance(DEBUG, bool) else DEBUG == 'true'
SECRET_KEY = env('SECRET_KEY')
ALLOWED_HOSTS = env('ALLOWED_HOSTS')
SERVER_URL = env('SERVER_URL')
STATIC_URL = SERVER_URL + '/static/'
MEDIA_URL = SERVER_URL + '/uploads/'
FRONTEND_URL = env('FRONTEND_URL')
ENVIRONMENT_NAME = env('ENVIRONMENT_NAME', default='production')

# Database
DATABASES = {'default': env.db()}

# CORS
CORS_FRONTEND_URL = urlparse(FRONTEND_URL).netloc
CORS_ORIGIN_WHITELIST = list(
    {CORS_FRONTEND_URL, f'www.{CORS_FRONTEND_URL}', '127.0.0.1:3000', 'localhost:3000'}
)