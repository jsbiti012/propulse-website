"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { navLinks, socialLinks, Mail, MapPin } from "@/content.config";
import siteData from "@/content/pages/site.json";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)", color: "var(--text)", borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">

          {/* ── Brand column ── */}
          <div className="max-w-xs">
            <div className="flex items-center gap-0 mb-4">
              <Logo size={44} className="-mr-[20px]" style={{ filter: "brightness(0)" }} />
              <span className="text-lg font-extrabold tracking-tight" style={{ fontFamily: '"Open Sauce One", sans-serif' }}>{siteData.name}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
              {siteData.tagline}
            </p>
            {/* Social icons — sharp squares, invert on hover */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border transition-colors duration-100 hover:bg-[var(--text)] hover:text-[var(--bg)]"
                  style={{ borderColor: "var(--line)", color: "var(--text)" }}
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          <nav className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-4">
              <span className="mono-label" style={{ color: "var(--muted)" }}>Navigation</span>
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="link-underline text-sm font-medium w-fit"
                  style={{ color: "var(--text)" }}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <span className="mono-label" style={{ color: "var(--muted)" }}>Contact</span>
              <a
                href={`mailto:${siteData.email}`}
                className="link-underline flex items-center gap-2 text-sm font-medium w-fit"
                style={{ color: "var(--text)" }}
              >
                <Mail size={13} strokeWidth={1.5} style={{ color: "var(--muted)" }} />
                {siteData.email}
              </a>
              <span className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text)" }}>
                <MapPin size={13} strokeWidth={1.5} style={{ color: "var(--muted)" }} />
                {siteData.location}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="mono-label" style={{ color: "var(--muted)" }}>Commencer</span>
              <Link
                href="/contact"
                className="link-underline inline-flex items-center gap-2 text-sm font-semibold w-fit"
                style={{ color: "var(--text)" }}
              >
                Contactez-nous maintenant
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/services"
                className="link-underline text-sm font-medium w-fit"
                style={{ color: "var(--text)" }}
              >
                Voir nos formules
              </Link>
            </div>
          </nav>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="mono-label" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} {siteData.name}. Tous droits réservés.
          </p>
          <p className="mono-label" style={{ color: "var(--muted)" }}>
            {siteData.footerMadeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
