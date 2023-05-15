import os
from pathlib import Path

from app.logger import logger

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = "v4%!pmh6=a%5_ok6!24fllmd-g^7xjy+-6!95ll-r$t63npcxs"
DEBUG = os.getenv("AMPLO_DEBUG", False) == "True"
DEBUG_MODE = DEBUG
PROJECT_DIR = Path(__file__).parent
MEDIA_URL = "/media/"
STATIC_ROOT = os.path.join(BASE_DIR, "static/")
STATIC_URL = "/static/"
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")


logger.info(f"Debug: {DEBUG}")

ALLOWED_HOSTS = ["*"]
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

CSRF_USE_SESSIONS = False
# Not accessible by client (not important)A
CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_AGE = 8 * 3600  # Expires after 8 hr
CSRF_COOKIE_SECURE = False  # Only HTTPS --> should be true!

SESSION_COOKIE_HTTPONLY = False  # Not accessible by client
SESSION_COOKIE_AGE = 8 * 3600  # Expires after 8 hr
SESSION_COOKIE_SECURE = False  # Only HTTPS --> should be true!

# AUTO FIELD
DEFAULT_AUTO_FIELD = "django.db.models.AutoField"


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "django_filters",
    "core",
    "app",
]

# Allauth setting
SITE_ID = 1

ASGI_APPLICATION = "core.asgi.application"

logger.info(f"Using database host: {os.getenv('DB_HOST')}")

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE", "django.db.backends.postgresql_psycopg2"),
        "NAME": os.getenv("DB_NAME", "learnalanguage"),
        "USER": os.getenv("DB_USER", "postgres"),
        "PASSWORD": os.getenv("DB_PASS", "postgres"),
        "HOST": os.getenv("DB_HOST", "127.0.0.1"),
        "PORT": os.getenv("DB_PORT", "5432"),
        "TEST": {"NAME": "auto_tests"},
    }
}


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
    "formatters": {
        "simple": {
            "format": "[%(asctime)s] %(levelname)s\t%(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
    "loggers": {
        "messagebus": {
            "handlers": ["console"],
            "level": os.getenv("MESSAGEBUS_LOG_LEVEL", "INFO"),
            "propagate": False,
        },
        "django": {
            "handlers": ["console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            "propagate": False,
        },
        "django.db.backends": {
            "level": os.getenv("DJANGO_DB_LOG_LEVEL", "INFO"),
            "handlers": ["console"],
            "propagate": False,
        },
    },
}

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
ROOT_URLCONF = "core.urls"
WDGI_APPLICATION = "core.wsgi.application"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "core/templates/")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 8,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
]


# Define local media path, this is only intended for development purposes
MEDIA_ROOT = os.getenv("MEDIA_ROOT", os.path.join(BASE_DIR, "media") if DEBUG else "")
MEDIA_URL = "media/"

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True
