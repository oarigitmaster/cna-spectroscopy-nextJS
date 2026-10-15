"use client";

import {
  useEffect,
  useState,
} from "react";

import styles from "./api-access.module.css";

type ApiCodeBlockProps = {
  code: string;
  label?: string;
};

export default function ApiCodeBlock({
  code,
  label = "PowerShell",
}: ApiCodeBlockProps) {
  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(
      () => setCopied(false),
      2000,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(
        code,
      );

      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span>{label}</span>

        <button
          type="button"
          className={styles.copyButton}
          onClick={copyCode}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}