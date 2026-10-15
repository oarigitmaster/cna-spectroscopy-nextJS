import Link from "next/link";

import { PageHeader } from "@/components/sections/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";

export default function MobileHSUPage() {
  return (
    <>
      <PageHeader
        title="Mobile Hyperspectral Unit"
        description="Bring advanced hyperspectral imaging capabilities closer to your samples, site, or project."
      />

      <Section>
        <div className="content-grid">
          <div>
            <p className="eyebrow">
              Mobile hyperspectral imaging
            </p>

            <h2>
              High-resolution spectral analysis beyond the laboratory
            </h2>
          </div>

          <div>
            <p>
              CNA&apos;s Hyperspectral Unit includes a mobile
              hyperspectral imaging facility designed to support
              scanning and analysis across a broad range of
              applications.
            </p>

            <p>
              The system provides high-resolution imaging across
              the electromagnetic spectrum, from Visible Near
              Infrared (VNIR) through Longwave Infrared (LWIR).
              While much of the HSU&apos;s work focuses on
              geological materials, the technology can also be
              applied to a range of organic and industrial
              materials.
            </p>
          </div>
        </div>
      </Section>

      <Section className="section--surface">
        <p className="eyebrow">
          Capabilities
        </p>

        <h2>Designed for flexible sample analysis</h2>

        <div className="card-grid">
          <article className="service-card">
            <h3>Drill Core Scanning</h3>

            <p>
              The HSU&apos;s five-camera system supports rapid
              hyperspectral scanning of diamond drill core and
              related geological materials.
            </p>
          </article>

          <article className="service-card">
            <h3>Multiple Sample Types</h3>

            <p>
              Scanning can support drill core, hand samples,
              blast-hole cuttings, and thin-section offcuts.
            </p>
          </article>

          <article className="service-card">
            <h3>Spectral Data Analysis</h3>

            <p>
              HSU services include data processing and analysis
              to investigate mineralogical and physio-chemical
              variability in geological samples.
            </p>
          </article>

          <article className="service-card">
            <h3>Mobile Research Support</h3>

            <p>
              Mobile capability allows the HSU to support
              projects where bringing imaging systems closer
              to samples or field operations is beneficial.
            </p>
          </article>
        </div>
      </Section>

      <Section>
        <div className="content-grid">
          <div>
            <p className="eyebrow">
              Applications
            </p>

            <h2>
              Supporting exploration and materials research
            </h2>
          </div>

          <div>
            <p>
              Hyperspectral imaging can be used to investigate
              mineralogical and physio-chemical variability
              within geological materials, supporting a better
              understanding of samples from exploration through
              processing and reclamation.
            </p>

            <Link
              href="/services/hyperspectral-imaging/request-analysis"
              className="button-link"
            >
              Request an Analysis →
            </Link>
          </div>
        </div>
      </Section>

      <CallToAction
        title="Interested in mobile hyperspectral scanning?"
        description="Contact the HSU to discuss your samples, project requirements, and analytical objectives."
        href="/services/hyperspectral-imaging/request-analysis"
        linkLabel="Request an Analysis"
      />
    </>
  );
}