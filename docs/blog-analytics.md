# Coleta de desempenho do Blog

O site envia eventos consentidos ao proxy same-origin `POST /api/blog/analytics`, que usa `BLOG_API_URL` somente no servidor. O backend valida origem, publicação e contrato; veja [documentação do serviço](../../afiliados-backend/docs/blog-analytics.md). Configure a origem do site em `BLOG_SITE_URL` ou `BLOG_ANALYTICS_ORIGINS` no backend. Sem API configurada, o proxy responde 503 e a página continua funcional.

## Componentes e regras

- `lib/blog/analytics.ts`: consentimento compartilhado `netbox_cookie_consent`, identidades aleatórias, sessão de 30 minutos, expiração de visitante em 365 dias e envio keepalive. Não cria identificadores antes de consentir; respeita DNT/GPC. Alteração para essenciais limpa identidades locais.
- `BlogConsent` no `BlogLayout`: preferências essenciais/analytics e controle para rever a escolha; oculto em iframe de prévia. Reutiliza a escolha existente do site institucional.
- `ArticleAnalytics` no artigo: registra após um segundo visível e consentido. UUID estável evita duplicação em rerenders/StrictMode. Prévia/rascunho não são rastreados. Trocar de artigo registra uma nova visualização e, na sessão ativa, a navegação de origem.
- `ShareButtons`: registra acionamentos reais de rede, cópia e compartilhamento nativo. Não confirma publicação em plataformas externas.
- `TrackedTrailerFrame`/`lib/blog/youtube.ts`: instrumentam o trailer YouTube do slide editorial associado ao artigo. Só o primeiro PLAYING observado por montagem é enviado; `onReady` consulta o estado real para capturar reprodução já iniciada. API bloqueada não vira clique. Referência: [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference#Events).

O player mantém reprodução independente de consentimento para analytics; sem consentimento não carrega a API de medição. O próprio iframe externo continua sujeito às preferências e políticas do provedor de vídeo existentes. Nenhum cookie, token de conta ou IP do visitante é encaminhado pelo proxy. Os relatórios usam somente contagens; bloqueadores/recusas/rede reduzem a cobertura. Não há recuperação de histórico anterior.

## Verificação

`npm test` inclui `__tests__/blog/analytics.test.mjs`, que executa os módulos reais transpilados com armazenamento/rede controlados: consentimento, DNT/GPC, expiração de sessão, transições, remoção de IDs, proxy, origem e ausência de cookies/autorização/IP encaminhados. Reprodução real no YouTube e inspeção visual devem ser verificadas separadamente no navegador.
