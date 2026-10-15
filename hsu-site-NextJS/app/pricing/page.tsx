import { PageHeader } from "@/components/sections/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";

const pricingCategories = [
  {
    title: "Hyperspectral Scanning",
    pricing: "Quoted by project",
    description:
      "Pricing depends on sample type, quantity, scan configuration, spectral range, and required outputs.",
  },
  {
    title: "Data Processing and Interpretation",
    pricing: "Quoted by project",
    description:
      "Available processing may include data correction, mineral mapping, interpretation, and preparation of project deliverables.",
  },
  {
    title: "Mobile and Field Services",
    pricing: "Contact for pricing",
    description:
      "Costs may include equipment deployment, travel, project duration, staffing, and site-specific requirements.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing"
        description="Project costs are based on the equipment, sample volume, analytical requirements, and deliverables required."
      />

      <Section>
        <p className="eyebrow">Service costs</p>
        <h2>Pricing tailored to your project</h2>

        <p>
          Hyperspectral projects can vary considerably in scale and technical
          requirements. We review each request before providing a detailed estimate.
        </p>

        <div className="card-grid">
          {pricingCategories.map((category) => (
            <article className="pricing-card" key={category.title}>
              <h3>{category.title}</h3>
              <p className="card-subtitle">{category.pricing}</p>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="section--surface">
        <div className="content-grid">
          <div>
            <p className="eyebrow">What affects pricing?</p>
            <h2>Factors considered in a quote</h2>
          </div>

          <div>
            <ul>
              <li>Number, size, and condition of samples</li>
              <li>Required spectral range and equipment</li>
              <li>Sample preparation requirements</li>
              <li>Level of data processing and interpretation</li>
              <li>Required reports, images, or exported datasets</li>
              <li>Travel or mobile deployment requirements</li>
            </ul>
          </div>
        </div>
      </Section>

      <CallToAction
        title="Request a project estimate"
        description="Tell us about your samples and required outcomes so that we can recommend an appropriate service and prepare a quote."
        href="/contact"
        linkLabel="Request a quote"
      />
    </>
  );
}
