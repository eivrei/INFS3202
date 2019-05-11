from .base import *
import environ

env = environ.Env()
environ.Env.read_env(os.path.join(os.path.dirname(BASE_DIR), '.env'))

DEBUG = False

SECRET_KEY = env('SECRET_KEY')

ALLOWED_HOSTS = env('ALLOWED_HOSTS')

FRONTEND_URL = env('FRONTEND_URL')

EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
