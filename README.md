# Site institucional Netbox

A cena natalina inclui floresta realista em PNG transparente, base de neve dissolvida e pisca-pisca suave em "Feliz Natal!", preservando a neve animada e o boneco acenando. O desenho do boneco fica em [WavingSnowman.tsx](components/shared/seasonal/WavingSnowman.tsx). Detalhes: [docs/christmas-footer.md](docs/christmas-footer.md).

Temas comemorativos do Blog e do institucional são configurados na aba **Temas comemorativos** de `/integracoes/blog` do painel. Ambos iniciam desativados e usam `BLOG_API_URL` para consultar `/site/themes`, por meio do proxy local `/api/site-themes`. A prévia `?previewTheme=christmas` afeta somente a página aberta e não contabiliza analytics do Blog. Arquitetura, permissões, migração e relatório em [site-seasonal-themes.md](../afiliados-backend/docs/site-seasonal-themes.md).

O otimizador `/_vinext/image` utiliza os bindings Cloudflare `ASSETS` (arquivos públicos) e `IMAGES` (transformação), declarados em `vite.config.ts`. Após alterar bindings, reinicie `npm run dev` para recriar o ambiente do Worker.

O Blog coleta desempenho somente com consentimento, usando o backend existente. Eventos, privacidade e trailers: [docs/blog-analytics.md](docs/blog-analytics.md).

Nos artigos, a lateral repete o autor e oferece compartilhamento por ícones circulares. “Continue a leitura” exibe todos os demais artigos visíveis, do mais recente ao mais antigo, em carrossel compacto com setas. Veja [documentação do Blog](components/blog/README.md).

As páginas de artigo do Blog usam abertura cinematográfica inspirada no Letterboxd: fundo horizontal, pôster opcional à esquerda e nome/foto reais do autor abaixo do subtítulo. O layout também é usado na prévia administrativa. Veja [components/blog/README.md](components/blog/README.md).

Catalogo de filmes e series nas categorias do Blog: veja [configuracao do TMDB, rotas e licenca](docs/blog-media.md). A integracao requer `TMDB_READ_ACCESS_TOKEN` apenas no servidor.

Site institucional em React 19, TypeScript e App Router, executado com Vinext/Vite e com compilação Next.js para Vercel. Fontes Manrope e Sora, cores institucionais e tema claro/escuro compõem a identidade compartilhada.

## Organização dos arquivos

```text
app/
  (site)/                    # Rotas institucionais, / e /site
  (blog)/site/blog/           # Blog e artigos, com URLs preservadas
  api/place-photo/           # API existente
components/
  site/
    home/                    # HomePage, Hero, HomeFooter, PlanCard, content.ts
    layout/                  # SiteLayout, MenuContacts, tema e atalhos
    structure/               # StructureSection, Gallery e StoreMap
    contact/                 # Formulário
    app/                     # Download do aplicativo
    sales/                   # Modal comercial e CSS Module
    development/             # Tela de desenvolvimento e CSS Module
  blog/
    home/                    # HomePage, FeaturedNews, NewsCarousel
    layout/                  # BlogLayout, Header e Footer
    articles/                # ArticlePage, cards, capas e compartilhamento
    categories/              # CategoryPage, ordenação e destaques
    search/                  # Formulário, painel e sugestões
  ui/                        # Elementos genéricos compartilhados
hooks/                       # Foco, gestos e rolagem; blog/ para lógica exclusiva
content/blog/                # Catálogo local e sementes editoriais por categoria
lib/blog/                    # Catálogo, busca, status, datas e URLs
lib/auth.ts                  # Autenticação opcional da infraestrutura
services/                    # WhatsApp e leads
constants/                   # Destinos públicos de contato e aplicativos
types/                       # Contratos editoriais
styles/
  globals.css                # Tailwind e entrada básica
  base.css                   # Reset, tokens e acessibilidade
  site/                      # CSS institucional com nomes sem números
  blog/Blog.module.css       # Sistema visual compartilhado do Blog
__tests__/
  blog/                      # Conteúdo e navegador
  site/                      # Smoke tests das rotas
  legacy/                    # Histórico do template, fora de npm test
docs/                        # Arquitetura e relatório de migração
public/                      # Assets; URLs existentes preservadas
scripts/                     # Preparação das imagens editoriais
```

Os parênteses organizam o App Router sem mudar URLs. Não existe pasta pages nem outro pacote para o Blog. /site permanece a home institucional; / permanece a tela de desenvolvimento. O modal comercial e o CSS institucional pertencem apenas ao grupo (site). O catálogo editorial permanece no servidor.

