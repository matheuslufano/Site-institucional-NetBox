"use client";

import { BLOG_PATH, blogHref, categories } from "@/lib/blog/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { IoCloseOutline, IoHomeOutline, IoOpenOutline, IoSearchOutline, IoShieldOutline } from "react-icons/io5";
import { blogCategoryIcons } from "./BlogMobileShortcuts";
import { openBlogPrivacy } from "./BlogPrivacy";
import styles from "./BlogMobileDrawer.module.css";

export function BlogMobileDrawer({ open, category, onClose, onSearch }: {
  open: boolean;
  category: string;
  onClose: () => void;
  onSearch: () => void;
}) {
  const drawerRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer || !open) return;
    const previousOverflow = document.documentElement.style.overflow;
    drawer.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      drawer.close();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      id="blog-mobile-drawer"
      ref={drawerRef}
      className={styles.drawer}
      aria-label="Menu do Blog Netbox"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <header className={styles.heading}>
        <Image src="/blog/logo-NETBOX-BLOG.png" alt="Netbox Blog" width={114} height={64} unoptimized />
        <button id="blog-drawer-close" type="button" onClick={onClose} aria-label="Fechar menu"><IoCloseOutline aria-hidden="true" /></button>
      </header>
      <nav className={styles.links} aria-label="Páginas e categorias do Blog">
        <Link href={BLOG_PATH} onNavigate={onClose}><IoHomeOutline aria-hidden="true" /> Início</Link>
        {categories.map(({ id, label }) => {
          const Icon = blogCategoryIcons[id];
          return <Link key={id} href={blogHref(id)} aria-current={category === id ? "page" : undefined} onNavigate={onClose}>{Icon && <Icon aria-hidden="true" />}{label}</Link>;
        })}
        <Link href="/site" onNavigate={onClose}><IoOpenOutline aria-hidden="true" /> Site Netbox</Link>
        <button type="button" onClick={onSearch}><IoSearchOutline aria-hidden="true" /> Buscar</button>
        <button type="button" onClick={() => { onClose(); openBlogPrivacy(); }}><IoShieldOutline aria-hidden="true" /> Preferências de privacidade</button>
      </nav>
    </dialog>
  );
}
