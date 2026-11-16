# Abertura do Blog nas categorias

A seção de abertura da home foi reutilizada em /site/blog?categoria=tecnologia, filmes, series, hqs e games. Cada categoria mostra somente seus resultados e mantém a listagem, filtros, busca, ordenação e paginação existentes abaixo.

## Arquivos alterados

- [components/blog/categories/CategoryPage.tsx](../components/blog/categories/CategoryPage.tsx): abertura antes do arquivo editorial, até dez itens filtrados, H1 acessível e marcador único para o cabeçalho.
- [components/blog/home/FeaturedNews.tsx](../components/blog/home/FeaturedNews.tsx): parâmetros de apresentação e rótulo acessível; chave que reinicia o carrossel ao mudar o conjunto de artigos.
- [components/blog/home/NewsCarousel.tsx](../components/blog/home/NewsCarousel.tsx): layout poster ou background; versão tecnológica com imagem à direita e título clicável. Mantém os controles e o player compartilhados.
- [components/blog/home/NewsCarousel.module.css](../components/blog/home/NewsCarousel.module.css): composição tecnológica, fundo menos desfocado e capas genéricas sem distorção.
- [styles/blog/Blog.module.css](../styles/blog/Blog.module.css): título visível do arquivo adaptado para H2, preservando sua aparência.
- [components/blog/README.md](../components/blog/README.md) e [README.md](../README.md): regras de composição e manutenção.

## Comportamento

Tecnologia mostra título, descrição, fundo e imagem cadastrada à direita, sem ficha de obra ou botões extras. O título abre o artigo. A identificação demonstrativa é preservada. As demais categorias mostram pôster cadastrado ou capa existente; não foram criadas obras ou imagens fictícias para os guias atuais. Trailers continuam integrados quando há um vídeo válido cadastrado.

A seleção da abertura usa os resultados filtrados e ordenados, até dez itens. A paginação não acumula itens no carrossel. Com um item, não há setas ou controles sem função; sem resultados, a abertura é omitida. A mudança de categoria/conjunto reinicia o índice e remove o player antigo, evitando áudio residual ou índice fora do intervalo. A home permanece no layout cinematográfico anterior.

Sem novas bibliotecas, assets, rotas ou configurações. O institucional não foi alterado.

## Validação

TypeScript, ESLint focado, onze testes de conteúdo/arquitetura e build Next.js aprovados. Revisão no navegador em cinco larguras para as cinco categorias: seleção contextual, Tecnologia sem pôster, capa nas demais, troca de categoria com player aberto e índice na última posição, filtros, paginação, vazio e home preservados, sem overflow ou erros no console. Capturas em outputs/blog-review/category-hero-*.png. Build Vinext também aprovado e revisão final repetida após o ajuste das capas e do fundo.

## Limites das imagens de Tecnologia

### Acabamento compartilhado dos carrosséis

Todas as categorias e a abertura principal compartilham cantos de 14 px nas imagens frontais e desfoque de 3 px no fundo, definidos em `NewsCarousel.module.css`. O token local `--carousel-image-radius` mantém imagem e moldura consistentes. Imagens transparentes continuam sem sombra ou contorno adicionados.

O fundo recebe deslocamento e zoom suaves em ciclos alternados de 18 segundos (`carouselBackdropDrift`), sem alterar dimensões do layout. A animação pausa durante trailers e fica desativada quando o dispositivo solicita movimento reduzido. O recorte do fundo evita bordas vazias durante o movimento.

As imagens frontais têm cantos de 14 px no próprio elemento da imagem, respeitando sua proporção dentro da área reservada. O fundo utiliza desfoque de 3 px, mantendo a sobreposição escura para legibilidade do texto.

O layout background reserva uma área de 340 px de altura no desktop/tablet e 260 px no celular. A imagem ocupa essa área com object-fit: contain, preservando proporção e transparência, sem cortes. A largura acompanha a coluna e fica limitada a 340 px no celular. As dimensões naturais de arquivos novos não aumentam a linha compartilhada pelos slides nem alteram o tamanho das outras imagens. Os seletores existentes .poster e .poster img ficam restritos a data-layout=background, no NewsCarousel.module.css; data-component=lead-slide-poster permite inspecionar a área no navegador.
