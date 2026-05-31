"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks, navCta } from "@/content.config";
import siteData from "@/content/pages/site.json";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full"
      style={{
        background: "var(--bg)",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "var(--border)"}`,
      }}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 group">
          <Logo
            size={44}
            className="transition-transform group-hover:scale-105 -mr-2"
            style={{ filter: "brightness(0)" }}
          />
          <span className="text-lg font-extrabold tracking-tight" style={{ color: "var(--text)" }}>
            {siteData.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="text-xs font-medium uppercase tracking-widest transition-colors"
                style={{
                  color: active ? "var(--text)" : "var(--muted)",
                  borderBottom: active ? "1px solid var(--text)" : "1px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href={navCta.href}
          className="hidden md:inline-flex items-center px-5 py-2.5 text-xs font-medium uppercase tracking-widest border transition-colors duration-100 hover:bg-[var(--bg)] hover:text-[var(--text)]"
          style={{ background: "var(--text)", color: "var(--bg)", borderColor: "var(--text)" }}
        >
          {navCta.label}
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          style={{ color: "var(--text)" }}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: "var(--line)", background: "var(--bg)" }}
          >
            <div className="px-6 py-4 flex flex-col">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-xs font-medium uppercase tracking-widest border-b"
                  style={{
                    color: pathname === href ? "var(--text)" : "var(--muted)",
                    borderColor: "var(--border)",
                  }}
                >
                  {label}
                </Link>
              ))}
              <Link
                href={navCta.href}
                onClick={() => setOpen(false)}
                className="mt-5 flex items-center justify-center px-5 py-3.5 text-xs font-medium uppercase tracking-widest"
                style={{ background: "var(--text)", color: "var(--bg)" }}
              >
                {navCta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
