# Arquitetura

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
content/blog/                # Artigos e dados de cinema
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

Documentação: [arquitetura](architecture.md), [institucional](../components/site/README.md), [Blog](../components/blog/README.md), [migração](reorganization.md).

## Estilos

styles/globals.css carrega Tailwind, base.css e ícones. base.css contém reset, tokens e acessibilidade. styles/site/site.css preserva a ordem anterior de cascata, responsividade e tema, com nomes sem números. Não altere essa ordem sem rever os overrides.

styles/blog/Blog.module.css continua compartilhado pelo portal para preservar seletores combinados, media queries e exportação de classes sem duplicação. Os CSS Modules de desenvolvimento e modal comercial ficam próximos dos componentes. Para novos estilos exclusivos, prefira um módulo junto do componente. Não é necessário adicionar SCSS.

## Rotas e infraestrutura

O layout raiz contém fontes, metadata global e JSON-LD. As rotas editoriais delegam a composição aos componentes e mantêm exports explícitos de metadata e static params. As páginas secundárias institucionais utilizam SiteLayout; a home mantém sua coordenação de estado e comportamentos específicos. Dados estáticos, Hero, HomeFooter, PlanCard e serviço de leads foram extraídos da antiga home.

public mantém seus caminhos para preservar imagens e links existentes; fontes vêm de next/font/google. build, worker, db, drizzle e examples são infraestrutura opcional preservada. Não foram ativados banco, CMS ou autenticação adicionais.

## Verificação

npm test cobre conteúdo e limites da arquitetura. test:routes exige servidor iniciado; test:browser exige também Chromium com perfil isolado e CDP. Valide TypeScript e os builds Next.js e Vinext antes de publicar. O teste de skeleton foi arquivado explicitamente, sem representar a interface atual.

O registro do código de afiliado em links de entrada é preservado por components/shared/ReferralTracker.tsx e services/referrals.ts. Esse componente não renderiza interface; o modal comercial permanece exclusivo do institucional.
