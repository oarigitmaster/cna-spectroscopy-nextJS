import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  getUserProfile,
} from "@/lib/users/profiles";

import styles from "./profile.module.css";

import { updateProfile } from "./actions";

import {
  getUserActivity,
} from "@/lib/users/activity";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{
    updated?: string;
  }>;
}) {
  const params = await searchParams;
  const session = await auth();

  const userID =
    session?.user?.id;

  if (!userID) {
    redirect("/login");
  }

  const profile =
    await getUserProfile(userID);
  
  const activity =
    await getUserActivity(userID, 10);

  if (!profile) {
    return (
      <section>
        <h1>Profile</h1>

        <p>
          Your user profile could not be
          found.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.profile}>
        {params.updated === "true" && (
        <div
            className={styles.successMessage}
            role="status"
        >
            Profile updated successfully.
        </div>
        )}


        <div className={styles.profileCard}>
        <div className={styles.cardHeader}>
            <h2>Profile information</h2>

            <p>
            Information associated with your
            data portal account.
            </p>
        </div>

        <form action={updateProfile}>
            <dl className={styles.details}>
                <div className={styles.detailRow}>
                <dt>Name</dt>
                <dd>{profile.displayName}</dd>
                </div>

                <div className={styles.detailRow}>
                <dt>Email</dt>
                <dd>{profile.email}</dd>
                </div>

                <div className={styles.detailRow}>
                <dt>
                    <label htmlFor="organization">
                    Organization
                    </label>
                </dt>

                <dd>
                    <input
                    id="organization"
                    name="organization"
                    type="text"
                    maxLength={150}
                    defaultValue={
                        profile.organization ?? ""
                    }
                    placeholder="Organization"
                    className={styles.input}
                    />
                </dd>
                </div>

                <div className={styles.detailRow}>
                <dt>
                    <label htmlFor="jobTitle">
                    Job title
                    </label>
                </dt>

                <dd>
                    <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    maxLength={150}
                    defaultValue={
                        profile.jobTitle ?? ""
                    }
                    placeholder="Job title"
                    className={styles.input}
                    />
                </dd>
                </div>

                <div className={styles.detailRow}>
                <dt>Account status</dt>

                <dd>
                    <span className={styles.status}>
                    {profile.status}
                    </span>
                </dd>
                </div>
            </dl>

                <div className={styles.formActions}>
                    <button
                    type="submit"
                    className={styles.saveButton}
                    >
                    Save changes
                    </button>
                </div>
            </form>
        </div>
        <div className={styles.activityCard}>
          <div className={styles.cardHeader}>
            <h2>Recent activity</h2>

            <p>
              Your most recent portal data
              activity.
            </p>
          </div>

          {activity.length === 0 ? (
            <p className={styles.emptyActivity}>
              No activity recorded yet.
            </p>
          ) : (
            <div className={styles.activityList}>
              {activity.map((event) => (
                <div
                  key={event.eventKey}
                  className={styles.activityRow}
                >
                  <div>
                    <strong>
                      {event.action === "file.download"
                        ? "File download"
                        : event.action ===
                            "archive.download"
                          ? "ZIP download"
                          : event.action}
                    </strong>

                    {event.path && (
                      <p className={styles.activityPath}>
                        {event.path}
                      </p>
                    )}
                  </div>

                  <div className={styles.activityMeta}>
                    <span>
                      {new Date(
                        event.timestamp,
                      ).toLocaleString()}
                    </span>

                    {event.fileCount !==
                      undefined && (
                      <span>
                        {event.fileCount}{" "}
                        {event.fileCount === 1
                          ? "file"
                          : "files"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </section>
    );
}