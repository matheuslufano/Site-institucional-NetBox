/** Same-origin intake proxy. The backend receives no cookies, user account or browser fingerprint. */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin)
    return new Response(null, { status: 403 });
  if (
    request.headers.get("dnt") === "1" ||
    request.headers.get("sec-gpc") === "1"
  )
    return new Response(null, { status: 204 });
  const base = process.env.BLOG_API_URL?.replace(/\/$/, "");
  if (!base)
    return Response.json(
      { error: "Analytics não configurado." },
      { status: 503 },
    );
  try {
    if (Number(request.headers.get("content-length")) > 8192)
      return new Response(null, { status: 413 });
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 8192)
      return new Response(null, { status: 413 });
    const response = await fetch(base + "/blog/analytics/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        "User-Agent": request.headers.get("user-agent") || "",
      },
      body,
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    return new Response(null, { status: response.ok ? 204 : response.status });
  } catch {
    return new Response(null, { status: 503 });
  }
}
