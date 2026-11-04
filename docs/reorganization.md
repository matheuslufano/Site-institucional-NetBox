# Reorganização do projeto

Institucional e Blog separados sem mudar URLs, APIs, conteúdo ou dependências. Imports, scripts, metadata e testes acompanham os caminhos novos.

## Arquivos movidos

| Antes | Depois |
| --- | --- |
| app/sobre/page.tsx | [app/(site)/sobre/page.tsx](<../app/(site)/sobre/page.tsx>) |
| app/contatos/page.tsx | [app/(site)/contatos/page.tsx](<../app/(site)/contatos/page.tsx>) |
| app/central-do-cliente/page.tsx | [app/(site)/central-do-cliente/page.tsx](<../app/(site)/central-do-cliente/page.tsx>) |
| app/nossos-servicos/page.tsx | [app/(site)/nossos-servicos/page.tsx](<../app/(site)/nossos-servicos/page.tsx>) |
| app/nossa-estrutura/page.tsx | [app/(site)/nossa-estrutura/page.tsx](<../app/(site)/nossa-estrutura/page.tsx>) |
| app/em-desenvolvimento/page.tsx | [app/(site)/em-desenvolvimento/page.tsx](<../app/(site)/em-desenvolvimento/page.tsx>) |
| app/site/page.tsx | [app/(site)/site/page.tsx](<../app/(site)/site/page.tsx>) |
| app/page.tsx | [components/site/home/HomePage.tsx](<../components/site/home/HomePage.tsx>) |
| app/site/blog/page.tsx | [app/(blog)/site/blog/page.tsx](<../app/(blog)/site/blog/page.tsx>) |
| app/site/blog/layout.tsx | [app/(blog)/site/blog/layout.tsx](<../app/(blog)/site/blog/layout.tsx>) |
| app/site/blog/[slug]/page.tsx | [app/(blog)/site/blog/[slug]/page.tsx](<../app/(blog)/site/blog/[slug]/page.tsx>) |
| app/_components/NetboxFrame.tsx | [components/site/layout/SiteLayout.tsx](<../components/site/layout/SiteLayout.tsx>) |
| app/_components/MenuContactLinks.tsx | [components/site/layout/MenuContacts.tsx](<../components/site/layout/MenuContacts.tsx>) |
| app/_components/ClientShortcuts.tsx | [components/site/layout/ClientShortcuts.tsx](<../components/site/layout/ClientShortcuts.tsx>) |
| app/_components/ThemeToggle.tsx | [components/site/layout/ThemeToggle.tsx](<../components/site/layout/ThemeToggle.tsx>) |
| app/_components/AppDownloadButton.tsx | [components/site/app/AppDownloadButton.tsx](<../components/site/app/AppDownloadButton.tsx>) |
| app/_components/ContactForm.tsx | [components/site/contact/ContactForm.tsx](<../components/site/contact/ContactForm.tsx>) |
| app/_components/DevelopmentView.tsx | [components/site/development/DevelopmentPage.tsx](<../components/site/development/DevelopmentPage.tsx>) |
| app/_components/StructureSection.tsx | [components/site/structure/StructureSection.tsx](<../components/site/structure/StructureSection.tsx>) |
| app/_components/AffiliateWhatsAppModal.tsx | [components/site/sales/WhatsAppModal.tsx](<../components/site/sales/WhatsAppModal.tsx>) |
| app/_components/AffiliateWhatsAppModal.module.css | [components/site/sales/WhatsAppModal.module.css](<../components/site/sales/WhatsAppModal.module.css>) |
| app/em-desenvolvimento/page.module.css | [components/site/development/Development.module.css](<../components/site/development/Development.module.css>) |
| app/_components/ArrowIcon.tsx | [components/ui/ArrowIcon.tsx](<../components/ui/ArrowIcon.tsx>) |
| app/_components/BackButton.tsx | [components/ui/BackButton.tsx](<../components/ui/BackButton.tsx>) |
| app/nossa-estrutura/StructureGallery.tsx | [components/site/structure/Gallery.tsx](<../components/site/structure/Gallery.tsx>) |
| app/nossa-estrutura/StoreLocator.tsx | [components/site/structure/StoreMap.tsx](<../components/site/structure/StoreMap.tsx>) |
| app/_components/useFocusTrap.ts | [hooks/useFocusTrap.ts](<../hooks/useFocusTrap.ts>) |
| app/_components/useSwipeGesture.ts | [hooks/useSwipeGesture.ts](<../hooks/useSwipeGesture.ts>) |
| app/_components/useScrollDirectionVisibility.ts | [hooks/useScrollDirectionVisibility.ts](<../hooks/useScrollDirectionVisibility.ts>) |
| app/_components/affiliateWhatsApp.ts | [services/whatsapp.ts](<../services/whatsapp.ts>) |
| app/chatgpt-auth.ts | [lib/auth.ts](<../lib/auth.ts>) |
| app/site/blog/_components/ArticleCard.tsx | [components/blog/articles/ArticleCard.tsx](<../components/blog/articles/ArticleCard.tsx>) |
| app/site/blog/_components/ArticleFeedCard.tsx | [components/blog/articles/NewsCard.tsx](<../components/blog/articles/NewsCard.tsx>) |
| app/site/blog/_components/BlogImage.tsx | [components/blog/articles/CoverImage.tsx](<../components/blog/articles/CoverImage.tsx>) |
| app/site/blog/_components/ShareButtons.tsx | [components/blog/articles/ShareButtons.tsx](<../components/blog/articles/ShareButtons.tsx>) |
| app/site/blog/_components/BlogHeader.tsx | [components/blog/layout/Header.tsx](<../components/blog/layout/Header.tsx>) |
| app/site/blog/_components/BlogFooter.tsx | [components/blog/layout/Footer.tsx](<../components/blog/layout/Footer.tsx>) |
| app/site/blog/_components/EditorialHero.tsx | [components/blog/home/FeaturedNews.tsx](<../components/blog/home/FeaturedNews.tsx>) |
| app/site/blog/_components/LeadCarousel.tsx | [components/blog/home/NewsCarousel.tsx](<../components/blog/home/NewsCarousel.tsx>) |
| app/site/blog/_components/EditorialSidebar.tsx | [components/blog/search/ReadingSuggestions.tsx](<../components/blog/search/ReadingSuggestions.tsx>) |
| app/site/blog/_components/BlogSearch.tsx | [components/blog/search/SearchForm.tsx](<../components/blog/search/SearchForm.tsx>) |
| app/site/blog/_components/BlogSearchPanel.tsx | [components/blog/search/SearchPanel.tsx](<../components/blog/search/SearchPanel.tsx>) |
| app/site/blog/_components/CategoryView.tsx | [components/blog/categories/CategoryPage.tsx](<../components/blog/categories/CategoryPage.tsx>) |
| app/site/blog/_components/CategorySort.tsx | [components/blog/categories/CategorySort.tsx](<../components/blog/categories/CategorySort.tsx>) |
| app/site/blog/_components/CategorySpotlightCard.tsx | [components/blog/categories/FeaturedCard.tsx](<../components/blog/categories/FeaturedCard.tsx>) |
| app/site/blog/_content/articles.ts | [content/blog/articles.ts](<../content/blog/articles.ts>) |
| app/site/blog/_content/cinema.ts | [content/blog/cinema.ts](<../content/blog/cinema.ts>) |
| app/site/blog/_content/cinema.json | [content/blog/cinema.json](<../content/blog/cinema.json>) |
| app/site/blog/_lib/types.ts | [types/blog.ts](<../types/blog.ts>) |
| app/site/blog/_lib/blog.ts | [lib/blog/catalog.ts](<../lib/blog/catalog.ts>) |
| app/site/blog/_lib/navigation.ts | [lib/blog/navigation.ts](<../lib/blog/navigation.ts>) |
| app/site/blog/_lib/useBlogHeaderVisibility.ts | [hooks/blog/useHeaderVisibility.ts](<../hooks/blog/useHeaderVisibility.ts>) |
| app/site/blog/blog.module.css | [styles/blog/Blog.module.css](<../styles/blog/Blog.module.css>) |
| app/site/blog/README.md | [components/blog/README.md](<../components/blog/README.md>) |
| app/styles/01-base.css | [styles/base.css](<../styles/base.css>) |
| app/styles/02-header.css | [styles/site/header.css](<../styles/site/header.css>) |
| app/styles/03-hero.css | [styles/site/hero.css](<../styles/site/hero.css>) |
| app/styles/04-services.css | [styles/site/services.css](<../styles/site/services.css>) |
| app/styles/05-app.css | [styles/site/app.css](<../styles/site/app.css>) |
| app/styles/06-plans.css | [styles/site/plans.css](<../styles/site/plans.css>) |
| app/styles/07-gallery.css | [styles/site/gallery.css](<../styles/site/gallery.css>) |
| app/styles/08-reviews.css | [styles/site/reviews.css](<../styles/site/reviews.css>) |
| app/styles/09-coverage.css | [styles/site/coverage.css](<../styles/site/coverage.css>) |
| app/styles/10-cta.css | [styles/site/cta.css](<../styles/site/cta.css>) |
| app/styles/11-footer.css | [styles/site/footer.css](<../styles/site/footer.css>) |
| app/styles/12-inner-pages.css | [styles/site/inner-pages.css](<../styles/site/inner-pages.css>) |
| app/styles/13-typography.css | [styles/site/typography.css](<../styles/site/typography.css>) |
| app/styles/14-animations.css | [styles/site/animations.css](<../styles/site/animations.css>) |
| app/styles/15-responsive.css | [styles/site/responsive.css](<../styles/site/responsive.css>) |
| app/styles/16-dark-theme.css | [styles/site/dark-theme.css](<../styles/site/dark-theme.css>) |
| app/styles/17-development-notice.css | [styles/site/development-notice.css](<../styles/site/development-notice.css>) |
| app/netbox-plans.css | [styles/site/featured-plans.css](<../styles/site/featured-plans.css>) |
| tests/blog-browser.mjs | [__tests__/blog/browser.mjs](<../__tests__/blog/browser.mjs>) |
| tests/blog-content.test.mjs | [__tests__/blog/content.test.mjs](<../__tests__/blog/content.test.mjs>) |
| tests/rendered-html.test.mjs | [__tests__/legacy/template.test.mjs](<../__tests__/legacy/template.test.mjs>) |

