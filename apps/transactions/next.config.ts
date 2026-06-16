import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Diz ao Next.js que todas as rotas deste projeto começam com /transacoes
  basePath: "/transactions",
  transpilePackages: ["@no-bolso/ui"],
  output: "standalone",
  // @ts-expect-error - Ignora erros do ESLint durante a construção do projeto
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
