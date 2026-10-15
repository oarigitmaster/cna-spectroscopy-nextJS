// src/app/layout.tsx

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Carme } from "next/font/google";
import { Montserrat } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const carme = Carme({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-carme",
});

export const metadata: Metadata = {
  title: {
    default: "CNA Hyperspectral Scanning Unit",
    template: "%s | CNA Hyperspectral Scanning Unit",
  },
  description:
    "Hyperspectral imaging, mineral analysis, drillcore resources, and related research services.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <div className="site-shell">
          <Header />

          <main id="main-content">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
