import type { NextConfig } from "next"

// 1. Detectamos os ambientes através das flags
const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL
const isDocker = process.env.IS_DOCKER === "true"

// 2. Definimos as URLs com base em uma árvore de decisão inteligente:
// - Se estiver na Vercel: pega a URL de produção definida nas variáveis da Vercel.
// - Se estiver no Docker: usa o nome do container do docker-compose (http://transactions:3001).
// - Se for local (PC do William): usa o padrão de desenvolvimento (http://localhost:3001).
const TRANSACTIONS_URL = isVercel
  ? process.env.TRANSACTIONS_URL || ""
  : isDocker
    ? "http://transactions:3001"
    : "http://localhost:3001"

const DASHBOARD_URL = isVercel
  ? process.env.DASHBOARD_URL || ""
  : isDocker
    ? "http://dashboard:3002"
    : "http://localhost:3002"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/transactions",
        destination: `${TRANSACTIONS_URL}/transactions`,
      },
      {
        source: "/transactions/:path*",
        destination: `${TRANSACTIONS_URL}/transactions/:path*`,
      },
      {
        source: "/dashboard",
        destination: `${DASHBOARD_URL}/dashboard`,
      },
      {
        source: "/dashboard/:path*",
        destination: `${DASHBOARD_URL}/dashboard/:path*`,
      },
    ]
  },
  transpilePackages: ["@no-bolso/ui"],
  output: "standalone",
}

export default nextConfig
