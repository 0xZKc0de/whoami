import { getPostBySlug, getPosts } from "@/lib/blog"
import Link from "next/link"
import { ArrowLeft, Clock, Linkedin, Twitter } from "lucide-react"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = getPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    // Calculate read time (rough estimate)
    const words = post.content.split(/\s+/g).length
    const readTime = Math.ceil(words / 200)

    return (
        <article className="min-h-screen selection:bg-emerald-100 dark:selection:bg-emerald-900/40 transition-colors duration-300">

            {/* ── Progress Bar (Simulated) ──────────────────────── */}
            <div className="fixed top-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-900 z-50">
                <div className="h-full bg-emerald-500 w-[15%]" />
            </div>

            <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

                {/* ── Navigation ──────────────────────────────────── */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors mb-12 text-sm font-mono group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="tracking-wide">Back</span>
                </Link>

                {/* ── Header ──────────────────────────────────────── */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 font-bold text-xl font-aref">
                        M
                    </div>
                    <div className="text-sm leading-tight">
                        <div className="text-zinc-900 dark:text-zinc-100 font-medium font-habibi">Mohamed El Haddad</div>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono mt-1">
                            <time>{new Date(post.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                            <span>·</span>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{readTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="font-aref text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-100 mb-10 leading-[1.1] tracking-tight">
                    {post.title}
                </h1>

                {/* ── Content ─────────────────────────────────────── */}
                <div className="markdown-content font-habibi text-lg md:text-xl leading-loose text-zinc-800 dark:text-zinc-300">
                    <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
                prose-headings:font-aref prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-headings:mb-6 prose-headings:mt-12
                prose-p:font-habibi prose-p:leading-8 prose-p:mb-8 prose-p:text-[1.125rem] md:prose-p:text-[1.25rem]
                prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline prose-a:border-b prose-a:border-zinc-300 dark:prose-a:border-zinc-700 hover:prose-a:border-emerald-500 prose-a:transition-all
                prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-strong:font-bold
                prose-img:rounded-lg prose-img:my-16 prose-img:w-full prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800 prose-img:shadow-sm
                prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:font-aref prose-blockquote:text-2xl prose-blockquote:italic prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400 prose-blockquote:my-10 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900/50 prose-blockquote:rounded-r-lg
                prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:text-emerald-700 dark:prose-code:text-emerald-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-zinc-200 dark:prose-code:border-zinc-800
                prose-ul:list-disc prose-ul:pl-5 prose-ul:marker:text-zinc-400
                prose-li:my-2">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </div>

                {/* ── Footer ──────────────────────────────────────── */}
                <footer className="mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
                    <div className="font-habibi flex flex-col items-start gap-2">
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold">Written by Mohamed</span>
                        <span className="text-zinc-500">Engineering & Algorithms</span>
                    </div>
                    <div className="flex gap-4">
                        <button className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors flex items-center gap-2 font-medium"><Twitter className="w-4 h-4" /> Share</button>
                        <button className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors flex items-center gap-2 font-medium"><Linkedin className="w-4 h-4" /> Connect</button>
                    </div>
                </footer>
            </div>
        </article>
    )
}
