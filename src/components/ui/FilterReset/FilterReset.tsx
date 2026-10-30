"use client";

import Image from "next/image";
import styles from "./FilterReset.module.css";

interface FilterResetProps {
  onReset: () => void;
  disabled?: boolean;
}

export default function FilterReset({ onReset, disabled = false }: FilterResetProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onReset}
      disabled={disabled}
      aria-label="필터 초기화 버튼"
    >
      <Image src="/icons/ic_filter_reset.svg" alt="초기화" width={20} height={20} />
    </button>
  );
}
