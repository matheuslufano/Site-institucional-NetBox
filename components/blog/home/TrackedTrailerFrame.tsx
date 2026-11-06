"use client";
import { useEffect, useRef } from "react";
import {
  analyticsAllowed,
  subscribeConsent,
  trackArticleAction,
} from "@/lib/blog/analytics";
import { youtubeApi } from "@/lib/blog/youtube";

/** React owns the host; YouTube owns its iframe, so cleanup never removes a React-owned child. */
export default function TrackedTrailerFrame({
  src,
  title,
  articleId,
}: {
  src: string;
  title: string;
  articleId?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const iframe = document.createElement("iframe");
    const url = new URL(src);
    url.searchParams.set("enablejsapi", "1");
    url.searchParams.set("origin", window.location.origin);
    iframe.src = url.href;
    iframe.title = "Trailer de " + title;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    element.append(iframe);
    let disposed = false,
      started = false,
      connecting = false;
    let apiPlayer: { destroy: () => void } | null = null;
    const startedPlaying = () => {
      if (!started && analyticsAllowed()) {
        started = true;
        trackArticleAction("trailer_play", articleId);
      }
    };
    const connect = () => {
      if (!articleId || !analyticsAllowed() || connecting || apiPlayer) return;
      connecting = true;
      void youtubeApi()
        .then((api) => {
          if (disposed) return;
          apiPlayer = new api.Player(iframe, {
            events: {
              onStateChange: (event) => {
                if (event.data === 1) startedPlaying();
              },
              onReady: (event) => {
                if (event.target.getPlayerState() === 1) startedPlaying();
              },
            },
          });
        })
        .catch(() => {
          connecting = false;
        });
    };
    connect();
    const unsubscribe = subscribeConsent(connect);
    return () => {
      disposed = true;
      unsubscribe();
      try {
        apiPlayer?.destroy();
      } catch {}
      element.replaceChildren();
    };
  }, [src, title, articleId]);
  return <div ref={host} style={{ width: "100%", height: "100%" }} />;
}
