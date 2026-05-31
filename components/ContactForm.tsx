"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin } from "lucide-react";

interface PackOption {
  value: string;
  label: string;
}

interface Props {
  formPackOptions: PackOption[];
  nextSteps: string[];
  email: string;
  location: string;
  locationNote: string;
}

const inputClass =
  "w-full px-0 py-3 text-sm bg-transparent border-b-2 outline-none transition-[border-bottom-width] focus:border-b-[3px] placeholder:italic placeholder:text-[var(--muted)]";

export default function ContactForm({
  formPackOptions,
  nextSteps,
  email,
  location,
  locationNote,
}: Props) {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
      {/* Form */}
      <motion.div
        className="lg:col-span-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {sent ? (
          <div className="p-12 text-center border" style={{ borderColor: "var(--line)" }}>
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle size={48} strokeWidth={1.5} className="mx-auto mb-6" style={{ color: "var(--text)" }} />
            </motion.div>
            <h2 className="display text-3xl mb-3" style={{ color: "var(--text)" }}>
              Message envoyé !
            </h2>
            <p style={{ color: "var(--muted)" }}>
              Merci de nous avoir contactés. On vous répond dans les plus brefs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="mono-label" style={{ color: "var(--muted)" }}>Votre nom *</label>
                <input name="name" type="text" required placeholder="Ahmed Benali"
                  className={inputClass} style={{ borderColor: "var(--line)", color: "var(--text)" }} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="mono-label" style={{ color: "var(--muted)" }}>Entreprise</label>
                <input name="business" type="text" placeholder="Ma Salle de Sport"
                  className={inputClass} style={{ borderColor: "var(--line)", color: "var(--text)" }} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-label" style={{ color: "var(--muted)" }}>Email *</label>
              <input name="email" type="email" required placeholder="ahmed@exemple.ma"
                className={inputClass} style={{ borderColor: "var(--line)", color: "var(--text)" }} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-label" style={{ color: "var(--muted)" }}>Formule qui vous intéresse</label>
              <select name="pack" className={inputClass} style={{ borderColor: "var(--line)", color: "var(--text)" }}>
                {formPackOptions.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-label" style={{ color: "var(--muted)" }}>Décrivez votre activité *</label>
              <textarea name="message" required rows={5}
                placeholder="Ex: Je gère une salle de sport au Maroc. J'ai besoin d'un site pour présenter mes offres et attirer de nouveaux membres..."
                className={`${inputClass} resize-y`} style={{ borderColor: "var(--line)", color: "var(--text)" }} />
            </div>

            {error && (
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-medium uppercase tracking-widest border transition-colors duration-100 hover:bg-[var(--bg)] hover:text-[var(--text)] disabled:opacity-60 disabled:cursor-not-allowed self-start"
              style={{ background: "var(--text)", color: "var(--bg)", borderColor: "var(--text)" }}
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
              {!loading && <Send size={14} />}
            </button>
          </form>
        )}
      </motion.div>

      {/* Sidebar */}
      <motion.div
        className="lg:col-span-2 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="border p-7 flex flex-col gap-7" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 border" style={{ borderColor: "var(--line)" }}>
              <Mail size={17} strokeWidth={1.5} style={{ color: "var(--text)" }} />
            </div>
            <div>
              <p className="mono-label mb-1.5" style={{ color: "var(--muted)" }}>Email</p>
              <a href={`mailto:${email}`} className="link-underline text-sm font-bold" style={{ color: "var(--text)" }}>
                {email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 border" style={{ borderColor: "var(--line)" }}>
              <MapPin size={17} strokeWidth={1.5} style={{ color: "var(--text)" }} />
            </div>
            <div>
              <p className="mono-label mb-1.5" style={{ color: "var(--muted)" }}>Localisation</p>
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{location}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{locationNote}</p>
            </div>
          </div>
        </div>

        <div className="border border-t-0 p-7" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <p className="mono-label mb-5" style={{ color: "var(--muted)" }}>Ce qui se passe ensuite</p>
          <ol className="flex flex-col gap-4">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mono-label shrink-0 w-6 h-6 flex items-center justify-center border"
                  style={{ borderColor: "var(--line)", color: "var(--text)" }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium pt-1" style={{ color: "var(--text)" }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
