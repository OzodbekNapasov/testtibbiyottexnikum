"use client";

import { motion } from "framer-motion";
import { floatingIcons } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const positions = [
  { top: "15%", left: "10%", delay: 0 },
  { top: "25%", right: "12%", delay: 0.5 },
  { top: "60%", left: "8%", delay: 1 },
  { top: "70%", right: "15%", delay: 1.5 },
  { top: "40%", right: "5%", delay: 2 },
];

export function FloatingIcons() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {floatingIcons.map((Icon, index) => {
        const pos = positions[index];
        return (
          <motion.div
            key={index}
            className="absolute hidden md:block"
            style={{
              top: pos.top,
              left: "left" in pos ? pos.left : undefined,
              right: "right" in pos ? pos.right : undefined,
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }
            }
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut",
            }}
          >
            <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
