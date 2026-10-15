import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";
import styles from "./portal.module.css";

import {
  ensureUserProfile,
} from "@/lib/users/profiles";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();

    const userID =
      session?.user?.id;

    const email =
      session?.user?.email;

    const name =
      session?.user?.name;

    if (!userID || !email) {
      redirect("/login");
    }

    const displayName =
      name ?? email.split("@")[0];

    await ensureUserProfile({
      userID,
      email,
      displayName,
    });

  return (
    <main className={styles.portal}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>
            HSU
          </div>

          <div>
            <p className={styles.brandName}>
              CNA Hyperspectral Scanning Unit
            </p>

            <p className={styles.brandSubtitle}>
              Secure Client Data Portal
            </p>
          </div>
        </div>

        <div className={styles.accountArea}>
          <div className={styles.accountText}>
            <span>{displayName}</span>
            <small>{email}</small>
          </div>

          <form
            action={async () => {
              "use server";

              await signOut({
                redirectTo: "/",
              });
            }}
          >
            <button
              className={styles.signOutButton}
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav aria-label="Client portal navigation">
            <p className={styles.navLabel}>
              Workspace
            </p>

            <Link
              href="/portal"
              className={styles.navItem}
            >
              <span
                className={styles.navIcon}
                aria-hidden="true"
              >
                ⌂
              </span>

              Overview
            </Link>

            <Link
              href="/portal/profile"
              className={styles.navItem}
            >
              <span className={styles.navIcon}>
                ♙
              </span>

              <span>Profile</span>
            </Link>

            <Link
              href="/portal/datasets"
              className={styles.navItem}
            >
              <span
                className={styles.navIcon}
                aria-hidden="true"
              >
                ▤
              </span>

              Datasets
            </Link>

            <p className={styles.navLabel}>
              Account
            </p>

            <Link
              href="/portal/api-access"
              className={styles.navItem}
            >
              <span
                className={styles.navIcon}
                aria-hidden="true"
              >
                {"</>"}
              </span>

              API Access
            </Link>

            <Link
              href="/contact"
              className={styles.navItem}
            >
              <span
                className={styles.navIcon}
                aria-hidden="true"
              >
                ?
              </span>

              Support
            </Link>
          </nav>

          <div className={styles.securityCard}>
            <span
              className={styles.securityIcon}
              aria-hidden="true"
            >
              ✓
            </span>

            <div>
              <strong>Secure access</strong>

              <p>
                Your account has authenticated
                access to approved resources.
              </p>
            </div>
          </div>
        </aside>

        <div className={styles.portalPage}>
          {children}
        </div>
      </div>
    </main>
  );
}