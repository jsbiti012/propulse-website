import type { NextConfig } from "next";

const securityHeaders = [
  // Block other sites from embedding propulse.ma in an iframe (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  // Stop browsers from guessing file types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak the full URL to other sites when visitors click outbound links.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Turn off browser features the site never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.propulse.ma" }],
        destination: "https://propulse.ma/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
