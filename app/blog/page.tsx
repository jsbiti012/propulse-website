import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { ArrowRight, Clock } from "lucide-react";
import { FadeUp, StaggerGrid, StaggerItem, DrawRule, MaskReveal } from "@/components/Animate";
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
        <div>
          <DrawRule />
          <div className="pt-4 flex items-center justify-between">
            <span className="mono-label" style={{ color: "var(--text)" }}>Journal</span>
            <span className="mono-label" style={{ color: "var(--muted)" }}>
              {posts.length} article{posts.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="py-12 md:py-20">
          {posts.length === 0 ? (
            <FadeUp className="py-20">
              <p className="display text-3xl mb-2" style={{ color: "var(--text)" }}>{emptyState.title}</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{emptyState.subtitle}</p>
            </FadeUp>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="invert-card group h-full flex flex-col gap-5 p-8">
                    <div className="flex items-center justify-between">
                      <span className="mono-label">{post.category}</span>
                      <span className="mono-label dim">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="display text-2xl leading-tight flex-1">{post.title}</h2>
                    <p className="text-sm leading-relaxed dim line-clamp-3">{post.description}</p>
                    <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: "currentColor" }}>
                      {post.readTime && (
                        <span className="mono-label dim flex items-center gap-1.5">
                          <Clock size={12} strokeWidth={1.5} />
                          {post.readTime}
                        </span>
                      )}
                      <span className="mono-label flex items-center gap-1.5">
                        Lire <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
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
