"use client";
import { useEffect, useId, useRef, useState } from "react";
import { FiFilm, FiSearch, FiTv, FiX } from "react-icons/fi";
import { IoTriangle } from "react-icons/io5";
import type { MediaKind, MediaPage, MediaResult } from "@/lib/blog/media";
import { MediaCards } from "./MediaCards";
import styles from "./MediaCatalog.module.css";

type Props = {
  kind: MediaKind | "all";
  initial?: MediaResult<MediaPage>;
  compact?: boolean;
};

/** Explicit title search and incremental pagination preserve query and type across requests. */
export function MediaExplorer({ kind, initial, compact = false }: Props) {
  const id = useId();
  const [result, setResult] = useState(initial);
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [visible, setVisible] = useState(10);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  const load = async (term: string, page = 1, append = false) => {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    setPending(true);
    setError("");
    try {
      const params = new URLSearchParams({ kind, q: term, page: String(page) });
      const response = await fetch("/api/blog/media?" + params, {
        signal: request.signal,
      });
      const next: MediaResult<MediaPage> = await response.json();
      if (request.signal.aborted) return;
      if (!response.ok || next.status !== "ready")
        throw new Error("Não foi possível buscar as obras. Tente novamente.");
      setActiveQuery(term);
      if (append)
        setResult((previous) =>
          previous?.status === "ready"
            ? {
                status: "ready",
                data: {
                  ...next.data,
                  works: [...previous.data.works, ...next.data.works].filter(
                    (work, index, list) =>
                      list.findIndex(
                        (item) =>
                          item.id === work.id && item.kind === work.kind,
                      ) === index,
                  ),
                },
              }
            : next,
        );
      else setResult(next);
      setVisible((count) => (append ? count + 20 : 10));
    } catch (cause) {
      if (!request.signal.aborted)
        setError(cause instanceof Error ? cause.message : "Falha na busca.");
    } finally {
      if (!request.signal.aborted) setPending(false);
    }
  };
  const works = result?.status === "ready" ? result.data.works : [];
  const more =
    result?.status === "ready" &&
    (visible < works.length || result.data.page < result.data.totalPages);
  return (
    <section
      className={compact ? styles.compact : styles.shelf}
      data-ui="media-explorer"
      aria-busy={pending}
    >
      <div className={styles.explorerTop}>
        {!compact && (
          <header className={styles.heading}>
            <span>
              {kind === "tv" ? (
                <FiTv aria-hidden="true" />
              ) : (
                <FiFilm aria-hidden="true" />
              )}
            </span>
            <div>
              <small>PARA SUA PRÓXIMA SESSÃO</small>
              <h2>
                {activeQuery
                  ? "Resultados para “" + activeQuery + "”"
                  : kind === "tv"
                    ? "Séries em alta nesta semana"
                    : "Filmes em alta nesta semana"}
              </h2>
              <p>Descubra histórias e pesquise títulos em português.</p>
            </div>
          </header>
        )}
        <form
          className={styles.mediaSearch}
          role="search"
          aria-label="Buscar obras"
          onSubmit={(event) => {
            event.preventDefault();
            const term = query.trim();
            if (compact && !term) return;
            void load(term);
          }}
        >
          <label className="sr-only" htmlFor={id}>
            Buscar{" "}
            {kind === "movie"
              ? "filmes"
              : kind === "tv"
                ? "séries"
                : "filmes e séries"}{" "}
            em português
          </label>
          <FiSearch aria-hidden="true" />
          <input
            id={id}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              kind === "movie"
                ? "Buscar filmes em português…"
                : kind === "tv"
                  ? "Buscar séries em português…"
                  : "Buscar filmes e séries…"
            }
            maxLength={160}
          />
          {query && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => {
                setQuery("");
                if (!compact) void load("");
                else {
                  controller.current?.abort();
                  setResult(undefined);
                  setActiveQuery("");
                  setError("");
                  setPending(false);
                }
              }}
            >
              <FiX aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            disabled={pending || (compact && !query.trim())}
            aria-label="Pesquisar obras"
          >
            <FiSearch aria-hidden="true" />
          </button>
        </form>
      </div>
      <div role="status" className={styles.searchStatus}>
        {pending
          ? "Buscando obras…"
          : activeQuery && result?.status === "ready"
            ? `Resultados para “${activeQuery}”`
            : ""}
      </div>
      {error && (
        <p className={styles.empty} role="alert">
          {error}
        </p>
      )}
      {works.length > 0 && (
        <MediaCards works={works.slice(0, visible)} compact={compact} />
      )}
      {!pending &&
        !error &&
        result &&
        (result.status !== "ready" ? (
          <p className={styles.empty}>
            {result.status === "unconfigured"
              ? "O catálogo estará disponível em breve."
              : "Catálogo indisponível no momento."}
          </p>
        ) : (
          !works.length && (
            <p className={styles.empty}>
              Nenhuma obra encontrada. Experimente outro título.
            </p>
          )
        ))}
      {!result && !pending && (
        <p className={styles.searchHint}>
          Pesquise pelo título em português ou pelo nome original da obra.
        </p>
      )}
      {more && (
        <div className={styles.loadMoreRow}>
          <button
            className={styles.loadMore}
            type="button"
            disabled={pending}
            onClick={() => {
              if (visible < works.length) setVisible((count) => count + 10);
              else if (result?.status === "ready")
                void load(activeQuery, result.data.page + 1, true);
            }}
          >
            <IoTriangle aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
