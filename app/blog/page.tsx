import Link from "next/link"
import { getPosts } from "@/lib/blog"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

export default function BlogPage() {
    const posts = getPosts()

    return (
        <main className="min-h-screen selection:bg-emerald-100 dark:selection:bg-emerald-900/40 px-6 pt-32 pb-24 transition-colors duration-300">
            <div className="max-w-3xl mx-auto">

                {/* ── Header ────────────────────────────────────────── */}
                <header className="mb-20 border-b border-zinc-200 dark:border-zinc-800 pb-12">
                    <h1 className="font-aref text-6xl md:text-8xl font-bold tracking-tight mb-6 text-zinc-900 dark:text-zinc-100 leading-[0.9]">
                        Writing
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-habibi max-w-lg leading-relaxed italic">
                        Thoughts on software engineering, algorithms, and the messy reality of building software.
                    </p>
                </header>

                {/* ── Posts List ────────────────────────────────────── */}
                <div className="flex flex-col gap-16">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                            <article className="flex flex-col gap-4">
                                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    {post.tags && post.tags[0] && (
                                        <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {post.tags[0]}
                                        </span>
                                    )}
                                </div>

                                <h2 className="font-aref text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors duration-300 leading-tight">
                                    {post.title}
                                </h2>

                                <p className="text-zinc-600 dark:text-zinc-500 font-habibi text-lg leading-relaxed line-clamp-2 md:line-clamp-none max-w-2xl group-hover:text-zinc-900 dark:group-hover:text-zinc-400 transition-colors">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest mt-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300">
                                    <span>Read Article</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                </div>
                            </article>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-900 w-full mt-16 group-last:hidden" />
                        </Link>
                    ))}
                </div>

                {/* ── Empty State ───────────────────────────────────── */}
                {posts.length === 0 && (
                    <div className="py-24 text-center border-t border-b border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-500 font-habibi text-xl italic mb-4">No words written yet.</p>
                        <p className="text-zinc-600 text-sm font-mono">Add markdown files to content/posts/</p>
                    </div>
                )}
            </div>
        </main>
    )
}
