import { serviceContent } from "@/app/data/services";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { VideoFeature } from "@/components/home/VideoFeature";

import styles from "./hyperspectral.module.css";

const spectralEquipment = [
  {
    equipment: "Visible–Near Infrared (VNIR)",
    range: "400–1000 nm",
    minerals: "REE-bearing minerals",
    other: "—",
  },
  {
    equipment: "Shortwave Infrared (SWIR)",
    range: "1000–2500 nm",
    minerals: "Hydrated minerals",
    other: "Oil",
  },
  {
    equipment: "Midwave Infrared (MWIR)",
    range: "2500–5000 nm",
    minerals: "Carbonates",
    other: "Plastic, wood, vegetation, food products",
  },
  {
    equipment: "Longwave Infrared (LWIR)",
    range: "8000–12000 nm",
    minerals: "All silicates",
    other: "—",
  },
  {
    equipment: "RGB",
    range: "—",
    minerals: "—",
    other: "Core box images",
  },
  {
    equipment: "3D profiler",
    range: "—",
    minerals: "—",
    other: "3D core profile",
  },
];

const projectDeliverables = [
  "Processed data displaying the minerals or material of interest",
  "Raw data",
  "High-quality RGB images",
  "3D profiler data",
];





const process = [
  {
    number: "01",
    title: "Connect",
    description:
      "Tell us about your project, objectives, samples, and analytical requirements.",
  },
  {
    number: "02",
    title: "Capture",
    description:
      "Our team uses the appropriate hyperspectral imaging systems to collect high-resolution spectral data.",
  },
  {
    number: "03",
    title: "Analyze",
    description:
      "We process and interpret the collected data to identify meaningful spectral and material characteristics.",
  },
  {
    number: "04",
    title: "Apply",
    description:
      "Use the resulting data and insights to support research, exploration, operational, or development objectives.",
  },
];

