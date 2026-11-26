# Conteúdo administrado pelo painel Afiliados Netbox

O painel `/integracoes/site-institucional` usa `BLOG_API_URL` para ler o snapshot público do backend via `/api/site-content`.

O campo publicado `maintenanceMode` controla a página de melhorias no layout do grupo institucional. Ativo, substitui o conteúdo das rotas institucionais pela página “Nosso site está passando por melhorias”; inativo ou ausente em conteúdo antigo, mostra a rota normal. A rota `/` usa `HomePage` quando o modo está desativado.

## O que o painel publica

- Carrossel da página inicial: ordem, títulos, textos, imagens desktop/mobile, texto alternativo, posicionamento do fundo e vídeo opcional.
- Seções adicionais nas rotas institucionais suportadas pelo editor: texto, imagem ou vídeo; ordem, visibilidade e remoção.
- Upload das imagens usa o serviço autenticado já existente para o Blog. Os arquivos precisam estar em armazenamento persistente no backend.

O site mantém os slides locais como fallback se o backend estiver indisponível ou ainda não tiver uma publicação. Conteúdo salvo como rascunho não aparece no site. O `ManagedPageSections` renderiza seções publicadas após o conteúdo já existente; textos e módulos originais das páginas continuam mantidos no código. A rota `/site` e as outras páginas institucionais usam o mesmo mecanismo compartilhado no layout do grupo.

Vídeos incorporados são restritos a YouTube, Vimeo e MP4/WebM por HTTPS. O frontend cria os players sem aceitar HTML arbitrário. A redução de movimento oculta a reprodução automática de vídeos no carrossel.
