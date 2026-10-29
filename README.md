# Site institucional Netbox

Site institucional em React 19, TypeScript e App Router, executado com Vinext/Vite e com compilação Next.js para Vercel. Fontes Manrope e Sora, cores institucionais e tema claro/escuro compõem a identidade compartilhada.

## Páginas e arquitetura

- `/site`: site institucional completo, planos, serviços e atendimento.
- `/sobre`, `/nossos-servicos`, `/nossa-estrutura`, `/contatos` e `/central-do-cliente`: páginas institucionais.
- `/site/blog` e `/site/blog/[slug]`: portal editorial independente e artigos do Blog Netbox, com cabeçalho e rodapé próprios.
- `app/_components/`: componentes e comportamentos compartilhados, incluindo NetboxFrame e alternância de tema.
- `app/styles/`: estilos institucionais; o Blog usa CSS Module próprio.
- `public/`: acervo de imagens, logos e vídeos.

O Blog cobre tecnologia e cultura nerd e pop (filmes, séries, HQs, jogos e entretenimento). Possui layout próprio de portal de notícias, carrossel com as dez notícias mais recentes, feed com linha do tempo e foguete no topo, sem carregar a moldura da home institucional. Utiliza vinte artigos locais demonstrativos, busca por URL, categorias, grupos editoriais, carregamento incremental na home e paginação numerada nas categorias. Conteúdos demonstrativos possuem `noindex` e são excluídos do sitemap; rascunhos não são expostos. Veja [a documentação editorial](app/site/blog/README.md) para adicionar artigos, aprovar publicações, validar o Blog e entender o futuro ponto de integração com CMS.

## Desenvolvimento e verificações

Node.js 22 e npm são necessários. Execute `npm install` e `npm run dev` para desenvolver. No Windows PowerShell, use `npm.cmd` quando a política impedir scripts .ps1.

- `npm run build`: build Vinext; `npm start`: servidor de produção Vinext.
- `npm run build:vercel`: build Next.js, conforme configuração Vercel existente.
- `npm run lint`: lint geral; problemas anteriores ao Blog podem impedir sua aprovação.
- `npx tsc --noEmit`: verificação de tipos.
- `node --test tests/blog-content.test.mjs`: testes de busca, conteúdo e política editorial.

O Blog não requer dependências ou variáveis de ambiente adicionais. A configuração opcional de infraestrutura original está documentada abaixo. O `npm test` legado ainda verifica o skeleton antigo do template e não corresponde à interface institucional atual.

## Infraestrutura do template original


A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: legacy template checks; incompatible with the current institutional interface
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
