import type { StorybookConfig } from "@storybook/nextjs-vite"
import tailwindcss from "@tailwindcss/vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: "@storybook/nextjs-vite",

  // 2. Adiciona este bloco para o Vite compilar o teu globals.css
  async viteFinal(config) {
    if (config.plugins) {
      config.plugins.push(tailwindcss())
    }
    return config
  },
}

export default config
