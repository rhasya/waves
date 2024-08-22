FROM node:20-alpine AS base

# 1. Install dependencies
FROM base as deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# 2. Rebuild the souece code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD HOSTNAME=0.0.0.0 node server.js