"use client";

import { useEffect, useState } from "react";

type VideoFeatureProps = {
  videoId: string;
  poster: string;
  title?: string;
  eyebrow?: string;
};

export function VideoFeature({
  videoId,
  poster,
  title = "See the HSU in action",
  eyebrow = "Hyperspectral imaging",
}: VideoFeatureProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  function openModal() {
    setOpen(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  }

  function closeModal() {
    setVisible(false);

    window.setTimeout(() => {
      setOpen(false);
    }, 320);
  }

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="video-feature"
        onClick={openModal}
        aria-label={`Play video: ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="video-feature__background"
          src={poster}
          alt=""
          aria-hidden="true"
        />

        <div className="video-feature__overlay" />

        <div className="video-feature__content">
          <p className="video-feature__eyebrow">
            {eyebrow}
          </p>

          <h2>{title}</h2>

          <div className="video-feature__play">
            <span className="video-feature__play-icon">
              ▶
            </span>

            <span>Watch video</span>
          </div>
        </div>
      </button>

      {open ? (
        <div
          className={`video-modal ${
            visible ? "video-modal--visible" : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <button
            type="button"
            className="video-modal__close"
            onClick={closeModal}
            aria-label="Close video"
          >
            ×
          </button>

          <div className="video-modal__content">
            <iframe
              className="video-modal__iframe"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </>
  );
}