import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  basePath: "/dashboard",
  transpilePackages: ["@no-bolso/ui"],
  output: "standalone",
}

export default nextConfig
