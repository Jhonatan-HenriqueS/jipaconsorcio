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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const activationFrame = window.requestAnimationFrame(() =>
        setActive(true),
      );

      return () => window.cancelAnimationFrame(activationFrame);
    }

    const options = { passive: true } as const;
    let observer: IntersectionObserver | undefined;

    function removeListeners() {
      activationEvents.forEach((eventName) =>
        window.removeEventListener(eventName, activate),
      );
      observer?.disconnect();
    }

    function activate() {
      removeListeners();
      setActive(true);
    }

    activationEvents.forEach((eventName) =>
      window.addEventListener(eventName, activate, options),
    );

    const processJourney = document.querySelector("[data-process-journey]");

    if (processJourney && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) activate();
        },
        { rootMargin: "320px 0px" },
      );
      observer.observe(processJourney);
    }

    return removeListeners;
  }, []);

  return active ? <ScrollReveal /> : null;
}
