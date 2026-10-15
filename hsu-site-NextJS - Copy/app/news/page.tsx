import Link from "next/link";

import { newsItems } from "@/app/data/news";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export default function NewsPage() {
  const sortedItems = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="News & Upcoming Events"
        description="Updates, announcements, demonstrations, workshops, and upcoming HSU events."
      />
      <Section>
        {sortedItems.length ? (
          <div className="news-grid">
            {sortedItems.map((item) => (
              <article className="news-card" key={item.slug}>
                <p className="eyebrow">{item.category}</p>
                <h2>{item.title}</h2>
                <p className="news-card__date">{item.date}</p>
                <p>{item.summary}</p>
                <Link className="text-link" href={`/news/${item.slug}`}>
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="eyebrow">Updates</p>
            <h2>No published announcements yet</h2>
            <p>
              Approved news and event entries can be added in the site content data and
              will appear here automatically.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
