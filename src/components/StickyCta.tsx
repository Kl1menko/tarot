"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { formatStreamDate, site } from "@/data/content";
import { useCheckout } from "./CheckoutProvider";

/**
 * Липка панель дії — тільки на мобільному.
 *
 * На телефоні єдина кнопка запису зникає разом із hero, і далі вісім екранів
 * контенту людина гортає без жодного CTA. Панель тримає дію на очах і заразом
 * показує дефіцит, який досі жив лише в абзаці тексту секції курсів.
 *
 * З 541px не рендериться: там кнопки секцій лишаються в полі зору, а смуга
 * внизу лише з'їдала б екран.
 */
export function StickyCta() {
  const [shown, setShown] = useState(false);
  const { isCheckoutOpen } = useCheckout();

  useEffect(() => {
    // З'являється після hero — приблизно на висоті першого екрана. Ховається
    // біля самої форми: там своя кнопка, і дублювати її смугою нема сенсу.
    const onScroll = () => {
      const form = document.getElementById("form");
      const formReached = form
        ? form.getBoundingClientRect().top < window.innerHeight
        : false;
      setShown(window.scrollY > window.innerHeight * 0.9 && !formReached);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {shown && !isCheckoutOpen && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          // z-40 — під модалкою чекауту (z-50) і під бургером (z-60).
          // pb з safe-area: на iPhone смуга інакше лягає під домашній індикатор.
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-header/95 px-4 pt-3 backdrop-blur-md sm:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink">
                Старт {formatStreamDate()}
              </p>
              <p className="truncate text-xs text-muted">
                залишилось {site.seatsLeft} місць
              </p>
            </div>
            <a
              href="#form"
              className="btn-pearl shrink-0 rounded-pill px-6 py-3 text-sm font-semibold text-bg"
            >
              Записатись
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
