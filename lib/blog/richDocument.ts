export type TextRun = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; href?: string; font?: 'sans' | 'serif' | 'mono'; size?: 'small' | 'normal' | 'large' };
export type RichBlock = { type: 'paragraph' | 'heading' | 'list-item' | 'image' | 'video'; level?: 2 | 3; align?: 'left' | 'center' | 'right'; width?: number; content?: TextRun[]; src?: string; alt?: string };

export const fonts = { sans: 'Arial, sans-serif', serif: 'Georgia, serif', mono: 'monospace' };
export const sizes = { small: '13px', normal: '16px', large: '24px' };
export function safeHref(value: string, relative = false) {
  if (relative && /^\/(?!\/)[^\s\\]*$/.test(value)) return value;
  try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.href : ''; } catch { return ''; }
}
/** Profile uploads can be inline raster images. Never allow inline HTML or SVG. */
export function safeAuthorPhoto(value: unknown): string {
  if (typeof value !== 'string' || value.length > 12 * 1024 * 1024) return '';
  if (value.startsWith('data:')) {
    const prefix = /^data:image\/(?:jpeg|png|webp|gif);base64,/.exec(value);
    if (!prefix) return '';
    const bytes = value.slice(prefix[0].length);
    return bytes.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(bytes) ? value : '';
  }
  return safeHref(value, true);
}
/** Only known video providers become embeds; arbitrary iframe HTML is never stored. */
export function videoSource(value: string) {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) return '';
    const host = url.hostname.replace(/^www\./, '');
    const id = host === 'youtu.be' ? url.pathname.slice(1) : ['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host) ? url.searchParams.get('v') || url.pathname.split('/').at(-1) : '';
    if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    if (['vimeo.com', 'player.vimeo.com'].includes(host) && /^\d+$/.test(url.pathname.split('/').at(-1) || '')) return `https://player.vimeo.com/video/${url.pathname.split('/').at(-1)}`;
    return /\.(mp4|webm)$/i.test(url.pathname) ? url.href : '';
  } catch { return ''; }
}

