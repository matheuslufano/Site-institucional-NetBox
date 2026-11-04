import type { Metadata } from 'next';
import { MediaCredit } from '@/components/blog/media/MediaCatalog';

export const metadata: Metadata = { title: 'Créditos | Blog Netbox' };

/** Provider attribution is centralized outside the work and category reading surfaces. */
export default function CreditsPage() {
  return <section style={{ width: 'min(900px, calc(100% - 40px))', margin: '50px auto' }}>
    <h1>Créditos</h1><p>Fontes do catálogo de filmes e séries do Blog Netbox.</p>
    <MediaCredit />
    <p>Informações de disponibilidade de streaming fornecidas por JustWatch via TMDB.</p>
  </section>;
}
