# Conteúdo editorial do Blog Netbox

## Fonte de conteúdo atual

O Blog lê a API do projeto `afiliados-backend`, configurada por `BLOG_API_URL`. O backend usa PostgreSQL e os modelos Prisma `BlogArticle` e `BlogArticleSource`. O catálogo local continua versionado como fallback para builds e indisponibilidades temporárias: os guias ficam em `content/blog/articles.ts`, as dez notícias de cinema em `content/blog/cinema.json` e os quinze artigos adicionais em `content/blog/editorial/articles.json`.

Depois de editar o catálogo local, execute `npm run blog:export -- "..\\afiliados-backend\\prisma\\data\\blog-articles.json"` e, no backend, `npm run blog:seed`. A importação usa upsert por ID, recria as fontes de cada artigo e pode ser repetida sem duplicar registros.

## Categorias e situação dos conteúdos

- Tecnologia: 5 artigos existentes.
- Filmes: 10 notícias demonstrativas fornecidas + 1 guia existente.
- Séries: 1 guia existente + 5 novos artigos.
- HQs: 1 guia existente + 5 novos artigos.
- Jogos: 1 guia existente + 5 novos artigos.
- Entretenimento: 1 guia HBO Max arquivado, fora da navegação principal.

Todos os novos textos e as notícias demonstrativas permanecem em `status: "demo"`. As páginas exibem o aviso editorial, usam `noindex` e não aparecem no sitemap de artigos aprovados. Não altere o status para `published` antes da revisão dos fatos, direitos de imagem, links, SEO e texto por uma pessoa responsável.

## Campos de um artigo

Cada registro renderizado em `BlogArticle` deve incluir:

- `id` e `slug` únicos, com slug legível para a URL.
- `title`, `summary`, `topic` opcional e `category`.
- `content`: seções estruturadas, cada uma com título, parágrafos, listas opcionais e links internos opcionais. O renderizador não executa HTML recebido do conteúdo.
- `cover`, `coverAlt` e `coverCredit` para os arquivos locais e sua atribuição.
- `author`, `publishedAt`, `updatedAt`, `status` e `featured`.
- `seo.title` e `seo.description`.
- `sources`: referências HTTPS com título e editora. Use `role: "promotional"` para trailer ou material promocional que não comprove as alegações factuais.
- `spotlight` opcional: título, pôster local e, se houver, URL HTTPS de trailer oficial validada.

As páginas individuais mostram fontes e créditos, canonical, Open Graph, Twitter Card, BlogPosting e BreadcrumbList. Demonstrações permanecem fora do sitemap.

## Adicionar conteúdo

1. Escreva o registro na categoria correspondente. Para séries, HQs ou jogos, edite `content/blog/editorial/articles.json`, mantendo os campos usados pelos registros existentes: conteúdo editorial, fontes, origem e crédito de imagem, alt, metadados SEO e status.
2. Use fontes oficiais ou bibliográficas adequadas. Não transforme a descrição da plataforma em afirmação de disponibilidade local, preço, data ou recurso sem confirmação. Registre créditos e confira se a fonte da capa permite seu uso.
3. Para gerar as variantes locais WebP e pôster, execute `npm run blog:prepare-images`. O script lê `coverSource` do catálogo, valida dimensões e grava três tamanhos 16:9 e uma imagem vertical em `public/blog/editorial/`.
4. Confira o artigo e as imagens no site, rode `npm test`, `npx tsc --noEmit` e `npm run build`.
5. Após aprovação editorial, altere `status`, as datas e o aviso conforme o fluxo de publicação. Confirme sitemap, URL canonical e afirmações antes de publicar.

Os arquivos de conteúdo guardam textos e referências; `public/blog/editorial/` contém apenas assets gerados. A fonte remota usada para obter as capas fica no cadastro, mas a página em produção serve somente os arquivos locais.

## Integração e evolução

A leitura remota está em `lib/blog/repository.ts`, com validação mínima do contrato e cache de cinco minutos. Uma futura interface de CMS deve escrever nos mesmos modelos, preservar a renderização sem HTML arbitrário, os slugs, a política de aprovação e o bloqueio de indexação para rascunhos e demonstrações.
