"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNavigation } from "@/config/navigation";

export function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="mobile-navigation">
      <button
        type="button"
        className={`mobile-menu-button ${isOpen ? "mobile-menu-button--open" : ""}`}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
        id="mobile-menu"
      >
        <nav aria-label="Mobile navigation">
          <ul className="mobile-menu__list">
            {mainNavigation.map((item) => {
              if (!item.href) {
                return null;
              }

              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`mobile-menu__link ${
                      active ? "mobile-menu__link--active" : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/contact" className="mobile-menu__contact" onClick={closeMenu}>
            Contact our team
          </Link>
        </nav>
      </div>
    </div>
  );
}
