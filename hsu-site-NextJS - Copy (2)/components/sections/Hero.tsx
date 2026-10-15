import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__background" aria-hidden="true" />

      <Container className="hero__layout">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span />
            CNA Hyperspectral Scanning Unit
          </p>

          <h1>
            Every scan tells a 
            <span> deeper story.</span>
          </h1>

          <p className="hero__description">
            Advanced hyperspectral imaging for mineral characterization,
            drillcore analysis, research, and industry.
          </p>

          <div className="hero__actions">
            <Link href="/services" className="hero__button hero__button--primary">
              Explore our services
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/contact" className="hero__button hero__button--secondary">
              Contact our team
            </Link>
          </div>
        </div>

        <div className="hero__caption">
          <div>
            <strong>Hyperspectral drillcore imaging</strong>
            <p>VNIR · SWIR · LWIR mineral mapping</p>
          </div>
        </div>
      </Container>
    </section>
  );
}