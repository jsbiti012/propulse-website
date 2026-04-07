import { FadeUp } from "@/components/Animate";
import ContactForm from "@/components/ContactForm";
import contactData from "@/content/pages/contact.json";
import siteData from "@/content/pages/site.json";

export default function ContactPage() {
  const { hero, formPackOptions, nextSteps } = contactData;

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
          <ContactForm
            formPackOptions={formPackOptions}
            nextSteps={nextSteps}
            email={siteData.email}
            location={siteData.location}
            locationNote={siteData.locationNote}
          />
        </div>
      </section>
    </>
  );
}
