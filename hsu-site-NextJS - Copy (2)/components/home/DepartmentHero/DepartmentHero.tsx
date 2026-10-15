"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./DepartmentHero.module.css";

const slides = [
  {
    src: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/deskwork2.png",
    label: "Research at work",
  },
  {
    src: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/HSU_Profile_Shot_3.jpg",
    label: "Hyperspectral Scanning Unit",
  },
  {
    src: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/hsu_scanner1.png",
    label: "Scanning operations",
  },
];

export default function DepartmentHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const loaded = useRef(new Set<number>());

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((current) => {
        for (let offset = 1; offset < slides.length; offset++) {
          const next = (current + offset) % slides.length;
          if (loaded.current.has(next)) return next;
        }
        return current;
      });
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <section className={styles.hero} aria-label="Advanced characterization">
      <div className={styles.background} aria-hidden="true">
        {slides.map((slide, index) => (
          // Existing CNA photographs are decorative behind the introduction.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            className={styles.slide}
            data-active={active === index}
            fetchPriority={index === 0 ? "high" : "low"}
            ref={(image) => {
              if (image?.complete && image.naturalWidth > 0) loaded.current.add(index);
            }}
            onLoad={() => loaded.current.add(index)}
          />
        ))}
        <div className={styles.shade} />
        <div className={styles.grid} />
      </div>
      <div className={styles.content}>
        <h1>
          Advanced characteri&shy;zation.<span> Deeper insight.</span>
        </h1>
        <p className={styles.description}>
          Combining advanced analytical technologies, data expertise, and applied research
          to help industry understand materials, solve technical challenges, and make
          informed decisions.
        </p>
        <div className={styles.actions}>
          <Link href="/services" className={styles.primaryButton}>
            Explore our capabilities<span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className={styles.secondaryButton}>
            Work with us
          </Link>
        </div>
      </div>
      <div className={styles.controls} role="group" aria-label="Hero background images">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={styles.dot}
            aria-label={"Show " + slide.label}
            aria-pressed={active === index}
            onClick={() => {
              if (loaded.current.has(index)) {
                setActive(index);
                setPaused(true);
              }
            }}
          >
            <span />
          </button>
        ))}
        {!reducedMotion && (
          <button
            type="button"
            className={styles.pause}
            onClick={() => setPaused((value) => !value)}
            aria-label={
              paused ? "Play background slideshow" : "Pause background slideshow"
            }
          >
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
    </section>
  );
}
