# Faixa ilustrada de categorias

No desktop, as colunas são criadas apenas para as categorias cadastradas e o conjunto de cards é centralizado com `justify-content: center`, sem reservar uma sexta coluna vazia. A largura individual dos cards é preservada. Abaixo de 1100 px, a fila começa à esquerda para manter todos os itens acessíveis pela rolagem horizontal.

A faixa fica fora dos contêineres das listagens e se centraliza diretamente na página com margens laterais automáticas. Sua largura máxima é 1280 px, com respiro lateral de 32 px no desktop e 16 px abaixo de 768 px. Em telas menores, preserva a rolagem horizontal dos cards.

Uma linha de seis cards foi adicionada entre os destaques e “Mais recentes” na home /site/blog, seguindo a referência fornecida. Cards escuros, destaque laranja, nome e PNG transparente para cada categoria. O card inteiro abre a categoria pelo App Router.

## Arquivos criados

- [components/blog/home/CategoryStrip.tsx](../components/blog/home/CategoryStrip.tsx): componente de servidor que reutiliza o cadastro e os links de categorias existentes.
- [components/blog/home/CategoryStrip.module.css](../components/blog/home/CategoryStrip.module.css): seis colunas no desktop; faixa com rolagem horizontal abaixo de 1100 px, foco visível e movimento reduzido.
- public/blog/categories/tecnologia.png, filmes.png, series.png, hqs.png, games.png e entretenimento.png: seis ilustrações PNG de 320 × 320 px com transparência real, cerca de 185 KB no total.
- [public/blog/categories/README.md](../public/blog/categories/README.md): origem, prompts completos e manutenção das imagens geradas com imagegen.

## Arquivos alterados

- [components/blog/home/HomePage.tsx](../components/blog/home/HomePage.tsx): import e composição da faixa antes da listagem, somente na home sem filtros.
- [components/blog/README.md](../components/blog/README.md): localização e comportamento da nova navegação.
- [README.md](../README.md): descrição da faixa ilustrada.

Categorias e resultados de busca preservam sua composição. O institucional não foi modificado. Não há dependências nem rotas novas. PNGs usam carregamento lazy; as imagens são decorativas, com alt vazio, pois os links já possuem nomes acessíveis.

## Validação

- TypeScript e ESLint dos componentes alterados: aprovados.
- Nove testes existentes de conteúdo e arquitetura: aprovados.
- Builds Next.js e Vinext: aprovados.
- Navegador em 1440, 1024, 768, 375 e 320 px: seis cards antes de Mais recentes, imagens carregadas, links das seis categorias, rolagem e foco por teclado, ausência de overflow da página e preservação do estado filtrado. Sem erros no console.
- Capturas locais: outputs/blog-review/category-strip-1440.png e category-strip-375.png.

Alterações locais, sem implantação.
