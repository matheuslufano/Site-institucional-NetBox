import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiExternalLink, FiStar, FiTrendingUp, FiTv } from 'react-icons/fi';
import { cache } from 'react';
import type { Metadata } from 'next';
import { getMediaDetail } from '@/lib/blog/media';
import { MediaUnavailable } from './MediaCatalog';
import { MediaGallery } from './MediaGallery';
import styles from './MediaDetail.module.css';

export type MediaDetailProps = { params: Promise<{ kind: string; id: string }> };
const load = cache(async (kind: string, id: string) => {
  if (kind !== 'movie' && kind !== 'tv') notFound();
  return getMediaDetail(kind, id);
});
export async function mediaMetadata({ params }: MediaDetailProps): Promise<Metadata> {
  const { kind, id } = await params;
  const result = await load(kind, id);
  return { title: result.status === 'ready' ? `${result.data.title} | Obras | Blog Netbox` : 'Obra indisponível | Blog Netbox', description: result.status === 'ready' ? result.data.overview.slice(0, 160) : undefined, robots: { index: false, follow: true } };
}

/** Film identity, gallery and provider data follow the supplied visual reference. */
export async function MediaDetail({ params }: MediaDetailProps) {
  const { kind, id } = await params;
  const result = await load(kind, id);
  if (result.status === 'missing') notFound();
  const back = '/site/blog?categoria=' + (kind === 'movie' ? 'filmes' : 'series');
  if (result.status !== 'ready') return <div className={styles.page}><Link className={styles.back} href={back}><FiArrowLeft aria-hidden="true" />Voltar para a categoria</Link><h1>Obra indisponível</h1><MediaUnavailable result={result} /></div>;
  const work = result.data;
  return <div className={styles.page} data-ui="media-detail">
    <div className={styles.ambient} aria-hidden="true" style={{ backgroundImage: work.poster || work.backdrop ? `url("${(work.poster || work.backdrop)!.replace('/w500/', '/w185/').replace('/w1280/', '/w300/')}")` : undefined }}><div /></div>
    <Link className={styles.back} href={back}><FiArrowLeft aria-hidden="true" />Voltar para {kind === 'movie' ? 'Filmes' : 'Séries'}</Link>
    <section className={styles.hero} aria-labelledby="work-title">
      <header className={styles.titleRow}>
        <div><h1 id="work-title">{work.title}</h1>
          {work.originalTitle && <p className={styles.original}>Título original: {work.originalTitle}</p>}
          <div className={styles.meta}><span>{kind === 'movie' ? 'Filme' : 'Série de TV'}</span>{work.year && <span>{work.year}</span>}{work.runtime ? <span>{work.runtime} min</span> : null}{work.seasons ? <span>{work.seasons} temporada(s)</span> : null}{work.episodes ? <span>{work.episodes} episódios</span> : null}</div>
        </div>
        <div className={styles.metrics}>
          <div><small>AVALIAÇÃO TMDB</small><p><FiStar aria-hidden="true" />{work.rating === null ? 'Sem nota' : work.rating.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}<span>/10</span></p><span>{work.votes.toLocaleString('pt-BR')} avaliações</span></div>
          {work.popularity !== undefined && <div><small>POPULARIDADE TMDB</small><p><FiTrendingUp aria-hidden="true" />{work.popularity.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</p><span>Índice do provedor</span></div>}
        </div>
      </header>
      <MediaGallery work={work} />
      <div className={styles.details}>
        <div><div className={styles.genres}>{work.genres.map(genre => <span key={genre}>{genre}</span>)}</div>
          <p className={styles.synopsis}>{work.overview || 'Sinopse em português indisponível para esta obra.'}</p>
          {work.directors.length > 0 && <div className={styles.creditRow}><strong>{kind === 'movie' ? 'Direção' : 'Criação'}</strong><span>{work.directors.join(' · ')}</span></div>}
          {work.cast.length > 0 && <div className={styles.creditRow}><strong>Estrelas</strong><span>{work.cast.join(' · ')}</span></div>}
          <a className={styles.source} href={`https://www.themoviedb.org/${kind}/${work.id}`} target="_blank" rel="noreferrer"><FiExternalLink aria-hidden="true" />Informações completas no TMDB</a>
        </div>
        <aside className={styles.streaming} aria-labelledby="watch-title"><h2 id="watch-title"><FiTv aria-hidden="true" />Onde assistir</h2><small>DISPONIBILIDADE NO BRASIL</small>
          {work.providers.length ? <div className={styles.providers}>{work.providers.map(provider => <div key={provider.name}>{provider.logo && <Image src={provider.logo} alt="" width={54} height={54} unoptimized />}<span>{provider.name}</span></div>)}</div> : <p>Streaming por assinatura não informado para o Brasil.</p>}
          {work.watchUrl && <a className={styles.source} href={work.watchUrl} target="_blank" rel="noreferrer"><FiExternalLink aria-hidden="true" />Consultar opções</a>}
          <p className={styles.attribution}>Disponibilidade: JustWatch via TMDB.</p>
        </aside>
      </div>
    </section>
  </div>;
}
