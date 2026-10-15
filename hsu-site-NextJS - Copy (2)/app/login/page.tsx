import Link from "next/link";

import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

import styles from "./login.module.css";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/portal");
  }

  return (
    <main className={styles.page}>
      <section className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <Link href="/" className={styles.brandLink}>
            <span className={styles.brandMark}>HSU</span>

            <span>
              <strong>CNA Hyperspectral Scanning Unit</strong>
              <small>Secure Client Data Portal</small>
            </span>
          </Link>

          <div className={styles.introduction}>
            <p className={styles.eyebrow}>Protected data access</p>

            <h1>
              Secure access to your hyperspectral project resources.
            </h1>

            <p className={styles.introductionText}>
              Authorized clients and research partners can access approved
              datasets, analytical reports, project deliverables, and related
              technical resources.
            </p>
          </div>

          <div className={styles.featureList}>
            <article className={styles.feature}>
              <span className={styles.featureIcon}>01</span>

              <div>
                <h2>Privileged datasets</h2>
                <p>
                  Access project-specific hyperspectral imagery, processed
                  outputs, calibration files, and supporting data.
                </p>
              </div>
            </article>

            <article className={styles.feature}>
              <span className={styles.featureIcon}>02</span>

              <div>
                <h2>Secure authentication</h2>
                <p>
                  Account access is managed through the CNA authentication
                  service and AWS Cognito.
                </p>
              </div>
            </article>

            <article className={styles.feature}>
              <span className={styles.featureIcon}>03</span>

              <div>
                <h2>Controlled permissions</h2>
                <p>
                  Each account receives access only to approved projects and
                  authorized resources.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.brandFooter}>
          <span>College of the North Atlantic</span>
          <span>Hyperspectral Scanning Unit</span>
        </div>
      </section>

      <section className={styles.loginPanel}>
        <div className={styles.loginContainer}>
          <div className={styles.mobileBrand}>
            <span className={styles.brandMark}>HSU</span>

            <div>
              <strong>CNA Hyperspectral Scanning Unit</strong>
              <small>Secure Client Data Portal</small>
            </div>
          </div>

          <div className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <span className={styles.securityBadge}>
                <span className={styles.securityDot} />
                Secure sign in
              </span>

              <h2>Client Portal</h2>

              <p>
                Sign in with your authorized Cognito account to access your
                organization&apos;s project resources.
              </p>
            </div>

            <form
              action={async () => {
                "use server";

                await signIn("cognito", {
                  redirectTo: "/portal",
                });
              }}
            >
              <button type="submit" className={styles.signInButton}>
                <span>Sign in with Cognito</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className={styles.divider}>
              <span />
              <p>Authorized users only</p>
              <span />
            </div>

            <div className={styles.helpBox}>
              <h3>Having trouble signing in?</h3>

              <p>
                Use the password-recovery option on the Cognito sign-in page or
                contact the HSU team if your account requires assistance.
              </p>

              <Link href="/contact" className={styles.helpLink}>
                Contact support
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <p className={styles.privacyNotice}>
              By continuing, you acknowledge that access is restricted to
              authorized users and may be monitored for security purposes.
            </p>
          </div>

          <Link href="/" className={styles.returnLink}>
            <span aria-hidden="true">←</span>
            Return to the HSU website
          </Link>
        </div>
      </section>
    </main>
  );
}