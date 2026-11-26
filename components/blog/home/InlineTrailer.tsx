"use client";

import { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./InlineTrailer.module.css";
import TrackedTrailerFrame from './TrackedTrailerFrame';

type Props = {
  player: { src: string; title: string; articleId?:string; modal?: boolean } | null;
  onClose: () => void;
};

/** Inline overlay: its frame exists only while open, so closing also stops playback. */
export function InlineTrailer({ player, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = Boolean(player);
  const modal = Boolean(player?.modal);

  useEffect(() => {
    if (!open) return;
    if (modal && dialogRef.current) {
      const dialog = dialogRef.current;
      const previousOverflow = document.documentElement.style.overflow;
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      closeRef.current?.focus({ preventScroll: true });
      return () => {
        dialog.close();
        document.documentElement.style.overflow = previousOverflow;
      };
    }
    closeRef.current?.focus({ preventScroll: true });
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || document.querySelector("dialog[open]")) return;
      event.preventDefault();
      onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, modal, onClose]);

  if (player?.modal) {
    return (
      <dialog
        id="blog-mobile-trailer"
        ref={dialogRef}
        className={styles.mobileDialog}
        aria-label={"Trailer de " + player.title}
        onCancel={(event) => { event.preventDefault(); onClose(); }}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Fechar trailer">
          <IoCloseOutline aria-hidden="true" />
        </button>
        <div className={styles.frame}><TrackedTrailerFrame key={player.src} src={player.src} title={player.title} articleId={player.articleId} /></div>
      </dialog>
    );
  }

  return (
    <div className={styles.shell} data-open={open} data-ui="inline-trailer" aria-hidden={!open} inert={!open}>
      <div className={styles.layout} role="region" aria-label={player ? "Trailer de " + player.title : "Trailer"}>
        <div className={styles.frame}>
          {player && <TrackedTrailerFrame
            key={player.src}
            src={player.src}
            title={player.title}
            articleId={player.articleId}
          />}
        </div>
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Fechar trailer" title="Fechar trailer">
          <IoCloseOutline aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
