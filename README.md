# 🚀 No Bolso - Gerenciamento Financeiro (Microfrontends)

Este projeto é a entrega da fase de Front-end do Tech Challenge. Ele foi construído utilizando uma arquitetura avançada de **Monorepo (NPM Workspaces)** e **Microfrontends (Next.js Multi Zones)**, com componentes centralizados e orquestração via Docker.

## Estrutura

O projeto está dividido em aplicativos independentes e pacotes compartilhados:

- 📂 **`apps/host`** (Porta `3000`): Casca da aplicação, responsável pelo Login e roteamento principal (Proxy).
- 📂 **`apps/transactions`** (Porta `3001`): Microfrontend focado no gerenciamento de transações.
- 📂 **`apps/dashboard`** (Porta `3002`): Microfrontend focado nos gráficos e resumos.
- 📂 **`packages/ui`**: Nosso Design System centralizado. Exporta componentes (como a Sidebar e botões) para todos os apps.

---

## Como instalar o projeto

> **⚠️ ATENÇÃO:** Nunca entre nas pastas `apps/` ou `packages/` para instalar pacotes separadamente. A instalação deve ser feita **sempre na raiz** do projeto.

1. Clone o repositório:
```bash
git clone <COLOQUE_AQUI_A_URL_DO_SEU_REPOSITORIO>
cd no-bolso-mfe
```

2. Instale todas as dependências do Monorepo de uma só vez:
```bash
npm install
```

3. Rodar o projeto localmente: 
Rode os comandos para subir os 3 servidores: 
```bash
npm run dev -w host
```
```bash
npm run dev -w dashboard
```
```bash
npm run dev -w transactions
```

