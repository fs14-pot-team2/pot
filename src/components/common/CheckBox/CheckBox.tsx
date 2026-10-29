"use client";

import styles from "./CheckBox.module.css";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

export default function CheckBox({ checked, onChange, label, className = "" }: CheckBoxProps) {
  return (
    <label className={`${styles.wrapper} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.input}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
