"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/content";
import { ButtonLink } from "./Button";
import { useCheckout } from "./CheckoutProvider";
import { StarMark } from "./StarMark";

/**
 * Хедер прихований, поки сторінка вгорі: hero має читатись без перекриття.
 * Після 15px скролу зʼявляється плаваюча кнопка-бургер, у якій сховане все меню.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  // Бургер має z-[60], модалка чекауту — z-50, тож бургер накривав її хрестик.
  // Поки чекаут відкритий, ховаємо кнопку меню.
  const { isCheckoutOpen } = useCheckout();

  useEffect(() => {
    const onScroll = () => {
      const visible = window.scrollY > 15;
      setShown(visible);
      // Повернулись на самий верх — ховаємо і меню разом із кнопкою.
      if (!visible) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !isCheckoutOpen) {
      dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        dialog.close();
        document.body.style.overflow = previousOverflow;
      };
    }
    dialog.close();
  }, [open, isCheckoutOpen]);

  return (
    <>
      {/* Кнопка-бургер */}
      <AnimatePresence>
        {shown && !isCheckoutOpen && (
          <motion.button
            ref={triggerRef}
            type="button"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-haspopup="dialog"
            // Пігулка замість кола: під слово потрібен горизонтальний падінг,
            // а висота лишається 48px — та сама зона дотику, що й у іконки.
            className="menu-trigger"
          >
            <span>Меню</span>
            <span className="menu-trigger-icon" aria-hidden="true"><span /><span /></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Native modal supplies focus containment and makes the page inert. */}
      <dialog
        ref={dialogRef}
        id="site-menu"
        aria-labelledby="site-menu-title"
        className="menu-dialog"
        onCancel={() => setOpen(false)}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setOpen(false);
        }}
      >
        <div className="menu-panel-head">
          <span className="menu-brand-mark" aria-hidden="true"><StarMark /></span>
          <button type="button" className="menu-close" onClick={() => setOpen(false)}>
            <span>Закрити</span><svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>
        <nav
              aria-label="Основна навігація"
              className="menu-navigation"
            >
              <div className="menu-intro">
                <p id="site-menu-title" className="menu-brand">
                  {site.brand}
                </p>
                <p className="menu-tagline">{site.tagline}</p>
              </div>

              <ul className="menu-links">
                {nav.map((item, i) => (
                  <li
                    key={item.href}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="menu-link"
                    >
                      <span className="menu-link-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      <span>{item.label}</span>
                      <span className="menu-link-arrow" aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="menu-bottom"><p>Знайдіть свій напрям навчання</p><ButtonLink
                href="#form"
                onClick={() => setOpen(false)}
                className="menu-cta w-full"
              >
                Записатись <span aria-hidden="true">↗</span>
              </ButtonLink>
              </div>
            </nav>
      </dialog>
    </>
  );
}
