import { MediaImage as Image } from './MediaImage';
import type { KeyboardEventHandler, Ref } from 'react';
import { FiFilm, FiImage, FiMaximize2, FiPlay, FiX } from 'react-icons/fi';
import { IoTriangle } from 'react-icons/io5';
import type { MediaWork } from '@/lib/blog/media';
import styles from './MediaDetail.module.css';

type Props = {
  work: MediaWork; mode: 'videos' | 'photos'; index: number; playing: boolean; loading: boolean; expanded: boolean; controlsVisible: boolean;
  viewerRef?: Ref<HTMLDivElement>; onMove: (offset: number) => void; onClose: () => void;
  onEnlarge: () => void; onPlay: () => void; onLoaded: () => void; onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

/** Shared inline/enlarged presentation; the parent mounts exactly one active viewer. */
export function MediaViewer({ work, mode, index, playing, loading, expanded, controlsVisible, viewerRef, onMove, onClose, onEnlarge, onPlay, onLoaded, onKeyDown }: Props) {
  const count = mode === 'photos' ? work.photos.length : work.videos.length;
  const video = work.videos[index];
  const title = mode === 'photos' ? `Foto ${index + 1} de ${work.title}` : video?.name ?? work.title;
  return <div ref={viewerRef} tabIndex={0} role="region" aria-label="Visualizador de fotos e vídeos" className={styles.unifiedViewer} data-controls-visible={controlsVisible} data-playing={playing} data-ui={expanded ? 'media-expanded-viewer' : 'media-inline-viewer'} onKeyDown={onKeyDown}>
    <div className={styles.viewerToolbar}><span>{mode === 'photos' ? <FiImage aria-hidden="true" /> : <FiFilm aria-hidden="true" />}{title}</span>
      <div>{!expanded && <button type="button" aria-label="Ampliar arquivo" onClick={onEnlarge}><FiMaximize2 aria-hidden="true" /></button>}
        <button type="button" aria-label={expanded ? 'Fechar ampliação' : 'Fechar vídeos e fotos'} onClick={onClose}><FiX aria-hidden="true" /></button>
      </div>
    </div>
    <div className={styles.viewerFile}>
      {mode === 'photos' ? <button className={styles.filePreview} type="button" disabled={expanded} onClick={onEnlarge} aria-label="Ampliar foto">
        <Image className={styles.viewerPhoto} key={work.photos[index]} src={expanded ? work.photos[index] : work.photos[index].replace('/w1280/', '/w780/')} alt={title} fill sizes={expanded ? '90vw' : '(max-width: 700px) 100vw, 60vw'} style={{ objectFit: 'contain' }} unoptimized />
        {!expanded && <span className={styles.enlargeHint}><FiMaximize2 aria-hidden="true" />Clique para ampliar</span>}
      </button> : playing && video ? <>
        {loading && <p className={styles.playerLoading} role="status">Carregando vídeo…</p>}
        <iframe key={video.key} src={`https://www.youtube-nocookie.com/embed/${video.key}?autoplay=1&rel=0&playsinline=1`} title={title + ' — ' + work.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={onLoaded} />
      </> : video && <button className={styles.filePreview} type="button" onClick={() => { if (!expanded) onEnlarge(); onPlay(); }} aria-label={expanded ? 'Reproduzir vídeo' : 'Ampliar e reproduzir vídeo'}>
        <Image className={styles.viewerVideoPreview} src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`} alt={title} fill style={{ objectFit: 'cover' }} unoptimized />
        <span className={styles.previewPlay}><FiPlay aria-hidden="true" /><span>{expanded ? 'Reproduzir vídeo' : 'Ampliar e reproduzir'}</span></span>
      </button>}
      {count > 1 && <><button type="button" className={styles.previousFile} aria-label="Arquivo anterior" onClick={() => onMove(-1)}><IoTriangle aria-hidden="true" /></button><button type="button" className={styles.nextFile} aria-label="Próximo arquivo" onClick={() => onMove(1)}><IoTriangle aria-hidden="true" /></button></>}
    </div>
    <div className={styles.viewerFooter}><span aria-live="polite">{mode === 'photos' ? 'Foto' : 'Vídeo'} {index + 1} de {count}</span>
      {mode === 'videos' && !playing && <button type="button" onClick={onPlay}><FiPlay aria-hidden="true" />Reproduzir aqui</button>}
    </div>
  </div>;
}
