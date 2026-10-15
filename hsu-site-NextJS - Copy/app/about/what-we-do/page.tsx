import Link from "next/link";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";

import styles from "./what-we-do.module.css";

const capabilities = [
  {
    title: "Hyperspectral Imaging",
    text: "Rapid, high-resolution hyperspectral scanning across the visible and infrared spectrum, supporting detailed characterization of geological and other materials.",
    href: "/services/hyperspectral-imaging",
  },
  {
    title: "Analysis & Interpretation",
    text: "Spectral data collection, analysis, visualization, and interpretation to investigate mineralogical and physio-chemical variability and support informed decision-making.",
    href: "/services/hyperspectral-imaging",
  },
  {
    title: "Applied Research",
    text: "Collaborative research, feasibility studies, technology development, and custom imaging solutions designed around real industry and research challenges.",
    href: "/contact",
  },
  {
    title: "Spectroscopy Databases",
    text: "Growing mineral and drill-core databases provide access to spectral and mineralogical information for research, education, and industry applications.",
    href: "/resources",
  },
];

const applications = [
  {
    title: "Mining & Geology",
    text: "Mineral identification, material characterization, geological interpretation, and exploration support.",
  },
  {
    title: "Mineral Processing",
    text: "Detailed mineralogical information to support improved understanding and optimization of ore processing.",
  },
  {
    title: "Environmental Monitoring",
    text: "Spectral approaches for investigating vegetation, water quality, land use, and environmental materials.",
  },
  {
    title: "Agriculture",
    text: "Applications including crop-health monitoring, pest detection, and spectral assessment of agricultural materials.",
  },
  {
    title: "Manufacturing & Materials",
    text: "Material characterization, quality-control research, and investigation of material variability and defects.",
  },
  {
    title: "Research & Innovation",
    text: "Flexible imaging and analytical capabilities for emerging applications, feasibility studies, and collaborative R&D.",
  },
];

const sampleTypes = [
  "Drill core",
  "Hand samples",
  "Blast-hole cuttings",
  "Thin-section offcuts",
  "Geological materials",
  "Organic & industrial materials",
];

