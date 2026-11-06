'use client';
import { useEffect, useState } from 'react';
import type { BlogArticle } from '@/types/blog';
import { previewArticle } from '@/lib/blog/preview';
import ArticleView from './ArticleView';

/** Only an explicitly allowed parent can supply unsaved data; nothing is persisted. */
export default function LiveArticlePreview({ allowedOrigins, related }: { allowedOrigins: string[]; related: BlogArticle[] }) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.source !== window.parent || !allowedOrigins.includes(event.origin) || event.data?.type !== 'netbox:preview-article') return;
      const next = previewArticle(event.data.article);
      if (next) { setArticle(next); window.parent.postMessage({ type: 'netbox:preview-applied' }, event.origin); }
    }
    window.addEventListener('message', receive);
    // Public handshake contains no draft; article responses use the exact sender origin.
    window.parent.postMessage({ type: 'netbox:preview-ready' }, '*');
    return () => window.removeEventListener('message', receive);
  }, [allowedOrigins]);
  return article ? <ArticleView article={article} related={related.filter(item => item.id !== article.id)} preview /> : <p role="status" style={{ padding: '48px', textAlign: 'center' }}>Aguardando o artigo do editor…</p>;
}
