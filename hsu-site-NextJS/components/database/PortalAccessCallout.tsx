import Link from "next/link";

import styles from "./database.module.css";

export default function PortalAccessCallout() {
  return (
    <section className={styles.portalCallout} aria-labelledby="drillcore-portal-heading">
      <div>
        <h2 id="drillcore-portal-heading">Explore the full drillcore datasets</h2>
        <p>
          These public records are a preview. Clients can sign in to access
          complete datasets and project files shared with their organization.
        </p>
      </div>
      <Link href="/login" className={styles.portalCalloutLink}>
        Open Client Portal <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
