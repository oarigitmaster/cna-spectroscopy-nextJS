// src/components/cards/ServiceCard.tsx

import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
};

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <article className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={href}>Learn more</Link>
    </article>
  );
}
