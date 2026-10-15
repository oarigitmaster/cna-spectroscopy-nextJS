"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNavigation } from "@/config/navigation";

export function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const resize = () => {
      if (desktop.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", resize);
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", close);
      desktop.removeEventListener("change", resize);
    };
  }, [isOpen]);
  function active(href?: string) {
    return Boolean(href && (pathname === href || pathname.startsWith(href + "/")));
  }
  function closeMenu() {
    setIsOpen(false);
    setExpanded(null);
  }
  return (
    <div className="mobile-navigation">
      <button
        ref={menuButton}
        type="button"
        className={"mobile-menu-button " + (isOpen ? "mobile-menu-button--open" : "")}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        className={"mobile-menu " + (isOpen ? "mobile-menu--open" : "")}
        id="mobile-menu"
        inert={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="mobile-menu__list">
            {mainNavigation.map((item, index) => {
              const hasChildren = Boolean(item.children?.length);
              const isExpanded = expanded === item.label;
              const sectionActive =
                active(item.href) || item.children?.some((child) => active(child.href));
              const submenu = "mobile-submenu-" + index;
              return (
                <li key={item.label}>
                  <div className="mobile-menu__row">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={
                          "mobile-menu__link " +
                          (sectionActive ? "mobile-menu__link--active" : "")
                        }
                        aria-current={active(item.href) ? "page" : undefined}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="mobile-menu__link mobile-menu__group"
                        aria-expanded={isExpanded}
                        aria-controls={submenu}
                        onClick={() => setExpanded(isExpanded ? null : item.label)}
                      >
                        {item.label}
                        <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                      </button>
                    )}
                    {item.href && hasChildren && (
                      <button
                        type="button"
                        className="mobile-menu__toggle"
                        aria-label={"Toggle " + item.label + " submenu"}
                        aria-expanded={isExpanded}
                        aria-controls={submenu}
                        onClick={() => setExpanded(isExpanded ? null : item.label)}
                      >
                        {isExpanded ? "−" : "+"}
                      </button>
                    )}
                  </div>
                  {hasChildren && (
                    <ul
                      className="mobile-menu__children"
                      id={submenu}
                      hidden={!isExpanded}
                    >
                      {item.children?.map((child) =>
                        child.href ? (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={active(child.href) ? "page" : undefined}
                              onClick={closeMenu}
                            >
                              {child.label}
                              <span aria-hidden="true">→</span>
                            </Link>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  )}
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
