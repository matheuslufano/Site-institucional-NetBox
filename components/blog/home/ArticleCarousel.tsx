'use client';

import { Children, useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi';
import styles from './ArticleCarousel.module.css';

const ROTATION_INTERVAL = 6000;

/** Server-rendered cards remain intact; this wrapper only controls horizontal navigation. */
export function ArticleCarousel({ children, label }: { children: ReactNode; label: string }) {
  const slides = Children.toArray(children);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const interacting = useRef({ hover: false, focus: false, lastManual: 0, visible: false });
  const [automatic, setAutomatic] = useState(true);
  const [view, setView] = useState({ first: 0, visible: 3, overflow: false });
  const [announcement, setAnnouncement] = useState('');

  const measure = useCallback(() => {
    const element = track.current;
    if (!element?.firstElementChild) return;
    const first = element.firstElementChild as HTMLElement;
    const step = first.getBoundingClientRect().width + (parseFloat(getComputedStyle(element).columnGap) || 0);
    const visible = Math.max(1, Math.round((element.clientWidth + (parseFloat(getComputedStyle(element).columnGap) || 0)) / step));
    const next = { first: Math.max(0, Math.round(element.scrollLeft / step)), visible, overflow: element.scrollWidth > element.clientWidth + 2 };
    setView(current => current.first === next.first && current.visible === next.visible && current.overflow === next.overflow ? current : next);
  }, []);

  const move = useCallback((direction: -1 | 1, manual = false) => {
    const element = track.current;
    if (!element?.firstElementChild) return;
    const step = element.firstElementChild.getBoundingClientRect().width + (parseFloat(getComputedStyle(element).columnGap) || 0);
    const max = Math.max(0, element.scrollWidth - element.clientWidth);
    const left = direction === 1 ? element.scrollLeft >= max - 2 ? 0 : Math.min(max, element.scrollLeft + step) : element.scrollLeft <= 2 ? max : Math.max(0, element.scrollLeft - step);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollTo({ left, behavior: reduced ? 'instant' : 'smooth' });
    if (manual) { interacting.current.lastManual = Date.now(); setAnnouncement(`Recomendação ${Math.round(left / step) + 1} de ${slides.length}.`); }
  }, [slides.length]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const initial = requestAnimationFrame(measure);
    const visibility = new IntersectionObserver(entries => { interacting.current.visible = entries[0]?.isIntersecting || false; }, { threshold: .25 });
    if (root.current) visibility.observe(root.current);
    return () => { resize.disconnect(); visibility.disconnect(); cancelAnimationFrame(initial); };
  }, [measure, slides.length]);

  useEffect(() => {
    if (!automatic || !view.overflow) return;
    const timer = window.setInterval(() => {
      const state = interacting.current;
      if (!state.visible || state.hover || state.focus || document.hidden || Date.now() - state.lastManual < ROTATION_INTERVAL || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      move(1);
    }, ROTATION_INTERVAL);
    return () => window.clearInterval(timer);
  }, [automatic, view.overflow, move]);

  return <div ref={root} className={styles.carousel} role="region" aria-roledescription="carrossel" aria-label={label} data-ui="technology-article-carousel"
    onPointerEnter={event => { if (event.pointerType !== 'touch') interacting.current.hover = true; }} onPointerLeave={() => { interacting.current.hover = false; }}
    onFocusCapture={() => { interacting.current.focus = true; }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) interacting.current.focus = false; }}>
    <div className={styles.row}>
      <button className={styles.arrow} type="button" title="Artigos anteriores" aria-label="Ver artigos anteriores de Tecnologia e inovação" aria-controls={id} disabled={!view.overflow} onClick={() => move(-1, true)}><FiChevronLeft aria-hidden="true" /></button>
      <div ref={track} id={id} className={styles.track} onScroll={measure} onPointerDown={() => { interacting.current.lastManual = Date.now(); }}>
        {slides.map((slide, index) => <div className={styles.slide} key={index} role="group" aria-roledescription="slide" aria-label={`Artigo ${index + 1} de ${slides.length}`}>{slide}</div>)}
      </div>
      <button className={styles.arrow} type="button" title="Próximos artigos" aria-label="Ver próximos artigos de Tecnologia e inovação" aria-controls={id} disabled={!view.overflow} onClick={() => move(1, true)}><FiChevronRight aria-hidden="true" /></button>
    </div>
    <div className={styles.footer}>
      <span>{slides.length ? `${view.first + 1}–${Math.min(view.first + view.visible, slides.length)} de ${slides.length} artigos` : 'Nenhum artigo disponível'}</span>
      {view.overflow && <button className={styles.playback} type="button" aria-pressed={!automatic} onClick={() => setAutomatic(value => !value)}>{automatic ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}{automatic ? 'Pausar slides' : 'Reproduzir slides'}</button>}
    </div>
    <span className={styles.srOnly} role="status">{announcement}</span>
  </div>;
}
