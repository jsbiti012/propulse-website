import Link from "next/link";
import { ArrowRight, Check, Phone, Presentation, Code2, Globe } from "lucide-react";
import { FadeUp, StaggerGrid, StaggerItem, ScaleOnHover } from "@/components/Animate";
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
      {/* ── Dark hero header ── */}
      <section className="relative overflow-hidden" style={{ background: "#080A17" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(67,97,238,0.2) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 5% 85%, rgba(123,92,245,0.1) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-36 relative">
          <FadeUp className="max-w-3xl">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "#7B9BFF" }}
            >
              {hero.label}
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
              style={{ color: "#ffffff" }}
            >
              {hero.headline}{" "}
              <span className="gradient-text">{hero.headlineGradient}</span>
            </h1>
            <p
              className="text-lg leading-relaxed font-medium max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {hero.subCopy}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Packs ── */}
      <section style={{ background: "var(--dark)" }}>
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-24">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packs.map((pack) => (
              <StaggerItem key={pack.name}>
                <ScaleOnHover className="h-full">
                  <div
                    className="rounded-2xl flex flex-col h-full relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid rgba(255,255,255,0.07)`,
                      borderTop: `3px solid ${pack.accent}`,
                    }}
                  >
                    {pack.featured && (
                      <div
                        className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: pack.accent, color: "#fff" }}
                      >
                        Populaire
                      </div>
                    )}

                    <div className="p-8 flex flex-col gap-6 flex-1">
                      <div>
                        <p
                          className="text-xs font-bold uppercase tracking-widest mb-2"
                          style={{ color: pack.accent }}
                        >
                          {pack.name}
                        </p>
                        <h3
                          className="text-xl font-extrabold mb-2"
                          style={{ color: "#ffffff" }}
                        >
                          {pack.tagline}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                          {pack.desc}
                        </p>
                      </div>

                      {/* Price */}
                      <div
                        className="py-5 border-t border-b"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      >
                        <p
                          className="text-4xl font-black tracking-tight leading-none"
                          style={{ color: "#ffffff" }}
                        >
                          {pack.price}
                          <span
                            className="text-lg font-bold ml-1"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            DH
                          </span>
                          <span
                            className="text-sm font-semibold ml-1"
                            style={{ color: "rgba(255,255,255,0.35)" }}
                          >
                            /mise en place
                          </span>
                        </p>
                        {pack.monthly && (
                          <>
                            <p
                              className="mt-3 text-2xl font-bold tracking-tight"
                              style={{ color: "rgba(255,255,255,0.75)" }}
                            >
                              {pack.monthly}
                              <span
                                className="text-base font-semibold ml-1"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                              >
                                DH /mois
                              </span>
                            </p>
                            <p
                              className="mt-1 text-xs font-medium"
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                              {pack.monthlyNote}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="flex flex-col gap-3 flex-1">
                        {pack.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-sm"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: `${pack.accent}22` }}
                            >
                              <Check size={11} style={{ color: pack.accent }} />
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-xl transition-all hover:opacity-90 mt-2"
                        style={{ background: pack.accent, color: "#fff" }}
                      >
                        Démarrer ce projet <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeUp>
            <p
              className="text-center text-sm font-medium mt-10"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {pricingNote}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-28">
          <FadeUp className="mb-10 md:mb-16 text-center">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              {process.label}
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              {process.headline}{" "}
              <span className="gradient-text">{process.headlineGradient}</span>
            </h2>
            <p
              className="mt-4 text-base font-medium max-w-lg mx-auto"
              style={{ color: "var(--muted)" }}
            >
              {process.subCopy}
            </p>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.steps.map(({ step, title, desc }, idx) => {
              const Icon = PROCESS_ICONS[idx];
              return (
              <StaggerItem key={step}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col gap-4"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black tracking-tighter leading-none gradient-text">
                      {step}
                    </span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--accent-light)" }}
                    >
                      <Icon size={17} style={{ color: "var(--accent)" }} />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {desc}
                  </p>
                </div>
              </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden" style={{ background: "var(--dark)" }}>
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, #4361EE 0%, transparent 65%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-24 relative">
          <FadeUp className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
                style={{ color: "#fff" }}
              >
                {cta.headline}
              </h2>
              <p className="text-base font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                {cta.subCopy}
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2.5 px-7 py-4 text-sm font-bold rounded-2xl transition-all hover:scale-105"
              style={{
                background: "#fff",
                color: "var(--dark)",
                boxShadow: "0 8px 24px rgba(255,255,255,0.15)",
              }}
            >
              {cta.ctaLabel} <ArrowRight size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
