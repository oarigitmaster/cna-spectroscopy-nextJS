import Link from "next/link";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-brand"
          aria-label="CNA Hyperspectral Scanning Unit home"
        >
          <img
            className="site-brand__logo"
            src="https://www.cna.nl.ca/Research-And-Innovation/images/CNALogoDescriptor-Cyan.svg"
            alt="College of the North Atlantic"
          />

          <span className="site-brand__text">
            <span className="site-brand__name">
              Hyperspectral Scanning Unit
            </span>
          </span>
        </Link>

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