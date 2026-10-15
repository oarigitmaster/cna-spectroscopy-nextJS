import Link from "next/link";

import { servicesOverview } from "@/app/data/services";
import { Section } from "@/components/ui/Section";

export function ServicesOverview() {
  return (
    <Section className="section--surface">
      <p className="eyebrow">Our Capabilities</p>

      <h2>Advanced tools for understanding materials.</h2>

      <p>
        Our analytical capabilities combine advanced imaging and
        spectroscopy technologies to characterize materials, reveal
        composition, and generate high-quality data for research and
        industry.
      </p>

      <div className="card-grid capabilities-grid">
        {servicesOverview.slice(0, 4).map((service) => (
          <Link
            className="service-card service-card--link"
            href={service.href}
            key={service.label}
          >
            <h3>{service.label}</h3>
            <p>{service.description}</p>
          </Link>
        ))}
      </div>

      <Link className="text-link" href="/services">
        View all equipment and services →
      </Link>
    </Section>
  );
}