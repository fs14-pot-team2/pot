"use client";

import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "solid" | "outlined";
  size?: "sm" | "md";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "solid",
  size = "md",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  const buttonClassName = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
