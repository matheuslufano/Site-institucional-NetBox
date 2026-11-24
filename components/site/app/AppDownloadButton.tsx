"use client";

import { useRef, type MouseEvent } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { APP_STORE, APP_STORE_LOGO, GOOGLE_PLAY_LOGO, PLAY_STORE } from "@/constants/site";
import { getAppStoreUrl } from "./getAppStoreUrl";
import styles from "./AppDownloadButton.module.css";

export function AppDownloadButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openStoreOptions(event: MouseEvent<HTMLAnchorElement>) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const dialog = dialogRef.current;
    if (getAppStoreUrl(navigator) || !dialog?.showModal) return;

    event.preventDefault();
    const trigger = event.currentTarget.getBoundingClientRect();
    dialog.showModal();

    const { offsetWidth, offsetHeight } = dialog;
    const viewport = document.documentElement;
    const edge = 16;
    const gap = 10;
    const centeredLeft = trigger.left + (trigger.width - offsetWidth) / 2;
    const preferredTop = trigger.top - offsetHeight - gap;
    const top = preferredTop >= edge ? preferredTop : trigger.bottom + gap;

    dialog.style.left = `${Math.max(edge, Math.min(centeredLeft, viewport.clientWidth - offsetWidth - edge))}px`;
    dialog.style.top = `${Math.max(edge, Math.min(top, viewport.clientHeight - offsetHeight - edge))}px`;
  }

  return (
    <div className="footer-app-download-wrap">
      <a
        className="model-button yellow footer-app-download"
        href="/baixar-app"
        target="_blank"
        rel="noopener noreferrer"
        onClick={openStoreOptions}
      >
        Baixe o app Netbox <FaArrowCircleRight className="link-arrow" aria-hidden="true" />
      </a>
      <dialog ref={dialogRef} id="footer-app-download-dialog" className={styles.downloadDialog} aria-labelledby="footer-app-download-title">
        <div className={styles.dialogHeading}>
          <h2 id="footer-app-download-title">Baixe o app Netbox</h2>
          <button id="footer-app-download-close" className={styles.closeButton} type="button" aria-label="Fechar" onClick={() => dialogRef.current?.close()}>
            <IoClose aria-hidden="true" />
          </button>
        </div>
        <div className={styles.storeLinks}>
          <a id="footer-app-download-apple" className="store-download" href={APP_STORE} target="_blank" rel="noopener noreferrer">
            <img className="store-icon store-logo apple" src={APP_STORE_LOGO} alt="" />
            App Store
          </a>
          <a id="footer-app-download-play" className="store-download" href={PLAY_STORE} target="_blank" rel="noopener noreferrer">
            <img className="store-icon store-logo play" src={GOOGLE_PLAY_LOGO} alt="" />
            Google Play
          </a>
        </div>
      </dialog>
    </div>
  );
}
