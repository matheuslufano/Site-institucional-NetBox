"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./ManagedPageSections.module.css";

type ManagedSection = {
  id: string;
  type: "text" | "image" | "video";
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  videoUrl: string;
  enabled: boolean;
};
type PublishedContent = { pages?: Array<{ slug: string; sections: ManagedSection[] }> };

const routeSlugs: Record<string, string> = {
  "/": "home",
  "/sobre": "sobre",
  "/nossos-servicos": "nossos-servicos",
  "/nossa-estrutura": "nossa-estrutura",
  "/contatos": "contatos",
  "/baixar-app": "baixar-app",
  "/central-do-cliente": "central-do-cliente",
  "/em-desenvolvimento": "em-desenvolvimento",
  "/site": "site",
};

export function ManagedPageSections() {
  const pathname = usePathname();
  const pageSlug = useMemo(() => routeSlugs[pathname] || "", [pathname]);
  const [loadedPage, setLoadedPage] = useState<{ slug: string; sections: ManagedSection[] } | null>(null);

  useEffect(() => {
    if (!pageSlug) {
      return;
    }
    const controller = new AbortController();
    fetch("/api/site-content", { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((result: { content?: PublishedContent } | null) => {
        const page = result?.content?.pages?.find((item) => item.slug === pageSlug);
        setLoadedPage({ slug: pageSlug, sections: (page?.sections || []).filter((section) => section.enabled) });
      })
      .catch(() => { if (!controller.signal.aborted) setLoadedPage({ slug: pageSlug, sections: [] }); });
    return () => controller.abort();
  }, [pageSlug]);

  const sections = loadedPage?.slug === pageSlug ? loadedPage.sections : [];
  if (!sections.length) return null;
  return (
    <div className={styles.managedSections} data-component="institutional-managed-sections" data-page={pageSlug}>
      {sections.map((section, index) => <ManagedSectionView key={section.id} section={section} pageSlug={pageSlug} index={index} />)}
    </div>
  );
}

function ManagedSectionView({ section, pageSlug, index }: { section: ManagedSection; pageSlug: string; index: number }) {
  return (
    <section id={`institutional-${pageSlug}-${section.id}`} className={styles.section} data-section-type={section.type} aria-labelledby={`institutional-${pageSlug}-${section.id}-title`}>
      <div className={styles.sectionInner}>
        <span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span>
        <div className={styles.sectionContent}>
          <h2 id={`institutional-${pageSlug}-${section.id}-title`}>{section.title}</h2>
          {section.body && <p>{section.body}</p>}
          {section.type === "image" && section.image && <img className={styles.image} src={section.image} alt={section.imageAlt || section.title} loading="lazy" />}
          {section.type === "video" && section.videoUrl && <ManagedVideo source={section.videoUrl} title={section.title} />}
        </div>
      </div>
    </section>
  );
}

function ManagedVideo({ source, title }: { source: string; title: string }) {
  if (source.startsWith("/") && /\.(mp4|webm)(?:\?|$)/i.test(source)) {
    return <video className={styles.videoFile} controls preload="metadata"><source src={source} /></video>;
  }
  let url: URL;
  try { url = new URL(source); } catch { return null; }
  const host = url.hostname.toLowerCase();
  if (host === "youtu.be" || ["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com"].includes(host)) {
    const id = host === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).at(-1);
    if (!id || !/^[\w-]{11}$/.test(id)) return null;
    return <div className={styles.video}><iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
  }
  if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
    const id = url.pathname.split("/").filter(Boolean).at(-1);
    if (!id || !/^\d+$/.test(id)) return null;
    return <div className={styles.video}><iframe src={`https://player.vimeo.com/video/${id}`} title={title} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>;
  }
  if (url.protocol === "https:" && /\.(mp4|webm)$/i.test(url.pathname)) return <video className={styles.videoFile} controls preload="metadata"><source src={url.href} /></video>;
  return null;
}
