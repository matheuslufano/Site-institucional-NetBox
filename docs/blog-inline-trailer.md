# Trailer dentro da abertura do Blog

Assistir trailer passou a reproduzir o vídeo dentro da primeira seção de /site/blog. O pôster e os textos saem suavemente e a janela aparece no mesmo espaço, com botão Fechar ao lado. Fechar ou Esc remove o iframe, interrompe a reprodução e devolve a apresentação e o foco ao botão de origem. O restante da página não fica bloqueado.

## Arquivos criados

- [components/blog/home/InlineTrailer.tsx](../components/blog/home/InlineTrailer.tsx): janela inline, iframe sob demanda, botão de fechar, foco e Escape.
- [components/blog/home/InlineTrailer.module.css](../components/blog/home/InlineTrailer.module.css): entrada/saída, janela responsiva e botão lateral com alvo de 44 px.
- [lib/blog/trailers.ts](../lib/blog/trailers.ts): normaliza somente URLs HTTPS do YouTube e IDs válidos para o domínio de embed youtube-nocookie.com.

## Arquivos alterados

- [components/blog/home/NewsCarousel.tsx](../components/blog/home/NewsCarousel.tsx): botão em vez de link externo; estado de reprodução; pausa de rotação, miniaturas, setas e swipe; restauração de foco ao fechar.
- [components/blog/home/NewsCarousel.module.css](../components/blog/home/NewsCarousel.module.css): desaparecimento do conteúdo, escurecimento do fundo e navegação desativada durante o vídeo.
- [content/blog/spotlights.json](../content/blog/spotlights.json): Toy Story 5 utiliza o trailer do canal oficial Pixar compatível com embed.
- [__tests__/blog/content.test.mjs](../__tests__/blog/content.test.mjs): mapeamento dos onze caracteres do vídeo, domínio de destino, autoplay, origem e rejeição de URLs inválidas ou não confiáveis.
- [components/blog/README.md](../components/blog/README.md), [public/blog/posters/README.md](../public/blog/posters/README.md) e [docs/blog-cinema-hero.md](blog-cinema-hero.md): comportamento e fontes atualizados.

## Comportamento

A seção mantém sua altura. O player só é criado depois do clique e removido imediatamente ao fechar, inclusive para parar o áudio. A troca de slides fica bloqueada durante a reprodução. A preferência por movimento reduzido desativa as transições. O iframe tem pelo menos 200 × 200 px úteis, permite reprodução inline e tela cheia e utiliza referrerPolicy strict-origin-when-cross-origin.

Não há modal de tela cheia sobre o site, bibliotecas novas, rotas novas ou mudanças no institucional. URLs de artigo e conteúdo editorial foram preservados.

## Validação

TypeScript, lint focado, onze testes e build Next.js aprovados. Build Vinext também aprovado. Revisão no navegador em 1440, 1024, 768, 375 e 320 px: abertura/fechamento, transições, altura estável, dimensões mínimas do vídeo, pausa da navegação e rotação, Escape, retorno de foco e movimento reduzido, sem overflow nem erros no console. O trailer foi observado reproduzindo no player integrado. Capturas em outputs/blog-review/inline-trailer-*.png.
