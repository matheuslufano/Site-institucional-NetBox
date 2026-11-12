import Image from "next/image";
import { FiArrowUpRight, FiFilm } from "react-icons/fi";
import {
  getMediaPage,
  type MediaKind,
  type MediaResult,
  type MediaWork,
} from "@/lib/blog/media";
import styles from "./MediaCatalog.module.css";
import { MediaExplorer } from "./MediaExplorer";

export function MediaCredit() {
  return (
    <footer className={styles.credit} aria-label="Créditos dos dados">
      <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
        <Image
          src="/blog/providers/tmdb.svg"
          alt="TMDB"
          width={90}
          height={12}
          unoptimized
        />
        Dados e imagens <FiArrowUpRight aria-hidden="true" />
      </a>
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </footer>
  );
}

export function MediaPoster({ work }: { work: MediaWork }) {
  return (
    <div className={styles.poster}>
      {work.poster ? (
        <Image
          src={work.poster}
          alt={"Capa de " + work.title}
          width={500}
          height={750}
          unoptimized
        />
      ) : (
        <span>
          <FiFilm aria-hidden="true" />
          Capa indisponível
        </span>
      )}
    </div>
  );
}

export function MediaUnavailable({
  result,
}: {
  result: Exclude<MediaResult<unknown>, { status: "ready" }>;
}) {
  return (
    <p className={styles.empty} role="status">
      {result.status === "unconfigured"
        ? "O catálogo de filmes e séries estará disponível em breve."
        : "Não foi possível carregar as obras agora. Tente novamente mais tarde."}
    </p>
  );
}

  /** Full-width external catalog stays below the editorial archive. */
  export async function MediaCatalog({ category }: { category: string }) {
    const kind: MediaKind = category === "series" ? "tv" : "movie";
    const initial = await getMediaPage(kind);
    return (
      <div className={styles.catalog} data-ui="media-catalog">
        <div className={styles.catalogInner}>
          <MediaExplorer key={kind} kind={kind} initial={initial} />
        </div>
      </div>
    );
  }
