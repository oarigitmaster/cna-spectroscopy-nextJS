import Link from "next/link";

import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch with the Hyperspectral Unit about research, partnerships, services, data resources, or general inquiries."
      />

      <Section>
        <div className="content-grid">
          <div>
            <p className="eyebrow">Get in touch</p>

            <h2>How can we help?</h2>

            <p>
              Contact the Hyperspectral Unit to discuss applied research,
              collaboration opportunities, hyperspectral imaging services,
              data resources, or general questions about our facilities and
              capabilities.
            </p>
          </div>

          <div className="contact-details">
            <div className="contact-detail">
              <p className="eyebrow">Email</p>

              <h3>Hyperspectral Unit</h3>

              <a href="mailto:HSU@cna.nl.ca">
                HSU@cna.nl.ca
              </a>
            </div>

            <div className="contact-detail">
              <p className="eyebrow">Location</p>

              <h3>College of the North Atlantic</h3>

              <address>
                425 Topsail Road
                <br />
                St. John&apos;s, NL
                <br />
                A1E 2C2
                <br />
                Canada
              </address>
            </div>
          </div>
        </div>
      </Section>

      <Section className="section--surface">
        <div className="content-grid">
          <div>
            <p className="eyebrow">Analysis services</p>

            <h2>Looking to have samples analyzed?</h2>
          </div>

          <div>
            <p>
              If you are interested in hyperspectral scanning or analytical
              services, visit our Request an Analysis page to access the
              official HSU Request for Analysis Form.
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

      <Section>
        <div className="contact-option-grid">
          <article className="contact-option-card">
            <p className="eyebrow">Research</p>

            <h3>Research Collaboration</h3>

            <p>
              Interested in exploring a research question or a new application
              of hyperspectral imaging? Contact our team to discuss potential
              collaboration opportunities.
            </p>

            <a href="mailto:HSU@cna.nl.ca">
              Contact the HSU →
            </a>
          </article>

          <article className="contact-option-card">
            <p className="eyebrow">Industry</p>

            <h3>Industry Partnerships</h3>

            <p>
              We work with industry partners on applied research, technology
              development, analytical challenges, and demonstration projects.
            </p>

            <Link href="/partners">
              Learn about our partners →
            </Link>
          </article>

          <article className="contact-option-card">
            <p className="eyebrow">Data</p>

            <h3>Data & Resources</h3>

            <p>
              Explore publicly available mineral, drillcore, and spectroscopy
              resources developed through HSU research and scanning activities.
            </p>

            <Link href="/resources">
              Explore resources →
            </Link>
          </article>
        </div>
      </Section>

      <Section className="section--surface">
        <div className="contact-footer-cta">
          <div>
            <p className="eyebrow">Start a conversation</p>

            <h2>Not sure where to begin?</h2>

            <p>
              Send us an email and our team can help direct your inquiry to the
              appropriate person or service.
            </p>
          </div>

          <a
            href="mailto:HSU@cna.nl.ca"
            className="button-link"
          >
            Email HSU@cna.nl.ca →
          </a>
        </div>
      </Section>
    </>
  );
}