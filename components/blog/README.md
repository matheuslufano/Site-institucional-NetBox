# Blog Netbox

## Rotas e composição

### Sua próxima leitura / Em destaque

`home/NextReading.tsx` e `NextReading.module.css` apresentam as recomendações ao lado do feed. A seleção continua sendo `articles.slice(1, 4)`, com os mesmos artigos e links. O primeiro item tem foto horizontal e título em fonte editorial; os seguintes usam miniaturas e títulos compactos. A numeração é discreta, e categoria e tempo de leitura vêm do artigo. O rodapé aponta para as publicações da home. Sem recomendações, o bloco não é renderizado.

O acabamento usa fundo neutro, filete preto no topo, divisórias finas, imagens sem sobreposição e poucas cores. Não há gradientes, sombras decorativas ou animações de escala. Ícones Feather identificam tempo de leitura e a ação de navegação; o hover altera discretamente cor/opacidade, e movimento reduzido remove as transições. Em telas intermediárias, a principal fica ao lado das duas menores; no celular, a composição vira uma coluna.

A referência [FreeFrontend CSS Tabs](https://freefrontend.com/css-tabs/) foi consultada para estados de interação, adaptados aqui a uma linguagem editorial simples. Os estilos específicos foram retirados do CSS geral e colocados junto do componente. Esta atualização envolve cinco arquivos: NextReading, seu CSS Module (novo), CSS geral e os dois READMEs. Não altera API, conteúdo, permissões ou dependências.

### Página de categoria

`categories/CategoryPage.tsx` organiza a página em apresentação, abertura compartilhada, filtros e listagem. O título H1, a descrição da categoria e o caminho de navegação aparecem antes de `FeaturedNews`; a ação Explorar artigos aponta para a listagem. O carrossel existente conserva os artigos, os pôsteres/trailers disponíveis e o comportamento do cabeçalho.

`CategoryPage.module.css` fica junto da funcionalidade e concentra os estilos antes mantidos no CSS geral do Blog. A largura acompanha os 1280 px do portal. Os filtros ficam num painel claro, com busca GET dentro da categoria, chips por gênero e ordenação com ícones. A busca preserva categoria/grupo/ordem e começa na primeira página; limpar a busca e trocar de gênero mantêm os construtores de URL existentes. A ordenação continua usando `CategorySort.tsx`, sem mudanças de dados ou API.

Cada página continua com até seis artigos, divididos sem repetição entre três destaques e a grade restante. `FeaturedCard.tsx` apresenta a primeira matéria maior e duas complementares, com categoria, resumo na principal, autor, data, tempo de leitura e ação de leitura. Dois ou um resultado usam composições próprias. A grade reutiliza `ArticleCard`, com acabamento local. A paginação conserva os parâmetros e aponta para #publicacoes; o rodapé mostra o intervalo de artigos e a página atual. Setas indisponíveis são identificadas sem criar links inválidos. O estado vazio oferece retorno à categoria.

Ícones Feather da biblioteca instalada, superfícies claras, bordas arredondadas, gradientes de contraste nas imagens, foco visível e hover suave seguem a identidade do Blog e a referência [FreeFrontend CSS Tabs](https://freefrontend.com/css-tabs/). Em telas intermediárias, os destaques se reorganizam e a grade tem duas colunas; no celular, todos os cards ficam em uma coluna. Movimento reduzido desativa as transições.

Atualização: sete arquivos envolvidos, sendo um criado (`CategoryPage.module.css`) e seis alterados (CategoryPage, CategorySort, FeaturedCard, CSS geral e os dois READMEs). Sem novas dependências, migrações ou alterações de permissões.

### Faixa de categorias

`home/CategoryStrip.tsx` e `CategoryStrip.module.css` compõem a seção “Qual universo você quer explorar?” na página inicial. O cabeçalho apresenta a faixa e os cinco links existentes continuam vindo de `lib/blog/navigation.ts`, preservando as ilustrações locais e os endereços de cada categoria. As informações visuais específicas (ícone e chamada curta) ficam junto do componente. Nenhuma biblioteca adicional ou lógica de cliente foi adicionada.

A seção usa a mesma largura centralizada de 1280 px do conteúdo, painel claro com borda arredondada e cinco colunas iguais no desktop, sem reservar uma sexta coluna vazia. Os cards escuros têm fundo com brilho sutil, título e descrição, ilustração central e ação com seta circular. Ícones Feather da biblioteca existente identificam categorias e ações. A referência [FreeFrontend CSS Tabs](https://freefrontend.com/css-tabs/) orientou o agrupamento, o acabamento e as transições, adaptados à paleta Netbox.

Abaixo de 1100 px, a fila permite rolagem horizontal nativa com encaixe por card e orientação para deslizar. As imagens são decorativas e cada link mantém seu nome acessível. Há foco visível, elevação no hover e movimento leve da ilustração e da seta; `prefers-reduced-motion` remove essas animações. A atualização envolve quatro arquivos alterados: componente, CSS, este README e o README principal; nenhuma alteração em rotas, API ou banco.

### Recomendações da página inicial

“Filmes, séries e entretenimento” e “Universo nerd: HQs e jogos” usam `home/RecommendationSection.tsx` e seu CSS Module. A primeira matéria recebe uma imagem ampla com gradiente de contraste; as duas seguintes ficam em cards com miniaturas e metadados. Títulos, categorias, descrições, datas e tempo de leitura vêm dos artigos reais entregues pelo repositório. O componente é renderizado no servidor, sem estado de cliente nem dependências novas.

`HomePage.tsx` mantém a seleção anterior de entretenimento e universo nerd: os três primeiros artigos visíveis de cada grupo, na ordem existente. Cada seção tem links de categoria e “Ver todos” pelos mesmos construtores de URL. O componente trata zero, um ou dois artigos sem inventar recomendações; artigos demonstrativos mantêm sua identificação.

O estilo usa superfícies claras, bordas suaves e ícones Feather da biblioteca `react-icons`, com tons quentes para cinema e verdes discretos para HQs/jogos. A referência [FreeFrontend CSS Tabs](https://freefrontend.com/css-tabs/) orientou o agrupamento dos atalhos e os estados de interação. Há zoom leve nas imagens, elevação dos cards, foco visível e transições desativadas por `prefers-reduced-motion`. Abaixo de 800 px, a matéria principal e a lista ficam empilhadas; abaixo de 500 px, os cards secundários usam miniaturas compactas e omitem somente o resumo visual para priorizar o título.

Arquivos desta atualização: `components/blog/home/HomePage.tsx`, `RecommendationSection.tsx` (novo), `RecommendationSection.module.css` (novo), este README e o README principal. São cinco arquivos, sem alterações de API, banco, contratos ou permissões.

### Carrossel de Tecnologia e inovação

`home/ArticleCarousel.tsx` e `ArticleCarousel.module.css` formam a fila de recomendações de Tecnologia na home. `HomePage.tsx` entrega todos os artigos visíveis de Tecnologia na ordem existente, mantendo os próprios `ArticleCard` renderizados no servidor como filhos do controle de cliente. Não são enviados documentos completos dos artigos para implementar os controles.

A fila mostra três cards acima de 1100 px, dois até 1100 px e um até 650 px. Há uma seta em cada lateral; avançar depois do último grupo volta ao início e voltar no início vai ao final. O scroll nativo permite deslizar no celular e mantém os links dos cards acessíveis por teclado. O rodapé informa quais artigos estão visíveis e oferece Pausar/Reproduzir com ícones Feather.

O avanço acontece a cada seis segundos quando há conteúdo fora da área visível. Pausa ao passar o ponteiro, focar qualquer controle/link, interagir manualmente, ocultar a aba ou sair da área visível. `prefers-reduced-motion` desativa a rotação automática e usa movimento imediato nas setas. Se todos os cards couberem, as setas ficam desabilitadas e a reprodução não aparece. Sem artigos, é exibida uma mensagem de indisponibilidade. Observadores e timers são removidos ao desmontar.

O visual mantém os cards existentes, com setas circulares, hover laranja, foco visível e transições suaves, seguindo a referência FreeFrontend já utilizada pelo módulo. Não foram adicionadas dependências, APIs ou mudanças de banco. Nesta atualização são dois arquivos novos e três alterados: componente/CSS, HomePage e os dois READMEs.

- `/site/blog`: portal independente, com carrossel das dez últimas notícias, seleção numerada lateral, feed de notícias, busca e blocos por assunto.
- `/site/blog/[slug]`: leitura individual, breadcrumb, compartilhamento e relacionados.
- `?categoria=tecnologia`: filtra pela categoria; os identificadores estão em `lib/blog/navigation.ts`.
- `?q=roteador`: busca sem distinção de caixa ou acentos por título, resumo e categoria. Várias palavras devem estar presentes.
- `?grupo=entretenimento`: reúne todas as categorias de um bloco editorial.
- `?pagina=2`: acumula lotes de seis na home e abre páginas numeradas nas categorias, preservando os filtros. Valores inválidos são limitados ao intervalo disponível.

As páginas são Server Components. O cabeçalho, o carrossel, a busca, o compartilhamento e a adaptação de imagens utilizam componentes de cliente próprios. O formulário de busca tem fallback GET e usa o App Router quando o JavaScript está disponível. Categorias, cards e carregamento incremental usam `next/link`. Não há API, autenticação, CMS ou banco de dados para o Blog.

`app/(blog)/site/blog/layout.tsx` possui estrutura editorial própria: `BlogHeader`, navegação por assuntos, conteúdo e `BlogFooter`. Não monta `SiteLayout`, cabeçalho/rodapé institucionais, atalhos flutuantes, ofertas ou banners de planos. A rota e o conteúdo permanecem no mesmo projeto, isolados na pasta do Blog, sem novo servidor, domínio ou instalação. A composição editorial usa a home do Ei Nerd como referência de hierarquia (manchete, seleção lateral, feed recente e blocos por assunto), mantendo marca e cores Netbox. O link discreto “Site Netbox” permite sair do portal. Marca, categorias, busca e retorno ao site compartilham uma única faixa com acabamento de vidro sobre base preta, fixa no topo, sem a antiga divisão branca/preta. Em telas abaixo de 1100 px, o menu expande na mesma faixa e fecha ao navegar ou pressionar Escape. O cabeçalho fica sob Suspense para ler filtros da URL sem impedir a renderização estática dos artigos.

A área editorial permanece clara mesmo com a preferência escura salva no institucional; não altera a preferência. O modal comercial é montado somente no grupo de rotas institucional. A home institucional mantém seus próprios componentes e comportamentos.

As capas das notícias são do acervo local e usam `next/image` com loader local e variantes WebP pré-geradas, dimensões proporcionais, `sizes` e carregamento prioritário apenas na capa principal. O loader evita depender dos bindings ASSETS/IMAGES do otimizador Cloudflare, ausentes na prévia Vinext.

## Carrossel de cinema e séries

A abertura segue a composição da referência fornecida: pôster vertical ao lado do título e de um resumo editorial, com a imagem da notícia desfocada ao fundo. Ler artigo abre a publicação interna. Assistir trailer reproduz o vídeo dentro da própria seção: pôster e textos desaparecem com transição e dão lugar ao player. Não há carregamento de players externos antes do clique. Não são inventadas notas, avaliações ou duração dos filmes.

home/NewsCarousel.tsx controla as dez publicações visíveis mais recentes, preparadas no servidor por FeaturedNews.tsx. O CSS exclusivo está em NewsCarousel.module.css. Os pôsteres e destinos dos trailers são cadastrados em content/blog/spotlights.json e associados aos artigos pelo adaptador content/blog/cinema.ts através do campo opcional spotlight de BlogArticle. Fontes e URLs das imagens estão no próprio cadastro. O título curto serve apenas ao slide; títulos, textos e SEO dos artigos permanecem intactos. Os resumos usam o texto demonstrativo existente, sem apresentar uma crítica aprovada que ainda não existe.

As miniaturas ficam no centro dos controles, com uma seta em cada lado e contador. Há navegação por clique, teclado e swipe. A miniatura ativa é trazida para a área visível por rolagem somente horizontal, sem deslocar a página. Não existe botão de pausa. O intervalo de seis segundos pausa com foco, hover, aba oculta, seção fora da tela ou preferência de movimento reduzido. Listeners e timers são removidos ao desmontar.

Os slides compartilham uma célula de grid, reservando a altura do maior conteúdo. Inativos ficam inertes e ocultos de leitores de tela. O primeiro pôster e o primeiro fundo têm prioridade; outros fundos são montados quando ativos. Imagens de fundo e miniaturas são decorativas. No celular, pôster e título continuam lado a lado, enquanto resumo e ações usam a largura disponível. Sem dados spotlight, o componente utiliza a capa existente e omite o link de trailer, evitando controles sem destino.

A seleção Sua próxima leitura continua ao lado de Mais recentes em NextReading.tsx, independente do carrossel. O restante do portal e do institucional não foi reformulado.

## Cabeçalho de vidro e rolagem

A marca do cabeçalho usa `public/blog/netbox-blog-logo.png`, cópia integral do PNG transparente fornecido pelo usuário, ao lado da identificação BLOG. `layout/Header.tsx` usa a mesma imagem na renderização normal e no fallback de Suspense, com texto alternativo e link acessível para o início. `brandLogo` mantém a proporção original: 136 px de largura no desktop, 118 px abaixo de 1100 px e 102 px abaixo de 360 px. O arquivo é servido diretamente, sem depender do otimizador de imagens da hospedagem; a arte não foi recortada ou redesenhada. A altura, a transparência e o desfoque da barra permanecem iguais.

A área reservada no topo de `.main` recebe uma faixa preta com a altura de `--blog-header-height`. Esse fundo pertence à página, não ao elemento `.portalHeader`: ao rolar, a faixa acompanha o conteúdo e o cabeçalho fixo continua mostrando o conteúdo desfocado por trás. A altura acompanha automaticamente os valores de desktop e celular.

O cabeçalho do Blog é fixo no topo, com fundo escuro translúcido (`rgba(8, 10, 12, 0.64)`), reflexos discretos e desfoque do conteúdo atrás da barra (`backdrop-filter: blur(32px) saturate(135%)`, com prefixo WebKit). A transparência fica no fundo, mantendo textos e ícones nítidos. Sem suporte ao desfoque, o fallback usa preto opaco. O conteúdo mantém espaço equivalente à barra (86 px no desktop, 76 px no tablet/mobile). Navegação e conteúdo não mudam de posição quando a barra se esconde.

`hooks/blog/useHeaderVisibility.ts` combina o hook institucional de direção, sem modificá-lo, com o marcador `data-ui="blog-first-section"`. Na home o marcador envolve os destaques; nas categorias, a apresentação da seção; nos artigos, o cabeçalho editorial. Em buscas e grupos sem manchete, a barra de apresentação marca o início. Enquanto essa área ainda passa abaixo da barra fixa, o cabeçalho permanece visível. Depois, uma descida acumulada de 28 px o oculta e uma subida o revela; a tolerância existente evita oscilar com movimentos mínimos. A medida usa a altura recolhida da barra para não variar quando o menu abre.

A entrada e a saída usam transform vertical e opacidade com transições de 240–320 ms. A preferência de movimento reduzido desativa a animação. O menu e o painel de busca mantêm o cabeçalho visível enquanto abertos. Quando oculto, o cabeçalho fica inerte e não recebe foco nem cliques. A lógica usa eventos passivos e requestAnimationFrame, recalcula ao redimensionar ou navegar e remove listeners ao desmontar. Sem suporte a backdrop-filter, há fundo preto mais opaco para preservar a leitura.

## Painel de pesquisa

A lupa do cabeçalho abre “Encontre sua próxima leitura” em um painel fixo à direita, renderizado por `components/blog/search/SearchPanel.tsx`. Não há cópias fixas do formulário na listagem ou nas categorias. A antiga lateral editorial também foi movida integralmente para o painel: assuntos, escolhas da redação e aviso demonstrativo. O feed principal utiliza a largura liberada. A lupa permanece acessível ao lado da marca também em smartphones, sem exigir a abertura do menu de categorias.

O painel utiliza `dialog.showModal()` para conter o foco e tornar o restante da página inerte. Ao abrir, foca o campo de busca e bloqueia a rolagem de fundo; ao fechar, restaura o foco e a rolagem. Pode ser fechado pelo botão, Esc ou clique na área escurecida. No mobile ocupa a largura disponível e respeita movimento reduzido.

A busca reutiliza `SearchForm`, preserva categoria e grupo da URL e fecha o painel ao enviar. Os resultados continuam navegando pelo App Router, com URLs compartilháveis. O termo atual aparece preenchido ao reabrir a busca. O conteúdo editorial é renderizado no servidor por ReadingSuggestions e passado ao cabeçalho/painel como ReactNode, mantendo o catálogo fora do JavaScript do cliente. Os links de assuntos e artigos fecham o painel ao navegar. As escolhas da redação permanecem visíveis também no mobile. Não há nova API, biblioteca ou dependência.

## Páginas de categoria

As categorias usam a organização editorial da referência [Teoria Geek — Filmes](https://teoriageek.com.br/category/filmes/), mantendo cabeçalho, marca, cores e conteúdos Netbox. O layout é de largura completa, sem a antiga lateral: breadcrumb e título compacto, faixa de gêneros com ordenação à direita, três notícias com texto sobre a imagem e grade de cards abaixo. A grade tem três colunas no desktop, duas no tablet e uma no celular.

`components/blog/categories/CategoryPage.tsx` compõe o arquivo; `components/blog/categories/FeaturedCard.tsx` renderiza os destaques e `components/blog/categories/CategorySort.tsx` controla a ordenação por App Router. O card compartilhado possui a opção archive para mostrar autor e data antes do resumo nessa listagem, sem alterar os demais cards do site.

As categorias mantêm `?categoria=...`. Os gêneros vêm do campo topic dos artigos do assunto e usam a busca real via `?q=...`; Todos limpa o filtro. A ordenação aceita `?ordem=recentes` (padrão), `antigas` ou `destaques`. Não há opção de popularidade ou nota sem dados reais para sustentá-la. A troca de ordem preserva categoria, gênero/busca e grupo, e reinicia na página 1.

Nas categorias, `?pagina=2` seleciona uma página com seis publicações, em vez de acumular itens. As três primeiras publicações de cada página recebem destaque e as seguintes aparecem na grade; não há repetição entre as duas áreas ou entre páginas. A paginação numerada preserva os filtros e a ordem. Listagens com uma ou duas publicações se adaptam à quantidade real. Estados vazios permitem limpar a busca. A home continua usando Carregar mais.

O título e a descrição de SEO acompanham a categoria. A política de canonical e noindex dos filtros e conteúdos demonstrativos foi preservada. Nenhuma nova API, dependência ou CMS foi introduzido. Links antigos de categorias continuam funcionando.

## Linha do tempo e foco editorial

O Blog cobre tecnologia e cultura nerd e pop. As categorias principais são Tecnologia, Filmes, Séries, HQs, Jogos e Entretenimento; os blocos editoriais agrupam esses assuntos. O catálogo demonstrativo inclui guias de HQs e séries, sem anunciar acontecimentos ou lançamentos não verificados.

O feed possui uma linha vertical contínua gerada pelo pseudo-elemento de `styles.feed`, alinhada às cápsulas de data por `--timeline-rail`. Um ícone de foguete da biblioteca existente `react-icons` marca seu início. O ícone é decorativo e oculto de tecnologias assistivas. As datas são reais; não usamos “agora mesmo” para simular atualidade. O ano continua disponível no atributo datetime e no nome acessível. A linha se adapta à quantidade de artigos, aos filtros e ao carregamento incremental, sem animação obrigatória.

As URLs antigas de categorias são resolvidas por `resolveCategory` em `lib/blog/navigation.ts`: Internet/Wi-Fi, Dicas e Novidades Netbox agora abrem Tecnologia; Filmes e Séries abre Filmes; Streaming abre Entretenimento. Os slugs dos artigos anteriores foram preservados.

## Organização

Rotas: app/(blog)/site/blog. Telas: components/blog, nas pastas home, layout, articles, categories e search. Conteúdo: content/blog. Regras: lib/blog. Contratos: types/blog.ts. Estilos: styles/blog/Blog.module.css. Caminhos deste documento partem da raiz.

## Textos e imagens de cinema enviados em 29/10/2026

Os dez textos recebidos ficam em `content/blog/cinema.json`, com título, texto integral, gênero, nome exato do JPG e descrição da capa. `content/blog/cinema.ts` adapta esse cadastro ao contrato BlogArticle. A primeira frase é usada como resumo; as frases restantes formam o corpo, preservando o texto completo e a ordem enviada. Não foram acrescentados fatos aos textos recebidos.

As publicações têm categoria Filmes e gênero próprio em `topic` (Super-heróis, Aventura, Animação, Biografia, Games e Cinema, Comédia e Drama, Ficção científica, Suspense e Terror ou Terror). O gênero aparece nos cards, destaques e artigo e participa da busca. As quatro primeiras notícias entram nos destaques. A data do cadastro é 2026-10-29, mantendo a ordenação recebida entre artigos da mesma data.

Os JPGs recebidos em `public/blog/` são preservados. `node scripts/prepare-blog-images.mjs` lê o cadastro de cinema e gera capas WebP de 480, 800 e 1200 px para os dez filmes, além das oito capas anteriores. O catálogo total possui vinte artigos e 54 variantes WebP de dezoito imagens. Os artigos anteriores e seus slugs permanecem disponíveis. As capas antigas podem ser regeneradas pelos originais locais do site.

Os textos fornecidos mantêm status demonstrativo e noindex até aprovação editorial, conforme a política existente. Os links inline de imagens enviados na conversa não são usados como fonte editorial: as capas vêm dos arquivos locais identificados pelo nome do filme. Não foi realizada checagem factual das afirmações fornecidas; elas foram incorporadas como conteúdo enviado para demonstração. Ao aprovar, revise o conteúdo e seus créditos.

## Adicionar ou aprovar um artigo

1. Adicione uma imagem em `public/` com licença e aprovação adequadas. Cadastre o original em `scripts/prepare-blog-images.mjs` e execute `node scripts/prepare-blog-images.mjs` para gerar versões WebP em 480, 800 e 1200 px. O script usa Sharp já instalado pela árvore de dependências do Next.js, sem dependência adicional. Utilize o caminho `/blog/nome-1200.webp` em `cover`; o componente CoverImage seleciona automaticamente as variantes.
2. Em `content/blog/articles.ts`, adicione um objeto `BlogArticle` com `id` e `slug` únicos, `title`, `summary`, `category`, `cover`, `coverAlt`, `author`, `publishedAt`, `updatedAt`, `status`, `featured`, `content` e `seo`.
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

- `node --test __tests__/blog/content.test.mjs`: conteúdo, busca, status, sitemap e serialização segura.
- `npx tsc --noEmit`: contratos e integração TypeScript.
- `npx eslint components/blog hooks/blog lib/blog content/blog types/blog.ts __tests__/blog/content.test.mjs __tests__/blog/browser.mjs`: verificação focada.
- `npm run build`: compilação Vinext.
- `npm run build:vercel`: compilação Next.js.
- `__tests__/blog/browser.mjs`: teste de integração por Chrome DevTools Protocol com Node 22 e navegador Chromium local já iniciado em modo de teste. Variáveis opcionais `BLOG_TEST_URL` (padrão `http://localhost:3010`) e `BLOG_BROWSER_PORT` (padrão `9334`). Gera capturas ignoradas pelo Git em `outputs/blog-review/`. Use apenas perfil isolado de teste; não conecte a uma sessão pessoal do navegador.

O teste legado `__tests__/legacy/template.test.mjs` ainda verifica o skeleton do template, removido antes deste Blog; ele não representa o site institucional atual. Foi arquivado e está fora de npm test, que agora cobre conteúdo e arquitetura.

Para migrar a um CMS, mantenha o contrato `BlogArticle`, substitua a leitura do catálogo nas funções do servidor e defina validação, cache e política de aprovação no adaptador. Não importe o catálogo no componente de busca do cliente.

O registro do código de afiliado em links de entrada é preservado por components/shared/ReferralTracker.tsx e services/referrals.ts. Esse componente não renderiza interface; o modal comercial permanece exclusivo do institucional.

## Atalhos ilustrados de categorias

home/CategoryStrip.tsx aparece somente na home sem filtros, entre os destaques e Mais recentes. Usa o cadastro único de lib/blog/navigation.ts e os mesmos links por categoria do cabeçalho. As seis imagens PNG transparentes ficam em public/blog/categories, com 320 × 320 px e carregamento lazy. A faixa tem seis colunas no desktop e rolagem horizontal com snap abaixo de 1100 px, sem ampliar a largura da página. CategoryStrip.module.css fica ao lado do componente e respeita movimento reduzido. Origem e prompts das imagens estão em public/blog/categories/README.md.

## Reprodução integrada de trailers

home/InlineTrailer.tsx e InlineTrailer.module.css apresentam a janela dentro da área do slide, com botão Fechar ao lado. O iframe só existe enquanto a reprodução está aberta: fechá-lo interrompe o áudio e restaura o pôster, os textos e o foco no botão de origem. Esc também fecha quando não há outro diálogo aberto. A janela é uma região inline, sem bloquear a navegação do restante da página.

Durante a reprodução, autoplay, setas, miniaturas e swipe do carrossel ficam pausados. A altura da seção é preservada. A transição de saída dos textos dura 260 ms; a entrada do vídeo tem atraso de 120 ms e dura 260–280 ms. Movimento reduzido remove essas animações. O player conserva ao menos 200 × 200 px de área útil nos celulares e oferece tela cheia pelo controle do provedor.

lib/blog/trailers.ts aceita apenas URLs HTTPS reconhecidas do YouTube e IDs válidos. Produz o embed em youtube-nocookie.com com autoplay, playsinline, origem do site e referrerPolicy apropriada. Não carrega a API JavaScript do YouTube. Parâmetros seguem a [documentação oficial](https://developers.google.com/youtube/player_parameters). Toy Story 5 utiliza a versão do [canal oficial Pixar](https://www.youtube.com/watch?v=c51ND9Hdbw0), para oferecer a mesma reprodução integrada dos outros nove filmes.

## Abertura compartilhada nas categorias

### Catalogo externo de obras

O detalhe mostra fotos e videos dentro do mesmo elemento central do trailer. Os botoes laterais selecionam o tipo; setas triangulares navegam entre arquivos, clicar amplia e o X superior direito fecha. Apenas a midia selecionada e carregada, com fotos de 780px no elemento e 1280px na ampliacao. O fundo animado usa uma capa pequena e uma unica camada desfocada; o player e carregado sob demanda.

O arquivo preenche o visualizador inteiro. Os controles da pagina sao sobrepostos e aparecem por cinco segundos ao selecionar/trocar a midia ou alternar a ampliacao. Depois aparecem apenas com mouse sobre o botao ou foco de teclado; no toque permanecem visiveis. As barras nao reservam altura e os botoes usam acabamento escuro com hover laranja.

`MediaImage` preserva o preenchimento das imagens remotas no Vinext. A ampliacao e um dialog fixo centralizado, limitado a janela, sem alterar a largura da grade ou da pagina.

A secao de obras possui fundo em largura total e conteudo centralizado em ate 1280px, com margens laterais ampliadas para reduzir os cards. No celular, preserva 20px de respiro lateral. A busca em portugues fica no topo direito e Ver mais centralizado. O cabecalho compartilha a busca da API em Filmes e series e preserva Artigos do blog. `MediaExplorer`, `MediaCards` e `/api/blog/media` implementam essa navegacao; veja `docs/blog-media.md`.

O catalogo aparece apenas em Filmes e Series, depois da listagem e da paginacao. Tecnologia, HQs e Jogos nao exibem essa secao.

O detalhe da obra possui fundo escuro animado com as cores da capa e visualizador unificado de fotos/videos sob demanda. A atribuicao do provedor fica em `/site/blog/creditos`, acessivel no rodape. Consulte `docs/blog-media.md` para os estados de midia e controles acessiveis.

As categorias incluem `media/MediaCatalog.tsx`, com tendencias reais do TMDB e links para `/site/blog/obras/movie/:id` ou `/site/blog/obras/tv/:id`. A configuracao do token no servidor, estados de indisponibilidade e condicoes de licenca estao em [docs/blog-media.md](../../../docs/blog-media.md).

### Abertura dos artigos e autoria

O botão de WhatsApp usa o SVG local `public/blog/providers/whatsapp-share.svg`, derivado do ícone Font Awesome da dependência instalada, com preenchimento branco explícito e dimensões de 20 px. Isso evita dependência da cor herdada dos SVGs; o link de compartilhamento permanece `wa.me`.

O compartilhamento inclui também Pinterest e e-mail. Os dez controles (oito destinos, compartilhar pelo dispositivo e copiar link) usam apenas ícones em círculos de 36 px no desktop e 42 px no celular. Dimensões mínimas, preenchimento zero e SVGs sem encolhimento preservam o formato; as redes mantêm suas cores e os nomes ficam em tooltips/rótulos acessíveis. A ordem começa por WhatsApp, X, Instagram e Telegram.

“Sobre este artigo” reutiliza a foto/nome de `AuthorIdentity` abaixo do título da lateral. `ShareButtons.tsx` e `ShareButtons.module.css` oferecem círculos com ícones e cores de WhatsApp, X, Telegram, Facebook, LinkedIn e Instagram, além de compartilhar pelo dispositivo e copiar link. Cada controle tem tooltip e nome acessível. Instagram copia o link e informa que ele deve ser colado no aplicativo; não simula uma publicação direta. O compartilhamento do dispositivo usa `navigator.share` quando disponível e copia o link como alternativa. Cancelamento não é tratado como falha. Links sociais abrem a tela de composição, preservando a confirmação pelo leitor.

“Continue a leitura” reutiliza `home/ArticleCarousel` com `compact`: cartões menores em uma única faixa, setas, rolagem por toque, contador e suporte à redução de movimento. Nesse modo, não há rotação automática. A página pública e a prévia fornecem todos os demais artigos visíveis por data decrescente, sem limitar a três/quatro nem priorizar a categoria. Rascunhos, artigos futuros e o artigo atual continuam excluídos. O carrossel da página inicial mantém seu comportamento padrão.

`articles/ArticleView.tsx` e `ArticleView.module.css` apresentam fundo horizontal (`cover`), pôster opcional à esquerda (`spotlight.poster`), título, subtítulo e autoria imediatamente abaixo. A composição escura é restrita ao artigo e também aparece na prévia; categorias e página inicial preservam seus estilos. A referência estrutural é https://letterboxd.com/film/vertigo/, adaptada à marca Netbox e sem avaliações ou estatísticas fictícias. Metadados e compartilhamento continuam reais; conteúdo formatado, imagens, vídeos, fontes e relacionados são preservados. Links e controles usam ícones e foco visível, com referência complementar https://freefrontend.com/css-tabs/.

`articles/AuthorIdentity.tsx` usa `author` e o campo opcional `authorPhotoUrl`, sem consultar usuários no navegador. Mostra iniciais se a foto estiver ausente, inválida ou indisponível. O backend fornece a URL da foto do usuário vinculado por `authorId`, inclusive em artigos com snapshots antigos, sem expor outros campos de perfil nem rascunhos. A prévia aceita a mesma URL pública ou `authorUser.photoUrl` e preserva o pôster, validando URLs. Nenhuma migração é necessária; artigos antigos sem autor vinculado continuam exibindo seu nome editorial.

As categorias usam `CATEGORY_PAGE_SIZE = 12`: tres destaques e ate nove cards em `archiveGrid`, formando tres filas de tres no desktop quando houver artigos suficientes. Tablet e celular preservam duas e uma colunas, respectivamente. A ultima pagina e buscas com poucos resultados exibem apenas os artigos existentes, sem repeticoes. A home continua usando `PAGE_SIZE = 6`.

Tecnologia, Filmes, Séries, HQs e Jogos usam a mesma FeaturedNews/NewsCarousel da home, antes da listagem editorial existente. CategoryPage fornece até dez artigos dos resultados da própria categoria, respeitando busca, gênero e ordenação. A paginação continua atuando somente na listagem; a abertura usa os destaques do conjunto filtrado.

O layout `background` de Tecnologia exibe a capa cadastrada no lado direito: usa o poster da obra quando cadastrado ou a capa do artigo, preenchendo todo o elemento com object-fit: cover e recorte proporcional quando necessario. No celular, a imagem fica abaixo do texto. As artes locais `public/blog/technology/art/signal.gif` e `orbit.gif` representam circuitos e orbitas na paleta Netbox. Cada GIF toca uma vez por quatro segundos, apenas no slide ativo, e fica oculto com `prefers-reduced-motion`. Links e controles existentes foram preservados. Outras categorias mantem o layout `poster`. Referencia de efeitos e estados: https://freefrontend.com/css-tabs/.

Com uma publicação, a abertura não mostra setas ou miniaturas de paginação. Com resultados vazios, ela é omitida e a listagem mantém a mensagem de busca vazia. A chave do carrossel considera apresentação e artigos selecionados: mudar de categoria ou conjunto de resultados reinicia o slide e desmonta qualquer player anterior. Existe somente um marcador blog-first-section em cada estado. O H1 da categoria fica visível na apresentação antes da abertura; o título da listagem é H2 e os títulos dos destaques são H3.

### Imagens do slide principal

O quadro de `NewsCarousel` acompanha a proporcao natural da imagem, sem caixa fixa 2:3 e sem corte da capa. A altura maxima e 340px. Imagens com transparencia ficam sem moldura, fundo ou sombra; no desktop recebem ate 300px de largura. A transparencia e verificada no carregamento pelo canal alpha, inclusive em URLs sem extensao. Quando CORS impede a leitura, a imagem permanece sem moldura. O link do artigo e preservado e identificado por `data-component="lead-slide-poster"`. Estilos em `home/NewsCarousel.module.css`.
