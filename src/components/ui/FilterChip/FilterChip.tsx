"use client";

import styles from "./FilterChip.module.css";

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function FilterChip({
  label,
  selected,
  onClick,
  disabled = false,
  className = "",
}: FilterChipProps) {
  const chipClassName = [styles.chip, selected ? styles.selected : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={chipClassName}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
