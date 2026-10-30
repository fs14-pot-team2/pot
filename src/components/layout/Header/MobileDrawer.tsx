"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./MobileDrawer.module.css";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  menuItems: { label: string; href: string }[];
};

export default function MobileDrawer({
  isOpen,
  onClose,
  isLoggedIn,
  menuItems,
}: MobileDrawerProps) {
  const pathname = usePathname();

  const drawerRef = useRef<HTMLElement>(null);

  const dragStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const isDraggingRef = useRef(false);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const start = dragStartRef.current;

    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (!isDraggingRef.current) {
      if (deltaX < 10 || deltaX <= Math.abs(deltaY)) return;

      isDraggingRef.current = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    setDragX(Math.min(Math.max(0, deltaX), event.currentTarget.clientWidth));
  };

  const handlePointerEnd = (event: PointerEvent<HTMLElement>, cancelled = false) => {
    const start = dragStartRef.current;

    if (!start || start.pointerId !== event.pointerId) return;

    const shouldClose = !cancelled && isDraggingRef.current && event.clientX - start.x >= 80;

    dragStartRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);
    setDragX(0);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (shouldClose) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocused = document.activeElement;
    const drawer = drawerRef.current;

    const focusableElements = drawer?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href]",
    );

    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    document.body.style.overflow = "hidden";
    firstElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (
        previousFocused instanceof HTMLElement &&
        previousFocused.isConnected &&
        previousFocused.getClientRects().length > 0
      ) {
        previousFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <button type="button" className={styles.backdrop} aria-label="메뉴 닫기" onClick={onClose} />

      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`${styles.drawer} ${isDragging ? styles.dragging : ""}`}
        aria-label="모바일 메뉴"
        style={isDragging ? { transform: `translateX(${dragX}px)` } : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={(event) => handlePointerEnd(event, true)}
      >
        <div className={styles.drawerHeader}>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="메뉴 닫기"
            onClick={onClose}
          >
            <Image src="/icons/ic_close.svg" alt="" width={24} height={24} />
          </button>
        </div>

        <nav className={styles.nav} aria-label="모바일 주요 메뉴">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                onClick={onClose}
                aria-current={pathname === "/login" ? "page" : undefined}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                onClick={onClose}
                aria-current={pathname === "/signup" ? "page" : undefined}
              >
                회원가입
              </Link>
            </>
          )}
        </nav>
      </aside>
    </div>
  );
}
