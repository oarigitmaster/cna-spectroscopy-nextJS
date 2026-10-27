import Link from "next/link";

const partners = [
  {
    name: "Atlantic Canada Opportunities Agency",
    logo: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/ACOA.png",
  },
  {
    name: "Government of Newfoundland and Labrador",
    logo: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/NL_brand.svg",
  },
  {
    name: "Agnico Eagle Mines",
    logo: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/AgnicoClientLogo.png",
  },
  {
    name: "Rio Tinto",
    logo: "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/riotinto.png",
  },
];

export function PartnersStrip() {
  return (
    <section className="partners-strip home-paper-section home-paper-section--unified">
      <div className="partners-strip__inner">
        <div className="partners-strip__heading">
          <h2>Research and Industry Partners</h2>

          <p>
            The HSU works with government, industry, and research partners to support
            applied research, technology development, and new applications of
            hyperspectral imaging.
          </p>
        </div>

        <div className="partners-strip__logos">
          {partners.map((partner) => (
            <div className="partners-strip__logo" key={partner.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.logo} alt={`${partner.name} logo`} />
            </div>
          ))}
        </div>

        <Link href="/partners" className="partners-strip__link">
          View all partners →
        </Link>
      </div>
    </section>
  );
}
