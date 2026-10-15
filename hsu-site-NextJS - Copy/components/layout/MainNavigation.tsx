"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation";

export function MainNavigation() {
  const pathname = usePathname();

  function isActive(href?: string) {
    if (!href) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function isSectionActive(item: (typeof mainNavigation)[number]): boolean {
    if (isActive(item.href)) {
      return true;
    }

    return item.children?.some((child) => isActive(child.href)) ?? false;
  }

  return (
    <nav className="main-navigation" aria-label="Main navigation">
      <ul className="main-navigation__list">
        {mainNavigation.map((item) => {
          const sectionActive = isSectionActive(item);
          const hasChildren = Boolean(item.children?.length);

          return (
            <li
              className={`main-navigation__item ${
                hasChildren ? "main-navigation__item--has-children" : ""
              }`}
              key={item.label}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className={`main-navigation__link ${
                    sectionActive ? "main-navigation__link--active" : ""
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span>{item.label}</span>

                  {hasChildren && (
                    <svg
                      className="main-navigation__chevron"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      width="16"
                      height="16"
                    >
                      <path
                        d="m5 7.5 5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                      />
                    </svg>
                  )}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`main-navigation__link main-navigation__button ${
                    sectionActive ? "main-navigation__link--active" : ""
                  }`}
                  aria-haspopup="true"
                >
                  <span>{item.label}</span>

                  {hasChildren && (
                    <svg
                      className="main-navigation__chevron"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      width="16"
                      height="16"
                    >
                      <path
                        d="m5 7.5 5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                      />
                    </svg>
                  )}
                </button>
              )}

              {hasChildren && (
                <div className="main-navigation__dropdown">
                  <ul className="main-navigation__dropdown-list">
                    {item.children?.map((child) => {
                      if (!child.href) {
                        return null;
                      }

                      const childActive = isActive(child.href);

                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`main-navigation__dropdown-link ${
                              childActive ? "main-navigation__dropdown-link--active" : ""
                            }`}
                            aria-current={childActive ? "page" : undefined}
                          >
                            <span className="main-navigation__dropdown-label">
                              {child.label}
                            </span>

                            <span
                              className="main-navigation__dropdown-arrow"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
