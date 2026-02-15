import { getPostBySlug, getPosts } from "@/lib/blog"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = getPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    // Calculate read time (rough estimate)
    const words = post.content.split(/\s+/g).length
    const readTime = Math.ceil(words / 200)

    return (
        <article className="min-h-screen pt-32 pb-24 px-6 relative z-10 selection:bg-emerald-500/30">

            {/* ── Background Elements ───────────────────────────── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] opacity-20" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] opacity-20" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">

                {/* ── Navigation ──────────────────────────────────── */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-12 text-sm font-mono group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="tracking-wide">BACK TO WRITING</span>
                </Link>

                {/* ── Header ──────────────────────────────────────── */}
                <header className="mb-16 border-b border-zinc-800/50 pb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-500/80 uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between text-zinc-500 font-mono text-sm border-t border-zinc-800/50 pt-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-zinc-600" />
                                <time>{new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-zinc-600" />
                                <span>{readTime} min read</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Content ─────────────────────────────────────── */}
                <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-zinc-100 prose-headings:tracking-tight
            prose-p:text-zinc-400/90 prose-p:leading-8 prose-p:font-light
            prose-a:text-emerald-400 prose-a:no-underline prose-a:border-b prose-a:border-emerald-500/30 hover:prose-a:border-emerald-400 prose-a:transition-colors
            prose-strong:text-zinc-100 prose-strong:font-semibold
            prose-img:rounded-3xl prose-img:border prose-img:border-zinc-800/50 prose-img:shadow-2xl prose-img:my-12
            prose-blockquote:border-l-2 prose-blockquote:border-emerald-500/50 prose-blockquote:bg-zinc-900/30 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-zinc-300
            prose-code:bg-zinc-900 prose-code:text-emerald-300/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-sm
            prose-li:text-zinc-400 prose-li:marker:text-emerald-500/50">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {/* ── Footer ──────────────────────────────────────── */}
                <footer className="mt-24 pt-12 border-t border-zinc-800 text-center">
                    <p className="text-zinc-600 italic">
                        Thank you for reading. <Link href="/blog" className="text-emerald-500 hover:text-emerald-400 underline decoration-emerald-500/30 underline-offset-4">Read more posts</Link>
                    </p>
                </footer>
            </div>
        </article>
    )
}
