// src/components/ui/Section.tsx

import type { ComponentPropsWithoutRef } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  contained?: boolean;
};

export function Section({
  className = "",
  contained = true,
  children,
  ...props
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;

  return (
    <section className={`section ${className}`.trim()} {...props}>
      {content}
    </section>
  );
}
