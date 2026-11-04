'use client';
import styles from '@/styles/blog/Blog.module.css';
import { useState } from 'react';

/** Explicit user actions share the canonical URL; clipboard errors have visible feedback. */
export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [message, setMessage] = useState('');
  return <div className={styles.share} aria-label="Compartilhar artigo">
    <strong>Compartilhar</strong>
    <a href={'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <a href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)} target="_blank" rel="noopener noreferrer">Facebook</a>
    <button type="button" onClick={async () => {
      try { await navigator.clipboard.writeText(url); setMessage('Link copiado.'); }
      catch { setMessage('Não foi possível copiar. Copie o endereço na barra do navegador.'); }
    }}>Copiar link</button><span role="status">{message}</span>
  </div>;
}
