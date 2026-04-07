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
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,10,23,0.97)" : "rgba(8,10,23,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 group">
          <Logo
            size={48}
            className="transition-transform group-hover:scale-105 -mr-2"
          />
          <span
            className="text-lg font-extrabold tracking-tight"
            style={{ color: "#ffffff" }}
          >
            {siteData.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
                style={{ color: active ? "#ffffff" : "rgba(255,255,255,0.5)" }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(67,97,238,0.22)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href={navCta.href}
          className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg"
          style={{
            background: "var(--accent)",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(67,97,238,0.35)",
          }}
        >
          {navCta.label}
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: "#ffffff" }}
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
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "#0C0E1A",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold"
                  style={{
                    color:
                      pathname === href ? "#fff" : "rgba(255,255,255,0.55)",
                    background:
                      pathname === href
                        ? "rgba(67,97,238,0.2)"
                        : "transparent",
                  }}
                >
                  {label}
                </Link>
              ))}
              <Link
                href={navCta.href}
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center px-5 py-3 text-sm font-bold rounded-xl"
                style={{ background: "var(--accent)", color: "#fff" }}
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
