import { PageHeader } from "@/components/sections/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";

const fundingPartners = [
  {
    name: "Atlantic Canada Opportunities Agency",
    shortName: "ACOA",
    description:
      "The Atlantic Canada Opportunities Agency has supported the development of CNA's Hyperspectral Unit through the Regional Economic Growth through Innovation (REGI) program.",
    logo: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/ACOA.png",
    href: "https://www.canada.ca/en/atlantic-canada-opportunities.html",
  },
  {
    name: "Government of Newfoundland and Labrador",
    description:
      "The Government of Newfoundland and Labrador supports applied research and innovation initiatives associated with the Hyperspectral Unit.",
    logo: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/NL_brand.svg",
    href: "https://www.gov.nl.ca/",
  },
];

const industryPartners = [
  {
    name: "Agnico Eagle Mines",
    description:
      "Agnico Eagle has participated as an industry partner in the development and application of CNA's hyperspectral imaging research.",
    logo: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/AgnicoClientLogo.png",
    href: "https://www.agnicoeagle.com/",
  },
  {
    name: "Rio Tinto",
    description:
      "Rio Tinto has been represented among the industry partners supporting hyperspectral research and its application to the minerals sector.",
    logo: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/riotinto.png",
    href: "https://www.riotinto.com/",
  },
];

const innovationPartners = [
  {
    name: "Technology Access Centre",
    shortName: "TAC",
    description:
      "The Technology Access Centre supports applied research and industry engagement through access to expertise, facilities, and technology.",
    logo: null,
    href: null,
  },
  {
    name: "Mining Innovation Commercialization Accelerator",
    shortName: "MICA",
    description:
      "MICA connects mining-sector innovation with industry, research, and commercialization opportunities.",
    logo: null,
    href: null,
  },
];

type Partner = {
  name: string;
  shortName?: string;
  description: string;
  logo: string | null;
  href: string | null;
};

function PartnerCard({
  partner,
}: {
  partner: Partner;
}) {
  const content = (
    <>
      <div className="partner-card__logo">
        {partner.logo ? (
          // Logos are served from the existing public CNA S3 bucket.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
          />
        ) : (
          <span className="partner-card__initials">
            {partner.shortName ??
              partner.name
                .split(" ")
                .map((word) => word[0])
                .slice(0, 3)
                .join("")}
          </span>
        )}
      </div>

      <div className="partner-card__content">
        <h3>{partner.name}</h3>
        <p>{partner.description}</p>

        {partner.href ? (
          <span className="partner-card__link">
            Visit website ↗
          </span>
        ) : null}
      </div>
    </>
  );

  if (partner.href) {
    return (
      <a
        className="partner-card"
        href={partner.href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <article className="partner-card">
      {content}
    </article>
  );
}

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        title="Partners & Collaborators"
        description="Collaboration brings together industry experience, research expertise, public investment, and advanced technology to support applied research and innovation."
      />

      <Section>
        <div className="content-grid">
          <div>
            <p className="eyebrow">
              Collaboration
            </p>

            <h2>
              Advancing applied research together
            </h2>
          </div>

          <div>
            <p>
              CNA&apos;s Hyperspectral Unit works
              with government, industry, research,
              and innovation partners to advance
              hyperspectral imaging, develop new
              applications, and support technology
              adoption across the minerals sector
              and beyond.
            </p>
          </div>
        </div>
      </Section>

      <Section className="section--surface">
        <div className="partner-section-heading">
          <p className="eyebrow">
            Funding & Program Support
          </p>

          <h2>
            Supporting research and innovation
          </h2>

          <p>
            Public-sector investment has helped
            develop the HSU&apos;s research
            capabilities, infrastructure, and
            industry-focused services.
          </p>
        </div>

        <div className="partner-grid">
          {fundingPartners.map((partner) => (
            <PartnerCard
              key={partner.name}
              partner={partner}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="partner-section-heading">
          <p className="eyebrow">
            Industry Collaboration
          </p>

          <h2>
            Connecting research with industry
          </h2>

          <p>
            Industry collaboration helps connect
            HSU research and analytical
            capabilities with real-world
            exploration, processing, and
            technology challenges.
          </p>
        </div>

        <div className="partner-grid">
          {industryPartners.map((partner) => (
            <PartnerCard
              key={partner.name}
              partner={partner}
            />
          ))}
        </div>
      </Section>

      <Section className="section--surface">
        <div className="partner-section-heading">
          <p className="eyebrow">
            Innovation Network
          </p>

          <h2>
            Building connections for innovation
          </h2>
        </div>

        <div className="partner-grid">
          {innovationPartners.map((partner) => (
            <PartnerCard
              key={partner.name}
              partner={partner}
            />
          ))}
        </div>
      </Section>

      <CallToAction
        title="Interested in collaborating with the HSU?"
        description="Talk to our team about applied research, industry projects, technology development, or opportunities to explore new applications of hyperspectral imaging."
        href="/contact"
        linkLabel="Start a conversation"
      />
    </>
  );
}