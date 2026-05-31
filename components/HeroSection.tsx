"use client";

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

export default function HeroSection() {
  const lines = [hero.headlineLine1, hero.headlineLine2, hero.headlineLine3];

  return (
    <section
      className="relative flex flex-col justify-center items-center min-h-[88vh] px-6 pt-28 pb-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center">
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

        {/* Headline */}
        <h1 className="display mt-8 text-[2.8rem] sm:text-6xl lg:text-7xl xl:text-8xl">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12 + i * 0.12, ease }}
              style={{ color: "var(--text)" }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Decorative divider */}
        <Reveal delay={0.5} className="flex items-center gap-3 mt-10">
          <span className="block w-16 h-px" style={{ background: "var(--line)" }} />
          <span className="block w-1.5 h-1.5" style={{ border: "1px solid var(--line)" }} />
          <span className="block w-16 h-px" style={{ background: "var(--line)" }} />
        </Reveal>

        {/* Sub copy */}
        <Reveal delay={0.58}>
          <p
            className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed"
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
      <Reveal delay={0.85} className="w-full max-w-5xl mx-auto mt-16">
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
