import Link from "next/link";

import { servicesOverview } from "@/app/data/services";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Equipment & Services"
        description="Explore our analytical, imaging, modelling, and simulation capabilities."
      />
      <Section>
        <p className="eyebrow">Capabilities</p>
        <h2>Choose a service area</h2>
        <div className="card-grid">
          {servicesOverview.map((service) => (
            <Link className="service-card service-card--link" href={service.href} key={service.href}>
              <h3>{service.label}</h3>
              <p>{service.description}</p>
              <span className="text-link">Explore service →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
