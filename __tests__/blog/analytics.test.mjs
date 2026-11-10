import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";

async function load(path) {
  const source = await readFile(
    new URL("../../" + path, import.meta.url),
    "utf8",
  );
  const code = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(
    "data:text/javascript;base64," + Buffer.from(code).toString("base64")
  );
}
const storage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
};

test("consent gates identifiers and events; navigation follows the same active session", async () => {
  const keys = [
    "window",
    "navigator",
    "localStorage",
    "sessionStorage",
    "fetch",
  ];
  const originals = keys.map((key) =>
    Object.getOwnPropertyDescriptor(globalThis, key),
  );
  const clock = Date.now;
  let now = clock();
  const sent = [];
  try {
    Object.defineProperties(globalThis, {
      window: { configurable: true, value: new EventTarget() },
      navigator: { configurable: true, value: { doNotTrack: "0" } },
      localStorage: { configurable: true, value: storage() },
      sessionStorage: { configurable: true, value: storage() },
      fetch: {
        configurable: true,
        value: async (url, options) => {
          sent.push({ url, body: JSON.parse(options.body) });
          return new Response(null, { status: 204 });
        },
      },
    });
    Date.now = () => now;
    const analytics = await load("lib/blog/analytics.ts");
    analytics.trackArticleView("a", crypto.randomUUID());
    analytics.trackArticleAction("article_share", "a");
    assert.equal(sent.length, 0);
    assert.equal(localStorage.getItem("netbox_blog_visitor"), null);
    analytics.saveBlogConsent("all");
    window.location = { search: "?previewTheme=christmas" };
    analytics.trackArticleView("theme-preview", crypto.randomUUID());
    assert.equal(sent.length, 0, "Theme previews must not inflate article analytics");
    assert.equal(localStorage.getItem("netbox_blog_visitor"), null);
    window.location.search = "";
    analytics.trackArticleView("a", crypto.randomUUID());
    analytics.trackArticleView("b", crypto.randomUUID());
    analytics.trackArticleAction("trailer_play", "b");
    assert.deepEqual(
      sent.map((event) => event.body.kind),
      ["article_view", "article_view", "article_navigation", "trailer_play"],
    );
    assert.equal(sent[2].body.fromArticleId, "a");
    assert.equal(new Set(sent.map((event) => event.body.visitorId)).size, 1);
    assert.equal(new Set(sent.map((event) => event.body.sessionId)).size, 1);
    assert.ok(
      sent.every(
        (event) =>
          event.url === "/api/blog/analytics" && event.body.consent === true,
      ),
    );
    assert.deepEqual(Object.keys(sent[0].body).sort(), [
      "articleId",
      "consent",
      "id",
      "kind",
      "sessionId",
      "visitorId",
    ]);
    const session = sent[0].body.sessionId;
    now += 31 * 60000;
    analytics.trackArticleView("c", crypto.randomUUID());
    assert.equal(sent.length, 5);
    assert.notEqual(sent[4].body.sessionId, session);
    navigator.doNotTrack = "1";
    analytics.trackArticleAction("article_share", "c");
    assert.equal(sent.length, 5);
    navigator.doNotTrack = "0";
    navigator.globalPrivacyControl = true;
    analytics.trackArticleAction("article_share", "c");
    assert.equal(sent.length, 5);
    navigator.globalPrivacyControl = false;
    analytics.saveBlogConsent("essential");
    assert.equal(localStorage.getItem("netbox_blog_visitor"), null);
    assert.equal(sessionStorage.getItem("netbox_blog_session"), null);
    analytics.trackArticleView("a", crypto.randomUUID());
    assert.equal(sent.length, 5);
  } finally {
    Date.now = clock;
    keys.forEach((key, index) =>
      originals[index]
        ? Object.defineProperty(globalThis, key, originals[index])
        : delete globalThis[key],
    );
  }
});

test("same-origin proxy rejects foreign requests and forwards no account cookies or IP", async () => {
  const originalFetch = globalThis.fetch,
    base = process.env.BLOG_API_URL;
  const forwarded = [];
  try {
    process.env.BLOG_API_URL = "http://backend.test";
    globalThis.fetch = async (url, options) => {
      forwarded.push({ url, options });
      return new Response(null, { status: 202 });
    };
    const { POST } = await load("app/api/blog/analytics/route.ts");
    const request = (headers = {}, body = "{}") =>
      new Request("http://site.test/api/blog/analytics", {
        method: "POST",
        headers: { origin: "http://site.test", ...headers },
        body,
      });
    assert.equal(
      (await POST(request({ origin: "http://foreign.test" }))).status,
      403,
    );
    assert.equal((await POST(request({ dnt: "1" }))).status, 204);
    assert.equal((await POST(request({ "sec-gpc": "1" }))).status, 204);
    assert.equal((await POST(request({}, "x".repeat(8193)))).status, 413);
    assert.equal(forwarded.length, 0);
    assert.equal(
      (
        await POST(
          request(
            {
              cookie: "auth=private",
              authorization: "Bearer private",
              "x-forwarded-for": "192.0.2.1",
            },
            '{"consent":true}',
          ),
        )
      ).status,
      204,
    );
    assert.equal(forwarded[0].url, "http://backend.test/blog/analytics/events");
    assert.deepEqual(Object.keys(forwarded[0].options.headers).sort(), [
      "Content-Type",
      "Origin",
      "User-Agent",
    ]);
    assert.equal(forwarded[0].options.body, '{"consent":true}');
    globalThis.fetch = async () => {
      throw new Error("offline");
    };
    assert.equal((await POST(request())).status, 503);
  } finally {
    globalThis.fetch = originalFetch;
    if (base === undefined) delete process.env.BLOG_API_URL;
    else process.env.BLOG_API_URL = base;
  }
});
