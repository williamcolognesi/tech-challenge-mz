import type { NextConfig } from "next"

const isDocker = process.env.IS_DOCKER === "true";

const TRANSACTIONS_URL = process.env.TRANSACTIONS_URL || (isDocker ? "http://transactions:3001" : "http://localhost:3001");
const DASHBOARD_URL = process.env.DASHBOARD_URL || (isDocker ? "http://dashboard:3002" : "http://localhost:3002");

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
