import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";

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

const iconPaths = {
  scan: "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5M3 12h18",
  mineral: "m12 3 8 6-3 11H7L4 9l8-6Zm0 0L9 9l3 11 3-11-3-6ZM4 9h16",
  samples: "M4 5h16v14H4V5Zm5 0v14m6-14v14M4 12h16",
  analysis: "M4 4v16h16M7 15l4-5 4 2 5-7",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  file: "M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h6",
  image: "M3 4h18v16H3V4Zm0 12 5-5 5 5 3-3 5 5M15 8h.01",
  cube: "m12 3 9 5v9l-9 5-9-5V8l9-5Zm-9 5 9 5 9-5m-9 5v9",
};

function DataIcon({ name }: { name: keyof typeof iconPaths }) {
  return (
    <span className={styles.dataIcon} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={iconPaths[name]} />
      </svg>
    </span>
  );
}

const researchServices: {
  title: string;
  description: string;
  icon: keyof typeof iconPaths;
}[] = [
  {
    title: "Scanning & analysis",
    description: "In-house and mobile hyperspectral scanning and data analysis.",
    icon: "scan",
  },
  {
    title: "Material characterization",
    description:
      "Mineralogical and physico-chemical investigation of geological samples.",
    icon: "mineral",
  },
  {
    title: "A range of sample types",
    description:
      "Analysis of drill core, hand samples, blast-hole cuttings, and thin-section offcuts.",
    icon: "samples",
  },
  {
    title: "Geological insight",
    description:
      "Geological and mineral analysis supporting exploration, processing, and research.",
    icon: "analysis",
  },
];

