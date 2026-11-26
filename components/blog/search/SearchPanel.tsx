"use client";

import { categories } from "@/lib/blog/navigation";
import styles from "@/styles/blog/Blog.module.css";
import { type ReactNode, Suspense, lazy, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { SearchForm, type ArticleSuggestion } from "./SearchForm";
import panelStyles from "./SearchPanel.module.css";

const MediaExplorer = lazy(() => import("../media/MediaExplorer").then((module) => ({ default: module.MediaExplorer })));

type Props = {
  open: boolean;
  query: string;
  category: string;
  group: string;
  onClose: () => void;
  editorialSidebar?: ReactNode;
  articleSuggestions: ArticleSuggestion[];
};

/** Native modal behavior contains focus, supports Escape and restores focus to the search trigger. */
export function SearchPanel({
  open,
  query,
  category,
  group,
  onClose,
  editorialSidebar,
  articleSuggestions,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<"articles" | "media">("articles");
  const categoryLabel = categories.find((item) => item.id === category)?.label;

  useEffect(() => {
    const dialog = dialogRef.current;
    if(!dialog || !open) return;

    const previousOverflow = document.documentElement.style.overflow;
    const viewport = window.visualViewport;
    const updateViewport = () => {
      if (viewport) dialog.style.setProperty("--blog-search-viewport", `${viewport.height}px`);
    };
    viewport?.addEventListener("resize", updateViewport);
    updateViewport();
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    dialog.querySelector<HTMLInputElement>('input[type="search"]')?.focus();

    return () => {
      viewport?.removeEventListener("resize", updateViewport);
      dialog.style.removeProperty("--blog-search-viewport");
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
        {categoryLabel
          ? "Pesquise artigos em " + categoryLabel + "."
          : "Busque artigos por título, assunto ou categoria."}
      </p>
      <div className={panelStyles.modes} role="group" aria-label="Tipo de pesquisa">
        <button id="blog-search-mode-articles" type="button" aria-pressed={mode === "articles"} onClick={() => setMode("articles")}>Artigos do Blog</button>
        <button id="blog-search-mode-media" type="button" aria-pressed={mode === "media"} onClick={() => setMode("media")}>Filmes e séries</button>
      </div>
      {mode === "articles" ? <SearchForm
        key={JSON.stringify([query, open])}
        articleSuggestions={articleSuggestions}
        query={query}
        category={category}
        group={group}
        onSubmitted={onClose}
      /> : open && (
        <Suspense fallback={<p role="status">Carregando pesquisa de obras…</p>}>
          <MediaExplorer kind="all" compact />
        </Suspense>
      )}
      <div className={styles.searchPanelEditorial}>{editorialSidebar}</div>
    </dialog>
  );
}
