# Institucional

Rotas em app/(site). /site monta home/HomePage.tsx; / e /em-desenvolvimento montam development/DevelopmentPage.tsx. Páginas secundárias utilizam layout/SiteLayout.tsx.

home contém composição, Hero, HomeFooter, PlanCard e dados em content.ts. layout contém moldura, menu, tema e atalhos. structure contém seção compartilhada, Gallery e StoreMap. contact contém o formulário; app, o download; sales, o modal comercial e CSS Module; development, o aviso e CSS Module.

Estilos em styles/site; contatos em constants/site.ts; analytics/leads em services/site/leads.ts; abertura de WhatsApp em services/whatsapp.ts. APIs, armazenamento, permissões, conteúdo e assets foram preservados. Problemas anteriores de lint em efeitos/imutabilidade constam em docs/reorganization.md.

O tema natalino institucional reutiliza ChristmasHeroLights no cabeçalho da home (home/HomePage.tsx) e das páginas internas (layout/SiteLayout.tsx). O cordão aparece abaixo do cabeçalho apenas com christmas ativo no escopo institucional. Nesse estado, data-seasonal-pinned mantém o cabeçalho visível ao rolar. Arte, tamanho, animação, pausa e movimento reduzido usam o componente e CSS Module de components/shared/seasonal, sem duplicar estilos.
