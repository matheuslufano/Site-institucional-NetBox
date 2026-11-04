# Sua próxima leitura ao lado de Mais recentes

A seleção numerada foi retirada do carrossel e movida para a lateral direita da listagem na home /site/blog. O carrossel ocupa a largura da abertura. Em telas abaixo de 1024 px, o bloco aparece após a listagem. Busca e categorias mantêm sua composição, e os mesmos artigos e links foram preservados.

## Arquivos

- Criado: [components/blog/home/NextReading.tsx](../components/blog/home/NextReading.tsx), componente de servidor com a seleção editorial existente.
- Alterado: [components/blog/home/FeaturedNews.tsx](../components/blog/home/FeaturedNews.tsx), agora responsável somente pela abertura e pelos slides.
- Alterado: [components/blog/home/HomePage.tsx](../components/blog/home/HomePage.tsx), monta a seleção ao lado do feed somente na home sem filtros.
- Alterado: [styles/blog/Blog.module.css](../styles/blog/Blog.module.css), grid condicional com coluna lateral, alinhamento e adaptação para tablet/celular; carrossel sem coluna vazia.
- Alterado: [components/blog/README.md](../components/blog/README.md), comportamento e localização atualizados.

Sem dependências ou alterações de rota. A posição atual dos cards ilustrados de categorias foi preservada. Alterações locais, sem implantação.

## Validação

TypeScript, ESLint dos arquivos alterados e build Next.js aprovados. Revisão no navegador em 1440, 1024, 768, 375 e 320 px: bloco único, ao lado do feed no desktop, empilhado em tablet/celular, sem overflow; links e filtros preservados, sem erros no console. Capturas em outputs/blog-review/next-reading-*.png.

A compilação identificou artigos de uma categoria retirada do menu. lib/blog/catalog.ts passou a fornecer um rótulo legível quando a categoria não consta na navegação, preservando a edição atual do menu e evitando erro de renderização dos artigos existentes.
