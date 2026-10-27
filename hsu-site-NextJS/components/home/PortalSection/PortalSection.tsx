import Link from "next/link";
import styles from "./PortalSection.module.css";

export default function PortalSection() {
  return (
    <section className={styles.portalSection} aria-labelledby="client-portal-heading">
      <div className={styles.content}>
        <h2 id="client-portal-heading">Client Portal</h2>

        <p className={styles.description}>
          Your project data is ready when you are. Sign in to explore the full
          datasets, imagery, reports, and deliverables shared with your organization.
        </p>

        <ul className={styles.details} aria-label="Portal features">
          <li>Complete datasets</li>
          <li>Secure access</li>
          <li>API-powered downloads</li>
        </ul>

        <Link href="/login" className={styles.button}>
          <span>Open Client Portal</span>
          <span className={styles.buttonIcon} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
