"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const revealStart = "top 88%";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

type RoutePoint = {
  x: number;
  y: number;
};

type RouteNode = RoutePoint & {
  radius: number;
};

function formatCoordinate(value: number) {
  return Number(value.toFixed(2));
}

function buildRoundedSegment(from: RoutePoint, to: RoutePoint) {
  const horizontalDistance = to.x - from.x;
  const verticalDistance = to.y - from.y;

  if (Math.abs(horizontalDistance) < 1) {
    return `L ${formatCoordinate(to.x)} ${formatCoordinate(to.y)}`;
  }

  const direction = Math.sign(horizontalDistance);
  const middleY = from.y + verticalDistance / 2;
  const radius = Math.min(
    40,
    Math.abs(horizontalDistance) * 0.45,
    Math.abs(verticalDistance) * 0.22,
  );

  return [
    `L ${formatCoordinate(from.x)} ${formatCoordinate(middleY - radius)}`,
    `C ${formatCoordinate(from.x)} ${formatCoordinate(middleY - radius * 0.448)},`,
    `${formatCoordinate(from.x + direction * radius * 0.448)} ${formatCoordinate(middleY)},`,
    `${formatCoordinate(from.x + direction * radius)} ${formatCoordinate(middleY)}`,
    `L ${formatCoordinate(to.x - direction * radius)} ${formatCoordinate(middleY)}`,
    `C ${formatCoordinate(to.x - direction * radius * 0.448)} ${formatCoordinate(middleY)},`,
    `${formatCoordinate(to.x)} ${formatCoordinate(middleY + radius * 0.448)},`,
    `${formatCoordinate(to.x)} ${formatCoordinate(middleY + radius)}`,
    `L ${formatCoordinate(to.x)} ${formatCoordinate(to.y)}`,
  ].join(" ");
}

function buildNodeBypass(node: RouteNode, direction: 1 | -1) {
  const { radius, x, y } = node;
  const control = radius * 0.552;

  return [
    `C ${formatCoordinate(x + direction * control)} ${formatCoordinate(y - radius)},`,
    `${formatCoordinate(x + direction * radius)} ${formatCoordinate(y - control)},`,
    `${formatCoordinate(x + direction * radius)} ${formatCoordinate(y)}`,
    `C ${formatCoordinate(x + direction * radius)} ${formatCoordinate(y + control)},`,
    `${formatCoordinate(x + direction * control)} ${formatCoordinate(y + radius)},`,
    `${formatCoordinate(x)} ${formatCoordinate(y + radius)}`,
  ].join(" ");
}

function buildProcessRoute(nodes: RouteNode[], width: number) {
  const [first, second, third] = nodes;

  if (!first || !second || !third) return "";

  const firstExit: RoutePoint = {
    x: first.x,
    y: first.y + first.radius,
  };
  const secondEntry: RoutePoint = {
    x: second.x,
    y: second.y - second.radius,
  };
  const secondExit: RoutePoint = {
    x: second.x,
    y: second.y + second.radius,
  };
  const thirdEntry: RoutePoint = {
    x: third.x,
    y: third.y - third.radius,
  };
  const bypassDirection: 1 | -1 = width < 680 ? -1 : 1;

  return [
    `M ${formatCoordinate(firstExit.x)} ${formatCoordinate(firstExit.y)}`,
    buildRoundedSegment(firstExit, secondEntry),
    buildNodeBypass(second, bypassDirection),
    buildRoundedSegment(secondExit, thirdEntry),
  ].join(" ");
}

function getElementCenterWithin(element: HTMLElement, root: HTMLElement) {
  let x = element.offsetWidth / 2;
  let y = element.offsetHeight / 2;
  let current: HTMLElement | null = element;

  while (current && current !== root) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  if (current === root) return { x, y };

  const elementBounds = element.getBoundingClientRect();
  const rootBounds = root.getBoundingClientRect();

  return {
    x: elementBounds.left - rootBounds.left + elementBounds.width / 2,
    y: elementBounds.top - rootBounds.top + elementBounds.height / 2,
  };
}

function setupProcessJourney() {
  const root = document.querySelector<HTMLElement>("[data-process-journey]");
  const list = root?.querySelector<HTMLOListElement>(".process-list");
  const route = root?.querySelector<SVGSVGElement>(".process-route");
  const basePath = root?.querySelector<SVGPathElement>(
    "[data-process-route-base]",
  );
  const progressPath = root?.querySelector<SVGPathElement>(
    "[data-process-route-progress]",
  );
  const icons = root
    ? Array.from(root.querySelectorAll<HTMLElement>(".process-icon"))
    : [];

  if (!root || !list || !route || !basePath || !progressPath) {
    return () => undefined;
  }

  const journeyRoot = root;
  const processList = list;
  const routeSvg = route;
  const routeBasePath = basePath;
  const routeProgressPath = progressPath;
  const motionPreference = window.matchMedia(reducedMotionQuery);
  let routeTween: gsap.core.Tween | undefined;
  let animationFrame = 0;
  let disposed = false;

  function clearRouteTween() {
    routeTween?.scrollTrigger?.kill();
    routeTween?.kill();
    routeTween = undefined;
  }

  function drawRoute() {
    if (disposed || icons.length !== 3) return;

    clearRouteTween();

    const width = journeyRoot.clientWidth;
    const height = journeyRoot.clientHeight;

    if (width === 0 || height === 0) return;

    const nodes = icons.map((icon) => ({
      ...getElementCenterWithin(icon, journeyRoot),
      radius: Math.max(icon.offsetWidth, icon.offsetHeight) / 2 + 2.5,
    }));
    const pathData = buildProcessRoute(nodes, width);

    if (!pathData) return;

    routeSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    routeBasePath.setAttribute("d", pathData);
    routeProgressPath.setAttribute("d", pathData);

    const routeLength = routeProgressPath.getTotalLength();
    const reducedMotion = motionPreference.matches;

    gsap.set(routeProgressPath, {
      strokeDasharray: routeLength,
      strokeDashoffset: reducedMotion ? 0 : routeLength,
    });
    journeyRoot.dataset.routeReady = "true";

    if (reducedMotion) return;

    routeTween = gsap.to(routeProgressPath, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: journeyRoot,
        start: "top 76%",
        end: "bottom 24%",
        scrub: 0.35,
      },
    });
    routeTween.scrollTrigger?.refresh();
  }

  function scheduleRouteDraw() {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(drawRoute);
  }

  const resizeObserver =
    "ResizeObserver" in window
      ? new ResizeObserver(scheduleRouteDraw)
      : undefined;

  resizeObserver?.observe(processList);
  window.addEventListener("resize", scheduleRouteDraw, { passive: true });
  motionPreference.addEventListener("change", scheduleRouteDraw);
  void document.fonts.ready.then(scheduleRouteDraw);
  drawRoute();

  return () => {
    disposed = true;
    window.cancelAnimationFrame(animationFrame);
    resizeObserver?.disconnect();
    window.removeEventListener("resize", scheduleRouteDraw);
    motionPreference.removeEventListener("change", scheduleRouteDraw);
    clearRouteTween();
    delete journeyRoot.dataset.routeReady;
  };
}

export function ScrollReveal() {
  useGSAP(() => {
    const cleanupProcessJourney = setupProcessJourney();
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
                clearProps:
                  "opacity,visibility,transform,translate,scale,rotate,willChange",
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
                clearProps:
                  "opacity,visibility,transform,translate,scale,rotate,willChange",
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

    return () => {
      media.revert();
      cleanupProcessJourney();
    };
  }, []);

  return null;
}
