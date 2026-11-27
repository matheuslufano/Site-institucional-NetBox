"use client";

import { BLOG_PATH, blogHref, categories, resolveCategory } from "@/lib/blog/navigation";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useScrollDirectionVisibility } from "@/hooks/useScrollDirectionVisibility";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  IoAppsOutline,
  IoBookOutline,
  IoFilmOutline,
  IoGameControllerOutline,
  IoHardwareChipOutline,
  IoHomeOutline,
  IoTvOutline,
} from "react-icons/io5";
import styles from "./BlogMobileShortcuts.module.css";

const mobileShortcutCategoryOrder = [
  "filmes",
  "series",
  "games",
  "hqs",
  "tecnologia",
] as const;

export const blogCategoryIcons: Record<string, IconType> = {
  tecnologia: IoHardwareChipOutline,
  filmes: IoFilmOutline,
  series: IoTvOutline,
  hqs: IoBookOutline,
  games: IoGameControllerOutline,
};

export function BlogMobileShortcuts() {
  const pathname = usePathname();
  const params = useSearchParams();
  const directionVisible = useScrollDirectionVisibility({
    initialVisible: false,
    revealAtTop: false,
    resetKey: pathname + "?" + params.toString(),
  });
  const [focusWithin, setFocusWithin] = useState(false);
  const category = resolveCategory(params.get("categoria") ?? "");
  const onBlogListing = pathname === BLOG_PATH;
  const onBlogHome = onBlogListing && !category && !params.has("q") && !params.has("grupo");
  const visible = directionVisible || focusWithin;

  return (
    <div className={styles.mobileShortcutsSpace}>
      <nav
        id="blog-mobile-shortcuts"
        className={styles.mobileShortcuts}
        data-visible={visible}
        aria-label="Atalhos e categorias do Blog"
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocusWithin(false);
          }
        }}
      >
        <Link id="blog-mobile-shortcut-home" className={styles.shortcutLink} href={BLOG_PATH} aria-current={onBlogHome ? "page" : undefined}>
          <IoHomeOutline aria-hidden="true" />
          <span>Início</span>
        </Link>
        {mobileShortcutCategoryOrder.map((categoryId) => {
          const categoryItem = categories.find(({ id }) => id === categoryId);
          if (!categoryItem) return null;
          const { id, label } = categoryItem;
          const Icon = blogCategoryIcons[id] ?? IoAppsOutline;
          return (
            <Link
              key={id}
              id={`blog-mobile-shortcut-${id}`}
              className={styles.shortcutLink}
              href={blogHref(id)}
              aria-current={onBlogListing && category === id ? "page" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
