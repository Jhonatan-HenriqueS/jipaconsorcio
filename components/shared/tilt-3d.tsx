"use client";

import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  identifier: string;
  maxTilt?: number;
  perspective?: number;
};

export function Tilt3D({
  children,
  className,
  identifier,
  maxTilt = 15,
  perspective = 1200,
}: Tilt3DProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const surface = surfaceRef.current;

    if (!surface) return;

    gsap.set(surface, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transformOrigin: "center center",
      force3D: true,
    });

    return () => {
      gsap.killTweensOf(surface);
    };
  }, []);

  function handleMouseEnter() {
    const surface = surfaceRef.current;

    if (!surface || reduceMotion) return;

    gsap.to(surface, {
      scale: 0.985,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  }

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    const surface = surfaceRef.current;

    if (!surface || reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const distanceFromCenter = Math.min(
      1,
      Math.hypot(normalizedX, normalizedY) / Math.SQRT2,
    );
    const scale = gsap.utils.interpolate(0.985, 0.955, distanceFromCenter);

    gsap.to(surface, {
      rotateX: -normalizedY * maxTilt,
      rotateY: normalizedX * maxTilt,
      scale,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  }

  function restoreSurface() {
    const surface = surfaceRef.current;

    if (!surface) return;

    gsap.killTweensOf(surface);
    gsap.to(surface, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: reduceMotion ? 0 : 0.6,
      ease: "elastic.out(1, 0.5)",
      overwrite: true,
      force3D: true,
    });
  }

  return (
    <motion.div
      className={className}
      data-tilt-card={identifier}
      initial={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={restoreSurface}
      onMouseMove={handleMouseMove}
      style={{ perspective: `${perspective}px` }}
    >
      <div
        ref={surfaceRef}
        data-tilt-surface
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          willChange: reduceMotion ? "auto" : "transform",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
