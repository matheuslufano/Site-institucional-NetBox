"use client";

import type { MouseEvent } from "react";

const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox";
const APP_STORE = "https://apps.apple.com/br/app/netbox/id1574550280";

export function AppDownloadButton() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const userAgent = navigator.userAgent || "";
    const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    window.location.href = isAppleDevice ? APP_STORE : PLAY_STORE;
  }

  return (
    <a
      className="model-button yellow footer-app-download"
      href={PLAY_STORE}
      onClick={handleClick}
    >
      Baixe o app Netbox <span aria-hidden="true">↗</span>
    </a>
  );
}
