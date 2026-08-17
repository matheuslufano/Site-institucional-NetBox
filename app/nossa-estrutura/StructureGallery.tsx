"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

type StructureItem = {
  title: string;
  image: string;
  alt: string;
  source: string;
  position: string;
  description: string;
  width: number;
  height: number;
};

type StructureGalleryProps = {
  items: StructureItem[];
};

export function StructureGallery({ items }: StructureGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem = activeIndex === null ? null : items[activeIndex];
  const imageDisplayWidth = activeItem
    ? Math.min(activeItem.width, Math.round((activeItem.width / activeItem.height) * 560))
    : 0;
  const modalWidth = imageDisplayWidth + 320;

  const closeModal = useCallback(() => {
    const previousIndex = activeIndex;
    setActiveIndex(null);
    if (previousIndex !== null) {
      window.setTimeout(() => cardRefs.current[previousIndex]?.focus(), 0);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => current === null ? null : (current - 1 + items.length) % items.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => current === null ? null : (current + 1) % items.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeModal, items.length]);

  return (
    <>
      <div className="structure-gallery">
        {items.map((item, index) => (
          <article key={item.title}>
            <button
              ref={(element) => { cardRefs.current[index] = element; }}
              className="structure-card"
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver detalhes sobre ${item.title}`}
            >
              <div className="structure-photo">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 760px) 50vw, (max-width: 1100px) 50vw, 25vw"
                  style={{ objectPosition: item.position }}
                />
                <span>{item.source}</span>
                <strong>Ver detalhes</strong>
              </div>
              <h3>{item.title}</h3>
            </button>
          </article>
        ))}
      </div>

      {activeItem && activeIndex !== null && (
        <div
          className="structure-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            className="structure-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="structure-modal-title"
            aria-describedby="structure-modal-description"
            style={{ maxWidth: `${modalWidth}px` }}
          >
            <button
              className="structure-modal-close"
              type="button"
              onClick={closeModal}
              aria-label="Fechar imagem ampliada"
              autoFocus
            >
              <IoClose aria-hidden="true" />
            </button>

            <div
              className="structure-modal-image"
              style={{ aspectRatio: `${activeItem.width} / ${activeItem.height}` }}
            >
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                unoptimized
                sizes="(max-width: 760px) 100vw, 65vw"
                style={{ objectPosition: activeItem.position }}
              />
              <button
                className="structure-modal-arrow previous"
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)}
                aria-label="Ver imagem anterior"
              >
                <IoChevronBack aria-hidden="true" />
              </button>
              <button
                className="structure-modal-arrow next"
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
                aria-label="Ver próxima imagem"
              >
                <IoChevronForward aria-hidden="true" />
              </button>
            </div>

            <div className="structure-modal-copy">
              <span>{activeItem.source} · {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <h3 id="structure-modal-title">{activeItem.title}</h3>
              <p id="structure-modal-description">{activeItem.description}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
