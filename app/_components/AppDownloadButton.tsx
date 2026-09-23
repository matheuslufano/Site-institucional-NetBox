"use client";

import type { MouseEvent } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

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
    <div className="footer-app-download-wrap">
      <span className="footer-app-store-icons" aria-hidden="true">
        <img
          className="footer-app-store-badge footer-app-store-badge-google"
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Play_2022_icon.svg"
          alt=""
        />
        <img
          className="footer-app-store-badge footer-app-store-badge-apple"
          src="https://commons.wikimedia.org/wiki/Special:FilePath/App_Store_(iOS,_2024).svg"
          alt=""
        />
      </span>
      <a
        className="model-button yellow footer-app-download"
        href={PLAY_STORE}
        onClick={handleClick}
      >
        Baixe o app Netbox <FaArrowCircleRight className="link-arrow" aria-hidden="true" />
      </a>
    </div>
  );
}