export default function HyperspectralImagingPage() {
  return (
    <main className={styles.page}>
      <Hero />
    

      {/* INTRODUCTION */}
      <section className={styles.intro}>
        <div className={styles.sectionLabel}>
          About the HSU
        </div>

        <div className={styles.introGrid}>
          <div className={styles.miniGallery}>
            <figure className={styles.galleryPrimary}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/HSU_Profile_Shot_3.jpg"
                alt="College of the North Atlantic Hyperspectral Scanning Unit"
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
                alt="HSU SWIR hyperspectral camera"
              />

              <div className={styles.galleryOverlay}>
                <span>Imaging technology</span>
                <strong>SWIR hyperspectral camera</strong>
              </div>
            </figure>
          </div>

          <div className={styles.introCopy}>
            <p>
              CNA&apos;s Hyperspectral Unit provides
              advanced hyperspectral imaging and
              analytical services for industry,
              researchers, and organizations seeking
              deeper insight into materials and
              processes.
            </p>

            <p>
              Our team works with clients to capture,
              analyze, and visualize high-precision
              spectral data, transforming complex
              information into useful analytical
              results.
            </p>

            <strong>
              Sharper data. Smarter solutions.
              Better results.
            </strong>
          </div>
        </div>
      </section>      

      <Section>
        <div className="home-about">
          <div className="home-about__content">

            <h2>Beyond the surface.</h2>

            <p className="home-about__lead">
              College of the North Atlantic&apos;s Hyperspectral
              Scanning Unit combines advanced spectral imaging,
              applied research, and geoscience expertise to reveal
              information that conventional imaging cannot capture.
            </p>

            <p>
              From mineral exploration and drill-core analysis to
              environmental and emerging industrial applications,
              the HSU transforms high-resolution spectral data into
              information that supports better technical decisions.
            </p>

            <div className="home-about__stats">
              <div>
                <strong>VNIR → LWIR</strong>
                <span>Broad spectral coverage</span>
              </div>

              <div>
                <strong>5 Cameras</strong>
                <span>High-resolution imaging system</span>
              </div>

              <div>
                <strong>&lt; 1 Minute</strong>
                <span>1.5 m drill-core box scan</span>
              </div>
            </div>

            <a
              href="/about/what-we-do"
              className="home-about__link"
            >
              Learn more about what we do →
            </a>
          </div>

          <div className="home-about__visual">
            <video
              className="home-about__video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source
                src="https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/HSU_output_screen.mp4"
                type="video/mp4"
              />
            </video>

            <div className="home-about__visual-overlay" />

            <div className="home-about__visual-label">
              <span>HSU Technology</span>
              <strong>Hyperspectral imaging in action</strong>
            </div>
          </div>
        </div>
      </Section>

      <Section className="section--surface">
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Technical capabilities</p>

          <p>
            The HSU system is currently equipped with five hyperspectral cameras
            capable of scanning wavelengths within the 400–5000 nm and
            8000–12000 nm ranges, along with an RGB camera and a 3D profiler.
          </p>
        </div>

        <div className={styles.equipmentTableWrapper}>
          <table className={styles.equipmentTable}>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Spectral Range</th>
                <th>Minerals</th>
                <th>Other</th>
              </tr>
            </thead>

            <tbody>
              {spectralEquipment.map((item) => (
                <tr key={item.equipment}>
                  <td>{item.equipment}</td>
                  <td>{item.range}</td>
                  <td>{item.minerals}</td>
                  <td>{item.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>


      {/* TECHNICAL OVERVIEW */}
      <section className={styles.technical}>
        <div className={styles.technicalContent}>
          <p className={styles.eyebrow}>
            Advanced spectral imaging
          </p>

          <h2>
            Analyze what conventional imaging
            cannot see.
          </h2>

          <p>
            The Hyperspectral Unit provides
            high-resolution imaging capabilities
            across the electromagnetic spectrum,
            from Visible Near Infrared (VNIR) to
            Longwave Infrared (LWIR).
          </p>

          <p>
            While much of our work focuses on
            geological materials, hyperspectral
            imaging can support the analysis of
            a wide variety of organic and
            industrial materials.
          </p>
        </div>

        <div className={styles.spectralRange}>
          <div>
            <span>VNIR</span>
            <small>Visible Near Infrared</small>
          </div>

          <div className={styles.rangeLine} />

          <div>
            <span>SWIR</span>
            <small>Shortwave Infrared</small>
          </div>

          <div className={styles.rangeLine} />

          <div>
            <span>LWIR</span>
            <small>Longwave Infrared</small>
          </div>
        </div>
      </section>

      



      {/* SERVICES DETAIL */}
      <section className={styles.servicesDetail}>
        <div className={styles.sectionLabel}>
          <span>03</span>
          Research Services
        </div>

        <div className={styles.servicesGrid}>
          <div>
            <h2>
              From samples to actionable
              spectral data.
            </h2>

            <p>
              Our facilities support both in-house
              and mobile hyperspectral scanning,
              allowing the HSU to work with a wide
              range of geological and material
              samples.
            </p>
          </div>

          <ul className={styles.serviceList}>
            <li>
              In-house and mobile hyperspectral
              scanning and data analysis
            </li>

            <li>
              Mineralogical and physio-chemical
              investigation of geological samples
            </li>

            <li>
              Analysis of drill core, hand samples,
              blast-hole cuttings, and thin-section
              offcuts
            </li>

            <li>
              Geological and mineral analysis
              supporting exploration, processing,
              and research
            </li>
          </ul>
        </div>
      </section>

      <Section>
        <div className={styles.deliverablesGrid}>
          <div className={styles.deliverablesIntro}>
            <p className="eyebrow">Project outputs</p>

            <h2>Data tailored to the project.</h2>

            <p>
              The spectral response of a material is related to its composition,
              so the equipment used for each project is selected according to the
              materials being scanned and the needs of the project.
            </p>

            <p>
              Available data products can vary by project and analytical
              requirements.
            </p>
          </div>

          <div className={styles.deliverablesList}>
            {projectDeliverables.map((deliverable) => (
              <div className={styles.deliverable} key={deliverable}>
                <span aria-hidden="true">✓</span>
                <p>{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* PROCESS */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeading}>
          <div className={styles.sectionLabel}>
            <span>05</span>
            Our Process
          </div>

          <h2>How It Works</h2>

          <p>
            From the initial conversation to
            applying your results, our team works
            with you throughout the analytical
            process.
          </p>
        </div>

        <div className={styles.process}>
          {process.map((step) => (
            <article
              className={styles.processStep}
              key={step.number}
            >
              <span>{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>


      {/* DATABASES */}
      <section className={styles.resources}>
        <div className={styles.resourcesIntro}>
          <div className={styles.sectionLabel}>
            <span>06</span>
            Open Data
          </div>

          <h2>
            Explore our spectroscopy resources.
          </h2>

          <p>
            Access spectral and mineralogical
            resources developed through HSU
            research and scanning activities.
          </p>
        </div>

        <div className={styles.resourceLinks}>
          <Link
            href="/mindatabase"
            className={styles.resourceCard}
          >
            <span>Database</span>
            <h3>Minerals Database</h3>
            <p>
              Explore mineral samples and
              associated spectral data.
            </p>
            <strong>Explore database →</strong>
          </Link>

          <Link
            href="/coredatabase"
            className={styles.resourceCard}
          >
            <span>Database</span>
            <h3>Drillcore Database</h3>
            <p>
              Explore drillcore records,
              hyperspectral imagery, and
              mineralogical data.
            </p>
            <strong>Explore database →</strong>
          </Link>
        </div>
      </section>


      {/* CTA */}
      <section
        className={styles.cta}
        id="get-started"
      >
        <div>
          <p className={styles.eyebrow}>
            Start a project
          </p>

          <h2>Ready to see beyond?</h2>

          <p>
            Whether you&apos;re looking to analyze
            materials, investigate a research
            question, or explore a new application
            of hyperspectral imaging, talk to our
            team about your project.
          </p>
        </div>

        <Link
          href="/services/hyperspectral-imaging/request-analysis"
          className={styles.ctaButton}
        >
          Request an Analysis
          <span>→</span>
        </Link>
      </section>

    </main>
  );
}
