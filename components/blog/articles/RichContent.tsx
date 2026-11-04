import type { RichBlock } from '@/lib/blog/richDocument';
import { fonts, sizes, safeHref, videoSource } from '@/lib/blog/richDocument';
import Image from 'next/image';
import styles from './RichContent.module.css';

/** Safe React rendering of the versioned rich-document contract, without raw HTML. */
export default function RichContent({ blocks }: { blocks: RichBlock[] }) {
  return <div className={styles.content}>{blocks.map((block, index) => {
    const mediaStyle = { width: `${Math.max(20, Math.min(100, block.width || 100))}%`, marginLeft: block.align === 'left' ? 0 : 'auto', marginRight: block.align === 'right' ? 0 : 'auto' };
    if (block.type === 'image') return safeHref(block.src || '', true) ? <figure key={index} style={mediaStyle}><Image width={1200} height={675} unoptimized src={block.src!} alt={block.alt || ''} /><figcaption>{block.alt}</figcaption></figure> : null;
    if (block.type === 'video') {
      const src = videoSource(block.src || '');
      if (!src) return null;
      return <figure key={index} style={mediaStyle}>{/\.(mp4|webm)(\?|$)/i.test(src) ? <video src={src} controls preload="metadata" aria-label={block.alt || 'Vídeo do artigo'} /> : <iframe src={src} title={block.alt || 'Vídeo do artigo'} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}</figure>;
    }
    const Tag = block.type === 'heading' ? (block.level === 3 ? 'h3' : 'h2') : block.type === 'list-item' ? 'li' : 'p';
    const content = <Tag style={{ textAlign: block.align, whiteSpace: 'pre-wrap' }}>{block.content?.map((run, i) => {
      const text = <span style={{ fontWeight: run.bold ? 700 : undefined, fontStyle: run.italic ? 'italic' : undefined, textDecoration: run.underline ? 'underline' : undefined, fontFamily: run.font ? fonts[run.font] : undefined, fontSize: run.size ? sizes[run.size] : undefined }}>{run.text}</span>;
      return run.href && safeHref(run.href) ? <a key={i} href={safeHref(run.href)} target="_blank" rel="noopener noreferrer">{text}</a> : <span key={i}>{text}</span>;
    })}</Tag>;
    return block.type === 'list-item' ? <ul key={index}>{content}</ul> : <div key={index}>{content}</div>;
  })}</div>;
}
