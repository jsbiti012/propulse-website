/**
 * content.config.ts
 *
 * Single source of truth for all editable site content.
 * Import named exports into any page or component — do not hardcode content elsewhere.
 */

import {
  Zap, Shield, Users, CheckCircle,
  Phone, Code2, Globe, Presentation,
  Clock, Layers, Star,
  AtSign, Send, Mail, MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface Pack {
  name: string;
  tagline: string;
  desc: string;
  price: string;
  monthly: string;
  monthlyNote: string;
  features: string[];
  accent: string;
  featured?: boolean;
}

export interface Step {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ProcessStep {
  step: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

// ─────────────────────────────────────────────
// Site identity
// ─────────────────────────────────────────────

export const site = {
  name: "Propulse",
  tagline:
    "Votre agence web au Maroc. Des sites professionnels pour les entreprises marocaines qui veulent exister en ligne.",
  email: "contact@propulse.ma",
  location: "Maroc",
  locationNote: "On se déplace partout au Maroc.",
  footerMadeWith: "Fait avec soin au Maroc.",
};

// ─────────────────────────────────────────────
// Social links (used in footer)
// ─────────────────────────────────────────────

export const socialLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "LinkedIn",  href: "#", icon: AtSign },
  { label: "Instagram", href: "#", icon: Send   },
  { label: "Web",       href: "https://propulse.ma", icon: Globe  },
];

/** Convenience re-exports so footer can stay icon-import-free */
export { Mail, MapPin };

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const navCta = { href: "/contact", label: "Démarrer un projet" };

// ─────────────────────────────────────────────
// Hero section
// ─────────────────────────────────────────────

export const hero = {
  badge: "Agence Web · Maroc",
  headlineLines: [
    { words: ["Votre", "entreprise"], gradient: false },
    { words: ["mérite", "d'être"], gradient: true },
    { words: ["trouvée", "en ligne."], gradient: false },
  ],
  subCopyMain:
    "Propulse crée des sites web professionnels pour les PME marocaines.",
  subCopyHighlight: "Rapide, abordable, et sans jargon technique.",
  primaryCta: { href: "/contact", label: "Démarrer mon projet" },
  secondaryCta: { href: "/services", label: "Voir nos formules" },
  trustText: "Des PME marocaines nous font confiance",
  trustAvatars: [
    { initials: "AS", bg: "#4361EE" },
    { initials: "MK", bg: "#7B5CF5" },
    { initials: "FZ", bg: "#059669" },
  ],
  browserMockupUrl: "mon-salon-rabat.ma",
  scrollLabel: "Défiler",
};

// ─────────────────────────────────────────────
// Stats band
// ─────────────────────────────────────────────

export const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "48h",  label: "Délai de réponse moyen",           icon: Clock  },
  { value: "3",    label: "Formules adaptées à chaque budget", icon: Layers },
  { value: "100%", label: "Conçu pour les PME marocaines",    icon: Star   },
];

// ─────────────────────────────────────────────
// Homepage process (3 steps)
// ─────────────────────────────────────────────

export const homeSteps: Step[] = [
  {
    num: "01",
    icon: Phone,
    title: "On se parle",
    desc: "Un appel de 20 min pour comprendre votre activité, vos clients, et vos objectifs.",
  },
  {
    num: "02",
    icon: Code2,
    title: "On construit",
    desc: "Votre site est prêt en 5 à 7 jours. Vous validez, on ajuste selon vos retours.",
  },
  {
    num: "03",
    icon: Globe,
    title: "Vous êtes en ligne",
    desc: "Vous recevez les clés de votre site. On s'occupe du reste.",
  },
];

// ─────────────────────────────────────────────
// Why us cards
// ─────────────────────────────────────────────

export const whyUs: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Zap,
    title: "Livraison rapide",
    desc: "Votre site est prêt en quelques jours, pas en plusieurs mois.",
  },
  {
    icon: Shield,
    title: "Sans prise de tête",
    desc: "On s'occupe de tout. Zéro compétence technique requise de votre côté.",
  },
  {
    icon: Users,
    title: "Fait pour votre secteur",
    desc: "Chaque site est conçu pour votre type d'activité et vos clients locaux.",
  },
  {
    icon: CheckCircle,
    title: "Prix transparent",
    desc: "Une offre claire, sans mauvaises surprises. Vous savez exactement ce qui est inclus.",
  },
];

// ─────────────────────────────────────────────
// Pricing plans (single source — used on both homepage and services page)
// ─────────────────────────────────────────────

export const packs: Pack[] = [
  {
    name: "Site Web Essentiel",
    tagline: "Présence digitale professionnelle",
    desc: "Idéal pour démarrer avec un site propre, professionnel, et opérationnel rapidement.",
    price: "5 900",
    monthly: "590",
    monthlyNote: "maintenance + hébergement sécurisé",
    features: [
      "Site web professionnel",
      "Design moderne et responsive",
      "Hébergement sécurisé",
      "Maintenance technique",
      "Support client",
    ],
    accent: "#4361EE",
  },
  {
    name: "Site + Agent WhatsApp",
    tagline: "Site web + automatisation WhatsApp",
    desc: "Pour les entreprises qui veulent convertir leurs visiteurs en clients automatiquement.",
    price: "7 900",
    monthly: "990",
    monthlyNote: "maintenance + automatisation WhatsApp",
    features: [
      "Tout du plan Site Web",
      "Assistant WhatsApp intelligent",
      "Réponses automatiques clients",
      "Capture de leads",
      "Prise de rendez-vous",
    ],
    accent: "#7B5CF5",
    featured: true,
  },
  {
    name: "Automatisation Business",
    tagline: "Automatisation avancée",
    desc: "Pour les PME qui veulent automatiser leur croissance et fidéliser leurs clients.",
    price: "9 900",
    monthly: "2 490",
    monthlyNote: "maintenance + automatisations avancées",
    features: [
      "Tout du plan WhatsApp IA",
      "Automatisations avancées",
      "Relances clients automatiques",
      "Intégrations business",
      "Support dédié",
    ],
    accent: "#0EA5E9",
  },
];

