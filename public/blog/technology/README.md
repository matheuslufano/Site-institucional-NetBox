# Capas dos artigos de Tecnologia

Cinco imagens conceituais geradas com a ferramenta integrada imagegen em 2026-11-03. Não são fotografias de instalações reais nem capturas do aplicativo Netbox.

| Artigo | Original em `originals/` | Capas públicas |
| --- | --- | --- |
| Como melhorar o sinal Wi-Fi dentro de casa | wifi-em-casa.png | /blog/wifi-em-casa-{480,800,1200}.webp |
| Qual a diferença entre Wi-Fi 5 e Wi-Fi 6? | tecnologia.png | /blog/tecnologia-{480,800,1200}.webp |
| Como funciona a internet por fibra óptica? | fibra-optica.png | /blog/fibra-optica-{480,800,1200}.webp |
| Conheça as vantagens do aplicativo Netbox | aplicativo.png | /blog/aplicativo-{480,800,1200}.webp |
| Segurança digital começa com hábitos simples | seguranca.png | /blog/seguranca-{480,800,1200}.webp |

Direção visual: capas horizontais 16:9, ambientes residenciais contemporâneos, luz natural e acentos laranja, sem texto ou marcas. Temas dos prompts: roteador elevado com cobertura sem fio; comparação de gerações de roteadores; filamentos ópticos iluminados; celular com interface genérica de serviços; dispositivos protegidos por escudo e cadeado conceituais.

Para regenerar os WebP a partir dos originais, execute `node scripts/prepare-technology-images.mjs` na raiz. Reutiliza Sharp já disponível no projeto. Os caminhos públicos foram preservados para atender tanto o catálogo local quanto os artigos da API, sem alterar os registros remotos. O script antigo `prepare-blog-images.mjs` usa fotografias institucionais: após executá-lo, execute novamente o script de Tecnologia para restaurar estas capas.

Backup local dos WebP anteriores: `outputs/technology-covers-backup/`. Revisão conjunta das novas capas: `outputs/technology-covers-review.png`. Nenhuma implantação foi realizada.
