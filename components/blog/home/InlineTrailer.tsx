"use client";

import { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./InlineTrailer.module.css";

type Props = {
  player: { src: string; title: string } | null;
  onClose: () => void;
};

/** Inline overlay: its frame exists only while open, so closing also stops playback. */
export function InlineTrailer({ player, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(player);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || document.querySelector("dialog[open]")) return;
      event.preventDefault();
      onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    <div className={styles.shell} data-open={open} data-ui="inline-trailer" aria-hidden={!open} inert={!open}>
      <div className={styles.layout} role="region" aria-label={player ? "Trailer de " + player.title : "Trailer"}>
        <div className={styles.frame}>
          {player && <iframe
            key={player.src}
            src={player.src}
            title={"Trailer de " + player.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />}
        </div>
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Fechar trailer" title="Fechar trailer">
          <IoCloseOutline aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
