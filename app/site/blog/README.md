# Blog Netbox

## Rotas e composição

- `/site/blog`: portal independente, com carrossel das dez últimas notícias, seleção numerada lateral, feed de notícias, busca e blocos por assunto.
- `/site/blog/[slug]`: leitura individual, breadcrumb, compartilhamento e relacionados.
- `?categoria=tecnologia`: filtra pela categoria; os identificadores estão em `_lib/navigation.ts`.
- `?q=roteador`: busca sem distinção de caixa ou acentos por título, resumo e categoria. Várias palavras devem estar presentes.
- `?grupo=entretenimento`: reúne todas as categorias de um bloco editorial.
- `?pagina=2`: acumula lotes de seis na home e abre páginas numeradas nas categorias, preservando os filtros. Valores inválidos são limitados ao intervalo disponível.

As páginas são Server Components. O cabeçalho, o carrossel, a busca, o compartilhamento e a adaptação de imagens utilizam componentes de cliente próprios. O formulário de busca tem fallback GET e usa o App Router quando o JavaScript está disponível. Categorias, cards e carregamento incremental usam `next/link`. Não há API, autenticação, CMS ou banco de dados para o Blog.

`layout.tsx` possui estrutura editorial própria: `BlogHeader`, navegação por assuntos, conteúdo e `BlogFooter`. Não monta `NetboxFrame`, cabeçalho/rodapé institucionais, atalhos flutuantes, ofertas ou banners de planos. A rota e o conteúdo permanecem no mesmo projeto, isolados na pasta do Blog, sem novo servidor, domínio ou instalação. A composição editorial usa a home do Ei Nerd como referência de hierarquia (manchete, seleção lateral, feed recente e blocos por assunto), mantendo marca e cores Netbox. O link discreto “Site Netbox” permite sair do portal. Marca, categorias, busca e retorno ao site compartilham uma única faixa de vidro preto translúcido, fixa no topo, sem a antiga divisão branca/preta. Em telas abaixo de 1100 px, o menu expande na mesma faixa e fecha ao navegar ou pressionar Escape. O cabeçalho fica sob Suspense para ler filtros da URL sem impedir a renderização estática dos artigos.

A área editorial permanece clara mesmo com a preferência escura salva no institucional; não altera a preferência. O modal global de afiliados ignora rotas do Blog para não interceptar compartilhamentos de notícias. A home institucional mantém seus próprios componentes e comportamentos.

As imagens são do acervo local e usam `next/image` com loader local e variantes WebP pré-geradas, dimensões proporcionais, `sizes` e carregamento prioritário apenas na capa principal. O loader evita depender dos bindings ASSETS/IMAGES do otimizador Cloudflare, ausentes na prévia Vinext.

## Carrossel das últimas notícias

A área principal da manchete usa `_components/LeadCarousel.tsx` e apresenta as dez publicações visíveis mais recentes, obtidas da mesma ordenação de `visibleArticles()` e limitadas no servidor. Datas iguais preservam a ordem do catálogo. Rascunhos e publicações futuras continuam excluídos. A seleção editorial numerada à direita permanece independente do carrossel.

O servidor converte os artigos para dados de apresentação (título, resumo, gênero, imagem, data e link), sem enviar os corpos dos artigos ou o catálogo inteiro ao cliente. Cada slide abre sua publicação completa. Setas anterior/próxima, dez indicadores, contador e teclas direcionais navegam em ciclo; no celular, o gesto horizontal reutiliza `useSwipeGesture` e preserva a rolagem vertical. Slides inativos ficam inertes e fora da navegação por teclado.

Os indicadores e o contador ficam centralizados, com uma seta em cada extremidade e sem botão de pausa/reprodução. A troca automática ocorre a cada seis segundos. Passar o mouse ou manter o foco no carrossel pausa temporariamente; a reprodução continua ao sair. O gesto reinicia o intervalo de troca. A rotação também para quando a aba está oculta, a manchete sai da tela ou o sistema solicita movimento reduzido. O timer, os observadores e os listeners são removidos ao desmontar. As trocas manuais continuam disponíveis com movimento reduzido, sem animação.

Os slides compartilham uma única célula de grid para reservar a altura do maior título, evitando deslocamentos do restante da página ou do limite usado pelo cabeçalho fixo. Só a primeira imagem recebe prioridade; as demais mantêm carregamento sob demanda. A transição de opacidade dura 300 ms e os controles não ficam dentro dos links das notícias. Nenhuma nova biblioteca foi adicionada.

