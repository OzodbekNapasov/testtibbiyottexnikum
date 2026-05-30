"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MouseGlowProps = {
  className?: string;
};

export function MouseGlow({ className }: MouseGlowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl transition-transform duration-100 ease-out"
        style={{
          left: position.x,
          top: position.y,
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
