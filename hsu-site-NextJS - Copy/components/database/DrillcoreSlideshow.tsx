"use client";

import { useCallback, useEffect, useState } from "react";

import styles from "./DrillcoreSlideshow.module.css";

type DrillcoreImage = {
  key: string;
  name: string;
  url: string;
};

export default function DrillcoreSlideshow({
  coreId,
  images,
}: {
  coreId: string;
  images: DrillcoreImage[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const previous = useCallback(() => {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((index) => (index + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, next, previous]);

  if (!images.length) {
    return (
      <section className={styles.section}>
        <div className={styles.heading}>
          <div>
            <p>High-resolution imagery</p>
            <h2>Core image gallery</h2>
          </div>
        </div>
        <div className={styles.empty}>
          No composite images are currently available for this drillcore.
        </div>
      </section>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div>
          <p>High-resolution imagery</p>
          <h2>Core image gallery</h2>
        </div>
        <span>
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      <div className={styles.viewer}>
        <button
          className={`${styles.arrow} ${styles.previous}`}
          type="button"
          onClick={previous}
          aria-label="Show previous drillcore image"
        >
          ‹
        </button>

        <button
          className={styles.imageButton}
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open ${activeImage.name} at full resolution`}
        >
          {/* S3 images have dimensions that vary by drillcore. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.url}
            alt={`${coreId} drillcore composite ${activeIndex + 1}`}
          />
          <span>Click to view full resolution</span>
        </button>

        <button
          className={`${styles.arrow} ${styles.next}`}
          type="button"
          onClick={next}
          aria-label="Show next drillcore image"
        >
          ›
        </button>
      </div>

      <div className={styles.thumbnails} aria-label="Choose a drillcore image">
        {images.map((image, index) => (
          <button
            key={image.key}
            type="button"
            className={index === activeIndex ? styles.activeThumbnail : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show drillcore image ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.url} alt="" loading="lazy" />
            <span>{index + 1}</span>
          </button>
        ))}
      </div>

      {lightboxOpen ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${coreId} full-resolution drillcore image`}
        >
          <button
            className={styles.close}
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close full-resolution image"
          >
            ×
          </button>
          <button
            className={`${styles.arrow} ${styles.previous}`}
            type="button"
            onClick={previous}
            aria-label="Show previous drillcore image"
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.url}
            alt={`${coreId} drillcore composite ${activeIndex + 1}`}
          />
          <button
            className={`${styles.arrow} ${styles.next}`}
            type="button"
            onClick={next}
            aria-label="Show next drillcore image"
          >
            ›
          </button>
          <a href={activeImage.url} target="_blank" rel="noreferrer">
            Open original file
          </a>
        </div>
      ) : null}
    </section>
  );
}
