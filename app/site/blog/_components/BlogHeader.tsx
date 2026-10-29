"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type ReactNode, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useBlogHeaderVisibility } from "../_lib/useBlogHeaderVisibility";
import { BlogSearchPanel } from "./BlogSearchPanel";
import {
  BLOG_PATH,
  blogHref,
  categories,
  resolveCategory,
} from "../_lib/navigation";
import styles from "../blog.module.css";

/** Brand, categories and actions share one row; smaller screens expand the menu in flow. */
function HeaderContent({
  activeCategory = "",
  query = "",
  group = "",
  home = false,
  pageKey = "",
  editorialSidebar,
}: {
  pageKey?: string;
  editorialSidebar?: ReactNode;
  activeCategory?: string;
  query?: string;
  group?: string;
  home?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrollVisible = useBlogHeaderVisibility(headerRef, pageKey);
  const visible = scrollVisible || menuOpen || searchOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={styles.portalHeader}
        data-visible={visible}
        inert={!visible}
        aria-hidden={!visible}
        data-ui="blog-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeMenu();
            event.currentTarget
              .querySelector<HTMLButtonElement>("[data-ui=blog-menu-button]")
              ?.focus();
          }
        }}
      >
        <div className={styles.masthead}>
          <Link
            href={BLOG_PATH}
            className={styles.blogBrand}
            aria-label="Blog Netbox — início"
            onClick={closeMenu}
          >
            <span>
              NETBOX<span className={styles.brandDot}> - </span>
            </span>
            <strong>BLOG</strong>
          </Link>
          <nav
            id="blog-navigation"
            className={styles.portalNav}
            data-open={menuOpen}
            aria-label="Navegação do Blog"
          >
            <div className={styles.navInner}>
              <Link
                href={BLOG_PATH}
                aria-current={home && !activeCategory ? "page" : undefined}
                onClick={closeMenu}
              >
                Início
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={blogHref(category.id)}
                  aria-current={
                    activeCategory === category.id ? "page" : undefined
                  }
                  onClick={closeMenu}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </nav>
          <button
            className={styles.navSearch}
            data-ui="blog-search-trigger"
            type="button"
            aria-label="Abrir busca de artigos"
            title="Buscar artigos"
            aria-controls="blog-search-panel"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            onClick={() => {
              closeMenu();
              setSearchOpen(true);
            }}
          >
            <IoSearchOutline aria-hidden="true" />
          </button>
          <Link className={styles.siteLink} href="/site">
            Site Netbox <span aria-hidden="true">↗</span>
          </Link>
          <button
            className={styles.menuButton}
            data-ui="blog-menu-button"
            type="button"
            aria-controls="blog-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Fechar ✕" : "Menu ☰"}
          </button>
        </div>
      </header>
      <BlogSearchPanel
        open={searchOpen}
        query={query}
        category={activeCategory}
        group={group}
        editorialSidebar={editorialSidebar}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

export function BlogHeader({
  editorialSidebar,
}: {
  editorialSidebar: ReactNode;
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  return (
    <HeaderContent
      pageKey={pathname + "?" + params.toString()}
      editorialSidebar={editorialSidebar}
      activeCategory={resolveCategory(params.get("categoria") ?? "") ?? ""}
      query={params.get("q") ?? ""}
      group={params.get("grupo") ?? ""}
      home={pathname === BLOG_PATH && !params.get("grupo")}
    />
  );
}

/** The same header remains available in the server-rendered Suspense fallback. */
export function BlogHeaderFallback({
  editorialSidebar,
}: {
  editorialSidebar: ReactNode;
}) {
  return <HeaderContent editorialSidebar={editorialSidebar} />;
}
