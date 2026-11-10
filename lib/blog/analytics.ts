/** First-party consent-gated analytics. No identifier is created before analytics consent. */
const CONSENT = "netbox_cookie_consent";
const VISITOR = "netbox_blog_visitor";
const SESSION = "netbox_blog_session";
const CHANGE = "netbox:consent-change";
type Kind =
  | "article_view"
  | "article_share"
  | "trailer_play"
  | "article_navigation";
type Session = {
  id: string;
  at: number;
  previous?: { id: string; at: number };
};
let override: string | null = null;

export function consentSnapshot() {
  if (typeof window === "undefined") return "unknown";
  if (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl
  )
    return "blocked";
  try {
    return override || localStorage.getItem(CONSENT) || "unknown";
  } catch {
    return "essential";
  }
}
export const analyticsAllowed = () =>
  consentSnapshot() === "all" &&
  !new URLSearchParams(window.location?.search || "").has("previewTheme");
export function subscribeConsent(callback: () => void) {
  window.addEventListener(CHANGE, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE, callback);
    window.removeEventListener("storage", callback);
  };
}
export function saveBlogConsent(value: "all" | "essential") {
  override = null;
  try {
    localStorage.setItem(CONSENT, value);
    if (value === "essential") {
      localStorage.removeItem(VISITOR);
      sessionStorage.removeItem(SESSION);
    }
  } catch {
    override = "essential";
  }
  window.dispatchEvent(new Event(CHANGE));
}
function identity() {
  if (!analyticsAllowed() || !crypto.randomUUID) return null;
  try {
    const now = Date.now();
    let visitor = JSON.parse(localStorage.getItem(VISITOR) || "null") as {
      id: string;
      expires: number;
    } | null;
    if (!visitor?.id || visitor.expires < now) {
      visitor = { id: crypto.randomUUID(), expires: now + 365 * 86400000 };
      localStorage.setItem(VISITOR, JSON.stringify(visitor));
    }
    let session = JSON.parse(
      sessionStorage.getItem(SESSION) || "null",
    ) as Session | null;
    if (!session?.id || now - session.at > 30 * 60000)
      session = { id: crypto.randomUUID(), at: now };
    session.at = now;
    sessionStorage.setItem(SESSION, JSON.stringify(session));
    return { visitorId: visitor.id, sessionId: session.id, session };
  } catch {
    return null;
  }
}
function send(
  kind: Kind,
  articleId: string,
  ids: NonNullable<ReturnType<typeof identity>>,
  id = crypto.randomUUID(),
  fromArticleId?: string,
) {
  const body = {
    id,
    kind,
    articleId,
    visitorId: ids.visitorId,
    sessionId: ids.sessionId,
    fromArticleId,
    consent: true,
  };
  void fetch("/api/blog/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}
export function trackArticleAction(
  kind: "article_share" | "trailer_play",
  articleId?: string,
) {
  if (!articleId) return;
  const ids = identity();
  if (ids) send(kind, articleId, ids);
}
export function trackArticleView(articleId: string, id: string) {
  const ids = identity();
  if (!ids) return false;
  send("article_view", articleId, ids, id);
  const previous = ids.session.previous;
  if (
    previous &&
    previous.id !== articleId &&
    Date.now() - previous.at <= 30 * 60000
  )
    send(
      "article_navigation",
      articleId,
      ids,
      crypto.randomUUID(),
      previous.id,
    );
  ids.session.previous = { id: articleId, at: Date.now() };
  try {
    sessionStorage.setItem(SESSION, JSON.stringify(ids.session));
  } catch {}
  return true;
}
