import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { ArrowRight } from "lucide-react";
import { FadeUp, StaggerGrid, StaggerItem, MaskReveal } from "@/components/Animate";
import { blogPage } from "@/content.config";

export const metadata = {
  description: blogPage.metadata.description,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const { hero, emptyState, cta } = blogPage;

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pt-24 md:pt-32 pb-12 md:pb-16">
        <FadeUp>
          <span className="mono-label" style={{ color: "var(--muted)" }}>{hero.label}</span>
          <h1 className="display text-5xl md:text-7xl xl:text-8xl mt-6 max-w-4xl" style={{ color: "var(--text)" }}>
            <MaskReveal>{hero.headline} {hero.headlineGradient}</MaskReveal>
          </h1>
          <p className="mt-7 text-lg max-w-xl" style={{ color: "var(--muted)" }}>{hero.subCopy}</p>
        </FadeUp>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-6xl px-6">
        <div
          className="flex items-center justify-between pb-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="mono-label" style={{ color: "var(--text)" }}>Journal</span>
          <span className="mono-label" style={{ color: "var(--muted)" }}>
            {posts.length} article{posts.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="pb-12 md:pb-20">
          {posts.length === 0 ? (
            <FadeUp className="py-20">
              <p className="display text-3xl mb-2" style={{ color: "var(--text)" }}>{emptyState.title}</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{emptyState.subtitle}</p>
            </FadeUp>
          ) : (
            <StaggerGrid className="flex flex-col divide-y divide-[var(--border)]">
              {posts.map((post, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <StaggerItem key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="blog-row group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 md:gap-x-10 py-6"
                    >
                      {/* Index numeral — quiet position marker */}
                      <span
                        className="font-light tabular-nums leading-none text-xl md:text-2xl"
                        style={{ color: "#BDBDBD" }}
                      >
                        {num}
                      </span>

                      {/* Category + title */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="mono-label" style={{ color: "var(--text)" }}>{post.category}</span>
                          {post.readTime && (
                            <span className="mono-label" style={{ color: "var(--muted)" }}>· {post.readTime}</span>
                          )}
                        </div>
                        <h2 className="display text-xl md:text-2xl leading-tight" style={{ color: "var(--text)" }}>
                          <span className="blog-row-title">{post.title}</span>
                        </h2>
                      </div>

                      {/* Date + arrow */}
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className="mono-label hidden md:inline" style={{ color: "var(--muted)" }}>
                          {formatDate(post.date)}
                        </span>
                        <ArrowRight
                          size={16}
                          strokeWidth={1.5}
                          className="transition-transform group-hover:translate-x-1"
                          style={{ color: "var(--text)" }}
                        />
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="texture-radial" style={{ background: "var(--dark)" }}>
        <div className="relative z-[1] mx-auto max-w-6xl px-6 py-20 md:py-28">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="display text-4xl md:text-6xl" style={{ color: "#fff" }}>
                <MaskReveal>{cta.headline}</MaskReveal>
              </h2>
              <p className="mt-5 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>{cta.subCopy}</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-transform hover:translate-x-1"
              style={{ background: "#fff", color: "var(--dark)" }}
            >
              {cta.ctaLabel} <ArrowRight size={15} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
