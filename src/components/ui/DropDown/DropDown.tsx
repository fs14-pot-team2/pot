"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DropDown.module.css";

interface DropDownOption {
  value: string;
  label: string;
}

interface BaseDropDownProps {
  placeholder: string;
  options: DropDownOption[];
  menuColumns?: 1 | 2;
  disabled?: boolean;
  className?: string;
}

interface SingleDropDownProps extends BaseDropDownProps {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
}

interface MultipleDropDownProps extends BaseDropDownProps {
  multiple: true;
  value: string[];
  exclusiveValue?: string;
  maxSelections?: number;
  onChange: (value: string[]) => void;
}

type DropDownProps = SingleDropDownProps | MultipleDropDownProps;

export default function DropDown(props: DropDownProps) {
  const { placeholder, options, menuColumns = 1, disabled = false, className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("pointerdown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((wasOpen) => !wasOpen);
  };

  const handleSelect = (selectedValue: string) => {
    if (props.multiple) {
      const { value, exclusiveValue, maxSelections } = props;

      if (selectedValue === exclusiveValue) {
        const nextValue = value.includes(selectedValue) ? [] : [selectedValue];

        props.onChange(nextValue);
        return;
      }

      const currentValue = exclusiveValue ? value.filter((item) => item !== exclusiveValue) : value;

      const isSelected = currentValue.includes(selectedValue);

      if (!isSelected && maxSelections !== undefined && currentValue.length >= maxSelections) {
        return;
      }

      const nextValue = isSelected
        ? currentValue.filter((item) => item !== selectedValue)
        : [...currentValue, selectedValue];

      props.onChange(nextValue);
      return;
    }

    props.onChange(selectedValue);
    setIsOpen(false);
  };

  const getDisplayLabel = () => {
    if (props.multiple) {
      if (props.value.length === 0) return placeholder;
      if (props.value.length > 1) return `${placeholder} (${props.value.length})`;

      return options.find((option) => option.value === props.value[0])?.label || placeholder;
    }
    return options.find((option) => option.value === props.value)?.label || placeholder;
  };

  return (
    <div ref={containerRef} className={`${styles.container} ${className || ""}`}>
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
        <ul className={`${styles.menu} ${menuColumns === 2 ? styles.twoColumns : ""}`}>
          {options.map((option) => {
            const isSelected = props.multiple
              ? props.value.includes(option.value)
              : props.value === option.value;

            const isSelectionLimitReached =
              props.multiple &&
              props.maxSelections !== undefined &&
              props.value.filter((value) => value !== props.exclusiveValue).length >=
                props.maxSelections;

            const isOptionDisabled =
              isSelectionLimitReached && !isSelected && option.value !== props.exclusiveValue;

            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={`${styles.option} ${isSelected ? styles.selected : ""}`}
                  disabled={isOptionDisabled}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
