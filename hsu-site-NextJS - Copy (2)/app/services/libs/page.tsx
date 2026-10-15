import Link from "next/link";
import { serviceContent } from "@/app/data/services";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";
import styles from "./libs.module.css";

export default function LibsPage() {
  const content = serviceContent.libs;
  return (
    <div className={styles.page}>
      <header className={"page-header " + styles.intro}>
        <div className={"container " + styles.introGrid}>
          <div>
            <h1>{content.title}</h1>
            <p className="page-header__description">{content.description}</p>
            <Link href="/contact" className={styles.action}>
              Discuss LIBS analysis <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <figure className={styles.figure}>
            <svg
              viewBox="0 0 520 320"
              role="img"
              aria-labelledby="libs-visual-title libs-visual-description"
            >
              <title id="libs-visual-title">From laser pulse to elemental signals</title>
              <desc id="libs-visual-description">
                Conceptual illustration of a laser pulse reaching a sample, creating a
                small plasma, and emitted light being measured as a spectrum. This is not
                measured data.
              </desc>
              <defs>
                <radialGradient id="libs-glow">
                  <stop stopColor="#bdf8ff" />
                  <stop offset=".3" stopColor="#62cedb" stopOpacity=".65" />
                  <stop offset="1" stopColor="#00a2e3" stopOpacity="0" />
                </radialGradient>
                <pattern
                  id="libs-grid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 32 0 L 0 0 0 32"
                    fill="none"
                    stroke="#62cedb"
                    strokeOpacity=".1"
                  />
                </pattern>
              </defs>
              <rect width="520" height="320" fill="url(#libs-grid)" />
              <path
                d="M40 240H480 M40 40V280"
                fill="none"
                stroke="#5c809b"
                strokeWidth="1"
              />
              <path d="M60 70L170 160" stroke="#62cedb" strokeWidth="3" />
              <path
                d="M148 155L178 166L166 138"
                fill="none"
                stroke="#bdf8ff"
                strokeWidth="2"
              />
              <path
                d="M100 225L160 182L229 198L265 242L143 257Z"
                fill="#163c67"
                stroke="#7ea7c1"
              />
              <circle cx="175" cy="174" r="60" fill="url(#libs-glow)" />
              <circle cx="175" cy="174" r="5" fill="white" />
              <path
                d="M213 174C272 174 270 112 317 112"
                fill="none"
                stroke="#62cedb"
                strokeWidth="2"
                strokeDasharray="5 7"
              />
              <path
                d="M310 230L326 230L332 205L337 230L349 230L355 140L361 230L377 230L383 78L389 230L404 230L410 181L416 230L432 230L438 121L444 230L469 230"
                fill="none"
                stroke="#62cedb"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
            <figcaption>
              Laser pulse → plasma emission → elemental signals
              <span>Conceptual illustration · not measured data</span>
            </figcaption>
          </figure>
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
