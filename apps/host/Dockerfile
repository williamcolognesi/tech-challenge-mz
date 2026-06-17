# Estágio 1: Instalação de Dependências
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copia arquivos de configuração do Monorepo para instalar dependências corretas
COPY package.json package-lock.json ./
COPY apps/host/package.json ./apps/host/
COPY apps/transactions/package.json ./apps/transactions/
COPY apps/dashboard/package.json ./apps/dashboard/
COPY packages/ui/package.json ./packages/ui/

# Instala as dependências respeitando o NPM Workspaces
RUN npm ci

# Estágio 2: Construção (Build) da Aplicação
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Copia todo o monorepo para buildar o projeto
COPY . .

# Desativa a telemetria do Next.js durante o build
ENV NEXT_TELEMETRIA_DISABLED=1

# Define a variável de ambiente para indicar que a aplicação está em um container Docker
ENV IS_DOCKER=true

# Executa o build focando apenas no workspace do host
RUN npm run build -w host

# Estágio 3: Execução em Produção (Imagem ultra leve)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRIA_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Cria um usuário de sistema para não rodar o container como root (Segurança SecOps)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia apenas os artefatos necessários gerados no build
COPY --from=builder /app/apps/host/public ./apps/host/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/host/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/host/.next/static ./apps/host/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/host/server.js"]