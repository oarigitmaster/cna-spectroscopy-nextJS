import Link from "next/link";

import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export function MediaPage({
  title,
  backHref,
}: {
  title: string;
  backHref: string;
}) {
  return (
    <>
      <PageHeader
        title={`${title} Videos`}
        description={`Video demonstrations, project examples, and educational material related to ${title}.`}
      />
      <Section>
        <p className="eyebrow">Media library</p>
        <h2>Videos will be published here</h2>
        <p>
          This page is ready for hosted videos or embeds. Add approved media when
          the final video library and hosting source are confirmed.
        </p>
        <Link className="text-link" href={backHref}>
          ← Back to {title}
        </Link>
      </Section>
    </>
  );
}
