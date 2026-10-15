import Link from "next/link";
import styles from "./partners.module.css";
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

function PartnerCard({ partner }: { partner: Partner }) {
  const content = (
    <>
      <div className="partner-card__logo">
        {partner.logo ? (
          // Logos are served from the existing public CNA S3 bucket.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={partner.logo} alt={`${partner.name} logo`} />
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
          <span className="partner-card__link">Visit website ↗</span>
        ) : null}
      </div>
    </>
  );

  if (partner.href) {
    return (
      <a className="partner-card" href={partner.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <article className="partner-card">{content}</article>;
}

export default function PartnersPage() {
  const groups = [
    {
      id: "funding",
      label: "Funding & program support",
      title: "Investing in what comes next.",
      description:
        "Public-sector investment has helped develop the HSU’s research capabilities, infrastructure, and industry-focused services.",
      partners: fundingPartners,
    },
    {
      id: "industry",
      label: "Industry collaboration",
      title: "Research meets real-world challenges.",
      description:
        "Industry collaboration connects analytical capabilities with exploration, processing, and technology challenges.",
      partners: industryPartners,
    },
    {
      id: "innovation",
      label: "Innovation network",
      title: "Ideas move further together.",
      description:
        "Connecting expertise, facilities, and technology to explore new applications and support technology adoption.",
      partners: innovationPartners,
    },
  ];
  return (
    <div className={styles.page}>
      <header className={"page-header " + styles.hero}>
        <div className={"container " + styles.heroGrid}>
          <div>
            <h1>
              Partners &amp; <span>Collaborators</span>
            </h1>
            <p className="page-header__description">
              Bringing research expertise, industry experience, and public investment
              together to advance applied innovation.
            </p>
            <Link href="/contact" className={styles.action}>
              Build something with us <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className={styles.logoWall} aria-label="Featured partners">
            {[...fundingPartners, ...industryPartners].map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className={styles.logoTile}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={partner.logo} alt={partner.name} />
              </a>
            ))}
          </div>
        </div>
      </header>
      <nav className={styles.jumpNav} aria-label="Partnership categories">
        <div className="container">
          {groups.map((group) => (
            <a href={"#" + group.id} key={group.id}>
              {group.label}
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </div>
      </nav>
      <Section>
        <div className="content-grid">
          <h2>Advancing applied research together</h2>
          <p>
            CNA&apos;s Hyperspectral Unit works with government, industry, research, and
            innovation partners to advance hyperspectral imaging, develop new
            applications, and support technology adoption across the minerals sector and
            beyond.
          </p>
        </div>
      </Section>
      {groups.map((group, index) => (
        <Section
          key={group.id}
          id={group.id}
          className={styles.partnerSection + (index === 2 ? " " + styles.innovation : "")}
        >
          <div className={styles.groupLayout}>
            <div className={styles.groupHeading}>
              <p className="eyebrow">{group.label}</p>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </div>
            <div className={"partner-grid " + styles.cards}>
              {group.partners.map((partner) => (
                <PartnerCard key={partner.name} partner={partner} />
              ))}
            </div>
          </div>
        </Section>
      ))}
      <CallToAction
        eyebrow=""
        title="Let’s explore what we can achieve together."
        description="Talk to our team about applied research, industry projects, technology development, or new applications of hyperspectral imaging."
        href="/contact"
        linkLabel="Start a conversation"
        secondaryHref="/services"
        secondaryLabel="Explore our capabilities"
      />
    </div>
  );
}
