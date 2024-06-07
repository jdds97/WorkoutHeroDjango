#!/bin/bash

# Dummy server - keeps the container running for development without starting a
# server.

set -e

mkdir /container
mount -o bind / /container

# Bind-mount the node_modules directory in the container over those mounted
# from the host.
for NAME in node_modules; do
  DIR="/app/${NAME}"
  mkdir -p "${DIR}"
  mount -o rbind "/container/${DIR}" "${DIR}"
done

umount /container
rmdir /container

# Catch SIGTERM from `docker stop`.
trap "exit" EXIT

echo "Listo. Usa 'docker compose exec -u node frontend bash' para acceder al contenedor."

# Stay in foreground.
while true; do
    sleep 1
done
