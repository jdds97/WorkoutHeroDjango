# syntax=docker/dockerfile:1

### BASE IMAGE ###

FROM python:3.11.9-bookworm AS base

RUN adduser --uid=1000 sthenos_fit

RUN <<EOF
set -eux
apt-get update --yes --quiet
apt-get install --yes --quiet --no-install-recommends \
    bash-completion \
    file \
    gettext \
    less \
    make \
    netcat-openbsd \
    postgresql-client \
    python3-dev \
    libpq-dev \
    vim

rm -rf /var/lib/apt/lists/*
EOF

WORKDIR /root

# Install tools for managing Python packages.
RUN <<EOF
set -eux
python3 -m pip install --upgrade pip wheel
python3 -m pip install pipenv
EOF

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock
RUN pipenv install --system --site-packages --deploy --dev


RUN <<EOF
set -eux
mkdir -p /app && chown -R sthenos_fit:sthenos_fit /app
mkdir -p /srv/django/media
mkdir -p /srv/django/static
chown -R sthenos_fit:sthenos_fit /srv/django
EOF


EXPOSE 8000
EXPOSE 5000


FROM base AS runner

# Populate home directory for development.

COPY --chown=sthenos_fit:sthenos_fit docker/dev-home/ /home/sthenos_fit/
USER sthenos_fit


COPY --chown=sthenos_fit:sthenos_fit . /app
WORKDIR /app
CMD [ "uwsgi", "--socket", "0.0.0.0:8000", \
               "--processes=4", \
               "--buffer-size=32768", \
               "--wsgi-file", "SthenosFit/wsgi.py" ]