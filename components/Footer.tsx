"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { navLinks, socialLinks, Mail, MapPin } from "@/content.config";
import siteData from "@/content/pages/site.json";

export default function Footer() {
  return (
    <footer style={{ background: "var(--dark)", color: "#fff" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 md:pt-16 pb-8 md:pb-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">

          {/* ── Brand column ── */}
          <div className="max-w-xs">
            <div className="flex items-center gap-0 mb-4">
              <Logo size={48} className="-mr-2" />
              <span className="text-lg font-extrabold tracking-tight">{siteData.name}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              {siteData.tagline}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(67,97,238,0.25)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(67,97,238,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          <nav className="flex flex-col sm:flex-row gap-10">
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Navigation
              </span>
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Contact
              </span>
              <a
                href={`mailto:${siteData.email}`}
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <Mail size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
                {siteData.email}
              </a>
              <span
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <MapPin size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
                {siteData.location}
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Commencer
              </span>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Contactez-nous maintenant
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Voir nos formules
              </Link>
            </div>
          </nav>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} {siteData.name}. Tous droits réservés.
          </p>
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
            {siteData.footerMadeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
