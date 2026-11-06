import type { Metadata } from 'next';
import { MediaCredit } from '@/components/blog/media/MediaCatalog';
import { FiExternalLink } from 'react-icons/fi';

export const metadata: Metadata = { title: 'Créditos | Blog Netbox' };

/** Provider attribution is centralized outside the work and category reading surfaces. */
export default function CreditsPage() {
  return <section style={{ width: 'min(900px, calc(100% - 40px))', margin: '50px auto' }}>
    <h1>Créditos</h1><p>Fontes dos catálogos e das imagens do Blog Netbox.</p>
    <MediaCredit />
    <p>Informações de disponibilidade de streaming fornecidas por JustWatch via TMDB.</p>
    <h2>HQs</h2>
    <p>Dados de identificação de HQs adaptados de <a href="https://metron.cloud/" target="_blank" rel="noopener noreferrer">Metron <FiExternalLink aria-hidden="true" /></a>, sob a licença <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0 <FiExternalLink aria-hidden="true" /></a>. Capas pertencem às respectivas editoras e aos criadores e não estão cobertas por essa licença.</p>
    <h2>Jogos</h2>
    <p>O editor oferece busca de capas, artes e capturas de tela pela <a href="https://www.igdb.com/" target="_blank" rel="noopener noreferrer">IGDB <FiExternalLink aria-hidden="true" /></a>. As imagens pertencem aos respectivos titulares.</p>
  </section>;
}
