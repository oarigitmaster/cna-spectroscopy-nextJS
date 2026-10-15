"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { TeamMember } from "@/app/data/teamMembers";

import styles from "./TeamModal.module.css";

interface TeamModalProps {
  member: TeamMember;
  open: boolean;
  onClose: () => void;
}

export default function TeamModal({
  member,
  open,
  onClose,
}: TeamModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${member.id}-modal-title`}
        aria-describedby={`${member.id}-modal-description`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={`Close ${member.name}'s biography`}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.profilePanel}>
          <div className={styles.imageWrapper}>
            <Image
              src={member.image}
              alt={`${member.name}, ${member.title}`}
              fill
              className={styles.image}
              sizes="(max-width: 760px) 100vw, 360px"
            />
          </div>

          <div className={styles.profileDetails}>
            <p className={styles.eyebrow}>HSU Team</p>

            <h2 id={`${member.id}-modal-title`}>
              {member.name}
            </h2>

            <p className={styles.position}>
              {member.title}
            </p>
          </div>
        </div>

        <div className={styles.biographyPanel}>
          <div className={styles.biographyHeader}>
            <p className={styles.eyebrow}>Profile</p>
            <h3>Biography</h3>
          </div>

          <div
            id={`${member.id}-modal-description`}
            className={styles.biography}
          >
            {member.biography.map((paragraph, index) => (
              <p key={`${member.id}-biography-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}