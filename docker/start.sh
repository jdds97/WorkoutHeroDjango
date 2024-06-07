#!/bin/sh

set -e

SCRIPT_PATH="$(dirname "$(dirname "$(readlink -f $0)")")"

# Needed because Git does not retain these permissions.
chmod 0600 "${SCRIPT_PATH}/api/docker/dev-home/.pgpass"

docker compose build --pull
docker compose up --remove-orphans
