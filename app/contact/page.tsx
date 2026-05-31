import { FadeUp, DrawRule, MaskReveal } from "@/components/Animate";
import ContactForm from "@/components/ContactForm";
import contactData from "@/content/pages/contact.json";
import siteData from "@/content/pages/site.json";

export default function ContactPage() {
  const { hero, formPackOptions, nextSteps } = contactData;

  return (
    <>
      {/* Header */}
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

      {/* Form + sidebar */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="mb-12">
          <DrawRule />
          <div className="pt-4">
            <span className="mono-label" style={{ color: "var(--text)" }}>Le formulaire</span>
          </div>
        </div>
        <ContactForm
          formPackOptions={formPackOptions}
          nextSteps={nextSteps}
          email={siteData.email}
          location={siteData.location}
          locationNote={siteData.locationNote}
        />
      </section>
    </>
  );
}