const projectDeliverables: {
  title: string;
  description: string;
  icon: keyof typeof iconPaths;
}[] = [
  {
    title: "Processed spectral data",
    description: "Processed data displaying the minerals or material of interest.",
    icon: "layers",
  },
  {
    title: "Raw data",
    description: "Raw project data for further analysis and interpretation.",
    icon: "file",
  },
  {
    title: "RGB imagery",
    description: "High-quality RGB images of the scanned samples.",
    icon: "image",
  },
  {
    title: "3D profiler data",
    description: "Profile data that complements spectral imaging.",
    icon: "cube",
  },
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
    <div className={`${styles.page} service-paper-page`}>
      <Hero />

      {/* INTRODUCTION */}
      <section className={styles.intro}>
        <div className={styles.introGrid}>
          <div className={styles.miniGallery}>
            <figure className={styles.galleryPrimary}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/HSU_Profile_Shot_3.jpg"
                alt="College of the North Atlantic Hyperspectral Scanning Unit"
              />

              <div className={styles.galleryOverlay}>
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
                <strong>SWIR hyperspectral camera</strong>
              </div>
            </figure>
          </div>

          <div className={styles.introCopy}>
            <p>
              CNA&apos;s Hyperspectral Unit provides advanced hyperspectral imaging and
              analytical services for industry, researchers, and organizations seeking
              deeper insight into materials and processes.
            </p>

            <p>
              Our team works with clients to capture, analyze, and visualize
              high-precision spectral data, transforming complex information into useful
              analytical results.
            </p>

            <strong>Sharper data. Smarter solutions. Better results.</strong>
          </div>
        </div>
      </section>

      <Section>
        <div className="home-about">
          <div className="home-about__content">
            <h2>Beyond the surface.</h2>

            <p className="home-about__lead">
              College of the North Atlantic&apos;s Hyperspectral Scanning Unit combines
              advanced spectral imaging, applied research, and geoscience expertise to
              reveal information that conventional imaging cannot capture.
            </p>

            <p>
              From mineral exploration and drill-core analysis to environmental and
              emerging industrial applications, the HSU transforms high-resolution
              spectral data into information that supports better technical decisions.
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

            <a href="/about/what-we-do" className="home-about__link">
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
              <strong>Hyperspectral imaging in action</strong>
            </div>
          </div>
        </div>
      </Section>

      <Section className="section--surface">
        <div className={styles.sectionHeading}>
          <h2>Spectral capabilities</h2>
          <p>
            The HSU system is currently equipped with five hyperspectral cameras capable
            of scanning wavelengths within the 400–5000 nm and 8000–12000 nm ranges, along
            with an RGB camera and a 3D profiler.
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
          <h2>Analyze what conventional imaging cannot see.</h2>

          <p>
            The Hyperspectral Unit provides high-resolution imaging capabilities across
            the electromagnetic spectrum, from Visible Near Infrared (VNIR) to Longwave
            Infrared (LWIR).
          </p>

          <p>
            While much of our work focuses on geological materials, hyperspectral imaging
            can support the analysis of a wide variety of organic and industrial
            materials.
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

      {/* RESEARCH SERVICES */}
      <section
        className={styles.servicesDetail}
        id="research-services"
        aria-labelledby="research-services-title"
      >
        <div className={styles.servicesGrid}>
          <div className={styles.servicesIntro}>
            <h2 id="research-services-title">
              From samples to actionable spectral data.
            </h2>
            <p>
              Our facilities support both in-house and mobile hyperspectral scanning,
              allowing the HSU to work with a wide range of geological and material
              samples.
            </p>
            <Link
              href="/services/hyperspectral-imaging/request-analysis"
              className={styles.serviceLink}
            >
              Discuss your analysis <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className={styles.serviceList}>
            {researchServices.map((service) => (
              <li key={service.title}>
                <DataIcon name={service.icon} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROJECT OUTPUTS */}
      <section
        className={styles.outputs}
        id="project-outputs"
        aria-labelledby="project-outputs-title"
      >
        <div className={styles.outputsInner}>
          <div className={styles.deliverablesIntro}>
            <h2 id="project-outputs-title">Data tailored to the project.</h2>
            <p>
              The spectral response of a material is related to its composition, so the
              equipment used for each project is selected according to the materials being
              scanned and the needs of the project.
            </p>
          </div>
          <ul className={styles.deliverablesList}>
            {projectDeliverables.map((deliverable) => (
              <li className={styles.deliverable} key={deliverable.title}>
                <DataIcon name={deliverable.icon} />
                <h3>{deliverable.title}</h3>
                <p>{deliverable.description}</p>
              </li>
            ))}
          </ul>
          <p className={styles.outputNote}>
            Available data products vary by project and analytical requirements.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeading}>
          <h2>How It Works</h2>

          <p>
            From the initial conversation to applying your results, our team works with
            you throughout the analytical process.
          </p>
        </div>

        <div className={styles.process}>
          {process.map((step) => (
            <article className={styles.processStep} key={step.number}>
              <h3>
                <span className={styles.processNumber}>{step.number}</span>
                {step.title}
              </h3>

              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* DATABASES */}
      <section className={styles.resources}>
        <div className={styles.resourcesIntro}>
          <h2>Explore our spectroscopy resources.</h2>

          <p>
            Access spectral and mineralogical resources developed through HSU research and
            scanning activities.
          </p>
        </div>

        <div className={styles.resourceLinks}>
          <Link href="/login" className={styles.resourceCard}>
            <h3>Client Portal</h3>
            <p>Access complete datasets and project resources shared with your organization.</p>
            <strong>Open client portal →</strong>
          </Link>

          <Link href="/coredatabase" className={styles.resourceCard}>
            <h3>Drillcore Database</h3>
            <p>
              Explore drillcore records, hyperspectral imagery, and mineralogical data.
            </p>
            <strong>Explore database →</strong>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} id="get-started">
        <div>
          <h2>Ready to see beyond?</h2>

          <p>
            Whether you&apos;re looking to analyze materials, investigate a research
            question, or explore a new application of hyperspectral imaging, talk to our
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
    </div>
  );
}
