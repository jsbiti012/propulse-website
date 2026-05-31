"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import siteData from "@/content/pages/site.json";

// Monumental closing wordmark — the brand name set oversized, bleeding off both
// edges, wiping up from behind a mask as it scrolls into view. Pure type, no
// decoration: the editorial "sign-off" move. Decorative → aria-hidden.
export default function Wordmark() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      aria-hidden
      className="overflow-hidden"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--line)" }}
    >
      <div className="overflow-hidden py-[1.5vw]">
        <motion.div
          className="display select-none text-center whitespace-nowrap leading-[0.9]"
          style={{
            fontSize: "clamp(3.5rem, 26vw, 30rem)",
            letterSpacing: "-0.04em",
            color: "var(--text)",
            paddingTop: "0.06em",
            paddingBottom: "0.14em",
          }}
          initial={{ y: "115%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {siteData.name}
        </motion.div>
      </div>
    </section>
  );
}
