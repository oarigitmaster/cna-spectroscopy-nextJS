import Link from "next/link";

import styles from "./request-analysis.module.css";

const FORM_URL =
  "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/HSU-Request-for-Analysis-Form.pdf";

export default function RequestAnalysisPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          Hyperspectral Unit
        </p>

        <h1>Request an Analysis</h1>

        <p>
          To request hyperspectral scanning or analytical services,
          complete the official HSU Request for Analysis Form.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.instructions}>
          <p className={styles.eyebrow}>
            Project inquiry
          </p>

          <h2>How to submit a request</h2>

          <ol>
            <li>
              Download the official Request for Analysis Form.
            </li>

            <li>
              Complete the requested contact, project, and sample
              information.
            </li>

            <li>
              Return the completed form to the HSU team using the
              submission instructions provided on the form.
            </li>
          </ol>

          <p>
            The form helps our team understand your samples,
            scanning requirements, and project objectives before
            discussing the appropriate analytical approach.
          </p>
        </div>

        <div className={styles.formCard}>
          <p className={styles.eyebrow}>
            Official form
          </p>

          <h2>HSU Request for Analysis Form</h2>

          <p>
            Download the current College of the North Atlantic
            Hyperspectral Unit request form.
          </p>

          <a
            href={FORM_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.primaryButton}
          >
            Open Request for Analysis Form →
          </a>

          <a
            href={FORM_URL}
            download
            className={styles.secondaryButton}
          >
            Download PDF
          </a>
        </div>
      </section>

      <section className={styles.help}>
        <div>
          <p className={styles.eyebrow}>
            Questions?
          </p>

          <h2>Not sure what information to provide?</h2>

          <p>
            Contact the HSU team before submitting your request if
            you have questions about sample requirements or
            available analytical services.
          </p>
        </div>

        <Link
          href="/contact"
          className={styles.contactButton}
        >
          Contact the HSU
        </Link>
      </section>
    </main>
  );
}