"use client";

import { useState } from "react";
import Image from "next/image";

import type { TeamMember } from "@/app/data/teamMembers";
import TeamModal from "./TeamModal";

import styles from "./TeamCard.module.css";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={member.image}
            alt={`${member.name} — ${member.title}`}
            fill
            className={styles.image}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.position}>{member.title}</span>

          <h2 className={styles.name}>{member.name}</h2>

          <p className={styles.preview}>
            {member.biography[0]}
          </p>

          <button
            className={styles.button}
            onClick={() => setIsOpen(true)}
          >
            Read Biography
          </button>
        </div>
      </article>

      <TeamModal
        member={member}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}