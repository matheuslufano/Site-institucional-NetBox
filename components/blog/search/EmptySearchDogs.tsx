import { CoverImage } from "@/components/blog/articles/CoverImage";
import styles from "./EmptySearchDogs.module.css";
import { emptySearchDogs } from "./empty-search-dogs";

/** Decorative dog artwork shared by empty search and category states. */
export function EmptySearchDogs() {
  return (
    <div
      className={styles.emptySearchDogs}
      data-component="empty-search-dogs"
      aria-hidden="true"
    >
      {emptySearchDogs.map((dog) => (
        <span className={styles.dogArtwork} key={dog.name}>
          <CoverImage
            src={`/blog/search-empty/${dog.name}.webp`}
            alt=""
            fill
            sizes="(max-width: 767px) 20vw, 88px"
            unoptimized
          />
        </span>
      ))}
    </div>
  );
}
