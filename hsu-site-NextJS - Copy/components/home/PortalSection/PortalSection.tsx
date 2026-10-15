import Link from "next/link";
import styles from "./PortalSection.module.css";

export default function PortalSection() {
  return (
    <section className={styles.portalSection}>
      <div className={styles.content}>
        <h2>Partner Portal</h2>

        <p>
          Existing clients and research partners can securely access project
          deliverables, hyperspectral datasets, reports, and other shared
          resources through our secure Partner Portal.
        </p>

        <Link href="/login" className={styles.button}>
          Access Partner Portal
        </Link>
      </div>
    </section>
  );
}