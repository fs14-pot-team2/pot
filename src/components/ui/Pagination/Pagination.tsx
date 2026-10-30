"use client";

import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PAGES_PER_GROUP = 5;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 0) return null;

  const currentGroup = Math.floor((currentPage - 1) / PAGES_PER_GROUP);

  const groupStartPage = currentGroup * PAGES_PER_GROUP + 1;

  const groupEndPage = Math.min(groupStartPage + PAGES_PER_GROUP - 1, totalPages);

  const pageNumbers = Array.from(
    { length: groupEndPage - groupStartPage + 1 },
    (_, index) => groupStartPage + index,
  );

  const hasPreviousGroup = groupStartPage > 1;
  const hasNextGroup = groupEndPage < totalPages;

  const handlePreviousGroup = () => {
    onPageChange(groupStartPage - PAGES_PER_GROUP);
  };

  const handleNextGroup = () => {
    onPageChange(groupStartPage + PAGES_PER_GROUP);
  };

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="페이지 이동">
      <button
        type="button"
        className={`${styles.arrow} ${styles.previous}`}
        onClick={handlePreviousGroup}
        disabled={!hasPreviousGroup}
        aria-label="이전 페이지 묶음"
      />

      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.page} ${page === currentPage ? styles.current : ""}`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={handleNextGroup}
        disabled={!hasNextGroup}
        aria-label="다음 페이지 묶음"
      />
    </nav>
  );
}
