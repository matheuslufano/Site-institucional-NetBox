import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiUrl = process.env.BLOG_API_URL?.replace(/\/$/, "");
  if (!apiUrl) return NextResponse.json({ content: null, publishedRevision: null }, { headers: { "Cache-Control": "no-store" } });

  try {
    const response = await fetch(`${apiUrl}/site/content/institutional`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const payload = await response.json().catch(() => null);
    return NextResponse.json(payload || { content: null, publishedRevision: null }, {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ content: null, publishedRevision: null }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
