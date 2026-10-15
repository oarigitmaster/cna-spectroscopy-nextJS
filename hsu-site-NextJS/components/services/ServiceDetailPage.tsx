import Link from "next/link";

import { CallToAction } from "@/components/sections/CallToAction";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import type { ServiceContent } from "@/app/data/services";

export function ServiceDetailPage({ content }: { content: ServiceContent }) {
  return (
    <>
      <PageHeader title={content.title} description={content.description} />

      <Section>
        <p className="eyebrow">{content.eyebrow}</p>
        <div className="content-grid">
          <div>
            <h2>About this service</h2>
          </div>
          <div>
            {content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      {content.capabilities?.length ? (
        <Section className="section--surface">
          <p className="eyebrow">Capabilities</p>
          <h2>How the service can be used</h2>
          <ul className="feature-list">
            {content.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {content.outcomes?.length ? (
        <Section>
          <p className="eyebrow">Analysis & outcomes</p>
          <h2>Potential project deliverables</h2>
          <p>
            Final outputs depend on the agreed project scope, analytical method,
            and available source data.
          </p>
          <ul className="feature-list">
            {content.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {content.links?.length ? (
        <Section className="section--surface">
          <p className="eyebrow">Explore</p>
          <h2>Related information</h2>
          <div className="card-grid">
            {content.links.map((link) => (
              <Link className="service-card service-card--link" href={link.href} key={link.href}>
                <h3>{link.label}</h3>
                {link.description ? <p>{link.description}</p> : null}
                <span className="text-link">View details →</span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {content.cta ? (
        <CallToAction
          title={content.cta.label}
          description="Tell us about your project, samples, data, and intended outcome so the team can recommend an appropriate approach."
          href={content.cta.href}
          linkLabel={content.cta.label}
        />
      ) : null}
    </>
  );
}