## Cabeçalho de vidro e rolagem

O cabeçalho do Blog é fixo no topo, com vidro preto translúcido, blur, saturação, reflexos e brilho fosco discretos. O conteúdo mantém espaço equivalente à barra (86 px no desktop, 76 px no tablet/mobile); a manchete da home passa por trás do vidro. Navegação e conteúdo não mudam de posição quando a barra se esconde.

`_lib/useBlogHeaderVisibility.ts` combina o hook institucional de direção, sem modificá-lo, com o marcador `data-ui="blog-first-section"`. Na home o marcador envolve os destaques; nas categorias, a apresentação da seção; nos artigos, o cabeçalho editorial. Em buscas e grupos sem manchete, a barra de apresentação marca o início. Enquanto essa área ainda passa abaixo da barra fixa, o cabeçalho permanece visível. Depois, uma descida acumulada de 28 px o oculta e uma subida o revela; a tolerância existente evita oscilar com movimentos mínimos. A medida usa a altura recolhida da barra para não variar quando o menu abre.

A entrada e a saída usam transform vertical e opacidade com transições de 240–320 ms. A preferência de movimento reduzido desativa a animação. O menu e o painel de busca mantêm o cabeçalho visível enquanto abertos. Quando oculto, o cabeçalho fica inerte e não recebe foco nem cliques. A lógica usa eventos passivos e requestAnimationFrame, recalcula ao redimensionar ou navegar e remove listeners ao desmontar. Sem suporte a backdrop-filter, há fundo preto mais opaco para preservar a leitura.

## Painel de pesquisa

A lupa do cabeçalho abre “Encontre sua próxima leitura” em um painel fixo à direita, renderizado por `_components/BlogSearchPanel.tsx`. Não há cópias fixas do formulário na listagem ou nas categorias. A antiga lateral editorial também foi movida integralmente para o painel: assuntos, escolhas da redação e aviso demonstrativo. O feed principal utiliza a largura liberada. A lupa permanece acessível ao lado da marca também em smartphones, sem exigir a abertura do menu de categorias.

O painel utiliza `dialog.showModal()` para conter o foco e tornar o restante da página inerte. Ao abrir, foca o campo de busca e bloqueia a rolagem de fundo; ao fechar, restaura o foco e a rolagem. Pode ser fechado pelo botão, Esc ou clique na área escurecida. No mobile ocupa a largura disponível e respeita movimento reduzido.

A busca reutiliza `BlogSearch`, preserva categoria e grupo da URL e fecha o painel ao enviar. Os resultados continuam navegando pelo App Router, com URLs compartilháveis. O termo atual aparece preenchido ao reabrir a busca. O conteúdo editorial é renderizado no servidor por EditorialSidebar e passado ao cabeçalho/painel como ReactNode, mantendo o catálogo fora do JavaScript do cliente. Os links de assuntos e artigos fecham o painel ao navegar. As escolhas da redação permanecem visíveis também no mobile. Não há nova API, biblioteca ou dependência.

## Páginas de categoria

