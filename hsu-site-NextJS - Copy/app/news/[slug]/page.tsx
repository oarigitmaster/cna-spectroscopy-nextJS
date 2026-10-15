import { notFound } from "next/navigation";

import { newsItems } from "@/app/data/news";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = newsItems.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHeader title={item.title} description={item.summary} />
      <Section>
        <p className="eyebrow">{item.category}</p>
        <p><strong>Published:</strong> {item.date}</p>
        {item.eventDate ? <p><strong>Event date:</strong> {item.eventDate}</p> : null}
        {item.location ? <p><strong>Location:</strong> {item.location}</p> : null}
        {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </Section>
    </>
  );
}
