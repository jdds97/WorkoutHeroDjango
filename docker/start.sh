#!/bin/sh

set -e



# Needed because Git does not retain these permissions.
chmod 0600 "./api/docker/dev-home/.pgpass"

docker-compose build --pull
docker-compose up --remove-orphans
