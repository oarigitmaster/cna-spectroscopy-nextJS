import Image from "next/image";

import { serviceContent } from "@/app/data/services";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";

import styles from "./geotek.module.css";

const content = serviceContent.geotek;

const geotekImages = {
  main: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/geotek1.jpg",
  xrf: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/geotek2.jpg",
  gammaRay:
    "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/geotek3.jpg",
};

const measurements = [
  {
    title: "X-ray fluorescence",
    label: "XRF",
    description:
      "XRF measurements provide elemental information that can support material characterization, geological interpretation, and comparison between core intervals.",
    image: geotekImages.xrf,
    alt: "Geotek X-ray fluorescence equipment used for drill-core analysis",
  },
  {
    title: "Spectral gamma ray",
    label: "SGR",
    description:
      "Spectral gamma-ray measurements record naturally occurring radiation and can contribute to lithological characterization, correlation, and geological interpretation.",
    image: geotekImages.gammaRay,
    alt: "Geotek spectral gamma-ray equipment used for drill-core analysis",
  },
];

export default function GeotekPage() {
  return (
    <main className={`${styles.page} service-paper-page`}>
      {/* HERO */}
      <section className={styles.hero}>
        <Image
          src={geotekImages.main}
          alt="Geotek core logging system at the CNA laboratory"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>
            Geotek Core Logging
          </p>

          <h1>
            Integrated core
            <span> analysis.</span>
          </h1>

          <p className={styles.heroLead}>
            {content.description}
          </p>

          <div className={styles.heroTags}>
            <span>Non-destructive analysis</span>
            <span>Depth-referenced results</span>
            <span>Integrated datasets</span>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <Section>
        <div className={styles.introduction}>
          <div className={styles.introHeading}>
            <p className="eyebrow">
              {content.eyebrow}
            </p>

            <h2>
              More context from the same core.
            </h2>
          </div>

          <div className={styles.introCopy}>
            {content.intro.map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* ANALYTICAL METHODS */}
      <section className={styles.measurementsSection}>
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className="eyebrow">
              Analytical capabilities
            </p>

            <h2>
              Complementary measurements.
              One core-logging workflow.
            </h2>

            <p>
              Geotek combines analytical
              techniques that can be interpreted
              individually or integrated with
              broader geological and
              hyperspectral datasets.
            </p>
          </div>

          <div className={styles.measurementGrid}>
            {measurements.map((measurement) => (
              <article
                className={styles.measurementCard}
                key={measurement.title}
              >
                <div
                  className={
                    styles.measurementImage
                  }
                >
                  <Image
                    src={measurement.image}
                    alt={measurement.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    className={styles.image}
                  />

                  <span
                    className={
                      styles.measurementLabel
                    }
                  >
                    {measurement.label}
                  </span>
                </div>

                <div
                  className={
                    styles.measurementContent
                  }
                >
                  <h3>
                    {measurement.title}
                  </h3>

                  <p>
                    {measurement.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <Section>
        <div className={styles.capabilities}>
          <div className={styles.capabilitiesIntro}>
            <p className="eyebrow">
              Capabilities
            </p>

            <h2>
              Built for systematic core
              characterization.
            </h2>

            <p>
              Measurements can support
              characterization, comparison,
              interpretation, and integration
              with other analytical datasets.
            </p>
          </div>

          <ul className={styles.capabilityList}>
            {content.capabilities?.map(
              (capability, index) => (
                <li key={capability}>
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <p>{capability}</p>
                </li>
              ),
            )}
          </ul>
        </div>
      </Section>

      {/* OUTPUTS */}
      <section className={styles.outcomesSection}>
        <div className={styles.inner}>
          <div className={styles.outcomesLayout}>
            <div className={styles.outcomesIntro}>
              <p className={styles.darkEyebrow}>
                Analysis & outcomes
              </p>

              <h2>
                Data prepared for the project.
              </h2>

              <p>
                Final outputs depend on the
                samples, analytical methods, and
                agreed project scope.
              </p>
            </div>

            <div className={styles.outcomesGrid}>
              {content.outcomes?.map(
                (outcome) => (
                  <div
                    className={
                      styles.outcomeItem
                    }
                    key={outcome}
                  >
                    <span aria-hidden="true">
                      ✓
                    </span>

                    <p>{outcome}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        title="Discuss Geotek analysis"
        description="Tell us about your samples, project objectives, and required outputs so the team can recommend an appropriate analytical approach."
        href="/contact"
        linkLabel="Contact the laboratory"
      />
    </main>
  );
}
