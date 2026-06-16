# Estágio 1: Instalação de Dependências
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/host/package.json ./apps/host/
COPY apps/transactions/package.json ./apps/transactions/
COPY apps/dashboard/package.json ./apps/dashboard/
COPY packages/ui/package.json ./packages/ui/

RUN npm ci

# Estágio 2: Construção (Build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRIA_DISABLED=1

# Executa o build focando apenas no workspace de transações
RUN npm run build -w transactions

# Estágio 3: Execução
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRIA_DISABLED=1
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/transactions/public ./apps/transactions/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/transactions/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/transactions/.next/static ./apps/transactions/.next/static

USER nextjs

EXPOSE 3001

CMD ["node", "apps/transactions/server.js"]