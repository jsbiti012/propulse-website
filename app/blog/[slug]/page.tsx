import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/mdx";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPostCta } from "@/content.config";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    description: post.description,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const num = String(getAllPosts().findIndex((p) => p.slug === slug) + 1).padStart(2, "0");

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-3xl px-6 pt-24 md:pt-28 pb-10">
        <Link
          href="/blog"
          className="link-underline inline-flex items-center gap-2 mono-label mb-12"
          style={{ color: "var(--muted)" }}
        >
          <ArrowLeft size={13} />
          Retour au blog
        </Link>

        <div className="flex items-baseline gap-5 mb-8">
          <span className="font-light tabular-nums leading-none tracking-tight text-4xl md:text-5xl" style={{ color: "var(--muted)" }}>
            {num}
          </span>
          <span className="rule flex-1 self-center" style={{ borderColor: "var(--border)" }} />
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="mono-label px-2 py-1 border" style={{ borderColor: "var(--line)", color: "var(--text)" }}>
            {post.category}
          </span>
          <span className="mono-label flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
            <Calendar size={12} strokeWidth={1.5} />
            {formatDate(post.date)}
          </span>
          {post.readTime && (
            <span className="mono-label flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
              <Clock size={12} strokeWidth={1.5} />
              {post.readTime}
            </span>
          )}
        </div>

        <h1 className="display text-4xl md:text-6xl mb-6" style={{ color: "var(--text)" }}>
          {post.title}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          {post.description}
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        <div className="rule" />
      </div>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 border p-8" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <p className="mono-label mb-3" style={{ color: "var(--muted)" }}>{blogPostCta.label}</p>
          <p className="display text-2xl mb-6" style={{ color: "var(--text)" }}>{blogPostCta.headline}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-medium uppercase tracking-widest border transition-colors duration-100 hover:bg-[var(--bg)] hover:text-[var(--text)]"
            style={{ background: "var(--text)", color: "var(--bg)", borderColor: "var(--text)" }}
          >
            {blogPostCta.ctaLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
