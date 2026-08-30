"use client";

import { useEffect } from "react";

export function SimulatorAnchorNavigation() {
  useEffect(() => {
    function handleSimulatorLink(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>(
        'a[href="#simulador"]',
      );
      const simulator = document.getElementById("simulador");

      if (!link || !simulator) return;

      const simulatorIsInFirstViewport = window.matchMedia(
        "(min-width: 1200px)",
      ).matches;

      if (simulatorIsInFirstViewport) {
        const hero = document.getElementById("inicio");

        if (!hero) return;

        event.preventDefault();
        window.scrollTo({
          top: hero.offsetTop,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
        simulator
          .querySelector<HTMLElement>("select, input, button")
          ?.focus({ preventScroll: true });
        return;
      }

      const headerBottom =
        document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect()
          .bottom ?? 0;
      const simulatorBounds = simulator.getBoundingClientRect();
      const safeSpacing = 12;
      const isFullyVisible =
        simulatorBounds.top >= headerBottom + safeSpacing &&
        simulatorBounds.bottom <= window.innerHeight - safeSpacing;

      if (!isFullyVisible) return;

      event.preventDefault();
      link.closest("details[open]")?.removeAttribute("open");
      simulator
        .querySelector<HTMLElement>("select, input, button")
        ?.focus({ preventScroll: true });
    }

    document.addEventListener("click", handleSimulatorLink);

    return () => document.removeEventListener("click", handleSimulatorLink);
  }, []);

  return null;
}
