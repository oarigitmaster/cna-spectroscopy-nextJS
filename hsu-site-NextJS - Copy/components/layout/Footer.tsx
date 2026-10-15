import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            HSU
          </Link>

          <p className="footer-tagline">
            Applied research, advanced analytical services,
            and geoscience data resources.
          </p>

          <p className="footer-affiliation">
            College of the North Atlantic
          </p>
        </div>

        {/* About */}
        <div className="footer-column">
          <h2>About</h2>

          <nav aria-label="Footer about navigation">
            <Link href="/about">About Us</Link>
            <Link href="/about/what-we-do">What We Do</Link>
            <Link href="/team">Our Team</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/news">News & Events</Link>
          </nav>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h2>Resources</h2>

          <nav aria-label="Footer resources navigation">
            <Link href="/mindatabase">
              Minerals Database
            </Link>

            <Link href="/coredatabase">
              Drillcore Database
            </Link>

            <Link href="/portal/datasets">
              CAIR Data Library
            </Link>

            <Link href="/faq">FAQ</Link>
          </nav>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h2>Services</h2>

          <nav aria-label="Footer services navigation">
            <Link href="/services/hyperspectral-imaging">
              Hyperspectral Imaging
            </Link>

            <Link href="/services/libs">
              LIBS
            </Link>

            <Link href="/services/3d-modelling">
              3D Modelling
            </Link>

            <Link href="/services/gri-simulations">
              GRi Simulations
            </Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h2>Connect</h2>

          <nav aria-label="Footer contact navigation">
            <Link href="/contact">Contact Us</Link>
            <Link href="/pricing">Pricing & Rates</Link>
            <Link href="/testimonials">Testimonials</Link>
          </nav>

          <p className="footer-location">
            Newfoundland and Labrador, Canada
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} College of the North Atlantic.
          All rights reserved.
        </p>

        <div className="footer-bottom-links">
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}