Use imports relativos dentro da mesma pasta e @/ entre funcionalidades. Não crie pastas vazias ou index.ts somente para reexportar arquivos. Serviços e dados não importam componentes visuais.

Documentação: [arquitetura](docs/architecture.md), [institucional](components/site/README.md), [Blog](components/blog/README.md), [migração](docs/reorganization.md).

## Páginas e arquitetura

- `/site`: site institucional completo, planos, serviços e atendimento.
- `/sobre`, `/nossos-servicos`, `/nossa-estrutura`, `/contatos` e `/central-do-cliente`: páginas institucionais.
- `/site/blog` e `/site/blog/[slug]`: portal editorial independente e artigos do Blog Netbox, com cabeçalho e rodapé próprios.
- `components/site/layout/`: componentes e comportamentos compartilhados, incluindo NetboxFrame e alternância de tema.
- `styles/site/`: estilos institucionais; o Blog usa CSS Module próprio.
- `public/`: acervo de imagens, logos e vídeos.

O Blog cobre tecnologia e cultura nerd e pop (filmes, séries, HQs, jogos e entretenimento). Possui layout próprio de portal de notícias, carrossel com pôsteres, fundo desfocado e trailers das dez notícias mais recentes, faixa ilustrada de categorias, feed com linha do tempo e foguete no topo, sem carregar a moldura da home institucional. Utiliza 35 artigos locais demonstrativos: 5 de Tecnologia, 11 de Filmes (incluindo as dez notícias fornecidas), 6 de Séries, 6 de HQs e 6 de Jogos, busca por URL, categorias, grupos editoriais, carregamento incremental na home e paginação numerada nas categorias. Conteúdos demonstrativos possuem `noindex` e são excluídos do sitemap; rascunhos não são expostos. Veja [a documentação editorial](docs/blog-editorial.md) para cadastrar artigos, referências e imagens, aprovar publicações e preparar uma futura migração para CMS ou banco.

## Desenvolvimento e verificações

Node.js 22 e npm são necessários. Execute `npm install` e `npm run dev` para desenvolver. No Windows PowerShell, use `npm.cmd` quando a política impedir scripts .ps1.

- `npm run build`: build Vinext; `npm start`: servidor de produção Vinext.
- `npm run build:vercel`: build Next.js, conforme configuração Vercel existente.
- `npm run test:routes`: smoke tests HTTP; exige servidor em SITE_TEST_URL (padrão http://localhost:3017).
- `npm run test:browser`: teste CDP; exige servidor em BLOG_TEST_URL e Chromium isolado em BLOG_BROWSER_PORT (padrões localhost:3010 e 9334).
- `npm run lint`: lint geral; problemas anteriores ao Blog podem impedir sua aprovação.
- `npx tsc --noEmit`: verificação de tipos.
- `node --test __tests__/blog/content.test.mjs`: testes de busca, conteúdo e política editorial.

O Blog usa `BLOG_API_URL` para ler o catálogo PostgreSQL do projeto `afiliados-backend`; consulte `.env.example`. Se a API estiver temporariamente indisponível durante build ou desenvolvimento, o repositório editorial usa o catálogo local versionado como fallback. npm test executa conteúdo e limites da arquitetura. O skeleton antigo está arquivado em __tests__/legacy.

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

Import the ready-to-use helpers from `lib/auth.ts` when the site needs
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

As cinco capas geradas para os artigos de Tecnologia, seus originais e o comando de regeneração estão documentados em [public/blog/technology/README.md](public/blog/technology/README.md). Os caminhos existentes das imagens são preservados para o catálogo e a API.

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: current content and architecture tests
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)

O registro do código de afiliado em links de entrada é preservado por components/shared/ReferralTracker.tsx e services/referrals.ts. Esse componente não renderiza interface; o modal comercial permanece exclusivo do institucional.

A abertura do Blog também aparece nas categorias, com conteúdos do próprio assunto: Tecnologia utiliza título, descrição e fundo; Filmes, Séries, HQs e Jogos mantêm a capa disponível e trailer quando cadastrado. Veja components/blog/README.md.

## Administração do Blog pelo Afiliados

O editor administrativo agora permite formatação de texto, mídia e upload de imagens. O site renderiza o documento estruturado preservando os blocos antigos. Consulte [docs/blog-management.md](docs/blog-management.md) para o contrato e a configuração.

O painel do projeto irmão Afiliados gerencia os artigos desta API. Consulte [docs/blog-management.md](docs/blog-management.md) para configuração, publicação e comportamento em indisponibilidade.

