# Catalogo de filmes e series

## Busca e carregamento incremental

Em Filmes e Series, o catalogo ocupa uma faixa de largura total depois da listagem editorial. O campo superior direito busca titulos na API com idioma `pt-BR`; nomes originais e traducidos podem ser pesquisados. A busca nao altera os filtros de artigos. O botao central Ver mais, com triangulo para baixo, revela os dez registros seguintes ou carrega a proxima pagina, removendo duplicacoes por tipo e ID.

`MediaExplorer.tsx` compartilha o formulario e os resultados entre a secao e a busca do cabecalho. O cabecalho oferece Filmes e series e Artigos do blog, preservando a busca editorial existente. Na busca de obras do cabecalho, `search/multi` retorna filmes e series; pessoas sao descartadas. Nas categorias sao usados `search/movie` e `search/tv`.

`GET /api/blog/media?kind=movie|tv|all&q=texto&page=1` e o proxy local que mantem o token no servidor. O idioma e fixado em `pt-BR` e conteudo adulto e excluido. Tipos invalidos e paginas fora de 1 a 500 retornam 400; falhas ou ausencia de configuracao retornam 503 com estado controlado. A interface informa carregamento, falhas e nenhum resultado; novas buscas cancelam requisicoes anteriores. Nao ha dependencia nova. Referencia de pesquisa: https://developer.themoviedb.org/reference/search-movie.

## Layout de detalhes

### Carregamento de imagens

Fotos e videos compartilham o elemento central do trailer. Os botoes laterais selecionam o tipo; setas triangulares trocam de arquivo, com contador e suporte a setas do teclado quando o foco esta no visualizador. O X superior direito fecha a midia e restaura a abertura do trailer. Nao existem filas separadas abaixo do player.

`MediaGallery.tsx` controla selecao, navegacao e dialog; `MediaViewer.tsx` compartilha a apresentacao do arquivo entre os modos inline e ampliado, sem duplicar iframes.

`MediaImage.tsx` usa um loader que preserva a URL ja dimensionada pelo CDN e mantem a geometria `fill` consistente entre Next e Vinext. Miniaturas de video preenchem e centralizam o quadro; fotos mantem a imagem inteira. O dialog possui `position: fixed`, `inset: 0`, `margin: auto` e limites da janela, sem depender das margens padrao do navegador, removidas pelo reset global. Sua abertura nao participa da grade nem aumenta a largura da pagina.

O iframe e as fotos ocupam toda a area do visualizador; barras de titulo e contador sao sobrepostas, sem reduzir a altura do arquivo. Os controles da pagina aparecem por cinco segundos ao selecionar ou trocar o arquivo, abrir ou fechar a ampliacao. Depois aparecem individualmente ao passar o mouse diretamente sobre o botao ou ao receber foco de teclado. O temporizador e reiniciado nessas interacoes e cancelado ao desmontar. Em telas de toque os controles ficam visiveis, com alvos maiores. Os botoes possuem acabamento escuro, reflexo sutil e hover laranja. Os controles internos do YouTube continuam gerenciados pelo proprio player.

Apenas a foto selecionada e carregada em `w780`; ao clicar, abre em `w1280` no dialog ampliado. O video selecionado mostra uma miniatura; clicar amplia e reproduz, ou Reproduzir aqui inicia no proprio elemento. O botao Ampliar tambem funciona durante a reproducao. Apenas um iframe e montado por vez. Fechar a ampliacao (X ou Esc) retorna ao visualizador sem reproducao; trocar de arquivo ou tipo desmonta o video anterior. Controles sem arquivos ficam desabilitados.

O fundo usa uma versao pequena da capa (`w185`) em uma unica camada animada com blur de 32px no desktop e 20px no celular, preservando os tons da obra com menor custo grafico.

O fundo da obra usa a propria capa desfocada em uma camada fixa que cobre a janela inteira, com luzes animadas por transform/opacity. O tema escuro aplica-se ao blog apenas enquanto o detalhe esta presente, via seletor :has; sair da rota restaura as outras paginas. Movimento reduzido desativa as animacoes.

`MediaGallery` incorpora o video apenas apos clique, com fechamento, Esc, indicador de carregamento e restauracao de foco. Videos em ingles sao consultados caso nao haja resultados em portugues. Nao sao videos de obras diferentes.

