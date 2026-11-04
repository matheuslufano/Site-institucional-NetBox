"use client";

import { categories } from "@/lib/blog/navigation";
import styles from "@/styles/blog/Blog.module.css";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { SearchForm } from "./SearchForm";
import { MediaExplorer } from "../media/MediaExplorer";
import mediaStyles from "../media/MediaCatalog.module.css";
import { FiBookOpen, FiFilm } from "react-icons/fi";

type Props = {
  open: boolean;
  query: string;
  category: string;
  group: string;
  onClose: () => void;
  editorialSidebar?: ReactNode;
};

/** Native modal behavior contains focus, supports Escape and restores focus to the search trigger. */
export function SearchPanel({
  open,
  query,
  category,
  group,
  onClose,
  editorialSidebar,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<'works' | 'articles'>('works');
  const categoryLabel = categories.find((item) => item.id === category)?.label;

  useEffect(() => {
    const dialog = dialogRef.current;
    if(!dialog || !open) return;

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
        if(
          event.target instanceof Element &&
          event.target.closest("a[href]")
        ) {
          onClose();
          return;
        }
        if(event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if(
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
      <h2 id="blog-search-title">O que você quer encontrar?</h2>
      <p id="blog-search-description">
        {mode === 'works' ? 'Busque filmes e séries por títulos em português ou no idioma original.' : categoryLabel
          ? "Pesquise artigos em " + categoryLabel + "."
          : "Busque tecnologia, filmes, séries, HQs, jogos e entretenimento."}
      </p>
      <div className={mediaStyles.searchModes} role="group" aria-label="Tipo de busca">
        <button type="button" aria-pressed={mode === 'works'} onClick={() => setMode('works')}><FiFilm aria-hidden="true" />Filmes e séries</button>
        <button type="button" aria-pressed={mode === 'articles'} onClick={() => setMode('articles')}><FiBookOpen aria-hidden="true" />Artigos do blog</button>
      </div>
      {mode === 'works' ? <MediaExplorer kind="all" compact /> : <SearchForm
        query={query}
        category={category}
        group={group}
        onSubmitted={onClose}
      />}
      <div className={styles.searchPanelEditorial}>{editorialSidebar}</div>
    </dialog>
  );
}
