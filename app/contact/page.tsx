"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, CheckCircle } from "lucide-react";
import { FadeUp } from "@/components/Animate";
import { contactPage, site } from "@/content.config";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      business: (form.elements.namedItem("business") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      pack: (form.elements.namedItem("pack") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
    } else {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
    }
  }

  const { hero, formPackOptions, nextSteps } = contactPage;

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden" style={{ background: "#080A17" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 10% 50%, rgba(67,97,238,0.2) 0%, transparent 60%)",
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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-32 relative">
          <FadeUp className="max-w-2xl">
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
            <p className="text-lg leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              {hero.subCopy}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Form + sidebar */}
      <section style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {sent ? (
                <div
                  className="rounded-2xl p-12 text-center"
                  style={{ background: "#fff", border: "1px solid var(--border)" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle
                      size={52}
                      className="mx-auto mb-6"
                      style={{ color: "#10B981" }}
                    />
                  </motion.div>
                  <h2
                    className="text-2xl font-extrabold tracking-tight mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    Message envoyé !
                  </h2>
                  <p style={{ color: "var(--muted)" }}>
                    Merci de nous avoir contactés. On vous répond dans les plus
                    brefs délais.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-5 sm:p-8 flex flex-col gap-5"
                  style={{ background: "#fff", border: "1px solid var(--border)" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                        Votre nom *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Ahmed Benali"
                        className="px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--surface)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                        Entreprise
                      </label>
                      <input
                        name="business"
                        type="text"
                        placeholder="Ma Salle de Sport"
                        className="px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:border-[var(--accent)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--surface)" }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="ahmed@exemple.ma"
                      className="px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--surface)" }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                      Formule qui vous intéresse
                    </label>
                    <select
                      name="pack"
                      className="px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--surface)" }}
                    >
                      {formPackOptions.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                      Décrivez votre activité *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Ex: Je gère une salle de sport au Maroc. J'ai besoin d'un site pour présenter mes offres et attirer de nouveaux membres..."
                      className="px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:border-[var(--accent)] resize-none"
                      style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--surface)" }}
                    />
                  </div>

                  {error && (
                    <p className="text-sm font-medium" style={{ color: "#EF4444" }}>
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      boxShadow: "0 6px 20px rgba(67,97,238,0.3)",
                    }}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                    {!loading && <Send size={15} />}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-5"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="rounded-2xl p-7 border"
                style={{ background: "#fff", borderColor: "var(--border)" }}
              >
                <div className="flex flex-col gap-7">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent-light)" }}
                    >
                      <Mail size={18} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>
                        Email
                      </p>
                      <a
                        href={`mailto:${site.email}`}
                        className="text-sm font-bold hover:underline"
                        style={{ color: "var(--text)" }}
                      >
                        {site.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent-light)" }}
                    >
                      <MapPin size={18} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>
                        Localisation
                      </p>
                      <p className="text-sm font-bold" style={{ color: "var(--text)" }}>
                        {site.location}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {site.locationNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-7 border"
                style={{ background: "var(--accent-light)", borderColor: "rgba(67,97,238,0.15)" }}
              >
                <h3 className="text-sm font-extrabold mb-4" style={{ color: "var(--text)" }}>
                  Ce qui se passe ensuite
                </h3>
                <ol className="flex flex-col gap-4">
                  {nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="text-xs font-black shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: "var(--accent)", color: "#fff" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