A atribuicao obrigatoria do provedor foi centralizada em `/site/blog/creditos`, acessivel pelo rodape. Nao ha bloco de logo e aviso nas categorias nem nos detalhes. A origem das notas e o credito JustWatch de streaming permanecem identificados.

A pagina segue a referencia enviada: titulo original, ano e metricas no topo; poster, trailer e atalhos de videos/fotos na faixa central; generos, sinopse, direcao/criacao e elenco abaixo; streaming brasileiro na lateral. `MediaGallery.tsx` possui player proprio e galeria de fotos em dialog nativo com suporte a Esc. Controles sem midia ficam desabilitados.

O detalhe solicita `credits,videos,images,watch/providers`. Apenas chaves YouTube validas sao incorporadas por youtube-nocookie.com. Fotos sao limitadas a 24. Streaming lista assinaturas `flatrate` da regiao BR com atribuicao JustWatch. Popularidade corresponde ao indice TMDB, nao a uma posicao no IMDb. Nao ha controles ficticios de avaliar, adicionar a lista ou marcar como assistido.

Somente Filmes e Series exibem o catalogo externo, no final da pagina depois da listagem e da paginacao: tres destaques com sinopse e sete capas menores. Filmes consulta apenas filmes; Series consulta apenas series. Tecnologia, HQs e Jogos nao renderizam a secao nem consultam suas tendencias. Nao e um ranking do IMDb: a ordem corresponde ao endpoint semanal de tendencias do TMDB.

## Configuracao

1. Verifique a licenca adequada ao uso do site: https://developer.themoviedb.org/docs/faq. A API e gratuita para uso nao comercial; a Netbox deve verificar a licenca comercial antes de publicar esta integracao.
2. Crie uma conta em https://www.themoviedb.org e obtenha o API Read Access Token nas configuracoes de API.
3. Configure `TMDB_READ_ACCESS_TOKEN` no `.env.local` e no ambiente do servidor de destino. Nunca use `NEXT_PUBLIC_` e nunca envie a credencial ao navegador. Reinicie o servidor local apos configurar.

Sem token, a interface informa que o catalogo estara disponivel em breve. Falhas, timeout, respostas invalidas e resultados vazios possuem estados proprios; nao sao preenchidos com obras ficticias. O blog editorial e sua API existente permanecem independentes. Nao ha migracao, gravacao no banco, login ou avaliacao de usuario nesta funcionalidade.

## Rotas e dados

- `/site/blog?categoria=filmes` e `/site/blog?categoria=series`: tendencias da semana com ate dez obras por tipo.
- `/site/blog/obras/movie/:id` e `/site/blog/obras/tv/:id`: capa, sinopse, ano, nota do TMDB, generos, duracao de filmes, temporadas/episodios de series e ate oito nomes do elenco, quando fornecidos pela API.
- `lib/blog/media.ts`: fetch no servidor com Bearer, idioma `pt-BR`, revalidacao de uma hora e timeout de seis segundos por consulta. Endpoints `trending/movie/week`, `trending/tv/week`, `movie/:id` e `tv/:id` com `append_to_response=credits,videos,images,watch/providers`; fallback de videos em `movie/:id/videos` ou `tv/:id/videos` com idioma `en-US`.
- IDs e tipos invalidos ou obras nao encontradas respondem com 404. Indisponibilidade do provedor nao e tratada como obra inexistente.
- Imagens usam o CDN oficial `image.tmdb.org`; nao passam pelo banco de dados. Texto externo e renderizado pelo React, sem HTML remoto. Titulos adultos explicitamente sinalizados pela API sao descartados.
- Notas exibem a origem TMDB; nao sao notas do IMDb. Sinopses em portugues ausentes recebem uma mensagem explicita. As paginas de detalhes nao sao indexadas neste primeiro momento.

Os creditos identificam TMDB com o logotipo oficial em `public/blog/providers/tmdb.svg`, ligam ao provedor e exibem o aviso de atribuicao. O SVG foi obtido de https://files.readme.io/29c6fee-blue_short.svg, usado na documentacao oficial do TMDB. Referencias: https://developer.themoviedb.org/reference/trending-movies, https://developer.themoviedb.org/reference/movie-details e https://developer.themoviedb.org/docs/image-basics. Efeitos de hover, foco e transicoes seguem a identidade Netbox e a referencia https://freefrontend.com/css-tabs/.
