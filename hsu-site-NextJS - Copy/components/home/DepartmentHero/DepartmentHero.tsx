import Link from "next/link";
import styles from "./DepartmentHero.module.css";

export default function DepartmentHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} aria-hidden="true">
        <div className={styles.grid} />

        <svg
          className={styles.spectralLines}
          viewBox="0 0 1600 700"
          preserveAspectRatio="none"
        >
          <path
            className={styles.lineOne}
            d="M0 470
               C120 450, 180 500, 280 460
               S430 390, 520 445
               S650 510, 760 430
               S900 350, 1000 420
               S1120 490, 1240 400
               S1420 330, 1600 380"
          />

          <path
            className={styles.lineTwo}
            d="M0 525
               C150 500, 230 545, 340 510
               S520 445, 630 500
               S780 555, 900 480
               S1080 410, 1190 470
               S1400 525, 1600 455"
          />

          <path
            className={styles.lineThree}
            d="M0 390
               C140 360, 230 415, 350 380
               S510 320, 620 365
               S790 430, 900 350
               S1060 290, 1180 345
               S1410 405, 1600 315"
          />
        </svg>

        <div className={styles.glowOne} />
        <div className={styles.glowTwo} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span />
          College of the North Atlantic · Applied Research
        </p>

        <h1>
          Advanced characterization.
          <span> Deeper insight.</span>
        </h1>

        <p className={styles.description}>
          Combining advanced analytical technologies, data expertise,
          and applied research to help industry understand materials,
          solve technical challenges, and make informed decisions.
        </p>

        <div className={styles.actions}>
          <Link href="/services" className={styles.primaryButton}>
            Explore our capabilities
            <span aria-hidden="true">→</span>
          </Link>

          <Link href="/contact" className={styles.secondaryButton}>
            Work with us
          </Link>
        </div>
      </div>

      <div className={styles.capabilities} aria-hidden="true">
        <span>CHARACTERIZATION</span>
        <i />
        <span>ANALYTICS</span>
        <i />
        <span>APPLIED RESEARCH</span>
      </div>
    </section>
  );
}