import type { ArticleSource } from '@/types/blog';
import styles from '@/styles/blog/ArticleSources.module.css';

type ArticleSourcesProps = { sources: ArticleSource[] };

/** Shows the editorial references and distinguishes factual sources from promotional media. */
export function ArticleSources({ sources }: ArticleSourcesProps) {
  if (!sources.length) return null;
  return <section className={styles.sources} aria-labelledby="article-sources-title">
    <h2 id="article-sources-title">Fontes e referências</h2>
    <ul>{sources.map(source => <li key={source.url}>
      <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
      <span>{source.publisher}{source.role === 'promotional' ? ' · material audiovisual, não valida os dados da notícia' : ''}</span>
    </li>)}</ul>
  </section>;
}
