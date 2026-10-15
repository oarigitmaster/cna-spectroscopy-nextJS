import { teamMembers } from "@/app/data/teamMembers";
import TeamCard from "@/components/team/TeamCard";

import styles from "./team.module.css";

export default function TeamPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        {/* Animated background */}
        <div
          className={styles.heroAnimation}
          aria-hidden="true"
        >
          <div className={styles.glowOne} />
          <div className={styles.glowTwo} />
          <div className={styles.glowThree} />
        </div>

        {/* Team banner image */}
        <div
          className={styles.heroImage}
          aria-hidden="true"
        />

        {/* Darkening layer for text readability */}
        <div
          className={styles.heroOverlay}
          aria-hidden="true"
        />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            Our people
          </p>

          <h1>Meet the HSU team</h1>

          <p>
            Our multidisciplinary team combines expertise
            in geoscience, hyperspectral imaging,
            artificial intelligence, laboratory
            operations, project management, and industry
            innovation.
          </p>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
            />
          ))}
        </div>
      </section>
    </main>
  );
}