# ── Stage 1: Build ──
ARG NODE_VERSION=22
ARG BUILD_ENV=production

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

# Copy source
COPY . .

# Build the Angular app
RUN npx nx build ng-dashboard --configuration=${BUILD_ENV}

# ── Stage 2: Serve ──
FROM alpine:3.19

RUN apk add --no-cache nodejs npm

WORKDIR /app

# Copy only the dist
COPY --from=builder /app/dist/apps/ng-dashboard ./dist

# Install a lightweight static server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
