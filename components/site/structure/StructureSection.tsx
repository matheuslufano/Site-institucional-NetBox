import { Gallery } from "./Gallery";

const structureItems = [
  {
    title: "REDE DE FIBRA ÓPTICA",
    image: "/estrutura/REDE DE FIBRA ÓPTICA.jpg",
    alt: "Técnico organizando conexões em uma caixa de distribuição de fibra óptica",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Rede de fibra óptica preparada para manter você conectado.",
    width: 2345,
    height: 1420,
  },
  {
    title: "ATENDIMENTO HUMANIZADO",
    image: "/estrutura/ATENDIMENTO HUMANIZADO.jpg",
    alt: "Área interna da central de atendimento Netbox",
    source: "Acervo Netbox",
    position: "center",
    description: "Fale com a gente sem complicação e encontre rapidamente o que precisa.",
    width: 2345,
    height: 1420,
  },
  {
    title: "INSTALAÇÃO ÁGIL",
    image: "/estrutura/INSTALAÇÃO ÁGIL.jpg",
    alt: "Técnico configurando roteador durante instalação residencial",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Contratou? Nossa equipe cuida da instalação para você começar a usar.",
    width: 2345,
    height: 1420,
  },
  {
    title: "SUPORTE QUE RESOLVE",
    image: "/estrutura/SUPORTE QUE RESOLVE.jpg",
    alt: "Equipe técnica atendendo uma rede em bairro residencial",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Quando precisar, nosso time técnico está pronto para ajudar.",
    width: 2345,
    height: 1420,
  },
  {
    title: "PARA SUA CASA OU EMPRESA",
    image: "/estrutura/PARA SUA CASA OU EMPRESA.jpg",
    alt: "Especialista apresentando infraestrutura de rede a clientes empresariais",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Planos e soluções para diferentes formas de usar a internet.",
    width: 2345,
    height: 1420,
  },
  {
    title: "ESTAMOS PERTO DE VOCÊ",
    image: "/estrutura/ESTAMOS PERTO DE VOCÊ.jpg",
    alt: "Fachada de uma loja Netbox",
    source: "Acervo Netbox",
    position: "center",
    description: "Presença regional e atendimento feito por quem conhece sua cidade.",
    width: 2345,
    height: 1420,
  },
];

export function StructureSection({ id }: { id?: string }) {
  return (
    <section className="inner-section soft-section" id={id}>
      <div className="model-shell">
        <div className="model-heading">
          <h2>A estrutura é nossa, a facilidade é sua.</h2>
          <p>Da contratação ao suporte, trabalhamos para deixar sua experiência mais simples.</p>
        </div>
        <Gallery items={structureItems} />
      </div>
    </section>
  );
}
