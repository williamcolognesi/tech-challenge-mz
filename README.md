# 🚀 No Bolso - Gerenciamento Financeiro (Microfrontends)

Este projeto é a entrega da fase de Front-end do Tech Challenge. Ele foi construído utilizando uma arquitetura avançada de **Monorepo (NPM Workspaces)** e **Microfrontends (Next.js Multi Zones)**, com componentes centralizados e orquestração via Docker.

**Produção:** [No Bolso](https://tech-challenge-mz-host.vercel.app/)

---

## Estrutura

O projeto está dividido em aplicativos independentes e pacotes compartilhados:

- 📂 **`apps/host`** (Porta `3000`): Casca da aplicação, responsável pelo roteamento principal (Proxy).
- 📂 **`apps/transactions`** (Porta `3001`): Microfrontend focado no gerenciamento de transações.
- 📂 **`apps/dashboard`** (Porta `3002`): Microfrontend focado nos gráficos e resumos.
- 📂 **`packages/ui`**: Design System centralizado. Exporta componentes (Sidebar, botões, etc.) para todos os apps.

---

## Pré-requisitos

- Node.js 18+
- Backend ([no-bolso-api](https://github.com/queity/no-bolso-api)) rodando localmente ou acessível via `API_URL`

---

## Como executar

### Local

> **⚠️ ATENÇÃO:** Nunca instale dependências dentro das pastas `apps/` ou `packages/` separadamente. A instalação deve ser feita **sempre na raiz** do projeto.

1. Instale as dependências:
```bash
npm install
```

2. Suba os três servidores:
```bash
npm run dev -w host
npm run dev -w dashboard
npm run dev -w transactions
```

A aplicação estará disponível em `http://localhost:3000`.

Por padrão, o frontend conecta ao backend em `http://localhost:8080/api`. Para apontar para outro endereço, configure a variável `API_URL` (ver seção abaixo).

### Docker

```bash
# primeira vez (com build)
docker compose up -d --build

# próximas vezes
docker compose up -d

# parar
docker compose down
```

> O frontend e o backend ([no-bolso-api](https://github.com/queity/no-bolso-api)) compartilham a rede `nobolso-network`. Cada projeto cria a rede automaticamente se ela não existir, portanto não há ordem obrigatória para subir os projetos.

---

## Variáveis de ambiente

Cada app lê a variável `API_URL` para saber onde está o backend.

| Variável | Padrão | Descrição |
|---|---|---|
| `API_URL` | `http://localhost:8080/api` | URL base da API backend |

Configure em cada app via `.env.local` ou via `environment` no `docker-compose.yml`.
