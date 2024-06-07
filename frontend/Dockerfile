# syntax=docker/dockerfile:1

### BASE IMAGE ###

FROM node:18-bullseye AS base

RUN npm install -g npm@10.8.1

RUN <<EOF
set -e
apt-get update --yes --quiet
apt-get install --yes --quiet --no-install-recommends \
    bash-completion \
    less \
    vim

rm -rf /var/lib/apt/lists/*
EOF

### DEPS IMAGE ###

FROM base AS deps

USER node

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

### BUILDER IMAGE ###

FROM base AS builder

USER node

WORKDIR /app

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN make

### PRODUCTION IMAGE ###

FROM base AS runner

USER node

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

COPY --chown=node:node . .

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]