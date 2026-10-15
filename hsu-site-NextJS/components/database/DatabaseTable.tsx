"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { DataRow } from "@/lib/data/types";

import styles from "./database.module.css";

type DatabaseTableProps = {
  rows: DataRow[];
  columns: { key: string; label: string }[];
  link: { key: string; prefix: string };
  filterKey?: string;
  searchPlaceholder: string;
};

export default function DatabaseTable({
  rows,
  columns,
  link,
  filterKey,
  searchPlaceholder,
}: DatabaseTableProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = useMemo(
    () =>
      filterKey
        ? Array.from(
            new Set(rows.map((row) => row[filterKey]).filter(Boolean)),
          ).sort()
        : [],
    [filterKey, rows],
  );

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesFilter =
        !filterKey || filter === "All" || row[filterKey] === filter;
      const matchesQuery =
        !normalizedQuery ||
        Object.values(row).some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );
      return matchesFilter && matchesQuery;
    });
  }, [filter, filterKey, query, rows]);

  return (
    <>
      <div className={styles.controls}>
        <label>
          <span>Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
          />
        </label>
        {filterKey ? (
          <label>
            <span>{filterKey}</span>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option>All</option>
              {filters.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        ) : null}
        <p>{visibleRows.length.toLocaleString()} records</p>
      </div>

      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr key={`${row[link.key]}-${rowIndex}`}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.key === link.key ? (
                      <Link
                        href={`${link.prefix}/${encodeURIComponent(row[column.key])}`}
                      >
                        {row[column.key]}
                      </Link>
                    ) : (
                      row[column.key] || "—"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
