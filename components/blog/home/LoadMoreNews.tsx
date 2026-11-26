"use client";

import styles from "@/styles/blog/Blog.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { IoArrowDownOutline, IoSyncOutline } from "react-icons/io5";

export function LoadMoreNews({ href, shown, total }: { href: string; shown: number; total: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div id="blog-load-more-news" className={styles.loadMore} aria-busy={pending}>
      {href && (
        <Link
          className={styles.secondaryButton}
          href={href}
          scroll={false}
          aria-disabled={pending || undefined}
          onNavigate={(event) => {
            event.preventDefault();
            if (!pending) startTransition(() => router.push(href, { scroll: false }));
          }}
        >
          {pending ? <>Carregando notícias… <IoSyncOutline className={styles.loadMoreSpinner} aria-hidden="true" /></> : <>Carregar mais notícias <IoArrowDownOutline aria-hidden="true" /></>}
        </Link>
      )}
      <p role="status">Exibindo {shown} de {total} artigos</p>
    </div>
  );
}
