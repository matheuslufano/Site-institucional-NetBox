'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { blogHref } from '../_lib/navigation';
import styles from '../blog.module.css';

type Props = { category: string; query: string; group: string; order: string };

/** Sorting preserves category/search state and starts at page one. Only available data is offered. */
export function CategorySort({ category, query, group, order }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div className={styles.categorySort} aria-busy={pending}>
      <label className="sr-only" htmlFor="category-sort">Ordenar publicações</label>
      <select id="category-sort" value={order} disabled={pending} onChange={event => {
        const nextOrder = event.target.value;
        startTransition(() => router.push(blogHref(category, query, 1, group, nextOrder), { scroll: false }));
      }}>
        <option value="recentes">Mais recentes</option>
        <option value="antigas">Mais antigas</option>
        <option value="destaques">Em destaque</option>
      </select>
    </div>
  );
}
