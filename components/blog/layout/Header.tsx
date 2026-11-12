"use client";

import { SearchPanel } from "@/components/blog/search/SearchPanel";
import { useHeaderVisibility } from "@/hooks/blog/useHeaderVisibility";
import ChristmasHeroLights from "@/components/shared/seasonal/ChristmasHeroLights";
import { useSeasonalTheme } from "@/components/shared/seasonal/SeasonalThemeProvider";
import {
  BLOG_PATH,
  blogHref,
  categories,
  resolveCategory,
} from "@/lib/blog/navigation";
import styles from "@/styles/blog/Blog.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { type ReactNode, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

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
  const scrollVisible = useHeaderVisibility(headerRef, pageKey);
  const { theme } = useSeasonalTheme();
  const christmasActive = theme?.id === "christmas";
  const visible = christmasActive || scrollVisible || menuOpen || searchOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={styles.portalHeader}
        data-visible={visible}
        inert={!visible}
        aria-hidden={!visible}
        data-ui="blog-header"
        data-seasonal-pinned={christmasActive}
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
            <Image
              className={styles.brandLogo}
              src="/blog/logo-NETBOX-BLOG.png "
              alt="Netbox — Internet de verdade"
              width={1672}
              height={941}
              unoptimized
              loading="eager"
              fetchPriority="high"
            />
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
            aria-label="Abrir busca de artigos, filmes e séries"
            title="Buscar artigos, filmes e séries"
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
        <ChristmasHeroLights />
      </header>
      <SearchPanel
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
