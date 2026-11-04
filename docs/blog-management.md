# Blog administrado pelo Afiliados

## Prévia completa e layout das mídias

`/site/blog/preview/editor` herda `BlogLayout`, incluindo o cabeçalho e o rodapé reais, e usa `ArticleView`, a mesma apresentação dos artigos públicos. A página recebe o estado não salvo do painel por `postMessage`; `BLOG_EDITOR_ORIGINS` configura origens exatas autorizadas (separadas por vírgula; padrão localhost/127.0.0.1:3000). O receptor confirma `event.source === window.parent`, valida a origem e normaliza o documento antes de renderizar. Mensagens aplicadas são confirmadas ao painel. O handshake público não contém conteúdo nem credenciais.

A rota não recebe texto na URL, não persiste rascunhos, não entra no sitemap e tem `noindex`. Fontes e links passam pelo filtro HTTP(S). Compartilhamento permanece visível, mas inerte na prévia. Os relacionados usam somente a API pública; em falha, ficam vazios. Reinicie o servidor após alterar variáveis de ambiente. Em produção, a hospedagem deve permitir iframe dessa origem do painel. O painel usa `NEXT_PUBLIC_BLOG_SITE_URL` tanto para imagens relativas quanto para esta rota.

Nos renderers públicos e administrativos, mídias aceitam `width` entre 20 e 100 e alinhamento à esquerda, centro ou direita. O tamanho é relativo à área de texto e mantém a proporção; o array do documento define a ordem. Campos ausentes mantêm largura total. A API valida os limites antes de salvar e publicar.

O painel distingue a **Capa da obra**, armazenada em `spotlight.poster`, da **Imagem de slide/caixa**, armazenada em `cover`. Os carrosséis com pôster exibem a primeira e usam `spotlight.posterAlt` quando disponível (alternativa: título da obra). Fundos, miniaturas, cards e a abertura do artigo continuam usando `cover`/`coverAlt`. Remover o pôster não altera a imagem horizontal nem o trailer; artigos antigos continuam compatíveis.

Configure `BLOG_API_URL` no servidor institucional para a origem do backend Afiliados (ex.: `http://localhost:3001`). O repositório lê `/blog/articles` e `/blog/articles/:slug`. A publicação é feita pelo painel `/integracoes/blog` no Afiliados; não existe uma API institucional de upload de artigos.

Com API configurada, as leituras usam `no-store` e timeout de 10 segundos. Um 404 não busca o artigo no catálogo estático; erros da API são propagados à camada de erro da aplicação. Isso evita que artigos arquivados ou despublicados reapareçam. Sem API configurada, permanece o catálogo versionado para desenvolvimento offline. Não usar esse modo para validar publicação administrativa.

O contrato de blocos existente ganhou `image?: { src, alt }`; o renderer continua em React, sem HTML arbitrário. Categorias passam a aceitar slugs dinâmicos. Links para categorias de artigos da API são reconhecidos, mantendo os menus e destaques editoriais curados existentes.

Imagens podem ser URLs HTTP(S) ou caminhos relativos a este site. O painel permite upload autenticado em `POST /admin/blog/media` no backend e armazena a URL absoluta retornada. Configure `NEXT_PUBLIC_BLOG_SITE_URL` no Afiliados para prévias de caminhos relativos. Credenciais e tokens não devem aparecer em URLs de imagens.

Seções podem incluir `document` com texto formatado, títulos H2/H3, listas, imagens e vídeos (YouTube, Vimeo, MP4/WebM). `components/blog/articles/RichContent.tsx`, seu CSS Module e `lib/blog/richDocument.ts` renderizam o mesmo contrato da prévia administrativa, sem HTML arbitrário. Seções antigas continuam no renderer anterior. O backend deriva `paragraphs` para busca e tempo de leitura. Ao evoluir esse contrato, mantenha os tipos, validadores e renderers dos três projetos sincronizados.

O painel confirma disponibilidade na API, sem afirmar que o visitante recebeu a versão. Verificar a configuração do servidor, eventual cache de CDN e publicação do código institucional em cada ambiente. Não foi realizada implantação em produção nesta tarefa.
