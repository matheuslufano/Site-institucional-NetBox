"use client";
import { MediaImage as Image } from "./MediaImage";
import { useEffect, useRef, useState } from "react";
import { FiFilm, FiImage, FiMaximize2, FiPlay } from "react-icons/fi";
import type { MediaWork } from "@/lib/blog/media";
import styles from "./MediaDetail.module.css";
import { MediaViewer } from "./MediaViewer";

/** One central viewer and one active media file; enlarged playback never duplicates the iframe. */
export function MediaGallery({ work }: { work: MediaWork }) {
  const [mode, setMode] = useState<"videos" | "photos" | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [controlsEpoch, setControlsEpoch] = useState(0);
  const revealControls = () => {
    setControlsVisible(true);
    setControlsEpoch((value) => value + 1);
  };
  useEffect(() => {
    const timer = setTimeout(() => setControlsVisible(false), 1000);
    return () => clearTimeout(timer);
  }, [controlsEpoch]);
  const dialog = useRef<HTMLDialogElement>(null);
  const inlineViewer = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const primaryTrigger = useRef<HTMLButtonElement>(null);
  const count = mode === "photos" ? work.photos.length : work.videos.length;
  const select = (next: "photos" | "videos", button: HTMLButtonElement) => {
    revealControls();
    trigger.current = button;
    setMode(next);
    setIndex(0);
    setPlaying(false);
    setLoading(false);
    requestAnimationFrame(() =>
      inlineViewer.current?.focus({ preventScroll: true }),
    );
  };
  const move = (offset: number) => {
    if (count < 2) return;
    revealControls();
    setIndex((current) => (current + offset + count) % count);
    setPlaying(false);
    setLoading(false);
  };
  const close = () => {
    setMode(null);
    setPlaying(false);
    setLoading(false);
    requestAnimationFrame(() =>
      (trigger.current?.isConnected
        ? trigger.current
        : primaryTrigger.current
      )?.focus({ preventScroll: true }),
    );
  };
  const enlarge = () => {
    revealControls();
    setExpanded(true);
    dialog.current?.showModal();
  };
  const play = () => {
    setLoading(true);
    setPlaying(true);
  };
  const keys = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
    if (event.key === "Escape" && !expanded) {
      event.preventDefault();
      close();
    }
  };
  const closeExpanded = () => dialog.current?.close();
  const mediaProps = {
    work,
    mode: mode ?? ("videos" as const),
    index,
    playing,
    loading,
    controlsVisible,
    onMove: move,
    onPlay: play,
    onLoaded: () => setLoading(false),
    onKeyDown: keys,
  };

  return (
    <>
      <div className={styles.media}>
        <div className={styles.poster}>
          {work.poster ? (
            <Image
              src={work.poster}
              alt={"Capa de " + work.title}
              width={500}
              height={750}
              unoptimized
              priority
            />
          ) : (
            <FiFilm aria-label="Capa indisponível" />
          )}
        </div>
        <div
          id="work-media-viewer"
          className={styles.trailer}
          data-ui="media-viewer"
          data-mode={mode ?? "trailer"}
        >
          {mode ? (
            expanded ? (
              <div className={styles.expandedPlaceholder}>
                <FiMaximize2 aria-hidden="true" />
                Arquivo aberto na visualização ampliada
              </div>
            ) : (
              <MediaViewer
                {...mediaProps}
                expanded={false}
                viewerRef={inlineViewer}
                onClose={close}
                onEnlarge={enlarge}
              />
            )
          ) : (
            <>
              {(work.backdrop || work.poster) && (
                <Image
                  src={work.backdrop || work.poster!}
                  alt={"Cena de " + work.title}
                  fill
                  sizes="(max-width: 700px) 100vw, 60vw"
                  unoptimized
                  priority
                />
              )}
              {work.videos.length ? (
                <button
                  ref={primaryTrigger}
                  className={styles.play}
                  type="button"
                  onClick={(event) => {
                    select("videos", event.currentTarget);
                    play();
                  }}
                >
                  <span className={styles.playBadge}>
                    <FiPlay aria-hidden="true" />
                  </span>
                  <span>
                    <small>TRAILER DA OBRA</small>Reproduzir trailer
                    <small>{work.videos[0].name}</small>
                  </span>
                </button>
              ) : (
                <span className={styles.noTrailer}>
                  <FiFilm aria-hidden="true" />
                  Trailer indisponível
                </span>
              )}
            </>
          )}
        </div>
        <div className={styles.mediaLinks}>
          <button
            type="button"
            disabled={!work.videos.length}
            aria-pressed={mode === "videos"}
            aria-controls="work-media-viewer"
            onClick={(event) => select("videos", event.currentTarget)}
          >
            <FiFilm aria-hidden="true" />
            <strong>{work.videos.length} vídeos</strong>
          </button>
          <button
            type="button"
            disabled={!work.photos.length}
            aria-pressed={mode === "photos"}
            aria-controls="work-media-viewer"
            onClick={(event) => select("photos", event.currentTarget)}
          >
            <FiImage aria-hidden="true" />
            <strong>{work.photos.length} fotos</strong>
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className={styles.expandedDialog}
        aria-label={"Mídias de " + work.title}
        onClose={() => {
          revealControls();
          setExpanded(false);
          setPlaying(false);
          setLoading(false);
          requestAnimationFrame(() =>
            inlineViewer.current?.focus({ preventScroll: true }),
          );
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        {expanded && mode && (
          <MediaViewer
            {...mediaProps}
            expanded
            onClose={closeExpanded}
            onEnlarge={enlarge}
          />
        )}
      </dialog>
    </>
  );
}
