"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNavigation } from "@/config/navigation";

export function MainNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  function isActive(href?: string) {
    return Boolean(href && (pathname === href || pathname.startsWith(href + "/")));
  }
  return (
    <nav className="main-navigation" aria-label="Main navigation">
      <ul className="main-navigation__list">
        {mainNavigation.map((item, index) => {
          const hasChildren = Boolean(item.children?.length);
          const expanded = open === item.label;
          const active =
            isActive(item.href) || item.children?.some((child) => isActive(child.href));
          const dropdownId = "desktop-submenu-" + index;
          const chevron = (
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
          );
          return (
            <li
              key={item.label}
              className={
                "main-navigation__item " +
                (hasChildren ? "main-navigation__item--has-children" : "")
              }
              data-open={expanded}
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOpen(null);
                  event.currentTarget.querySelector<HTMLElement>("a, button")?.focus();
                }
                if (event.key === "ArrowDown" && hasChildren) {
                  event.preventDefault();
                  setOpen(item.label);
                  const listItem = event.currentTarget;
                  requestAnimationFrame(() =>
                    listItem
                      .querySelector<HTMLElement>(".main-navigation__dropdown-link")
                      ?.focus(),
                  );
                }
              }}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className={
                    "main-navigation__link " +
                    (active ? "main-navigation__link--active" : "")
                  }
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onFocus={() => setOpen(item.label)}
                  onClick={() => setOpen(null)}
                >
                  <span>{item.label}</span>
                  {hasChildren && chevron}
                </Link>
              ) : (
                <button
                  type="button"
                  className={
                    "main-navigation__link main-navigation__button " +
                    (active ? "main-navigation__link--active" : "")
                  }
                  aria-expanded={expanded}
                  aria-controls={dropdownId}
                  onClick={() => setOpen(item.label)}
                >
                  <span>{item.label}</span>
                  {hasChildren && chevron}
                </button>
              )}
              {hasChildren && (
                <div
                  className="main-navigation__dropdown"
                  id={dropdownId}
                  hidden={!expanded}
                >
                  <ul className="main-navigation__dropdown-list">
                    {item.children?.map((child) =>
                      child.href ? (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={
                              "main-navigation__dropdown-link " +
                              (isActive(child.href)
                                ? "main-navigation__dropdown-link--active"
                                : "")
                            }
                            aria-current={isActive(child.href) ? "page" : undefined}
                            onClick={() => setOpen(null)}
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
                      ) : null,
                    )}
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
