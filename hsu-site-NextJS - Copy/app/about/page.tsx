// src/app/about/page.tsx

import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Learn about our hyperspectral imaging facilities, research capabilities, and role in supporting industry and geoscience."
      />

      <Section>
        <h2>What We Do</h2>

        <p>
          The Hyperspectral Scanning Unit provides imaging, mineral characterization,
          research support, and data services.
        </p>
      </Section>
    </>
  );
}
