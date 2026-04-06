import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { FadeUp, StaggerGrid, StaggerItem, ScaleOnHover } from "@/components/Animate";
import { blogPage } from "@/content.config";

export const metadata = {
  title: blogPage.metadata.title,
  description: blogPage.metadata.description,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColors: Record<string, { bg: string; color: string }> = {
  Conseils: { bg: "#EEF0FF", color: "#4361EE" },
  SEO: { bg: "#E0F2FE", color: "#0284C7" },
  Design: { bg: "#F3E8FF", color: "#7B5CF5" },
  Marketing: { bg: "#FFF4E0", color: "#F59E0B" },
};

function getCategoryStyle(category: string) {
  return categoryColors[category] ?? { bg: "var(--surface)", color: "var(--muted)" };
}

export default function BlogPage() {
  const posts = getAllPosts();
  const { hero, emptyState, cta } = blogPage;

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden" style={{ background: "#080A17" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 85% 20%, rgba(123,92,245,0.18) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-36 relative">
          <FadeUp className="max-w-2xl">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "#7B9BFF" }}
            >
              {hero.label}
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
              style={{ color: "#ffffff" }}
            >
              {hero.headline}{" "}
              <span className="gradient-text">{hero.headlineGradient}</span>
            </h1>
            <p className="text-lg leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              {hero.subCopy}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Posts */}
      <section style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-24">
          {posts.length === 0 ? (
            <FadeUp className="text-center py-20">
              <p className="text-xl font-extrabold mb-2" style={{ color: "var(--text)" }}>
                {emptyState.title}
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {emptyState.subtitle}
              </p>
            </FadeUp>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const catStyle = getCategoryStyle(post.category);
                return (
                  <StaggerItem key={post.slug}>
                    <ScaleOnHover className="h-full">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="rounded-2xl p-7 flex flex-col gap-5 h-full transition-shadow hover:shadow-lg"
                        style={{ background: "#fff", border: "1px solid var(--border)" }}
                      >
                        <span
                          className="inline-flex self-start text-xs font-bold px-3 py-1.5 rounded-full"
                          style={{ background: catStyle.bg, color: catStyle.color }}
                        >
                          {post.category}
                        </span>

                        <div className="flex-1">
                          <h2
                            className="text-base font-extrabold tracking-tight leading-snug mb-3"
                            style={{ color: "var(--text)" }}
                          >
                            {post.title}
                          </h2>
                          <p
                            className="text-sm leading-relaxed line-clamp-3 font-medium"
                            style={{ color: "var(--muted)" }}
                          >
                            {post.description}
                          </p>
                        </div>

                        <div
                          className="flex items-center gap-4 pt-5 border-t text-xs font-medium"
                          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                        >
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {formatDate(post.date)}
                          </span>
                          {post.readTime && (
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} />
                              {post.readTime}
                            </span>
                          )}
                        </div>
                      </Link>
                    </ScaleOnHover>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--dark)" }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 50%, #4361EE 0%, transparent 65%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 relative">
          <FadeUp className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2
                className="text-2xl font-extrabold tracking-tight mb-2"
                style={{ color: "#fff" }}
              >
                {cta.headline}
              </h2>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                {cta.subCopy}
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2.5 px-7 py-4 text-sm font-bold rounded-2xl transition-all hover:scale-105"
              style={{
                background: "#fff",
                color: "var(--dark)",
                boxShadow: "0 8px 24px rgba(255,255,255,0.1)",
              }}
            >
              {cta.ctaLabel} <ArrowRight size={15} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
