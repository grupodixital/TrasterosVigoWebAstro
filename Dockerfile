# syntax=docker/dockerfile:1

########################################
# 1. Install dependencies
########################################
FROM node:22-alpine AS deps
WORKDIR /app

# pnpm-workspace.yaml uses allowBuilds (pnpm >=11); pnpm 9 rejects the file
RUN corepack enable && corepack prepare pnpm@11 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

########################################
# 2. Build the static site
########################################
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

########################################
# 3. Serve with nginx (non-root, unprivileged port)
########################################
FROM nginxinc/nginx-unprivileged:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
