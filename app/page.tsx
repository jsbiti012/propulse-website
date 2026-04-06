import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FadeUp,
  StaggerGrid,
  StaggerItem,
  ScaleOnHover,
  CounterUp,
} from "@/components/Animate";
import HeroSection from "@/components/HeroSection";
import { stats, homeSteps, whyUs, packs, homeCta } from "@/content.config";

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Stats band ── */}
      <section style={{ background: "var(--dark)" }}>
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map(({ value, label, icon: Icon }) => (
              <StaggerItem key={value}>
                <div
                  className="flex flex-col items-center text-center gap-4 rounded-2xl px-5 py-7 sm:px-8 sm:py-9 backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Glowing icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(67,97,238,0.15)",
                      boxShadow: "0 0 18px rgba(67,97,238,0.25)",
                    }}
                  >
                    <Icon size={22} style={{ color: "#7B9BFF" }} />
                  </div>
                  {/* Number */}
                  <p className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text">
                    <CounterUp value={value} />
                  </p>
                  {/* Label */}
                  <p className="text-sm font-medium leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>

      </section>

      {/* ── Comment ça marche ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-28">
        <FadeUp className="mb-10 md:mb-16 text-center">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            Le processus
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Comment{" "}
            <span className="gradient-text">ça marche</span>
          </h2>
          <p
            className="mt-4 text-base font-medium max-w-lg mx-auto"
            style={{ color: "var(--muted)" }}
          >
            De la prise de contact à la mise en ligne, on vous accompagne à chaque étape.
          </p>
        </FadeUp>

        <div className="relative">
          {/* Desktop connecting line — gradient */}
          <div
            className="hidden md:block absolute h-px"
            style={{
              top: 22,
              left: "calc(100% / 6)",
              right: "calc(100% / 6)",
              background:
                "linear-gradient(90deg, transparent, rgba(67,97,238,0.35) 20%, rgba(123,92,245,0.35) 80%, transparent)",
            }}
          />

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {homeSteps.map(({ num, icon: Icon, title, desc }) => (
              <StaggerItem key={num}>
                <div className="flex md:flex-col items-start md:items-center gap-5 md:gap-5 md:text-center">
                  {/* Circle with pulse ring */}
                  <div className="relative shrink-0 flex items-center justify-center" style={{ width: 44, height: 44 }}>
                    {/* Pulse ring */}
                    <div
                      className="absolute rounded-full animate-pulse-ring"
                      style={{
                        width: 44,
                        height: 44,
                        background: "rgba(67,97,238,0.25)",
                      }}
                    />
                    {/* Circle */}
                    <div
                      className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-sm"
                      style={{
                        background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
                        color: "#fff",
                        boxShadow: "0 4px 14px rgba(67,97,238,0.4), 0 0 0 3px var(--bg), 0 0 0 4.5px rgba(67,97,238,0.2)",
                      }}
                    >
                      {num}
                    </div>
                  </div>

                  <div>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center mb-3 md:mx-auto"
                      style={{ background: "linear-gradient(135deg, var(--accent-light) 0%, rgba(123,92,245,0.1) 100%)" }}
                    >
                      <Icon size={16} style={{ color: "var(--accent)" }} />
                    </div>
                    <h3
                      className="text-base font-bold mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Why us ── */}
      <section style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-28">
          <FadeUp className="mb-10 md:mb-16 text-center">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Pourquoi Propulse
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Un partenaire local qui{" "}
              <span className="gradient-text">comprend</span> vos besoins.
            </h2>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div
                  className="rounded-2xl p-7 flex flex-col gap-4 h-full cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-light) 0%, rgba(123,92,245,0.1) 100%)",
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3
                    className="text-sm font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Our packs ── */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-28">
          <FadeUp className="mb-10 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  Nos formules
                </p>
                <h2
                  className="text-4xl md:text-5xl font-extrabold tracking-tight"
                  style={{ color: "var(--text)" }}
                >
                  Une formule pour{" "}
                  <span className="gradient-text">chaque besoin.</span>
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold shrink-0 transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                Voir le détail <ArrowRight size={15} />
              </Link>
            </div>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packs.map((pack) => (
              <StaggerItem key={pack.name}>
                <ScaleOnHover className="h-full">
                  <div
                    className="rounded-2xl flex flex-col h-full relative overflow-hidden"
                    style={{
                      background: "var(--dark)",
                      borderTop: `3px solid ${pack.accent}`,
                    }}
                  >
                    {pack.featured && (
                      <div
                        className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          background: pack.accent,
                          color: "#fff",
                        }}
                      >
                        Populaire
                      </div>
                    )}

                    <div className="p-8 flex flex-col gap-5 flex-1">
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

                      <ul className="flex flex-col gap-2.5 flex-1">
                        {pack.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-sm"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="shrink-0 mt-0.5"
                            >
                              <circle cx="8" cy="8" r="7" fill={pack.accent} fillOpacity="0.15" />
                              <path
                                d="M5 8l2 2 4-4"
                                stroke={pack.accent}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all hover:opacity-90 mt-2"
                        style={{
                          background: pack.accent,
                          color: "#fff",
                        }}
                      >
                        Démarrer ce projet <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--dark)" }}
      >
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, #4361EE 0%, transparent 65%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 relative">
          <FadeUp className="text-center max-w-3xl mx-auto">
            <h2
              className="text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.05]"
              style={{ color: "#fff" }}
            >
              {homeCta.headline}
            </h2>
            <p
              className="text-lg mb-10 font-medium"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {homeCta.subCopy}
            </p>
            <Link
              href={homeCta.cta.href}
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold rounded-2xl transition-all hover:scale-105"
              style={{
                background: "#fff",
                color: "var(--dark)",
                boxShadow: "0 8px 24px rgba(255,255,255,0.12)",
              }}
            >
              {homeCta.cta.label}
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