A prévia `/site/blog/preview/editor` reutiliza a página completa do Blog para mostrar edições ainda não salvas do painel. Configure `BLOG_EDITOR_ORIGINS` para autorizar a origem do editor. Imagens e vídeos formatados preservam largura, alinhamento e ordem definidos no painel; detalhes na mesma documentação.

Na home do Blog, as recomendações de Filmes/Séries/Entretenimento e HQs/Jogos usam uma composição com matéria principal, dois cards complementares e atalhos de categoria, preservando os três artigos e a ordem existentes. O componente e a adaptação para celular estão documentados em [components/blog/README.md](components/blog/README.md).

“Tecnologia e inovação” apresenta os artigos em carrossel responsivo, com setas laterais, avanço automático a cada seis segundos e controle de pausa. O movimento pausa durante interação e respeita a preferência de movimento reduzido. Detalhes em [components/blog/README.md](components/blog/README.md).

A faixa de categorias da home tem cabeçalho próprio, cinco cards ilustrados centralizados, ícones e ações com setas. Em telas menores, permite deslizar horizontalmente pelas categorias. O componente `CategoryStrip` e seus estilos continuam juntos em `components/blog/home`; comportamento documentado em [components/blog/README.md](components/blog/README.md).

As páginas de categoria têm apresentação com título e descrição, busca específica, filtros por gênero, ordenação, destaques com matéria principal e paginação com intervalo de artigos. Estilos e componentes ficam em `components/blog/categories`, preservando a abertura compartilhada e os contratos existentes. Consulte [components/blog/README.md](components/blog/README.md).

“Sua próxima leitura / Em destaque” usa uma apresentação editorial com foto principal, duas chamadas compactas, divisórias e tempo de leitura. Os arquivos `NextReading.tsx` e `NextReading.module.css` ficam em `components/blog/home`; detalhes em [components/blog/README.md](components/blog/README.md).

O cabeçalho do Blog usa fundo escuro translúcido com desfoque de 32 px no conteúdo atrás dele, mantendo textos e ícones nítidos.

A área da página inicialmente atrás do cabeçalho tem uma faixa preta própria; o elemento do cabeçalho conserva sua transparência e desfoque durante a rolagem.

A logo fornecida para o Blog fica em `public/blog/netbox-blog-logo.png` e é usada no cabeçalho com proporção original e tamanho responsivo. Detalhes em [components/blog/README.md](components/blog/README.md).
# Fotos de autores no Blog

Fotos de perfil em JPEG, PNG, WebP ou GIF base64 são aceitas no artigo e na prévia, além de URLs HTTP(S) e caminhos locais. O validador `safeAuthorPhoto` preserva imagens completas até 12 MiB de texto; HTML, SVG inline e URLs executáveis são rejeitados. A prévia não aplica o limite de 20 mil caracteres dos campos de texto à foto.
# Créditos do rodapé

`components/ui/FooterCredits.tsx` compartilha os créditos entre HomeFooter, SiteLayout e BlogFooter, com copyright próprio do institucional/Blog e ano atual. Mantém “Site desenvolvido por @Matheus Mota 🧑‍💻”, link externo para o portfólio e a imagem original da campanha em `public/images/matheus/portfolio-preview.png`. O cartão aparece acima do nome por hover ou foco, com deslocamento/escala de 180 ms, ponte para manter o hover e redução de movimento. O efeito original é acionado pela presença do mouse; não há rastreamento contínuo do cursor. CNPJ, ouvidoria, privacidade, categorias e demais links existentes são preservados. Referências: CampaignFooter do projeto netbox-10-anos e https://freefrontend.com/css-tabs/. Sem dependências novas.
# Avatar da Equipe Netbox

Os créditos em `/site/blog/creditos` também identificam Metron (HQs) e IGDB (jogos), usados pelo editor do painel de afiliados. Imagens importadas continuam chegando pela API pública existente, sem credenciais desses provedores no institucional.

O componente `AuthorIdentity` usa `public/blog/equipe-netbox-square.png` para os autores “Equipe Netbox” e “Equipe editorial Netbox”. A versão quadrada foi criada com ImageGen a partir da logo fornecida: fundo branco, foguete e caixa centralizados com margem para o recorte circular. A imagem já contém o espaçamento necessário; CSS usa `object-fit: contain` sem padding adicional. O arquivo original `public/blog/equipe-netbox.png` foi preservado. Autores individuais continuam usando a foto cadastrada. A regra também vale para a prévia do artigo e não altera os dados nem os snapshots publicados.
