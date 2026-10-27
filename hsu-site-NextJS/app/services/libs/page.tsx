import Link from "next/link";
import { serviceContent } from "@/app/data/services";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";
import styles from "./libs.module.css";

// Narrow, irregular peaks create an abstract emission-spectrum texture.
const signalPeaks = [
  [84, 35, 3],
  [142, 64, 3],
  [197, 30, 2],
  [244, 115, 4],
  [283, 42, 2],
  [337, 76, 3],
  [389, 150, 4],
  [423, 36, 2],
  [477, 94, 3],
  [526, 54, 2],
  [574, 180, 4],
  [612, 60, 2],
  [655, 125, 3],
  [703, 44, 2],
  [741, 218, 4],
  [783, 93, 3],
  [820, 48, 2],
  [854, 310, 4],
  [882, 81, 2],
  [917, 165, 3],
  [948, 58, 2],
  [981, 405, 4],
  [1008, 120, 3],
  [1040, 72, 2],
  [1075, 250, 4],
  [1101, 86, 2],
  [1135, 345, 4],
  [1162, 105, 3],
  [1193, 54, 2],
  [1222, 448, 4],
  [1253, 143, 3],
  [1280, 74, 2],
  [1313, 277, 4],
  [1341, 93, 2],
  [1373, 380, 4],
  [1402, 115, 3],
  [1436, 51, 2],
  [1470, 240, 4],
  [1500, 96, 3],
  [1543, 165, 3],
] as const;

const signalPath = Array.from({ length: 1601 }, (_, x) => {
  const noise = Math.sin(x * 1.73) * 1.8 + Math.sin(x * 0.41) * 2.2;
  const peak = signalPeaks.reduce(
    (height, [center, amplitude, width]) =>
      Math.max(height, amplitude * Math.exp(-Math.abs(x - center) / width)),
    0,
  );
  return (x === 0 ? "M" : "L") + x + " " + (518 - noise - peak).toFixed(1);
}).join(" ");

export default function LibsPage() {
  const content = serviceContent.libs;
  return (
    <div className={`${styles.page} service-paper-page`}>
      <header className={"page-header " + styles.intro}>
        {/* Decorative spectrum pattern; not measured LIBS data. */}
        <div className={styles.signalBackground} aria-hidden="true">
          <svg
            className={styles.signalGraphic}
            viewBox="0 0 1600 640"
            preserveAspectRatio="none"
            focusable="false"
          >
            <defs>
              <linearGradient id="libs-signal-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#2c719e" stopOpacity=".25" />
                <stop offset=".45" stopColor="#00a2e3" stopOpacity=".7" />
                <stop offset=".8" stopColor="#9aeeff" />
                <stop offset="1" stopColor="#46c9f1" />
              </linearGradient>
              <linearGradient id="libs-signal-fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#77e1fa" stopOpacity=".34" />
                <stop offset=".6" stopColor="#00a2e3" stopOpacity=".14" />
                <stop offset="1" stopColor="#00a2e3" stopOpacity="0" />
              </linearGradient>
              <pattern
                id="libs-signal-grid"
                width="64"
                height="64"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M64 0H0V64"
                  fill="none"
                  stroke="#7ac8ef"
                  strokeOpacity=".1"
                  strokeWidth=".7"
                />
              </pattern>
            </defs>
            <rect width="1600" height="640" fill="url(#libs-signal-grid)" />
            <path d={signalPath + " L1600 640 L0 640 Z"} fill="url(#libs-signal-fill)" />
            <path
              d={signalPath}
              className={styles.signalGlow}
              fill="none"
              stroke="#31c5ed"
              strokeWidth="7"
            />
            <path
              d={signalPath}
              fill="none"
              stroke="url(#libs-signal-stroke)"
              strokeWidth="1.8"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className={"container " + styles.introContent}>
          <div className={styles.introCopy}>
            <h1>{content.title}</h1>
            <p className="page-header__description">{content.description}</p>
            <Link href="/contact" className={styles.action}>
              Discuss LIBS analysis <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </header>
      <Section>
        <div className="content-grid">
          <h2>A different layer of insight.</h2>
          <div>
            {content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ol className={styles.process} aria-label="How LIBS works">
          {[
            { title: "Excite", text: "A focused laser pulse interacts with the sample." },
            {
              title: "Collect",
              text: "Light emitted by the resulting plasma is measured.",
            },
            {
              title: "Interpret",
              text: "Characteristic spectral signals inform elemental characterization.",
            },
          ].map((step, index) => (
            <li key={step.title}>
              <span className={styles.step} aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section className="section--surface">
        <div className={styles.details}>
          <div>
            <h2>How the service can be used</h2>
            <ul className={styles.list}>
              {content.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.deliverables}>
            <h2>Potential project deliverables</h2>
            <p>
              Final outputs depend on the agreed project scope, analytical method, and
              available source data.
            </p>
            <ul className={styles.list}>
              {content.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section>
        <h2>Explore related capabilities</h2>
        <div className={styles.related}>
          <Link href="/services/hyperspectral-imaging">
            <h3>Hyperspectral Imaging</h3>
            <p>Explore complementary spectral imaging and mineral mapping.</p>
            <span>Explore the service →</span>
          </Link>
          {content.links.map((link) => (
            <Link href={link.href} key={link.href}>
              <h3>{link.label}</h3>
              <span>View details →</span>
            </Link>
          ))}
        </div>
      </Section>
      <CallToAction
        eyebrow=""
        title="What would you like to understand?"
        description="Tell us about your samples and project objectives so we can discuss an appropriate analytical approach."
        href="/contact"
        linkLabel="Discuss LIBS analysis"
      />
    </div>
  );
}
