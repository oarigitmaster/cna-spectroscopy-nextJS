import { PageHeader } from "@/components/sections/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";

export default function AerialHSUPage() {
  return (
    <>
      <PageHeader
        title="Aerial Hyperspectral Imaging"
        description="Hyperspectral imaging capabilities for larger-area observation and advanced spectral mapping applications."
      />

      <Section>
        <div className="content-grid">
          <div>
            <p className="eyebrow">
              Aerial imaging
            </p>

            <h2>
              Extending spectral analysis across larger areas
            </h2>
          </div>

          <div>
            <p>
              Aerial hyperspectral imaging can support projects
              that require spectral information across larger
              spatial areas than conventional sample-based
              scanning.
            </p>

            <p>
              Detailed information about the HSU&apos;s aerial
              imaging platform, supported sensors, deployment
              requirements, and applications will be added as
              technical specifications are confirmed.
            </p>
          </div>
        </div>
      </Section>

      <CallToAction
        title="Interested in aerial hyperspectral imaging?"
        description="Contact the HSU to discuss your project objectives and available imaging options."
        href="/contact"
        linkLabel="Contact the HSU"
      />
    </>
  );
}