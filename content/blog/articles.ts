import type { ArticleSection, BlogArticle, CategoryId } from '@/types/blog';
import { cinemaArticles } from './cinema';
import { editorialArticles } from './editorial/index';

/** Examples remain accessible for review but cannot enter the sitemap until approved. */
function demo(slug: string, title: string, summary: string, category: CategoryId, cover: string, coverAlt: string, content: ArticleSection[], featured = false): BlogArticle {
  return {
    id: slug, slug, title, summary, category, cover, coverAlt, content, featured,
    author: 'Equipe editorial Netbox', publishedAt: '2026-10-28', updatedAt: '2026-10-28',
    status: 'demo', seo: { title: title + ' | Blog Netbox', description: summary }
  };
}

const existingArticles: BlogArticle[] = [
  demo('como-melhorar-o-sinal-wifi', 'Como melhorar o sinal Wi-Fi dentro de casa', 'Pequenas mudanças no lugar do roteador podem fazer uma grande diferença na sua conexão.', 'tecnologia', '/blog/wifi-em-casa-1200.webp', 'Ilustração de roteador elevado com ondas de sinal em uma casa', [
    { heading: 'Comece pelo lugar do roteador', paragraphs: ['O sinal sem fio precisa atravessar paredes, móveis e outros obstáculos. Um roteador escondido em um armário ou colocado no chão tende a oferecer uma cobertura menos uniforme.', 'Prefira um ponto central, aberto e elevado da casa. Afaste o equipamento de objetos metálicos e de fontes de interferência, como o forno de micro-ondas. Antes de mudar a instalação, consulte o suporte se o cabo de fibra limitar o deslocamento.'] },
    { heading: 'Escolha a rede para cada ambiente', paragraphs: ['A faixa de 2,4 GHz costuma alcançar mais longe, mas pode disputar espaço com outras redes. A de 5 GHz oferece mais capacidade em distâncias menores. O desempenho depende do aparelho, das paredes e da interferência no local.'], list: ['Use 5 GHz perto do roteador em aparelhos compatíveis.', 'Teste 2,4 GHz nos cômodos mais distantes.', 'Para computador ou console fixo, considere uma conexão por cabo.'] },
    { heading: 'Quando considerar uma rede mesh', level: 3, paragraphs: ['Em casas grandes ou com vários andares, pontos mesh podem ampliar a cobertura. A posição e a comunicação entre os pontos são tão importantes quanto o número de equipamentos. Um repetidor mal colocado pode apenas repetir um sinal fraco.'] },
    { heading: 'Faça um teste antes de trocar equipamentos', paragraphs: ['Compare o resultado perto do roteador e no cômodo onde há dificuldade. Teste em mais de um aparelho e em horários diferentes. Se o problema continuar, anote os resultados e fale com o suporte.'], link: { label: 'Entenda também as diferenças entre Wi-Fi 5 e Wi-Fi 6', href: '/site/blog/wifi-5-e-wifi-6' } },
  ], true),
  demo('wifi-5-e-wifi-6', 'Qual a diferença entre Wi-Fi 5 e Wi-Fi 6?', 'Entenda como as gerações de Wi-Fi lidam com velocidade, eficiência e vários dispositivos conectados.', 'tecnologia', '/blog/tecnologia-1200.webp', 'Ilustração comparativa de dois roteadores conectados a dispositivos', [
    { heading: 'O que muda entre as gerações', paragraphs: ['Wi-Fi 5 é o nome comercial do padrão 802.11ac. Wi-Fi 6 corresponde ao 802.11ax e traz melhorias na forma de distribuir a comunicação entre aparelhos. A experiência depende de roteador e dispositivo compatíveis.', 'Uma rede mais nova não aumenta sozinha a velocidade contratada. Ela pode aproveitar melhor a conexão disponível, especialmente em ambientes com muitos dispositivos.'] },
    { heading: 'Mais eficiência em redes movimentadas', paragraphs: ['Recursos como OFDMA ajudam a organizar as transmissões. Os ganhos variam conforme os equipamentos, as condições do sinal e o uso da rede.'], list: ['Confira a compatibilidade do celular e do computador.', 'Observe a cobertura antes de comparar testes de velocidade.', 'Wi-Fi 6 não é sinônimo de 6 GHz: essa faixa está associada ao Wi-Fi 6E.'] },
    { heading: 'Vale a pena trocar o roteador?', level: 3, paragraphs: ['Considere a troca quando o equipamento atual limitar o uso, estiver sem atualizações ou não atender ao número de aparelhos. Consulte o provedor sobre as opções compatíveis com sua instalação.'], link: { label: 'Veja como posicionar melhor seu roteador', href: '/site/blog/como-melhorar-o-sinal-wifi' } },
  ]),
  demo('o-que-assistir-no-disney-plus', 'O que assistir no Disney+?', 'Um guia para explorar histórias, documentários e aventuras de acordo com o seu momento.', 'filmes', '/blog/entretenimento-1200.webp', 'Entretenimento digital e aplicativos parceiros', [
    { heading: 'Escolha pelo tipo de experiência', paragraphs: ['Em vez de começar por uma lista enorme, pense no tempo disponível e no tipo de história que você procura. Uma animação pode combinar com uma sessão em família; uma série curta pode acompanhar a rotina da semana.', 'Este guia demonstrativo não confirma a disponibilidade de títulos. O catálogo varia com o país, a data e as condições da assinatura. Confira as opções diretamente no aplicativo.'] },
    { heading: 'Monte sua lista para assistir depois', paragraphs: ['Use a busca e os filtros da plataforma para explorar gêneros. Ao encontrar algo interessante, adicione à lista para evitar repetir a pesquisa.'], list: ['Confira a classificação indicativa antes de assistir com crianças.', 'Separe perfis quando essa função estiver disponível.', 'Leia a sinopse e veja a duração antes de dar play.'] },
    { heading: 'Prepare a conexão para a sessão', level: 3, paragraphs: ['Posicione a televisão onde haja bom sinal ou use cabo de rede quando possível. A resolução escolhida e outros aparelhos em uso influenciam a necessidade de banda.'], link: { label: 'Melhore o Wi-Fi da sua casa', href: '/site/blog/como-melhorar-o-sinal-wifi' } },
  ], true),
  demo('como-funciona-a-fibra-optica', 'Como funciona a internet por fibra óptica?', 'Da rede até sua casa: descubra como a luz transporta os dados que fazem parte do seu dia.', 'tecnologia', '/blog/fibra-optica-1200.webp', 'Ilustração de filamentos de fibra óptica iluminados junto a um terminal de rede', [
    { heading: 'Dados transmitidos por luz', paragraphs: ['Na fibra óptica, os dados são codificados em sinais de luz que percorrem filamentos de vidro ou material plástico. Equipamentos nas extremidades convertem sinais para permitir a comunicação.', 'Em uma instalação residencial, um terminal óptico recebe o sinal da rede. A conexão pode ser distribuída por cabo Ethernet ou por um roteador Wi-Fi, integrado ou separado.'] },
    { heading: 'Fibra e Wi-Fi têm papéis diferentes', paragraphs: ['A fibra leva a conexão até o imóvel. O Wi-Fi distribui a conexão sem fios dentro dele. Por isso, uma dificuldade em um cômodo não significa necessariamente um problema no enlace de fibra.'], list: ['Evite dobrar ou pressionar o cabo óptico.', 'Não abra conectores nem olhe diretamente para a ponta da fibra.', 'Peça apoio técnico para mudanças na instalação.'] },
    { heading: 'O que influencia sua experiência', level: 3, paragraphs: ['Além do plano contratado, o desempenho depende dos servidores acessados, da rede local e dos aparelhos. Uma avaliação por etapas ajuda a identificar onde está a limitação.'], link: { label: 'Conheça os serviços Netbox', href: '/nossos-servicos' } },
  ]),
  demo('como-aproveitar-o-hbo-max', 'Como aproveitar melhor o HBO Max?', 'Organize sua lista, ajuste sua experiência e prepare a conexão para o próximo episódio.', 'entretenimento', '/blog/streaming-1200.webp', 'Experiência de entretenimento e conexão em casa', [
    { heading: 'Organize antes de começar', paragraphs: ['Explore a busca por gênero, leia as sinopses e salve os títulos que chamarem sua atenção. Perfis individuais, quando disponíveis no seu plano, ajudam a separar preferências.', 'Este conteúdo é demonstrativo. Nome do serviço, catálogo, recursos e condições comerciais precisam ser confirmados no aplicativo e no plano contratado.'] },
    { heading: 'Ajuste a qualidade ao seu uso', paragraphs: ['A qualidade de reprodução depende da assinatura, do dispositivo e da conexão. Se houver interrupções, teste a rede perto do roteador e confira se o aplicativo está atualizado.'], list: ['Use apenas aplicativos e lojas oficiais.', 'Confira a classificação indicativa.', 'Em televisores compatíveis, teste cabo Ethernet para reduzir a influência do sinal sem fio.'] },
    { heading: 'Revise sua assinatura', level: 3, paragraphs: ['Antes de contratar ou alterar um plano, confira as condições e a compatibilidade dos seus aparelhos. A inclusão de serviços de entretenimento em ofertas Netbox deve ser confirmada no atendimento.'], link: { label: 'Consultar os planos Netbox', href: '/site#planos-netbox' } },
  ]),
  demo('vantagens-do-aplicativo-netbox', 'Conheça as vantagens do aplicativo Netbox', 'Veja como encontrar os canais digitais e ter os serviços da sua conexão sempre por perto.', 'tecnologia', '/blog/aplicativo-1200.webp', 'Ilustração conceitual de aplicativo de serviços em celular, sem reproduzir a interface real', [
    { heading: 'Seus serviços em um só lugar', paragraphs: ['O aplicativo Netbox é um caminho para acessar o atendimento digital do provedor. Comece pelos links oficiais do site para encontrar a versão correta para o seu celular.', 'Este artigo ainda depende de aprovação editorial. A disponibilidade de cada recurso deve ser confirmada na versão instalada e no cadastro do cliente.'] },
    { heading: 'Acesse com segurança', paragraphs: ['Use suas credenciais pessoais e nunca compartilhe senhas por mensagens. Se tiver dificuldades com o acesso, procure os canais oficiais de atendimento.'], list: ['Instale pelo link oficial para Android ou iOS.', 'Mantenha o sistema e o aplicativo atualizados.', 'Confira o nome do desenvolvedor antes de instalar.'] },
    { heading: 'Precisa de ajuda?', level: 3, paragraphs: ['A central do cliente reúne os caminhos para atendimento, serviços digitais e informações de acesso. Consulte a equipe para confirmar quais recursos estão disponíveis para seu contrato.'], link: { label: 'Abrir a central do cliente', href: '/central-do-cliente' } },
  ]),
  demo('seguranca-digital-em-casa', 'Segurança digital começa com hábitos simples', 'Senhas únicas, atualizações e atenção aos links ajudam a proteger a rotina de toda a família.', 'tecnologia', '/blog/seguranca-1200.webp', 'Ilustração de notebook e celular protegidos por escudo e cadeado luminosos', [
    { heading: 'Proteja suas contas', paragraphs: ['Use senhas diferentes para serviços importantes e ative a autenticação em duas etapas quando disponível. Um gerenciador de senhas pode ajudar a guardar credenciais fortes.'] },
    { heading: 'Desconfie da urgência', paragraphs: ['Mensagens que exigem pagamento imediato ou pedem códigos de confirmação merecem atenção. Abra o aplicativo oficial ou digite o endereço conhecido para verificar a informação.'], list: ['Não compartilhe códigos recebidos por SMS.', 'Atualize o roteador conforme as orientações do fabricante ou provedor.', 'Revise as permissões de aplicativos instalados.'] },
    { heading: 'Procure o canal oficial', level: 3, paragraphs: ['Se receber um contato suspeito em nome da Netbox, confirme a solicitação nos canais publicados no site antes de fornecer dados.'], link: { label: 'Ver os canais oficiais de atendimento', href: '/contatos' } },
  ]),
  demo('conexao-para-jogar-online', 'Como preparar sua conexão para jogar online', 'Entenda a diferença entre velocidade, latência e estabilidade antes da próxima partida.', 'games', '/blog/games-1200.webp', 'Instalação de internet residencial da Netbox', [
    { heading: 'Velocidade não é o único fator', paragraphs: ['Jogos online dependem da troca contínua de pequenos pacotes de dados. Latência é o tempo de resposta, e sua variação pode tornar a experiência irregular mesmo quando há bastante banda disponível.'] },
    { heading: 'Prepare a rede local', paragraphs: ['Conectar o console ou computador por cabo ajuda a reduzir a influência de obstáculos e interferências sem fio. Downloads grandes em outros aparelhos também podem disputar os recursos da conexão.'], list: ['Pause downloads durante a partida se notar instabilidade.', 'Use servidores próximos quando o jogo permitir.', 'Compare resultados por cabo e por Wi-Fi para orientar o diagnóstico.'] },
    { heading: 'Registre o que acontece', level: 3, paragraphs: ['Anote o horário, o jogo, a região do servidor e se outros serviços também falham. Essas informações ajudam o suporte a investigar sem atribuir todo problema à velocidade do plano.'], link: { label: 'Entenda a rede de fibra óptica', href: '/site/blog/como-funciona-a-fibra-optica' } },
  ]),
  demo('por-onde-comecar-a-ler-hqs', 'Por onde começar a ler HQs de super-heróis?', 'Arcos fechados, edições de entrada e histórias alternativas: encontre sua primeira leitura sem se perder na cronologia.', 'hqs', '/blog/entretenimento-1200.webp', 'Ilustração de entretenimento digital do acervo Netbox', [
    { heading: 'Comece por uma história, não por toda a cronologia', paragraphs: ['Décadas de publicações podem tornar a primeira escolha intimidadora. Você não precisa ler tudo para começar: procure uma história com início, desenvolvimento e conclusão, acompanhada de uma sinopse que desperte sua curiosidade.', 'Este guia demonstrativo apresenta caminhos gerais de leitura. Edições, disponibilidade e classificação indicativa devem ser conferidas com a editora ou a loja antes da compra.'] },
    { heading: 'Entenda o formato da edição', paragraphs: ['Uma revista pode trazer somente um capítulo, enquanto um encadernado reúne várias edições. Verifique se o volume tem continuação e se a história depende de outro título.'], list: ['Confira a sinopse e o conteúdo da edição.', 'Dê preferência a um arco completo para sua primeira leitura.', 'Explore gêneros além dos super-heróis: ficção científica, fantasia e aventura também fazem parte das HQs.'] },
    { heading: 'Encontre seu próprio ritmo', level: 3, paragraphs: ['Comece por um personagem, tema ou estilo de arte de que você goste. Depois, conheça outros trabalhos dos autores e artistas que chamaram sua atenção. O melhor ponto de partida é uma história que dê vontade de continuar.'], link: { label: 'Explore mais conteúdos de HQs', href: '/site/blog?categoria=hqs' } },
  ], true),
  demo('como-escolher-sua-proxima-serie', 'Como escolher sua próxima série sem spoilers', 'Gênero, duração e clima da história ajudam a encontrar uma nova maratona sem descobrir as surpresas antes da hora.', 'series', '/blog/streaming-1200.webp', 'Ambiente de entretenimento conectado do acervo Netbox', [
    { heading: 'Pense no que você quer assistir agora', paragraphs: ['Você procura uma comédia leve, uma aventura de ficção científica ou um mistério? Escolher o clima da história pode ser mais útil do que percorrer dezenas de listas. Considere também quanto tempo você quer dedicar a cada episódio.', 'Este conteúdo demonstrativo não anuncia lançamentos nem confirma títulos em plataformas. Catálogos, classificações e disponibilidade precisam ser verificados no serviço utilizado.'] },
    { heading: 'Pesquise sem entregar as reviravoltas', paragraphs: ['Comece pela sinopse oficial e pela classificação indicativa. Se preferir preservar as surpresas, procure resenhas explicitamente identificadas como sem spoilers e evite comentários de episódios posteriores.'], list: ['Confira a duração média dos episódios.', 'Veja se a história é uma minissérie ou tem várias temporadas.', 'Leia os avisos de conteúdo antes de assistir em família.'] },
    { heading: 'Organize sua lista de próximas sessões', level: 3, paragraphs: ['Salve poucas opções por vez e revise a lista conforme seu interesse mudar. Alternar gêneros também pode ajudar a encontrar uma história que combine com cada momento.'], link: { label: 'Ver filmes, séries e entretenimento', href: '/site/blog?grupo=entretenimento' } },
  ]),
];


