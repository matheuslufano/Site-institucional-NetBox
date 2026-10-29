"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BlogSearch } from "./BlogSearch";
import { categories } from "../_lib/navigation";
import styles from "../blog.module.css";

type Props = {
  open: boolean;
  query: string;
  category: string;
  group: string;
  onClose: () => void;
  editorialSidebar?: ReactNode;
};

/** Native modal behavior contains focus, supports Escape and restores focus to the search trigger. */
export function BlogSearchPanel({
  open,
  query,
  category,
  group,
  onClose,
  editorialSidebar,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const categoryLabel = categories.find((item) => item.id === category)?.label;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    dialog.querySelector<HTMLInputElement>('input[type="search"]')?.focus();

    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      id="blog-search-panel"
      className={styles.searchPanel}
      aria-labelledby="blog-search-title"
      aria-describedby="blog-search-description"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (
          event.target instanceof Element &&
          event.target.closest("a[href]")
        ) {
          onClose();
          return;
        }
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
    >
      <div className={styles.searchPanelHeading}>
        <span className={styles.eyebrow}>EXPLORE O BLOG</span>
        <button
          className={styles.searchCloseButton}
          type="button"
          onClick={onClose}
          aria-label="Fechar busca"
        >
          <IoCloseOutline aria-hidden="true" />
        </button>
      </div>
      <h2 id="blog-search-title">Encontre sua próxima leitura</h2>
      <p id="blog-search-description">
        {categoryLabel
          ? "Pesquise artigos em " + categoryLabel + "."
          : "Busque tecnologia, filmes, séries, HQs, jogos e entretenimento."}
      </p>
      <BlogSearch
        query={query}
        category={category}
        group={group}
        onSubmitted={onClose}
      />
      <div className={styles.searchPanelEditorial}>{editorialSidebar}</div>
    </dialog>
  );
}
