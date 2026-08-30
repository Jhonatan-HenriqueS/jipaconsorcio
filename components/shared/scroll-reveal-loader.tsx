"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ScrollReveal = dynamic(
  () => import("@/components/shared/scroll-reveal").then((module) => module.ScrollReveal),
  { ssr: false },
);

const activationEvents = ["scroll", "wheel", "touchmove"] as const;

export function ScrollRevealLoader() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const options = { passive: true } as const;

    function removeListeners() {
      activationEvents.forEach((eventName) =>
        window.removeEventListener(eventName, activate),
      );
    }

    function activate() {
      removeListeners();
      setActive(true);
    }

    activationEvents.forEach((eventName) =>
      window.addEventListener(eventName, activate, options),
    );

    return removeListeners;
  }, []);

  return active ? <ScrollReveal /> : null;
}
