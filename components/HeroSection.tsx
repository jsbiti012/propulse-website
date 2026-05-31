"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import homeData from "@/content/pages/home.json";

const hero = homeData.hero;

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated flowing line-paths — monochrome, on-brand backdrop (adapted, no glass/shadcn)
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ color: "var(--text)" }}>
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" aria-hidden>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.05 + path.id * 0.013}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: [0.16, 0.32, 0.16], pathOffset: [0, 1, 0] }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function HeroSection() {
  // Rotating business types — sharp vertical slide-swap
  const rotating = useMemo(
    () => ["restaurant", "boutique", "salon", "café", "commerce"],
    []
  );
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(
      () => setWordIndex((n) => (n + 1) % rotating.length),
      2200
    );
    return () => clearTimeout(id);
  }, [wordIndex, rotating]);

  return (
    <section
      className="relative flex flex-col justify-center items-center min-h-[88vh] px-6 pt-28 pb-16 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Animated flowing paths backdrop */}
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow chip */}
        <Reveal>
          <span
            className="mono-label inline-flex items-center gap-2 px-3 py-2 border"
            style={{ borderColor: "var(--line)", color: "var(--text)" }}
          >
            <span className="w-1.5 h-1.5" style={{ background: "var(--text)" }} />
            {hero.badge}
          </span>
        </Reveal>

        {/* Headline — with rotating business type */}
        <h1
          className="display mt-8 text-[2.8rem] sm:text-6xl lg:text-7xl xl:text-8xl"
          style={{ color: "var(--text)" }}
        >
          {/* Line 1: "Votre [rotating word]" on one line */}
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease }}
          >
            Votre{" "}
            {/* Rotating slot — width pinned to the longest word so the line never jitters */}
            <span
              className="relative inline-block overflow-hidden align-bottom text-left leading-[1.05]"
              aria-label="restaurant, boutique, salon, café, commerce"
            >
              <span className="invisible" aria-hidden>
                restaurant
              </span>
              {rotating.map((word, i) => (
                <motion.span
                  key={word}
                  className="absolute left-0 top-0 whitespace-nowrap"
                  initial={{ opacity: 0, y: "100%" }}
                  animate={
                    wordIndex === i
                      ? { y: "0%", opacity: 1 }
                      : { y: wordIndex > i ? "-115%" : "115%", opacity: 0 }
                  }
                  transition={{ type: "spring", stiffness: 70, damping: 14 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.span>

          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease }}
          >
            mérite un vrai site web.
          </motion.span>
        </h1>

        {/* Sub copy */}
        <Reveal delay={0.5}>
          <p
            className="mt-10 max-w-xl text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {hero.subCopyMain}{" "}
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              {hero.subCopyHighlight}
            </span>
          </p>
        </Reveal>

        {/* CTAs — rectangular, editorial */}
        <Reveal delay={0.68}>
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-medium uppercase tracking-widest border transition-colors duration-100 hover:bg-[var(--bg)] hover:text-[var(--text)]"
              style={{ background: "var(--text)", color: "var(--bg)", borderColor: "var(--text)" }}
            >
              {hero.primaryCtaLabel}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-medium uppercase tracking-widest border transition-colors duration-100 hover:bg-[var(--text)] hover:text-[var(--bg)]"
              style={{ borderColor: "var(--text)", color: "var(--text)" }}
            >
              {hero.secondaryCtaLabel}
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Bottom rule + trust micro-label */}
      <Reveal delay={0.85} className="relative z-10 w-full max-w-5xl mx-auto mt-16">
        <div className="rule pt-5 flex items-center justify-between">
          <span className="mono-label" style={{ color: "var(--muted)" }}>
            {hero.trustText}
          </span>
          <span className="mono-label hidden sm:flex items-center gap-2" style={{ color: "var(--muted)" }}>
            {hero.scrollLabel}
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={13} />
            </motion.span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
