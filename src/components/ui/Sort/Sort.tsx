"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Sort.module.css";

interface SortOption {
  label: string;
  value: string;
}

interface SortProps {
  options: SortOption[];
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export default function Sort({
  options,
  value,
  placeholder = "정렬",
  disabled = false,
  onChange,
}: SortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((wasOpen) => !wasOpen);
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const getDisplayLabel = () => {
    const selectedOption = options.find((option) => option.value === value);

    return selectedOption?.label ?? placeholder;
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
        disabled={disabled}
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        {getDisplayLabel()}
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`${styles.option} ${option.value === value ? styles.selected : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
