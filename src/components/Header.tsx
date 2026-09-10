"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/content";
import { ButtonLink } from "./Button";
import { useCheckout } from "./CheckoutProvider";

/**
 * Хедер прихований, поки сторінка вгорі: hero має читатись без перекриття.
 * Після 15px скролу зʼявляється плаваюча кнопка-бургер, у якій сховане все меню.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Кнопка-бургер */}
      <AnimatePresence>
        {shown && !isCheckoutOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            className="fixed right-4 top-4 z-[60] flex size-12 items-center justify-center rounded-full bg-header/95 text-ink shadow-lg shadow-ink/10 backdrop-blur-md ring-1 ring-ink/10 sm:right-6 sm:top-6"
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Панель меню */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[55] bg-onyx/40 backdrop-blur-sm"
            />

            <motion.nav
              aria-label="Основна навігація"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[58] flex h-full w-[min(340px,88vw)] flex-col bg-header px-7 pb-8 pt-24 shadow-2xl"
            >
              <div className="border-b border-ink/10 pb-6">
                <p className="font-display text-2xl font-bold leading-none">
                  {site.brand}
                </p>
                <p className="mt-2 text-sm text-muted">{site.tagline}</p>
              </div>

              <ul className="mt-2 flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3.5 text-base text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <ButtonLink
                href="#form"
                onClick={() => setOpen(false)}
                className="mt-auto w-full"
              >
                Записатись
              </ButtonLink>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
