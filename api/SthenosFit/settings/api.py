from SthenosFit.settings.base import *

DEBUG = False

ALLOWED_HOSTS = ["127.0.0.1", "localhost", "0.0.0.0:8000", "sthenosfit-nginx", "0.0.0.0", "ec2-18-211-237-181.compute-1.amazonaws.com"]

WSGI_APPLICATION = "SthenosFit.settings.wsgi_api.application"


CORS_ALLOWED_ORIGINS = [ALLOWED_HOSTS]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'Content-Type',
    'Authorization',
    'X-CSRFToken',
    'X-Requested-With',
]