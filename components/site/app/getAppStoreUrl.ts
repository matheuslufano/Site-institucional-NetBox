import { APP_STORE, PLAY_STORE } from "@/constants/site";

export function getAppStoreUrl({ userAgent, maxTouchPoints }: Pick<Navigator, "userAgent" | "maxTouchPoints">) {
  const isAppleMobile = /iPad|iPhone|iPod/i.test(userAgent) ||
    (/Macintosh/i.test(userAgent) && maxTouchPoints > 1);

  if (isAppleMobile) return APP_STORE;
  if (/Android/i.test(userAgent)) return PLAY_STORE;
  return null;
}
