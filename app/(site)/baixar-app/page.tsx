"use client";

import { useEffect } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { APP_STORE, PLAY_STORE } from "@/constants/site";
import { getAppStoreUrl } from "@/components/site/app/getAppStoreUrl";
import { ManagedPageSections } from "@/components/site/content/ManagedPageSections";

export default function AppDownloadPage() {
  useEffect(() => {
    const storeUrl = getAppStoreUrl(navigator);
    if (storeUrl) window.location.replace(storeUrl);
  }, []);

  return (
    <main id="netbox-app-download" className="model-shell">
      <h1>Baixe o app Netbox</h1>
      <nav aria-label="Lojas do app Netbox">
        <a className="model-button orange" href={APP_STORE}>
          <FaApple aria-hidden="true" /> App Store
        </a>{" "}
        <a className="model-button orange" href={PLAY_STORE}>
          <FaGooglePlay aria-hidden="true" /> Google Play
        </a>
      </nav>
      <ManagedPageSections />
    </main>
  );
}
