"use client";
import { useEffect, useRef } from "react";
import {
  analyticsAllowed,
  subscribeConsent,
  trackArticleView,
} from "@/lib/blog/analytics";

/** Count one visible visit after one second; StrictMode and consent updates cannot duplicate it. */
export default function ArticleAnalytics({ articleId }: { articleId: string }) {
  const visit = useRef({ articleId, id: "", sent: false });
  useEffect(() => {
    if (visit.current.articleId !== articleId)
      visit.current = { articleId, id: "", sent: false };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      clearTimeout(timer);
      if (
        visit.current.sent ||
        !analyticsAllowed() ||
        document.visibilityState !== "visible"
      )
        return;
      timer = setTimeout(() => {
        if (!visit.current.id) visit.current.id = crypto.randomUUID();
        visit.current.sent = trackArticleView(articleId, visit.current.id);
      }, 1000);
    };
    schedule();
    const unsubscribe = subscribeConsent(schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      unsubscribe();
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [articleId]);
  return null;
}
