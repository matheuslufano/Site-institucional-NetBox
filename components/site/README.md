# Institucional

Em `/sobre`, a foto de equipe conserva suas proporções em uma moldura Polaroid levemente inclinada, com a legenda na faixa inferior. Em telas estreitas, a foto fica abaixo do texto.

A barra móvel começa com **Menu**, que leva à página inicial. **Serviços** leva a `/contatos`, **Lojas** leva a `/nossa-estrutura` e **Blog** leva a `/site/blog`. Ao tocar em **Mais**, os ícones de Instagram, WhatsApp, e-mail e telefone saem do botão em leque e flutuam suavemente. O atalho de telefone mostra o headset branco sobre fundo azul. Com movimento reduzido, os ícones aparecem diretamente na posição final. O painel fecha ao rolar a página em qualquer direção, tocar em **Mais** novamente, tocar fora ou pressionar Escape.

O botão de download dos rodapés abre um modal com App Store e Google Play no computador. Em iPhone, iPad e Android, o link `/baixar-app` redireciona para a loja correspondente. O acesso direto à rota em computadores oferece as duas lojas.

Em `/site#consulta`, a busca de cobertura sugere as cidades cadastradas em `home/content.ts`. A seleção atualiza o mapa, o endereço de atendimento e a consulta pelo WhatsApp.

Na seção **Nossos Serviços**, as setas de **Internet Fibra Residencial** e **Aplicativo Netbox** centralizam as respectivas seções na tela. A seta de **Suporte Técnico Regional** abre o WhatsApp com uma mensagem de suporte.

Em `/nossos-servicos`, o cartão **Suporte Técnico Regional** exibe o número de atendimento e abre o WhatsApp com uma mensagem de suporte.

Rotas em app/(site). /site monta home/HomePage.tsx; / e /em-desenvolvimento montam development/DevelopmentPage.tsx. Páginas secundárias utilizam layout/SiteLayout.tsx.

home contém composição, Hero, HomeFooter, PlanCard e dados em content.ts. layout contém moldura, menu, tema e atalhos. structure contém seção compartilhada, Gallery e StoreMap. contact contém o formulário; app, o download; sales, o modal comercial e CSS Module; development, o aviso e CSS Module.

Estilos em styles/site; contatos em constants/site.ts; analytics/leads em services/site/leads.ts; abertura de WhatsApp em services/whatsapp.ts. APIs, armazenamento, permissões, conteúdo e assets foram preservados. Problemas anteriores de lint em efeitos/imutabilidade constam em docs/reorganization.md.

O tema natalino institucional reutiliza ChristmasHeroLights no cabeçalho da home (home/HomePage.tsx) e das páginas internas (layout/SiteLayout.tsx). O cordão aparece abaixo do cabeçalho apenas com christmas ativo no escopo institucional. Nesse estado, data-seasonal-pinned mantém o cabeçalho visível ao rolar. Arte, tamanho, animação, pausa e movimento reduzido usam o componente e CSS Module de components/shared/seasonal, sem duplicar estilos.

No carrossel **Conheça nossos planos**, as setas aparecem por dois segundos quando a área dos cartões entra na tela pela primeira vez. Depois, cada seta reaparece ao passar o mouse sobre ela ou ao receber foco pelo teclado. Em telas de toque, também é possível navegar com gestos e indicadores.

As setas ficam ao lado das bordas externas do cartão central. Os ícones têm contorno arredondado, gradiente SVG translúcido e sombras coloridas nas bordas para simular refração.

Ao passar o mouse sobre uma logo ou imagem, o ícone e seu título crescem juntos. O reflexo cruza a logo uma vez, da esquerda para a direita, enquanto um halo suave aparece atrás dela em tons da marca. No selo SKY+ com Amazon Prime, o cartão recorta as logos da imagem original e renderiza o título abaixo. O brilho se espalha para fora em vermelho à esquerda e azul-claro à direita. O zoom e a passagem do reflexo respeitam a preferência por movimento reduzido.
