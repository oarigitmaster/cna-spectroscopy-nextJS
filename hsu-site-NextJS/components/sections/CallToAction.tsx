import Link from "next/link";

type CallToActionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CallToAction({
  eyebrow = "Work with us",
  title,
  description,
  href,
  linkLabel,
  secondaryHref,
  secondaryLabel,
}: CallToActionProps) {
  return (
    <section className="cta">
      <div className="cta__inner">
        <div className="cta__content">
          {eyebrow ? <p className="cta__eyebrow">{eyebrow}</p> : null}

          <h2>{title}</h2>

          <p className="cta__description">{description}</p>
        </div>

        <div className="cta__actions">
          <Link href={href} className="cta__primary">
            {linkLabel}
            <span aria-hidden="true">→</span>
          </Link>

          {secondaryHref && secondaryLabel ? (
            <Link href={secondaryHref} className="cta__secondary">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
