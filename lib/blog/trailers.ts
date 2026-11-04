/** Convert only recognized HTTPS YouTube destinations into a privacy-enhanced player URL. */
export function trailerEmbedUrl(value: string, pageOrigin?: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    let id: string | null = null;
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      id = url.pathname === "/watch" ? url.searchParams.get("v") : null;
    } else if (url.hostname === "youtu.be") {
      id = url.pathname.slice(1);
    }
    if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
    const embed = new URL("https://www.youtube-nocookie.com/embed/" + id);
    embed.searchParams.set("autoplay", "1");
    embed.searchParams.set("playsinline", "1");
    embed.searchParams.set("rel", "0");
    if (pageOrigin) {
      const origin = new URL(pageOrigin);
      if (["http:", "https:"].includes(origin.protocol)) embed.searchParams.set("origin", origin.origin);
    }
    return embed.toString();
  } catch {
    return null;
  }
}
