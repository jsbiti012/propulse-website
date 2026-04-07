// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── Blog posts ────────────────────────────────────────────────────────
      {
        name: "blog",
        label: "Articles",
        path: "content/blog",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "article"
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "description",
            label: "Description (extrait)",
            ui: { component: "textarea" }
          },
          {
            type: "datetime",
            name: "date",
            label: "Date de publication"
          },
          {
            type: "string",
            name: "category",
            label: "Cat\xE9gorie"
          },
          {
            type: "string",
            name: "readTime",
            label: "Temps de lecture (ex: 4 min)"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenu",
            isBody: true
          }
        ]
      },
      // ─── Site settings ─────────────────────────────────────────────────────
      {
        name: "site",
        label: "Param\xE8tres du site",
        path: "content/pages",
        format: "json",
        match: { include: "site" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "name", label: "Nom du site" },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
            ui: { component: "textarea" }
          },
          { type: "string", name: "email", label: "Email de contact" },
          { type: "string", name: "location", label: "Localisation" },
          { type: "string", name: "locationNote", label: "Note de localisation" },
          { type: "string", name: "footerMadeWith", label: "Texte footer" },
          { type: "string", name: "metaTitle", label: "Titre SEO (balise title)" },
          {
            type: "string",
            name: "metaDescription",
            label: "Description SEO",
            ui: { component: "textarea" }
          }
        ]
      },
      // ─── Home page ─────────────────────────────────────────────────────────
      {
        name: "home",
        label: "Page d'accueil",
        path: "content/pages",
        format: "json",
        match: { include: "home" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "badge", label: "Badge" },
              { type: "string", name: "headlineLine1", label: "Titre \u2014 ligne 1" },
              {
                type: "string",
                name: "headlineLine2",
                label: "Titre \u2014 ligne 2 (d\xE9grad\xE9)"
              },
              { type: "string", name: "headlineLine3", label: "Titre \u2014 ligne 3" },
              {
                type: "string",
                name: "subCopyMain",
                label: "Sous-titre principal"
              },
              {
                type: "string",
                name: "subCopyHighlight",
                label: "Sous-titre mis en avant"
              },
              {
                type: "string",
                name: "primaryCtaLabel",
                label: "Bouton principal"
              },
              {
                type: "string",
                name: "secondaryCtaLabel",
                label: "Bouton secondaire"
              },
              {
                type: "string",
                name: "trustText",
                label: "Texte de confiance"
              },
              {
                type: "string",
                name: "browserMockupUrl",
                label: "URL dans le mockup navigateur"
              },
              { type: "string", name: "scrollLabel", label: "Label de d\xE9filement" }
            ]
          },
          {
            type: "object",
            name: "stats",
            label: "Statistiques",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.value || "Stat" }) },
            fields: [
              { type: "string", name: "value", label: "Valeur" },
              { type: "string", name: "label", label: "Label" }
            ]
          },
          {
            type: "object",
            name: "homeSteps",
            label: "\xC9tapes du processus",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "\xC9tape" }) },
            fields: [
              { type: "string", name: "num", label: "Num\xE9ro" },
              { type: "string", name: "title", label: "Titre" },
              {
                type: "string",
                name: "desc",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            type: "object",
            name: "whyUs",
            label: "Pourquoi nous",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Raison" }) },
            fields: [
              { type: "string", name: "title", label: "Titre" },
              {
                type: "string",
                name: "desc",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            type: "object",
            name: "packs",
            label: "Formules tarifaires",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Formule" }) },
            fields: [
              { type: "string", name: "name", label: "Nom" },
              { type: "string", name: "tagline", label: "Sous-titre" },
              {
                type: "string",
                name: "desc",
                label: "Description",
                ui: { component: "textarea" }
              },
              { type: "string", name: "price", label: "Prix de mise en place (MAD)" },
              { type: "string", name: "monthly", label: "Mensualit\xE9 (MAD)" },
              { type: "string", name: "monthlyNote", label: "Note mensualit\xE9" },
              {
                type: "string",
                name: "features",
                label: "Fonctionnalit\xE9s incluses",
                list: true
              },
              {
                type: "boolean",
                name: "featured",
                label: "Mettre en avant (badge Populaire)"
              },
              { type: "string", name: "accent", label: "Couleur (hex)" }
            ]
          },
          {
            type: "object",
            name: "homeCta",
            label: "Banni\xE8re CTA",
            fields: [
              { type: "string", name: "headline", label: "Titre" },
              {
                type: "string",
                name: "subCopy",
                label: "Sous-titre",
                ui: { component: "textarea" }
              },
              { type: "string", name: "ctaLabel", label: "Label du bouton" }
            ]
          }
        ]
      },
      // ─── Services page ─────────────────────────────────────────────────────
      {
        name: "services",
        label: "Page Services",
        path: "content/pages",
        format: "json",
        match: { include: "services" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "headline", label: "Titre" },
              {
                type: "string",
                name: "headlineGradient",
                label: "Titre (partie d\xE9grad\xE9)"
              },
              {
                type: "string",
                name: "subCopy",
                label: "Sous-titre",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            type: "string",
            name: "pricingNote",
            label: "Note tarifaire"
          },
          {
            type: "object",
            name: "process",
            label: "Processus",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "headline", label: "Titre" },
              {
                type: "string",
                name: "headlineGradient",
                label: "Titre (partie d\xE9grad\xE9)"
              },
              {
                type: "string",
                name: "subCopy",
                label: "Sous-titre",
                ui: { component: "textarea" }
              },
              {
                type: "object",
                name: "steps",
                label: "\xC9tapes",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "\xC9tape" }) },
                fields: [
                  { type: "string", name: "step", label: "Num\xE9ro" },
                  { type: "string", name: "title", label: "Titre" },
                  {
                    type: "string",
                    name: "desc",
                    label: "Description",
                    ui: { component: "textarea" }
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "CTA",
            fields: [
              { type: "string", name: "headline", label: "Titre" },
              {
                type: "string",
                name: "subCopy",
                label: "Sous-titre",
                ui: { component: "textarea" }
              },
              { type: "string", name: "ctaLabel", label: "Label du bouton" }
            ]
          },
          {
            type: "object",
            name: "meta",
            label: "SEO",
            fields: [
              { type: "string", name: "title", label: "Titre SEO" },
              {
                type: "string",
                name: "description",
                label: "Description SEO",
                ui: { component: "textarea" }
              }
            ]
          }
        ]
      },
      // ─── Contact page ──────────────────────────────────────────────────────
      {
        name: "contact",
        label: "Page Contact",
        path: "content/pages",
        format: "json",
        match: { include: "contact" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "headline", label: "Titre" },
              {
                type: "string",
                name: "headlineGradient",
                label: "Titre (partie d\xE9grad\xE9)"
              },
              {
                type: "string",
                name: "subCopy",
                label: "Sous-titre",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            type: "object",
            name: "formPackOptions",
            label: "Options du formulaire (formules)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Option" }) },
            fields: [
              { type: "string", name: "value", label: "Valeur interne" },
              { type: "string", name: "label", label: "Label affich\xE9" }
            ]
          },
          {
            type: "string",
            name: "nextSteps",
            label: "\xC9tapes suivantes",
            list: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