As categorias usam a organização editorial da referência [Teoria Geek — Filmes](https://teoriageek.com.br/category/filmes/), mantendo cabeçalho, marca, cores e conteúdos Netbox. O layout é de largura completa, sem a antiga lateral: breadcrumb e título compacto, faixa de gêneros com ordenação à direita, três notícias com texto sobre a imagem e grade de cards abaixo. A grade tem três colunas no desktop, duas no tablet e uma no celular.

`_components/CategoryView.tsx` compõe o arquivo; `CategorySpotlightCard.tsx` renderiza os destaques e `CategorySort.tsx` controla a ordenação por App Router. O card compartilhado possui a opção archive para mostrar autor e data antes do resumo nessa listagem, sem alterar os demais cards do site.

As categorias mantêm `?categoria=...`. Os gêneros vêm do campo topic dos artigos do assunto e usam a busca real via `?q=...`; Todos limpa o filtro. A ordenação aceita `?ordem=recentes` (padrão), `antigas` ou `destaques`. Não há opção de popularidade ou nota sem dados reais para sustentá-la. A troca de ordem preserva categoria, gênero/busca e grupo, e reinicia na página 1.

Nas categorias, `?pagina=2` seleciona uma página com seis publicações, em vez de acumular itens. As três primeiras publicações de cada página recebem destaque e as seguintes aparecem na grade; não há repetição entre as duas áreas ou entre páginas. A paginação numerada preserva os filtros e a ordem. Listagens com uma ou duas publicações se adaptam à quantidade real. Estados vazios permitem limpar a busca. A home continua usando Carregar mais.

O título e a descrição de SEO acompanham a categoria. A política de canonical e noindex dos filtros e conteúdos demonstrativos foi preservada. Nenhuma nova API, dependência ou CMS foi introduzido. Links antigos de categorias continuam funcionando.

## Linha do tempo e foco editorial

O Blog cobre tecnologia e cultura nerd e pop. As categorias principais são Tecnologia, Filmes, Séries, HQs, Jogos e Entretenimento; os blocos editoriais agrupam esses assuntos. O catálogo demonstrativo inclui guias de HQs e séries, sem anunciar acontecimentos ou lançamentos não verificados.

O feed possui uma linha vertical contínua gerada pelo pseudo-elemento de `styles.feed`, alinhada às cápsulas de data por `--timeline-rail`. Um ícone de foguete da biblioteca existente `react-icons` marca seu início. O ícone é decorativo e oculto de tecnologias assistivas. As datas são reais; não usamos “agora mesmo” para simular atualidade. O ano continua disponível no atributo datetime e no nome acessível. A linha se adapta à quantidade de artigos, aos filtros e ao carregamento incremental, sem animação obrigatória.

As URLs antigas de categorias são resolvidas por `resolveCategory` em `_lib/navigation.ts`: Internet/Wi-Fi, Dicas e Novidades Netbox agora abrem Tecnologia; Filmes e Séries abre Filmes; Streaming abre Entretenimento. Os slugs dos artigos anteriores foram preservados.

## Organização


- `_content/articles.ts`: catálogo de vinte artigos demonstrativos e seus corpos.
- `_lib/types.ts`: contratos de conteúdo, categoria e status.
- `_lib/navigation.ts`: categorias, grupos, tamanho dos lotes e URLs; seguro para importar no cliente.
- `_lib/blog.ts`: seleção editorial, busca, datas, tempo de leitura e serialização JSON-LD.
- `_components/`: cabeçalho e rodapé próprios, manchete e seleção lateral, feed, cards reutilizáveis, imagens responsivas, busca e compartilhamento.
- `public/blog/`: 54 variantes WebP de dezoito capas (dez imagens de cinema enviadas e oito capas anteriores); geradas por `scripts/prepare-blog-images.mjs`.
- `blog.module.css`: apresentação isolada, responsividade e movimento reduzido.
- `[slug]/page.tsx`: rota dinâmica, metadata e dados estruturados.

## Textos e imagens de cinema enviados em 29/10/2026

Os dez textos recebidos ficam em `_content/cinema.json`, com título, texto integral, gênero, nome exato do JPG e descrição da capa. `_content/cinema.ts` adapta esse cadastro ao contrato BlogArticle. A primeira frase é usada como resumo; as frases restantes formam o corpo, preservando o texto completo e a ordem enviada. Não foram acrescentados fatos aos textos recebidos.

As publicações têm categoria Filmes e gênero próprio em `topic` (Super-heróis, Aventura, Animação, Biografia, Games e Cinema, Comédia e Drama, Ficção científica, Suspense e Terror ou Terror). O gênero aparece nos cards, destaques e artigo e participa da busca. As quatro primeiras notícias entram nos destaques. A data do cadastro é 2026-10-29, mantendo a ordenação recebida entre artigos da mesma data.

Os JPGs recebidos em `public/blog/` são preservados. `node scripts/prepare-blog-images.mjs` lê o cadastro de cinema e gera capas WebP de 480, 800 e 1200 px para os dez filmes, além das oito capas anteriores. O catálogo total possui vinte artigos e 54 variantes WebP de dezoito imagens. Os artigos anteriores e seus slugs permanecem disponíveis. As capas antigas podem ser regeneradas pelos originais locais do site.

Os textos fornecidos mantêm status demonstrativo e noindex até aprovação editorial, conforme a política existente. Os links inline de imagens enviados na conversa não são usados como fonte editorial: as capas vêm dos arquivos locais identificados pelo nome do filme. Não foi realizada checagem factual das afirmações fornecidas; elas foram incorporadas como conteúdo enviado para demonstração. Ao aprovar, revise o conteúdo e seus créditos.

## Adicionar ou aprovar um artigo

1. Adicione uma imagem em `public/` com licença e aprovação adequadas. Cadastre o original em `scripts/prepare-blog-images.mjs` e execute `node scripts/prepare-blog-images.mjs` para gerar versões WebP em 480, 800 e 1200 px. O script usa Sharp já instalado pela árvore de dependências do Next.js, sem dependência adicional. Utilize o caminho `/blog/nome-1200.webp` em `cover`; o componente BlogImage seleciona automaticamente as variantes.
2. Em `_content/articles.ts`, adicione um objeto `BlogArticle` com `id` e `slug` únicos, `title`, `summary`, `category`, `cover`, `coverAlt`, `author`, `publishedAt`, `updatedAt`, `status`, `featured`, `content` e `seo`.
3. Datas usam `AAAA-MM-DD`. Atualize `updatedAt` ao revisar. O tempo de leitura é calculado a 200 palavras por minuto.
4. Cada seção aceita `heading`, `paragraphs`, `level` (2 ou 3), `list` e um `link` interno opcional. O renderer utiliza elementos React e não aceita HTML bruto. Use somente links confiáveis revisados.
5. Use `status: 'draft'` para ocultar a publicação de listagens e rotas. Use `status: 'demo'` para avaliação pública identificada, com `noindex` e exclusão do sitemap. Somente após aprovação editorial, utilize `status: 'published'`.
6. A função `demo()` existe apenas para montar exemplos; não a utilize para artigos aprovados. Cadastre um objeto completo ou substitua o exemplo existente, preservando sua tipagem.
7. `featured: true` prioriza o artigo na manchete e na seleção lateral de destaques. A ordem geral é decrescente por data; empates preservam a ordem do catálogo.
8. Revise o conteúdo, recursos dos aplicativos, catálogo de streaming e condições comerciais antes da aprovação. Os exemplos não prometem inclusão de plataformas em planos.
9. Execute os testes e os builds e publique novamente. Não existe editor administrativo ou atualização remota nesta fase.

Publicações futuras ficam ocultas até sua data UTC. Como artigos e sitemap podem ser gerados estaticamente pelo Next.js, agendamento exige uma nova compilação/publicação na data de lançamento. Não há agendador automático.

## SEO e estados

Cada artigo tem canonical, Open Graph, Twitter Card, `BlogPosting` e `BreadcrumbList`. Demonstrativos usam `noindex, follow` e não entram no sitemap. Rascunhos e slugs desconhecidos retornam 404. O portal base é indexável; consultas, filtros e paginação usam `noindex, follow` e canonical do portal para evitar indexação de combinações de parâmetros. Metadados demonstrativos continuam disponíveis para revisão e compartilhamento.

Nenhum estado de carregamento artificial é utilizado. A busca indica sua navegação pendente; resultados vazios oferecem limpeza dos filtros. O compartilhamento não envia mensagens automaticamente: abre a plataforma escolhida ou copia o canonical após clique, com confirmação ou erro acessível. As imagens e URLs devem ser revisadas junto com a aprovação editorial.

## Validação

- `node --test tests/blog-content.test.mjs`: conteúdo, busca, status, sitemap e serialização segura.
- `npx tsc --noEmit`: contratos e integração TypeScript.
- `npx eslint app/site/blog tests/blog-content.test.mjs tests/blog-browser.mjs`: verificação focada.
- `npm run build`: compilação Vinext.
- `npm run build:vercel`: compilação Next.js.
- `tests/blog-browser.mjs`: teste de integração por Chrome DevTools Protocol com Node 22 e navegador Chromium local já iniciado em modo de teste. Variáveis opcionais `BLOG_TEST_URL` (padrão `http://localhost:3010`) e `BLOG_BROWSER_PORT` (padrão `9334`). Gera capturas ignoradas pelo Git em `outputs/blog-review/`. Use apenas perfil isolado de teste; não conecte a uma sessão pessoal do navegador.

O teste legado `tests/rendered-html.test.mjs` ainda verifica o skeleton do template, removido antes deste Blog; ele não representa o site institucional atual. Não foi alterado para mascarar essa incompatibilidade.

Para migrar a um CMS, mantenha o contrato `BlogArticle`, substitua a leitura do catálogo nas funções do servidor e defina validação, cache e política de aprovação no adaptador. Não importe o catálogo no componente de busca do cliente.
