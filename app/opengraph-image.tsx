import { ImageResponse } from "next/og";
import siteData from "@/content/pages/site.json";

// Single branded social-share card used as the site-wide fallback.
// Pure monochrome, typographic — matches the Minimalist Monochrome art direction
// (black ground, white type, hairline rules). No per-post imagery needed.

export const alt = "Propulse";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top rule + eyebrow */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.25)" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Propulse
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {siteData.metaTitle ?? siteData.name}
        </div>

        {/* Bottom rule + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.25)" }} />
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.6)", maxWidth: 900 }}>
            {siteData.metaDescription}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
