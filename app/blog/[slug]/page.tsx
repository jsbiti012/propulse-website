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
    title: `${post.title} — Propulse Blog`,
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

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden" style={{ background: "#080A17" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(67,97,238,0.15) 0%, transparent 60%)",
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
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-10 transition-opacity hover:opacity-70"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <ArrowLeft size={15} />
            Retour au blog
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: "rgba(67,97,238,0.2)", color: "#7B9BFF" }}
            >
              {post.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            {post.readTime && (
              <span
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <Clock size={12} />
                {post.readTime}
              </span>
            )}
          </div>

          <h1
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5"
            style={{ color: "#ffffff" }}
          >
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
            {post.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer CTA */}
        <div
          className="mt-16 pt-10 border-t rounded-2xl p-8"
          style={{
            borderColor: "var(--border)",
            background: "var(--accent-light)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--accent)" }}
          >
            {blogPostCta.label}
          </p>
          <p className="text-base font-semibold mb-5" style={{ color: "var(--text)" }}>
            {blogPostCta.headline}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all hover:scale-105"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 6px 20px rgba(67,97,238,0.3)",
            }}
          >
            {blogPostCta.ctaLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