export default function WhatWeDoPage() {
  return (
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroIntro}>
            <p className="eyebrow">Hyperspectral Imaging</p>

            <h1>
              Advanced imaging for
              <span> deeper insight.</span>
            </h1>

            <p>
              College of the North Atlantic&apos;s Hyperspectral
              Scanning Unit combines advanced spectral imaging,
              applied research, and geoscience expertise to reveal
              information beyond conventional imaging.
            </p>

            <a
              href="#capabilities"
              className={styles.heroLink}
            >
              Explore our capabilities →
            </a>
          </div>

          <div className={styles.heroGallery}>
            <figure className={styles.galleryPrimary}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/HSU_Profile_Shot_3.jpg"
                alt="Hyperspectral Scanning Unit"
              />

              <div className={styles.galleryOverlay}>
                <span>Hyperspectral Scanning Unit</span>
                <strong>Advanced spectral imaging</strong>
              </div>
            </figure>

            <figure className={styles.gallerySecondary}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/hsu_scanner1.png"
                alt="HSU scanning operations"
              />

              <div className={styles.galleryOverlay}>
                <span>In operation</span>
                <strong>High-resolution scanning</strong>
              </div>
            </figure>

            <figure className={styles.gallerySecondary}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/HSU_Camera_Layout_1.jpg"
                alt="Hyperspectral data displayed on the HSU output monitor"
              />

              <div className={styles.galleryOverlay}>
                <span>Data & analysis</span>
                <strong>Turning scans into insight</strong>
              </div>
            </figure>
          </div>
        </section>

        <Section>
          <div className={styles.introGrid}>
            <div className={styles.introContent}>
              <p className="eyebrow">See beyond the surface</p>

              <h2>From spectral data to practical insight</h2>

              <p className={styles.lead}>
                The Hyperspectral Scanning Unit (HSU) at College of the North
                Atlantic&apos;s Office of Applied Research and Innovation provides
                high-resolution hyperspectral imaging and analytical services for
                research and industry.
              </p>

              <p>
                Our capabilities span the visible and infrared regions of the
                electromagnetic spectrum, enabling detailed investigation of
                minerals, drill core, geological materials, and a growing range
                of other sample types.
              </p>

              <p>
                We work with clients and research partners to collect, analyze,
                visualize, and interpret spectral data—turning complex
                measurements into information that can support better technical
                and operational decisions.
              </p>
            </div>

            <div className={styles.introMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/HSU_Profile_Shot_3.jpg"
                alt="College of the North Atlantic Hyperspectral Scanning Unit"
              />

              <div className={styles.introMediaOverlay}>
                <span>Hyperspectral Scanning Unit</span>
                <strong>Advanced spectral imaging in action</strong>
              </div>
            </div>
          </div>
        </Section>

        <Section className="section--surface">
          <div className={styles.sectionHeading} id="capabilities">
            <p className="eyebrow">Our capabilities</p>
            <h2>Technology, expertise, and applied research</h2>
            <p>
              From initial scanning through interpretation and collaborative
              research, the HSU supports projects throughout the analytical
              process.
            </p>
          </div>

          <div className={styles.capabilityGrid}>
            {capabilities.map((capability) => (
              <article className={styles.capabilityCard} key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>

                <Link href={capability.href}>
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </Section>

        <Section>
          <div className={styles.featureGrid}>
            <div className={styles.featureMedia}>
              <span>Media insert</span>
              <strong>Hyperspectral scanning</strong>
              <p>
                Ideal location for equipment photography, a scanning video, or a
                hyperspectral visualization.
              </p>
            </div>

            <div className={styles.featureContent}>
              <p className="eyebrow">Hyperspectral imaging</p>
              <h2>High-resolution analysis</h2>

              <p>
                The HSU operates a multi-camera hyperspectral imaging system
                covering spectral regions from Visible Near Infrared through
                Longwave Infrared.
              </p>

              <p>
                The system supports rapid scanning of geological materials,
                including drill core. A 1.5-metre drill-core box can be scanned
                by the five-camera system in under a minute, providing
                high-resolution spectral information for subsequent analysis and
                interpretation.
              </p>

              <Link
                className={styles.textLink}
                href="/services/hyperspectral-imaging"
              >
                Explore hyperspectral imaging
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </Section>

        <Section className="section--surface">
          <div className={styles.sectionHeading}>
            <p className="eyebrow">Our process</p>
            <h2>From samples to insight</h2>
            <p>
              HSU projects combine advanced data acquisition with analysis and
              interpretation tailored to the project.
            </p>
          </div>

          <div className={styles.process}>
            <article>
              <span>01</span>
              <h3>Understand</h3>
              <p>
                We work with clients and researchers to understand the material,
                problem, and analytical objectives.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Scan</h3>
              <p>
                Samples are imaged using the appropriate hyperspectral
                instruments and spectral ranges.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Analyze</h3>
              <p>
                Spectral data are processed and investigated for meaningful
                mineralogical, chemical, or material variation.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Interpret</h3>
              <p>
                Results are visualized and interpreted to provide useful
                information for research and decision-making.
              </p>
            </article>
          </div>

          <div className={styles.wideMediaPlaceholder}>
            <span>Future media / diagram</span>
            <strong>Sample → Scan → Spectral Data → Analysis → Insight</strong>
          </div>
        </Section>

        <Section>
          <div className={styles.sampleLayout}>
            <div>
              <p className="eyebrow">Flexible analysis</p>
              <h2>More than drill core</h2>

              <p>
                Geological materials are a major focus of the HSU, but the
                technology can be applied to many types of samples. Imaging
                approaches can be tailored to the material and objectives of the
                project.
              </p>

              <div className={styles.tagList}>
                {sampleTypes.map((sample) => (
                  <span key={sample}>{sample}</span>
                ))}
              </div>
            </div>

            <div className={styles.sampleMedia}>
              <span>Media insert</span>
              <strong>Sample gallery</strong>
              <p>
                Add photographs showing drill core, hand samples, cuttings, and
                other materials handled by the HSU.
              </p>
            </div>
          </div>
        </Section>

        <Section className="section--surface">
          <div className={styles.sectionHeading}>
            <p className="eyebrow">Applications</p>
            <h2>Supporting research and industry</h2>
            <p>
              Hyperspectral imaging can provide useful information anywhere
              spectral differences help distinguish materials, composition, or
              condition.
            </p>
          </div>

          <div className={styles.applicationGrid}>
            {applications.map((application) => (
              <article key={application.title}>
                <div className={styles.applicationMedia}>
                  <span>Image</span>
                </div>

                <div>
                  <h3>{application.title}</h3>
                  <p>{application.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section>
          <div className={styles.collaboration}>
            <div>
              <p className="eyebrow">Applied research</p>
              <h2>Built for collaboration</h2>

              <p>
                The HSU works with industry, researchers, government, and other
                organizations on applied research and technology-development
                projects.
              </p>

              <p>
                Our team can support feasibility studies, specialized imaging,
                data analysis and interpretation, technology demonstrations,
                training, and the exploration of new hyperspectral applications.
              </p>

              <div className={styles.actions}>
                <Link className={styles.primaryButton} href="/about/partners">
                  Our partners
                </Link>

                <Link className={styles.secondaryButton} href="/about/team">
                  Meet the team
                </Link>
              </div>
            </div>

            <div className={styles.collaborationMedia}>
              <span>Media insert</span>
              <strong>Research & industry collaboration</strong>
              <p>
                Space for a project photograph, partner collaboration, field
                deployment, or team image.
              </p>
            </div>
          </div>
        </Section>

        <Section className="section--surface">
          <div className={styles.sectionHeading}>
            <p className="eyebrow">Explore</p>
            <h2>Discover our capabilities and resources</h2>
          </div>

          <div className={styles.exploreGrid}>
            <Link href="/services/hyperspectral-imaging">
              <span>Services</span>
              <h3>Hyperspectral Imaging</h3>
              <p>
                Learn about our imaging capabilities, systems, analysis, and
                service options.
              </p>
              <strong>Explore service →</strong>
            </Link>

            <Link href="/resources/minerals">
              <span>Database</span>
              <h3>Minerals Database</h3>
              <p>
                Explore spectral and supporting information from the HSU mineral
                reference collection.
              </p>
              <strong>Explore minerals →</strong>
            </Link>

            <Link href="/resources/drillcores">
              <span>Database</span>
              <h3>Drill Core Database</h3>
              <p>
                Explore drill-core data and mineralogical resources produced
                through HSU projects.
              </p>
              <strong>Explore drill core →</strong>
            </Link>
          </div>
        </Section>
      

      <CallToAction
        title="Have a project in mind?"
        description="Connect with the HSU team to discuss your samples, research objectives, and how our imaging and analytical capabilities could support your project."
        href="/services/hyperspectral-imaging/request-analysis"
        linkLabel="Request an analysis"
      />
    </main>
  );
}