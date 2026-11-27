"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import styles from "./ArticleImageLightbox.module.css";

type ArticleImageLightboxProps = {
  children: ReactNode;
};

type SelectedArticleImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Makes all images in the article body keyboard-accessible and viewable at full size. */
export function ArticleImageLightbox({ children }: ArticleImageLightboxProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLImageElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<SelectedArticleImage | null>(null);
  const openImage = useCallback((image: HTMLImageElement) => {
    returnFocusRef.current = image;
    setSelectedImage({
      src: image.currentSrc || image.src,
      alt: image.alt,
      width: image.naturalWidth || 1200,
      height: image.naturalHeight || 800,
    });
  }, []);

  useEffect(() => {
    const images = Array.from(contentRef.current?.querySelectorAll("img") ?? []);
    const removeImageListeners: Array<() => void> = [];
    const originalAttributes = images.map((image) => ({
      image,
      role: image.getAttribute("role"),
      tabIndex: image.getAttribute("tabindex"),
      hasPopup: image.getAttribute("aria-haspopup"),
      label: image.getAttribute("aria-label"),
    }));

    images.forEach((image) => {
      image.setAttribute("role", "button");
      image.setAttribute("tabindex", "0");
      image.setAttribute("aria-haspopup", "dialog");
      image.setAttribute(
        "aria-label",
        `Ampliar imagem: ${image.alt || "imagem do artigo"}`,
      );
      const handleClick = (event: globalThis.MouseEvent) => {
        event.preventDefault();
        openImage(image);
      };
      const handleKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openImage(image);
      };
      image.addEventListener("click", handleClick);
      image.addEventListener("keydown", handleKeyDown);
      removeImageListeners.push(() => {
        image.removeEventListener("click", handleClick);
        image.removeEventListener("keydown", handleKeyDown);
      });
    });

    return () => {
      removeImageListeners.forEach((removeListeners) => removeListeners());
      originalAttributes.forEach(({ image, role, tabIndex, hasPopup, label }) => {
        if (role === null) image.removeAttribute("role");
        else image.setAttribute("role", role);
        if (tabIndex === null) image.removeAttribute("tabindex");
        else image.setAttribute("tabindex", tabIndex);
        if (hasPopup === null) image.removeAttribute("aria-haspopup");
        else image.setAttribute("aria-haspopup", hasPopup);
        if (label === null) image.removeAttribute("aria-label");
        else image.setAttribute("aria-label", label);
      });
    };
  }, [openImage]);

  useEffect(() => {
    if (!selectedImage) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleDialogKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleDialogKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDialogKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus({ preventScroll: true });
    };
  }, [selectedImage]);

  return (
    <>
      <div ref={contentRef}>
        {children}
      </div>
      {selectedImage &&
        createPortal(
          <div
            id="article-image-lightbox"
            className={styles.lightbox}
            data-component="article-image-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.alt || "Imagem do artigo ampliada"}
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelectedImage(null);
            }}
          >
            <button
              ref={closeButtonRef}
              id="article-image-lightbox-close"
              className={styles.closeButton}
              type="button"
              aria-label="Fechar imagem ampliada"
              onClick={() => setSelectedImage(null)}
            >
              <FiX aria-hidden="true" />
            </button>
            {/* The article source image is presented at its natural aspect ratio. */}
            <Image
              className={styles.image}
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              unoptimized
            />
          </div>,
          document.body,
        )}
    </>
  );
}