## Extrações e documentação

Foram criados Hero, HomeFooter, PlanCard e content.ts em components/site/home; services/site/leads.ts; constants/site.ts; telas HomePage e ArticlePage e BlogLayout em components/blog; layout e index institucionais; novas entradas styles/globals.css e styles/site/site.css; testes de arquitetura e rotas; docs/architecture.md e READMEs específicos.

README.md, package.json, sitemap, layout raiz, scripts de imagens e testes foram atualizados. Os antigos app/globals.css e app/styles/index.css foram substituídos pelas novas entradas. A configuração dos frameworks e as dependências foram preservadas.

## Validação

TypeScript, nove testes de conteúdo/arquitetura e builds Next.js/Vinext aprovados. Verificações HTTP e navegador pendentes. tsconfig.json e eslint.config.mjs excluem sa?das geradas e backups das verifica??es. O lint institucional possui seis erros anteriores, confirmados por compara??o com o backup, em efeitos/imutabilidade, sem reformulação nesta migração. Detalhes em outputs/organization-lint.json.

Alterações locais, sem implantação. Backup anterior em outputs/organization-before; manifesto de movimentações em outputs/organization-moves.json.

## Compatibilidade de afiliados

components/shared/ReferralTracker.tsx e services/referrals.ts preservam o registro de c?digos em links de entrada pelo Blog. O componente n?o renderiza UI; o modal comercial continua exclusivo do institucional. A valida??o e a chave de armazenamento s?o compartilhadas tamb?m por services/whatsapp.ts e pelo modal. O caso foi verificado na regress?o do navegador.
