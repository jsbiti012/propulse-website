import { FadeUp, MaskReveal } from "@/components/Animate";

export const metadata = {
  title: "Confidentialité",
  description: "Ce que Propulse fait de vos informations, simplement.",
};

export default function ConfidentialitePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-24 md:pt-32 pb-24">
      <FadeUp>
        <span className="mono-label" style={{ color: "var(--muted)" }}>Vie privée</span>
        <h1 className="display text-4xl md:text-6xl mt-6" style={{ color: "var(--text)" }}>
          <MaskReveal>Confidentialité</MaskReveal>
        </h1>
        <p className="mt-7 text-lg" style={{ color: "var(--muted)" }}>
          Propulse respecte votre vie privée. Voici, simplement, ce que nous faisons de vos informations.
        </p>
      </FadeUp>

      <FadeUp>
        <div className="mt-14 flex flex-col gap-10">
          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Ce que nous recueillons</h2>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              Lorsque vous nous écrivez via le formulaire de contact, nous recueillons ce que vous nous
              donnez : nom, email, téléphone et message.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Ce que nous en faisons</h2>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              Uniquement répondre à votre demande et vous recontacter. Nous ne vendons, ne louons ni ne
              partageons vos informations avec qui que ce soit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Combien de temps</h2>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              Le temps nécessaire pour traiter votre demande, puis nous les supprimons.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Cookies</h2>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              Ce site n'utilise aucun cookie de suivi.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Vos droits</h2>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              Vous pouvez à tout moment demander à consulter ou à supprimer vos informations en écrivant à{" "}
              <a href="mailto:contact@propulse.ma" className="link-underline" style={{ color: "var(--text)" }}>
                contact@propulse.ma
              </a>
              .
            </p>
          </div>
        </div>

        <p className="mono-label mt-16" style={{ color: "var(--muted)" }}>
          Dernière mise à jour : juin 2026
        </p>
      </FadeUp>
    </section>
  );
}
