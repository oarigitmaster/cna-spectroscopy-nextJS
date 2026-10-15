import Link from "next/link";

import PortalSection from "@/components/home/PortalSection/PortalSection";
import DepartmentHero from "@/components/home/DepartmentHero/DepartmentHero";
import { VideoFeature } from "@/components/home/VideoFeature";
import { CallToAction } from "@/components/sections/CallToAction";
import { PartnersStrip } from "@/components/sections/PartnersStrip";

const capabilities = [
  {
    title: "Hyperspectral Imaging & Data Analysis",
    description:
      "High-resolution spectral imaging and analysis for identifying, mapping, and characterizing geological materials.",
    href: "/services/hyperspectral-imaging",
  },
  {
    title: "Geotek Core Logging",
    description:
      "Integrated core analysis using X-ray fluorescence and spectral gamma-ray measurements for geological characterization.",
    href: "/services/geotek",
  },
  {
    title: "Laser Induced Breakdown Spectroscopy",
    description:
      "Rapid elemental characterization that can complement hyperspectral, mineralogical, and other analytical datasets.",
    href: "/services/libs",
  },
];

const audiences = [
  {
    title: "Industry",
    description:
      "Organizations seeking advanced imaging and analytical solutions for complex material and operational challenges.",
  },
  {
    title: "Researchers",
    description:
      "Research teams investigating new applications of hyperspectral imaging and spectral analysis.",
  },
  {
    title: "Government",
    description:
      "Agencies working in environmental monitoring, natural resources, and related research areas.",
  },
  {
    title: "Non-Profit Organizations",
    description:
      "Organizations applying research and technology to sustainability, conservation, and resource challenges.",
  },
];

export default function HomePage() {
  return (
    <>
      <DepartmentHero />

      {/* CAPABILITIES */}
      <section className="home-capabilities" id="capabilities">
        <div className="home-capabilities__heading">
          <h2>What We Offer</h2>

          <p>
            Advanced imaging, analysis, and research expertise tailored to real-world
            applications.
          </p>
        </div>

        <div className="home-capabilities__grid">
          {capabilities.map((capability) => (
            <Link
              href={capability.href}
              className="home-capabilities__card"
              key={capability.href}
            >
              <h3>{capability.title}</h3>

              <p>{capability.description}</p>

              <span className="home-capabilities__link">
                Explore this capability
                <span aria-hidden="true"> →</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <VideoFeature
        videoId="hBLTfg20P4M"
        poster="https://img.youtube.com/vi/hBLTfg20P4M/maxresdefault.jpg"
        title="Discover the Hyperspectral Scanning Unit."
        eyebrow=""
      />

      {/* WHO WE SERVE */}
      <section className="home-audience" id="who-we-serve">
        <div className="home-audience__heading">
          <h2>Who We Serve</h2>

          <p>
            Supporting industry, researchers, government, and organizations applying
            advanced imaging and analytical technologies.
          </p>
        </div>

        <div className="home-audience__grid">
          {audiences.map((audience) => (
            <article className="home-audience__card" key={audience.title}>
              <h3>{audience.title}</h3>

              <p>{audience.description}</p>
            </article>
          ))}
        </div>
      </section>

      <PartnersStrip />

      <CallToAction
        eyebrow=""
        title="Interested in partnering with us?"
        description="Contact us to discuss research, industry, or technology-development opportunities."
        href="/contact"
        linkLabel="Start a conversation"
      />

      <PortalSection />
    </>
  );
}
