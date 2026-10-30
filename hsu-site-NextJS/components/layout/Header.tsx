import Link from "next/link";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-brand">
          <a
            href="https://www.cna.nl.ca/"
            className="site-brand__logo-link"
            aria-label="Visit the College of the North Atlantic website"
          >
            <img
              className="site-brand__logo"
              src="https://www.cna.nl.ca/Research-And-Innovation/images/CNALogoDescriptor-Cyan.svg"
              alt="College of the North Atlantic"
            />
          </a>

          <Link
            href="/"
            className="site-brand__text"
            aria-label="Hyperspectral Scanning Unit home"
          >
            <span className="site-brand__name">
              Hyperspectral Scanning Unit
            </span>
          </Link>
        </div>

        <div className="site-header__desktop">
          <MainNavigation />

          <Link href="/contact" className="header-contact-button">
            Contact
          </Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
