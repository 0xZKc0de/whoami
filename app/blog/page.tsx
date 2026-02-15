import Link from "next/link"
import { getPosts } from "@/lib/blog"
import { ArrowUpRight } from "lucide-react"

export default function BlogPage() {
    const posts = getPosts()

    return (
        <main className="min-h-screen pt-32 pb-16 px-6 relative z-10">
            {/* ── Background Elements ───────────────────────────── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-900/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto z-10 relative">
                {/* ── Header ────────────────────────────────────────── */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/50 pb-12">
                    <div>
                        <h1 className="font-cormorant text-6xl md:text-8xl font-medium tracking-tighter mb-6 text-zinc-100">
                            Writing
                        </h1>
                        <p className="text-zinc-400 font-light text-xl max-w-lg leading-relaxed">
                            Insights on engineering, algorithms, and the messy reality of building software.
                        </p>
                    </div>
                    <div className="text-zinc-600 font-mono text-sm mb-2">
                        {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
                    </div>
                </div>

                {/* ── Posts Grid (Masonry-ish) ──────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative">
                            <article className="h-full flex flex-col p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800/50 hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-all duration-500 hover:-translate-y-2">

                                {/* Date & Tags */}
                                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6">
                                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    {post.tags && post.tags[0] && (
                                        <span className="px-2 py-1 rounded bg-zinc-800/50 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                                            {post.tags[0]}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl font-bold text-zinc-100 mb-4 leading-tight group-hover:text-emerald-400 transition-colors duration-300">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3 group-hover:text-zinc-300 transition-colors">
                                    {post.excerpt}
                                </p>

                                {/* Footer / Link */}
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono group-hover:text-emerald-400 transition-colors mt-auto">
                                    <span>READ ARTICLE</span>
                                    <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* ── Empty State ───────────────────────────────────── */}
                {posts.length === 0 && (
                    <div className="py-32 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                        <p className="text-zinc-500 font-mono">No writes found locally.</p>
                        <p className="text-zinc-600 text-sm mt-2">Add markdown files to content/posts/</p>
                    </div>
                )}
            </div>
        </main>
    )
}
