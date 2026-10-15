import type { NavigationItem } from "@/types/navigation";

export const mainNavigation: NavigationItem[] = [
  {
    label: "About",
    children: [
      {
        label: "Our Team",
        href: "/team",
      },
      {
        label: "Partners",
        href: "/partners",
      },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Mineral Database", href: "/mindatabase" },
      { label: "Drillcore Database", href: "/coredatabase" },
    ],
  },
  {
    label: "Equipment & Services",
    href: "/services",
    children: [
      { label: "Hyperspectral Imaging", href: "/services/hyperspectral-imaging" },
      { label: "LIBS", href: "/services/libs" },
      {
        label: "Geotek Core Logging",
        href: "/services/geotek",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    children: [
      { label: "Pricing & Rates", href: "/pricing" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  { label: "FAQ", href: "/faq" },
];
