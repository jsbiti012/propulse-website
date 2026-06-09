"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

// One flowing path. The composition's full extent is near-square, so the
// portrait variant is just the landscape one transposed (x/y swapped) into a
// tall canvas — same fan, authored to sweep top-to-bottom on a phone.
function buildPath(i: number, position: number, portrait: boolean) {
  const s = i * 5 * position;
  const o = i * 6;
  return portrait
    ? `M-${189 + o} -${380 - s}C-${189 + o} -${380 - s} ${216 - o} -${312 - s} ${343 - o} ${152 - s}C${470 - o} ${616 - s} ${875 - o} ${684 - s} ${875 - o} ${684 - s}`
    : `M-${380 - s} -${189 + o}C-${380 - s} -${189 + o} -${312 - s} ${216 - o} ${152 - s} ${343 - o}C${616 - s} ${470 - o} ${684 - s} ${875 - o} ${684 - s} ${875 - o}`;
}

// Animated flowing line-paths — monochrome, on-brand backdrop (adapted, no glass/shadcn)
function FloatingPaths({ position, portrait }: { position: number; portrait: boolean }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: buildPath(i, position, portrait),
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ color: "var(--text)" }}>
      <svg
        className="w-full h-full"
        viewBox={portrait ? "0 0 316 696" : "0 0 696 316"}
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.05 + path.id * 0.013}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.42, 0.2], pathOffset: [0, 1, 0] }}
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
    () => ["entreprise", "restaurant", "boutique", "salon", "agence", "commerce"],
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

  // Portrait phones get a tall-canvas path set so the line-fan sweeps
  // corner-to-corner instead of zooming into the centre of the landscape one.
  // Defaults to landscape for SSR; swaps after mount (backdrop fades in, so the
  // switch is invisible).
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setPortrait(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cursor-reactive parallax: the two path layers drift with the pointer (opposite
  // directions → depth). Springs smooth it; no pointer (touch) leaves it static.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.4 });
  const l1x = useTransform(sx, (v) => v * 28);
  const l1y = useTransform(sy, (v) => v * 28);
  const l2x = useTransform(sx, (v) => v * -18);
  const l2y = useTransform(sy, (v) => v * -18);

  function handlePointer(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function resetPointer() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      onMouseMove={handlePointer}
      onMouseLeave={resetPointer}
      className="relative flex flex-col justify-center items-center min-h-[88vh] px-6 pt-28 pb-16 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Animated flowing paths backdrop — ambient drift always on (so touch
          devices feel alive), with cursor parallax layered on top for desktop */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="absolute inset-0" style={{ x: l1x, y: l1y }}>
            <FloatingPaths position={1} portrait={portrait} />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ x: [0, -22, 0], y: [0, 14, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="absolute inset-0" style={{ x: l2x, y: l2y }}>
            <FloatingPaths position={-1} portrait={portrait} />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Headline — with rotating business type */}
        <h1
          className="display text-[clamp(2.125rem,10vw,3rem)] sm:text-6xl lg:text-7xl xl:text-8xl"
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
            {/* Rotating slot — inline-grid stacks every word in one cell, so the
                slot auto-sizes to the widest word and the line never jitters or clips */}
            <span
              className="relative inline-grid overflow-hidden align-bottom text-left leading-[1.05]"
              aria-label="entreprise, restaurant, boutique, salon, agence, commerce"
            >
              {rotating.map((word, i) => (
                <motion.span
                  key={word}
                  className="[grid-area:1/1] whitespace-nowrap"
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
            mérite un vrai site
            <br />
            web
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
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-medium uppercase tracking-widest border transition-colors duration-100"
              style={{ borderColor: "var(--text)", color: "var(--text)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--text)"; (e.currentTarget as HTMLElement).style.color = "var(--bg)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
            >
              {hero.secondaryCtaLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
