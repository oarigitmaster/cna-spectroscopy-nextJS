import { PageHeader } from "@/components/sections/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";

export default function HandheldHSUPage() {
  return (
    <>
      <PageHeader
        title="Handheld Hyperspectral Imaging"
        description="Flexible spectral imaging for targeted sample and material investigation."
      />

      <Section>
        <div className="content-grid">
          <div>
            <p className="eyebrow">
              Flexible imaging
            </p>

            <h2>
              Targeted spectral analysis
            </h2>
          </div>

          <div>
            <p>
              Handheld hyperspectral imaging can provide a
              flexible option for targeted spectral investigation
              where full laboratory or drill-core scanning is not
              required.
            </p>

            <p>
              Detailed information on the HSU&apos;s handheld
              equipment, supported wavelength ranges, and
              recommended applications will be added as
              technical specifications are confirmed.
            </p>
          </div>
        </div>
      </Section>

      <CallToAction
        title="Have a sample or application in mind?"
        description="Contact the HSU to discuss whether handheld hyperspectral imaging is appropriate for your project."
        href="/services/hyperspectral-imaging/request-analysis"
        linkLabel="Request an Analysis"
      />
    </>
  );
}