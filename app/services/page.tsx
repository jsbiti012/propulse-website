import Link from "next/link";
import { ArrowRight, Check, Phone, Presentation, Code2, Globe } from "lucide-react";
import { FadeUp, StaggerGrid, StaggerItem, DrawRule, MaskReveal } from "@/components/Animate";
import servicesData from "@/content/pages/services.json";
import homeData from "@/content/pages/home.json";

const PROCESS_ICONS = [Phone, Presentation, Code2, Globe];

export const metadata = {
  title: servicesData.meta.title,
  description: servicesData.meta.description,
};

export default function ServicesPage() {
  const { hero, process, cta, pricingNote } = servicesData;
  const { packs } = homeData;

  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-6 pt-24 md:pt-32 pb-12 md:pb-16">
        <FadeUp>
          <span className="mono-label" style={{ color: "var(--muted)" }}>{hero.label}</span>
          <h1 className="display text-5xl md:text-7xl xl:text-8xl mt-6 max-w-4xl" style={{ color: "var(--text)" }}>
            <MaskReveal>{hero.headline} {hero.headlineGradient}</MaskReveal>
          </h1>
          <p className="mt-7 text-lg max-w-xl" style={{ color: "var(--muted)" }}>
            {hero.subCopy}
          </p>
        </FadeUp>
      </section>

      {/* ── Pricing ── */}
      <section className="mx-auto max-w-6xl px-6">
        <div>
          <DrawRule />
          <div className="pt-4 flex items-center justify-between">
            <span className="mono-label" style={{ color: "var(--text)" }}>Les formules</span>
            <span className="mono-label" style={{ color: "var(--muted)" }}>{packs.length} offres</span>
          </div>
        </div>
        <div className="py-12 md:py-20">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {packs.map((pack) => {
              const dark = pack.featured;
              const fg = dark ? "#fff" : "var(--text)";
              const muted = dark ? "rgba(255,255,255,0.55)" : "var(--muted)";
              const hairline = dark ? "rgba(255,255,255,0.14)" : "var(--border)";
              return (
                <StaggerItem key={pack.name}>
                  <div
                    className={`h-full flex flex-col p-8 relative ${dark ? "texture-v" : ""}`}
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
                    <p className="mono-label" style={{ color: muted }}>{pack.name}</p>
                    <h3 className="display text-2xl mt-4" style={{ color: fg }}>{pack.tagline}</h3>
                    <p className="text-sm leading-relaxed mt-3" style={{ color: muted }}>{pack.desc}</p>

                    {/* Price */}
                    <div className="mt-7 pt-7 border-t" style={{ borderColor: hairline }}>
                      <p className="display text-5xl" style={{ color: fg }}>
                        {pack.price}
                        <span className="text-lg font-bold ml-1" style={{ color: muted }}>DH</span>
                      </p>
                      <p className="mono-label mt-2" style={{ color: muted }}>Mise en place</p>
                      {pack.monthly && (
                        <p className="mt-4 text-sm" style={{ color: fg }}>
                          <span className="font-bold text-lg">{pack.monthly} DH</span>
                          <span style={{ color: muted }}> /mois — {pack.monthlyNote}</span>
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-3 mt-7 flex-1">
                      {pack.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm" style={{ color: fg }}>
                          <Check size={15} strokeWidth={2} className="shrink-0 mt-0.5" style={{ color: muted }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-medium uppercase tracking-widest mt-8 transition-colors"
                      style={dark ? { background: "#fff", color: "var(--dark)" } : { background: "var(--text)", color: "var(--bg)" }}
                    >
                      {pack.ctaLabel} <ArrowRight size={14} />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>

          <FadeUp>
            <p className="mono-label mt-10" style={{ color: "var(--muted)" }}>{pricingNote}</p>
          </FadeUp>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="mx-auto max-w-6xl px-6">
        <div>
          <DrawRule />
          <div className="pt-4 flex items-center justify-between">
            <span className="mono-label" style={{ color: "var(--text)" }}>{process.label}</span>
          </div>
        </div>
        <div className="py-12 md:py-20">
          <h2 className="display text-4xl md:text-6xl max-w-2xl" style={{ color: "var(--text)" }}>
            <MaskReveal>{process.headline} {process.headlineGradient}</MaskReveal>
          </h2>
          <FadeUp delay={0.15}>
            <p className="mt-5 text-base max-w-lg" style={{ color: "var(--muted)" }}>{process.subCopy}</p>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-14 bg-[var(--border)]">
            {process.steps.map(({ step, title, desc }, idx) => {
              const Icon = PROCESS_ICONS[idx];
              return (
                <StaggerItem key={step}>
                  <div className="invert-card h-full flex flex-col gap-5 p-8">
                    <div className="flex items-center justify-between">
                      <span className="display text-3xl">{step}</span>
                      <div className="w-10 h-10 flex items-center justify-center border" style={{ borderColor: "currentColor" }}>
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
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

      {/* ── CTA — black band ── */}
      <section className="texture-radial" style={{ background: "var(--dark)" }}>
        <div className="relative z-[1] mx-auto max-w-6xl px-6 py-20 md:py-28">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="display text-4xl md:text-6xl" style={{ color: "#fff" }}>
                <MaskReveal>{cta.headline}</MaskReveal>
              </h2>
              <p className="mt-5 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>{cta.subCopy}</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-transform hover:translate-x-1"
              style={{ background: "#fff", color: "var(--dark)" }}
            >
              {cta.ctaLabel} <ArrowRight size={15} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
