import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Client and partner feedback about HSU services and project outcomes."
      />
      <Section>
        <div className="empty-state">
          <p className="eyebrow">Client feedback</p>
          <h2>Testimonials will be added after approval</h2>
          <p>
            This page is intentionally ready without publishing placeholder quotations.
            Approved testimonials can be added once wording and attribution are confirmed.
          </p>
        </div>
      </Section>
    </>
  );
}