/** Official/help references for the original local guides. */
const guideReferences: Record<string, BlogArticle['sources']> = {
  'como-melhorar-o-sinal-wifi': [{ title: 'Recomendações para melhorar a conexão Wi-Fi', url: 'https://support.apple.com/pt-br/102766', publisher: 'Apple Support' }],
  'wifi-5-e-wifi-6': [{ title: 'Wi-Fi 6: recursos e compatibilidade', url: 'https://support.apple.com/pt-br/102285', publisher: 'Apple Support' }],
  'como-funciona-a-fibra-optica': [{ title: 'Como funciona a fibra óptica', url: 'https://www.corning.com/optical-communications/worldwide/en/home/learn/fiber-basics.html', publisher: 'Corning' }],
  'o-que-assistir-no-disney-plus': [{ title: 'Disney+', url: 'https://www.disneyplus.com/pt-br', publisher: 'Disney+' }],
  'como-aproveitar-o-hbo-max': [{ title: 'Central de ajuda HBO Max', url: 'https://help.hbomax.com/br-pt', publisher: 'HBO Max' }],
  'vantagens-do-aplicativo-netbox': [
    { title: 'Aplicativo Netbox para Android', url: 'https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox', publisher: 'Google Play' },
    { title: 'Aplicativo Netbox para iPhone', url: 'https://apps.apple.com/br/app/netbox/id1574550280', publisher: 'App Store' },
  ],
  'seguranca-digital-em-casa': [{ title: 'Secure Our World: ações para se proteger online', url: 'https://www.cisa.gov/secure-our-world', publisher: 'CISA' }],
  'conexao-para-jogar-online': [{ title: 'Entenda latência e requisitos de rede', url: 'https://help.ea.com/en/help/faq/connection-troubleshooting-basic/', publisher: 'EA Help' }],
  'por-onde-comecar-a-ler-hqs': [{ title: 'Como começar a ler histórias do Batman', url: 'https://www.dc.com/blog/2026-01-21/how-to-start-reading-batman-comics', publisher: 'DC' }],
  'como-escolher-sua-proxima-serie': [{ title: 'Guia de séries e entretenimento', url: 'https://www.netflix.com/tudum', publisher: 'Netflix Tudum' }],
};

/** Cinema links identify official trailers; they do not independently verify the demo news claims. */
const articlesWithSources = [
  ...cinemaArticles.map(article => ({
    ...article,
    sources: article.spotlight?.trailerUrl ? [{ title: 'Trailer oficial â€” referência audiovisual', url: article.spotlight.trailerUrl, publisher: 'Canal oficial da produção', role: 'promotional' as const }] : [],
  })),
  ...existingArticles.map(article => ({ ...article, sources: guideReferences[article.slug] ?? [] })),
];

/** Editorial records are listed in category rotation so the home feed begins with a balanced mix. */
const editorialByCategory = ['series', 'hqs', 'games'].flatMap(category => editorialArticles.filter(article => article.category === category));
export const articles: BlogArticle[] = [...articlesWithSources, ...editorialByCategory];

