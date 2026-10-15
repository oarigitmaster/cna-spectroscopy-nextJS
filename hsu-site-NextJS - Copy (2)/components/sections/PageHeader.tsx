// src/components/sections/PageHeader.tsx

import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="page-header">
      <Container>
        <h1>{title}</h1>

        {description ? <p className="page-header__description">{description}</p> : null}
      </Container>
    </header>
  );
}