// ─────────────────────────────────────────────
// Homepage CTA banner
// ─────────────────────────────────────────────

export const homeCta = {
  headline: "Prêt à mettre votre entreprise en ligne ?",
  subCopy:
    "Parlez-nous de votre activité. On vous rappelle sous 24h avec une proposition adaptée.",
  cta: { href: "/contact", label: "Contactez-nous maintenant" },
};

// ─────────────────────────────────────────────
// Services page
// ─────────────────────────────────────────────

export const servicesPage = {
  hero: {
    label: "Nos formules",
    headline: "Une formule pour",
    headlineGradient: "chaque besoin.",
    subCopy:
      "Pas de jargon, pas de mauvaises surprises. Choisissez la formule qui correspond à votre activité — on s'occupe du reste.",
  },
  pricingNote:
    "Tous les prix sont en MAD, TVA non incluse. Un devis personnalisé est disponible sur demande.",
  process: {
    label: "Notre processus",
    headline: "Simple",
    headlineGradient: "de A à Z.",
    subCopy:
      "De la prise de contact à la mise en ligne, on vous accompagne à chaque étape.",
    steps: [
      {
        step: "01",
        icon: Phone,
        title: "On se parle",
        desc: "Un appel de 20 min pour comprendre votre activité, vos clients, et vos objectifs.",
      },
      {
        step: "02",
        icon: Presentation,
        title: "On conçoit",
        desc: "On crée un design sur-mesure adapté à votre secteur et votre image de marque.",
      },
      {
        step: "03",
        icon: Code2,
        title: "Vous validez",
        desc: "On vous présente le résultat. On ajuste selon vos retours jusqu'à ce que ce soit parfait.",
      },
      {
        step: "04",
        icon: Globe,
        title: "Vous êtes en ligne",
        desc: "Votre site est mis en ligne. Hébergement, domaine, configuration — on s'en charge.",
      },
    ] as ProcessStep[],
  },
  cta: {
    headline: "Vous avez des questions sur nos formules ?",
    subCopy:
      "Parlez-nous de votre projet. On vous conseille gratuitement et sans engagement.",
    ctaLabel: "Contactez-nous",
  },
  metadata: {
    title: "Nos formules — Propulse",
    description:
      "Découvrez nos 3 formules pour les PME marocaines : Site Web Essentiel, Site + Agent WhatsApp, Automatisation Business.",
  },
};

// ─────────────────────────────────────────────
// Contact page
// ─────────────────────────────────────────────

export const contactPage = {
  hero: {
    label: "Contact",
    headline: "Parlons de",
    headlineGradient: "votre projet.",
    subCopy:
      "Remplissez le formulaire ci-dessous et on vous recontacte sous 24h. Pas d'engagement, juste une conversation.",
  },
  formPackOptions: [
    { value: "", label: "Choisir une formule…" },
    { value: "essentiel", label: "Site Web Essentiel — 5 900 DH" },
    { value: "whatsapp", label: "Site + Agent WhatsApp — 7 900 DH" },
    { value: "business", label: "Automatisation Business — 9 900 DH" },
    { value: "autre", label: "Autre / Je ne sais pas encore" },
  ],
  nextSteps: [
    "On reçoit votre message.",
    "On vous recontacte sous 24h.",
    "On discute de votre projet gratuitement.",
    "On vous propose une formule adaptée.",
  ],
};

// ─────────────────────────────────────────────
// Blog page
// ─────────────────────────────────────────────

export const blogPage = {
  hero: {
    label: "Blog",
    headline: "Conseils pour votre",
    headlineGradient: "présence en ligne.",
    subCopy:
      "Des articles pratiques pour aider les entreprises marocaines à exister sur le web et attirer plus de clients.",
  },
  emptyState: {
    title: "Les articles arrivent bientôt.",
    subtitle: "Revenez nous voir très prochainement.",
  },
  cta: {
    headline: "Vous voulez un site web pour votre entreprise ?",
    subCopy: "Contactez-nous et on vous rappelle sous 24h.",
    ctaLabel: "Contactez-nous",
  },
  metadata: {
    title: "Blog — Propulse",
    description:
      "Conseils pratiques pour les PME marocaines : site web, référencement, présence en ligne.",
  },
};

// ─────────────────────────────────────────────
// Blog post
// ─────────────────────────────────────────────

export const blogPostCta = {
  label: "Propulse",
  headline:
    "Vous voulez un site web professionnel pour votre entreprise au Maroc ?",
  ctaLabel: "Contactez-nous",
};

// ─────────────────────────────────────────────
// Site-wide metadata (used in app/layout.tsx)
// ─────────────────────────────────────────────

export const siteMetadata = {
  title: "Propulse — Agence Web au Maroc",
  description:
    "Propulse crée des sites web professionnels pour les PME marocaines. Rapide, abordable, sans prise de tête.",
  ogTitle: "Propulse — Agence Web au Maroc",
  ogDescription:
    "Sites web professionnels pour les PME marocaines. Rapide, abordable, sans prise de tête.",
  locale: "fr_MA",
};
