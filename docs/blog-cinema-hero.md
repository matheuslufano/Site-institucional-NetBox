# Abertura cinematográfica do Blog

A primeira seção foi reformulada com base no modelo enviado: pôster vertical à esquerda, título e texto breve ao lado, imagem do filme desfocada ao fundo, botões Ler artigo e Assistir trailer e navegação por miniaturas. Preserva a identidade Netbox, o cabeçalho existente e as outras seções.

## Arquivos criados

- [components/blog/home/NewsCarousel.module.css](../components/blog/home/NewsCarousel.module.css): layout exclusivo, fundo desfocado, pôster, ações, miniaturas, foco e responsividade.
- [content/blog/spotlights.json](../content/blog/spotlights.json): dez títulos curtos, pôsteres, fontes e links oficiais de trailer.
- public/blog/posters/*.webp: dez pôsteres locais, associados aos slugs dos artigos.
- [public/blog/posters/README.md](../public/blog/posters/README.md): créditos e links para todas as fontes.

## Arquivos alterados

- [components/blog/home/NewsCarousel.tsx](../components/blog/home/NewsCarousel.tsx): nova apresentação, ações independentes, miniaturas e rolagem somente horizontal da seleção ativa. Mantém autoplay, swipe, teclado, inatividade e movimento reduzido.
- [components/blog/home/FeaturedNews.tsx](../components/blog/home/FeaturedNews.tsx): transforma os artigos em dados de exibição e preserva o texto fornecido.
- [types/blog.ts](../types/blog.ts): campo opcional spotlight para cinema e séries.
- [content/blog/cinema.ts](../content/blog/cinema.ts): associação de pôster e trailer por slug.
- [styles/blog/Blog.module.css](../styles/blog/Blog.module.css): remoção dos estilos antigos do carrossel, agora isolados no módulo específico.
- [__tests__/blog/content.test.mjs](../__tests__/blog/content.test.mjs): fixture de mídia, integridade dos pôsteres/URLs e compatibilidade dos rótulos de categorias arquivadas.
- [__tests__/blog/browser.mjs](../__tests__/blog/browser.mjs): usa os títulos curtos do cadastro de mídia na verificação dos slides.
- README.md e components/blog/README.md: funcionamento, manutenção e fontes atualizados.

## Manutenção

Adicione ou atualize a entrada de spotlight pelo slug do artigo e cadastre um pôster local e um vídeo oficial. Séries podem usar o mesmo campo opcional em BlogArticle. Sem trailer cadastrado, o botão não é renderizado. Os artigos e seus metadados originais não foram alterados. Os conteúdos atuais continuam demonstrativos e sem indexação individual, aguardando aprovação editorial. Nenhuma nota ou análise crítica foi inventada.

Não há novas bibliotecas, rotas, CMS ou variáveis de ambiente. Trailers são montados somente após clique, dentro da própria seção, com fechamento e restauração da apresentação. Os fundos usam as imagens existentes do mesmo filme. A seleção lateral Sua próxima leitura e a posição atual da faixa de categorias foram preservadas.

## Verificação

TypeScript, ESLint focado, dez testes de conteúdo/arquitetura e build Next.js aprovados. Os dez trailers tiveram os destinos conferidos. Revisão no navegador em 1440, 1024, 768, 375 e 320 px: pôster/título lado a lado, fundo desfocado, dez miniaturas, setas, teclado, links de artigos e trailers, slides inertes, altura estável e ausência de overflow ou erros no console. Capturas em outputs/blog-review/cinema-hero-*.png. Build Vinext também aprovado.

Alterações locais; sem implantação.

### Pôsteres criados

- [public/blog/posters/homem-aranha-um-novo-dia.webp](../public/blog/posters/homem-aranha-um-novo-dia.webp)
- [public/blog/posters/a-odisseia-christopher-nolan.webp](../public/blog/posters/a-odisseia-christopher-nolan.webp)
- [public/blog/posters/toy-story-5-woody-e-buzz.webp](../public/blog/posters/toy-story-5-woody-e-buzz.webp)
- [public/blog/posters/michael-cinebiografia-rei-do-pop.webp](../public/blog/posters/michael-cinebiografia-rei-do-pop.webp)
- [public/blog/posters/super-mario-galaxy-o-filme.webp](../public/blog/posters/super-mario-galaxy-o-filme.webp)
- [public/blog/posters/o-diabo-veste-prada-2.webp](../public/blog/posters/o-diabo-veste-prada-2.webp)
- [public/blog/posters/devoradores-de-estrelas.webp](../public/blog/posters/devoradores-de-estrelas.webp)
- [public/blog/posters/minions-e-monstros.webp](../public/blog/posters/minions-e-monstros.webp)
- [public/blog/posters/obsessao-suspense.webp](../public/blog/posters/obsessao-suspense.webp)
- [public/blog/posters/backrooms-um-nao-lugar.webp](../public/blog/posters/backrooms-um-nao-lugar.webp)

A reprodução integrada foi detalhada em [blog-inline-trailer.md](blog-inline-trailer.md).
