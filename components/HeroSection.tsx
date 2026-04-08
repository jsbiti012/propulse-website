"use client";

import { motion, useMotionValue, useTransform, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import homeData from "@/content/pages/home.json";
const hero = homeData.hero;


function WordLine({
  words,
  baseDelay,
  gradient,
}: {
  words: string[];
  baseDelay: number;
  gradient?: boolean;
}) {
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: baseDelay + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={gradient ? "gradient-text" : ""}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </>
  );
}

function BrowserMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw mouse-position motion values (−1 → +1 relative to element center)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smooth the raw values
  const springConfig = { stiffness: 180, damping: 28, mass: 0.8 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Window tilt (±14°)
  const rotateY = useTransform(smoothX, [-1, 1], [14, -14]);
  const rotateX = useTransform(smoothY, [-1, 1], [-12, 12]);

  // Parallax offsets for inner layers (each layer moves a different amount)
  const innerNavX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const innerNavY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const innerHeroX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const innerHeroY = useTransform(smoothY, [-1, 1], [-7, 7]);
  const innerCardsX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const innerCardsY = useTransform(smoothY, [-1, 1], [-11, 11]);

  // Floating idle animation values
  const floatY = useMotionValue(0);
  useEffect(() => {
    const controls = animate(floatY, [0, -12, 0], {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [floatY]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set(((e.clientX - left) / width - 0.5) * 2);
    rawY.set(((e.clientY - top) / height - 0.5) * 2);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-[480px] mx-auto"
      initial={{ opacity: 0, x: 50, y: 30, rotateY: 20 }}
      animate={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
      transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      {/* ── Breathing glow orb behind the window ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: "-40px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(67,97,238,0.55) 0%, rgba(123,92,245,0.35) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── The floating 3D window ── */}
      <motion.div
        style={{ y: floatY, rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            background: "rgba(13,15,30,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.13)",
            boxShadow:
              "0 50px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(67,97,238,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* ── Animated light-sweep reflection ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.07) 48%, rgba(255,255,255,0.13) 52%, transparent 70%)",
              borderRadius: "inherit",
            }}
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
          />

          {/* ── Browser chrome (glassmorphism) ── */}
          <motion.div
            className="flex items-center gap-3 px-4 py-3 relative z-10"
            style={{
              background: "rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              x: innerNavX,
              y: innerNavY,
            }}
          >
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28CA41" }} />
            </div>
            <div
              className="flex-1 py-1.5 px-3 rounded-md text-xs"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {hero.browserMockupUrl}
            </div>
          </motion.div>

          {/* ── Mock website content ── */}
          <div style={{ background: "#ffffff" }} className="p-5 overflow-hidden">

            {/* Mock nav — layer 1 */}
            <motion.div
              className="flex items-center justify-between mb-5 pb-4"
              style={{
                borderBottom: "1px solid #f1f5f9",
                x: innerNavX,
                y: innerNavY,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg" style={{ background: "#4361EE" }} />
                <div className="w-16 h-3 rounded" style={{ background: "#1e293b" }} />
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block w-10 h-2.5 rounded" style={{ background: "#cbd5e1" }} />
                <div className="hidden sm:block w-10 h-2.5 rounded" style={{ background: "#cbd5e1" }} />
                <div className="w-16 h-7 rounded-lg" style={{ background: "#4361EE" }} />
              </div>
            </motion.div>

            {/* Mock hero text — layer 2 (more movement) */}
            <motion.div
              className="mb-5"
              style={{ x: innerHeroX, y: innerHeroY }}
            >
              <div className="w-4/5 h-5 rounded mb-2" style={{ background: "#1e293b" }} />
              <div className="w-3/5 h-5 rounded mb-4" style={{ background: "#1e293b" }} />
              <div className="w-full h-2.5 rounded mb-1.5" style={{ background: "#e2e8f0" }} />
              <div className="w-3/4 h-2.5 rounded mb-5" style={{ background: "#e2e8f0" }} />
              <div className="w-28 h-8 rounded-xl" style={{ background: "#4361EE" }} />
            </motion.div>

            {/* Mock feature cards — layer 3 (most movement, deepest z) */}
            <motion.div
              className="grid grid-cols-3 gap-2.5"
              style={{ x: innerCardsX, y: innerCardsY }}
            >
              {[
                { accent: "#EEF0FF", dot: "#4361EE" },
                { accent: "#F0E0FF", dot: "#7B5CF5" },
                { accent: "#E0F2FE", dot: "#0284C7" },
              ].map(({ accent, dot }, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3"
                  style={{ background: "#f8fafc", border: "1px solid #e8edf3" }}
                >
                  <div
                    className="w-7 h-7 rounded-lg mb-2.5 flex items-center justify-center"
                    style={{ background: accent }}
                  >
                    <div className="w-3 h-3 rounded-sm" style={{ background: dot }} />
                  </div>
                  <div className="w-full h-2.5 rounded mb-1.5" style={{ background: "#e2e8f0" }} />
                  <div className="w-3/4 h-2 rounded" style={{ background: "#e2e8f0" }} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-[92vh] flex items-center"
      style={{ background: "#080A17" }}
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 65% -10%, rgba(67,97,238,0.22) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 5% 85%, rgba(123,92,245,0.1) 0%, transparent 55%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-28 relative w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: text content ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 px-4 py-2 rounded-full"
              style={{
                background: "rgba(67,97,238,0.14)",
                color: "#7B9BFF",
                border: "1px solid rgba(67,97,238,0.28)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {hero.badge}
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <h1
              className="text-5xl md:text-6xl xl:text-[4.5rem] font-extrabold tracking-tight leading-[1.05] mb-6"
              style={{ color: "#ffffff" }}
            >
              {[
                { words: hero.headlineLine1.split(" "), gradient: false },
                { words: hero.headlineLine2.split(" "), gradient: true },
                { words: hero.headlineLine3.split(" "), gradient: false },
              ].map(({ words, gradient }, i) => (
                <span key={i} className="block">
                  <WordLine
                    words={words}
                    baseDelay={0.15 + i * 0.2}
                    gradient={gradient}
                  />
                  {gradient && "\u00A0"}
                </span>
              ))}
            </h1>

            {/* Sub copy */}
            <motion.p
              className="text-lg leading-relaxed max-w-xl font-medium mb-8"
              style={{ color: "rgba(255,255,255,0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {hero.subCopyMain}{" "}
              <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
                {hero.subCopyHighlight}
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-bold rounded-2xl transition-all hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  boxShadow: "0 8px 32px rgba(67,97,238,0.45)",
                }}
              >
                {hero.primaryCtaLabel} <ArrowRight size={17} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold rounded-2xl border transition-all hover:bg-white/5 w-full sm:w-auto"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  borderColor: "rgba(255,255,255,0.14)",
                }}
              >
                {hero.secondaryCtaLabel}
              </Link>
            </motion.div>

            {/* Stat pill */}
            <motion.div
              className="inline-flex flex-col items-center gap-1 mt-8 px-6 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <p
                className="text-2xl font-extrabold tracking-tight"
                style={{ color: "#ffffff" }}
              >
                5 à 7 jours
              </p>
              <p
                className="text-xs font-semibold"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Délai de livraison moyen
              </p>
            </motion.div>
          </div>

          {/* ── Right: browser mockup ── */}
          <div className="hidden lg:flex items-center justify-center">
            <BrowserMockup />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
          {hero.scrollLabel}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.25)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
