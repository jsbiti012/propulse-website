import Link from "next/link";
import { ArrowRight, Clock, Layers, Star, Phone, Code2, Globe, Zap, Shield, Users, CheckCircle } from "lucide-react";
import {
  FadeUp,
  StaggerGrid,
  StaggerItem,
  CounterUp,
} from "@/components/Animate";
import HeroSection from "@/components/HeroSection";
import homeData from "@/content/pages/home.json";

const { stats: statsData, homeSteps: stepsData, whyUs: whyUsData, packs, homeCta } = homeData;

// Icons stay in code — zipped with JSON data at render time
const STAT_ICONS = [Clock, Layers, Star];
const STEP_ICONS = [Phone, Code2, Globe];
const WHY_US_ICONS = [Zap, Shield, Users, CheckCircle];

function SectionLabel({ label, index }: { label: string; index?: string }) {
  return (
    <div className="rule pt-4 flex items-center justify-between">
      <span className="mono-label" style={{ color: "var(--text)" }}>
        {label}
      </span>
      {index && (
        <span className="mono-label" style={{ color: "var(--muted)" }}>
          {index}
        </span>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Stats — full-bleed black band ── */}
      <section className="texture-v" style={{ background: "var(--dark)" }}>
        <div className="relative z-[1] mx-auto max-w-6xl px-6">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3">
            {statsData.map(({ value, label }, idx) => {
              const Icon = STAT_ICONS[idx];
              return (
                <StaggerItem key={value}>
                  <div
                    className="px-2 sm:px-8 py-12 sm:py-16 flex flex-col gap-4 border-t sm:border-t-0 sm:border-l first:border-t-0 first:sm:border-l-0"
                    style={{ borderColor: "rgba(255,255,255,0.14)" }}
                  >
                    <Icon size={18} style={{ color: "rgba(255,255,255,0.6)" }} />
                    <p className="display text-5xl md:text-6xl" style={{ color: "#fff" }}>
                      <CounterUp value={value} />
                    </p>
                    <p className="mono-label" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {label}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <SectionLabel label="Le processus" index="01 / 03" />
        </FadeUp>
        <div className="py-12 md:py-20">
          <FadeUp>
            <h2 className="display text-4xl md:text-6xl max-w-2xl" style={{ color: "var(--text)" }}>
              Comment ça marche
            </h2>
            <p className="mt-5 text-base max-w-lg" style={{ color: "var(--muted)" }}>
              De la prise de contact à la mise en ligne, on vous accompagne à chaque étape.
            </p>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-px mt-14 bg-[var(--border)]">
            {stepsData.map(({ num, title, desc }, idx) => {
              const Icon = STEP_ICONS[idx];
              return (
                <StaggerItem key={num}>
                  <div className="invert-card h-full flex flex-col gap-5 p-8">
                    <div className="flex items-center justify-between">
                      <span className="display text-3xl">{num}</span>
                      <div
                        className="w-10 h-10 flex items-center justify-center border"
                        style={{ borderColor: "currentColor" }}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed dim">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Why us — feature grid ── */}
      <section className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <SectionLabel label="Pourquoi Propulse" index="02 / 03" />
        </FadeUp>
        <div className="py-12 md:py-20">
          <FadeUp>
            <h2 className="display text-4xl md:text-6xl max-w-3xl" style={{ color: "var(--text)" }}>
              Un partenaire local qui comprend vos besoins.
            </h2>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-14 bg-[var(--border)]">
            {whyUsData.map(({ title, desc }, idx) => {
              const Icon = WHY_US_ICONS[idx];
              const n = String(idx + 1).padStart(2, "0");
              return (
                <StaggerItem key={title}>
                  <div className="invert-card h-full flex flex-col gap-5 p-8">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 flex items-center justify-center border"
                        style={{ borderColor: "currentColor" }}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <span className="mono-label dim">{n}</span>
                    </div>
                    <h3 className="text-base font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed dim">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Packs — editorial pricing ── */}
      <section className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <SectionLabel label="Nos formules" index="03 / 03" />
        </FadeUp>
        <div className="py-12 md:py-20">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <h2 className="display text-4xl md:text-6xl max-w-2xl" style={{ color: "var(--text)" }}>
              Une formule pour chaque besoin.
            </h2>
            <Link
              href="/services"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold shrink-0"
              style={{ color: "var(--text)" }}
            >
              Voir le détail <ArrowRight size={15} />
            </Link>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {packs.map((pack) => {
              const dark = pack.featured;
              const fg = dark ? "#fff" : "var(--text)";
              const muted = dark ? "rgba(255,255,255,0.55)" : "var(--muted)";
              return (
                <StaggerItem key={pack.name}>
                  <div
                    className="h-full flex flex-col p-8 relative"
                    style={{ background: dark ? "var(--dark)" : "var(--bg)" }}
                  >
                    {pack.featured && (
                      <span
                        className="mono-label absolute top-8 right-8 px-2 py-1 border"
                        style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
                      >
                        Populaire
                      </span>
                    )}
                    <p className="mono-label" style={{ color: muted }}>
                      {pack.name}
                    </p>
                    <h3 className="display text-2xl mt-4" style={{ color: fg }}>
                      {pack.tagline}
                    </h3>
                    <p className="text-sm leading-relaxed mt-3" style={{ color: muted }}>
                      {pack.desc}
                    </p>

                    <ul className="flex flex-col gap-3 mt-8 flex-1">
                      {pack.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm pt-3 border-t"
                          style={{ color: fg, borderColor: dark ? "rgba(255,255,255,0.12)" : "var(--border)" }}
                        >
                          <ArrowRight size={14} className="shrink-0 mt-1" style={{ color: muted }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold mt-8 transition-colors"
                      style={
                        dark
                          ? { background: "#fff", color: "var(--dark)" }
                          : { background: "var(--text)", color: "var(--bg)" }
                      }
                    >
                      Démarrer ce projet <ArrowRight size={15} />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ── CTA — full-bleed black band ── */}
      <section className="texture-radial" style={{ background: "var(--dark)" }}>
        <div className="relative z-[1] mx-auto max-w-6xl px-6 py-20 md:py-28">
          <FadeUp className="max-w-4xl">
            <h2
              className="display text-4xl md:text-6xl lg:text-7xl"
              style={{ color: "#fff" }}
            >
              {homeCta.headline}
            </h2>
            <p className="mt-6 text-lg max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              {homeCta.subCopy}
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold mt-10 transition-transform hover:translate-x-1"
              style={{ background: "#fff", color: "var(--dark)" }}
            >
              {homeCta.ctaLabel}
              <ArrowRight size={17} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
