'use client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { blogHref } from '../_lib/navigation';
import styles from '../blog.module.css';

/** GET-compatible search progressively enhances to client-side App Router navigation. */
export function BlogSearch({ query, category, group, onSubmitted }: { query: string; category: string; group: string; onSubmitted?: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return <form action="/site/blog" role="search" className={styles.search} aria-busy={pending} onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmitted?.();
    startTransition(() => router.push(blogHref(category, String(data.get('q') ?? '').trim(), 1, group)));
  }}>
    <label className="sr-only" htmlFor="blog-search">Buscar artigos por título, resumo ou categoria</label>
    <input key={query} id="blog-search" name="q" defaultValue={query} placeholder="Buscar artigos..." type="search" maxLength={160} />
    {group && <input type="hidden" name="grupo" value={group} />}
    {category && <input type="hidden" name="categoria" value={category} />}
    <button type="submit" disabled={pending}>{pending ? 'Buscando…' : 'Buscar'}</button>
  </form>;
}
