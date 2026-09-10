"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CourseId } from "@/data/types";
import { trackEvent } from "@/lib/analytics";
import { CheckoutModal } from "./CheckoutModal";

interface CheckoutContextValue {
  openCheckout: (courseId: CourseId, source: string) => void;
  /** Чи відкрита модалка. Хедер ховає бургер, поки вона на екрані. */
  isCheckoutOpen: boolean;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout має викликатись усередині CheckoutProvider");
  return ctx;
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [courseId, setCourseId] = useState<CourseId | null>(null);

  const openCheckout = useCallback((id: CourseId, source: string) => {
    trackEvent("checkout_start", { course: id, source });
    setCourseId(id);
  }, []);

  const value = useMemo(
    () => ({ openCheckout, isCheckoutOpen: courseId !== null }),
    [openCheckout, courseId],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
      <CheckoutModal courseId={courseId} onClose={() => setCourseId(null)} />
    </CheckoutContext.Provider>
  );
}
