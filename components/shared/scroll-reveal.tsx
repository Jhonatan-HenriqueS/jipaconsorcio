"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const revealStart = "top 88%";

export function ScrollReveal() {
  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]");

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 34,
            willChange: "transform, opacity",
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            ease: "power3.out",
            onComplete: () =>
              gsap.set(element, {
                clearProps: "opacity,visibility,transform,translate,scale,rotate,willChange",
              }),
            scrollTrigger: {
              trigger: element,
              start: revealStart,
              once: true,
            },
          },
        );
      });

      groups.forEach((group) => {
        const items = Array.from(group.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement,
        );

        if (items.length === 0) return;

        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            y: 30,
            willChange: "transform, opacity",
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.76,
            stagger: 0.09,
            ease: "power3.out",
            onComplete: () =>
              gsap.set(items, {
                clearProps: "opacity,visibility,transform,translate,scale,rotate,willChange",
              }),
            scrollTrigger: {
              trigger: group,
              start: revealStart,
              once: true,
            },
          },
        );
      });
    });

    return () => media.revert();
  }, []);

  return null;
}
