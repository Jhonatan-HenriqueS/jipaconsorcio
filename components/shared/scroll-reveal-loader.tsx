"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ScrollReveal = dynamic(
  () => import("@/components/shared/scroll-reveal").then((module) => module.ScrollReveal),
  { ssr: false },
);

export function ScrollRevealLoader() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setActive(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return active ? <ScrollReveal /> : null;
}
