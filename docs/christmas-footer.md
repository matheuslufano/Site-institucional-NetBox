# Natal: cena do rodape

Cena baseada no snapshot de 09/11/2026, com floresta e luzes atualizadas em 10/11/2026.

## Cena

- 350 flocos redondos em CSS no desktop, em tres tamanhos, com queda, deriva lateral e opacidade variada. CSS reduz a contagem visivel em telas menores.
- Floresta panoramica realista em PNG transparente, com camadas de contraste suave, com galhos irregulares e neve. As arvores sao mais altas nas laterais e menores no centro; uma mascara CSS dissolve a base sobre o rodape.
- Cordao com 15 lampadas abaixo de "Feliz Natal!", com brilho alternado em 2,7 segundos. Respeita a pausa dos efeitos e `prefers-reduced-motion`.
- A arvore decorada isolada a esquerda foi removida; a floresta de pinheiros e o boneco foram preservados.
- Boneco vetorial de gorro e cachecol, com braco levantado que acena em CSS.
- Mensagem central: "A NETBOX DESEJA A VOCE", "Feliz Natal!" e votos para a familia.
- A cena fica antes do footer preto; floresta e boneco cruzam a divisao entre as secoes. A cena aparece com o tema ativo ou em `?previewTheme=christmas`.

## Arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| [ChristmasScene.tsx](../components/shared/seasonal/ChristmasScene.tsx) | Panorama PNG transparente, mensagem e composicao da cena. |
| [WavingSnowman.tsx](../components/shared/seasonal/WavingSnowman.tsx) | Desenho SVG completo do boneco, identificado por data-component="christmas-waving-snowman". |
| [ChristmasScene.module.css](../components/shared/seasonal/ChristmasScene.module.css) | Camadas, responsividade e aceno do boneco. |
| [Snowfall.tsx](../components/shared/seasonal/Snowfall.tsx) | Renderiza os 350 flocos. |
| [Snowfall.module.css](../components/shared/seasonal/Snowfall.module.css) | Queda, oscilacao, pausa e reducao de movimento. |
| [SeasonalFooter.tsx](../components/shared/seasonal/SeasonalFooter.tsx) | Mostra a cena e preserva o footer real. |
| [SeasonalThemeProvider.tsx](../components/shared/seasonal/SeasonalThemeProvider.tsx) | Carrega tema e integra neve/pausa. |
| [SeasonalTheme.module.css](../components/shared/seasonal/SeasonalTheme.module.css) | Estilos compartilhados dos temas e do footer. |
| [README.md](../README.md) | Resume a cena e aponta para este documento. |

A cena e a neve usam CSS Modules proprios; o boneco e SVG inline isolado em WavingSnowman.tsx. Seus estilos existentes de posicionamento, responsividade, pausa e aceno permanecem em ChristmasScene.module.css. A floresta usa public/seasonal/christmas-snowy-pine-panorama-transparent-v1.png (2172 x 724, RGBA); o boneco continua em SVG. Sem novas dependencias.

## Validacao

- Snapshot historico: 23 testes, TypeScript, lint e build aprovados.
- Restauracao atual: 26 testes passaram, incluindo tres testes sazonais; `tsc --noEmit` e lint dos componentes sazonais passaram; build Vinext passou.
- O lint geral continua com 6 erros e 41 avisos em arquivos fora desta cena.
- API local de temas e a pagina de pre-visualizacao retornam HTTP 200 em `http://localhost:3002/site/blog?previewTheme=christmas#seasonal-footer-decoration`.
- O servidor da porta 3002 foi reiniciado para limpar uma resolucao de CSS em cache. Pagina do Blog, modulo Snowfall.module.css e API de temas retornaram HTTP 200. A revisao visual no Chrome continua pendente.

## Atualizacao de 10/11/2026

- 27 testes aprovados. Inspecao visual desktop/mobile pendente: host do navegador indisponivel nesta sessao.
- CSS Modules: classes greetingLights e lightBulb adicionadas; snowbankLeft e snowbankRight removidas. Sem novas dependencias.
- Identificacao por data-component: christmas-pine-forest e christmas-greeting-lights. Titulo conserva seu ID.
- Build Vinext, TypeScript (`tsc --noEmit`) e ESLint do componente aprovados. Lint geral: 6 erros e 41 avisos fora do componente alterado.

### Panorama transparente aplicado

A floresta vetorial foi substituida pelo PNG realista sem fundo. O canal alpha foi conferido (0 a 255, centro superior transparente). A classe forest conserva a mascara de transicao e usa altura automatica para manter a proporcao 3:1, inclusive no mobile. Mensagem, luzes e personagens preservados.
