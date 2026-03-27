import { getPostBySlug, getPosts } from "@/lib/blog"
import Link from "next/link"
import { ArrowLeft, Clock, Linkedin, Twitter } from "lucide-react"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { ReadingProgress } from "@/components/reading-progress"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

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

            {/* ── Reading Progress Bar ──────────────────────────── */}
            <ReadingProgress />

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

                {/* ── Content (LaTeX Style) ───────────────────────── */}
                <div className="markdown-content latex-style font-cormorant text-lg md:text-xl leading-[1.8] text-zinc-900 dark:text-zinc-100">
                    <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none text-justify
                prose-headings:font-aref prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-headings:mb-6 prose-headings:mt-12
                prose-p:font-cormorant prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-[1.125rem] md:prose-p:text-[1.25rem]
                prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline prose-a:border-b prose-a:border-zinc-300 dark:prose-a:border-zinc-700 hover:prose-a:border-emerald-500 prose-a:transition-all
                prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-strong:font-bold
                prose-img:rounded-md prose-img:my-16 prose-img:mx-auto prose-img:max-w-[85%] prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800 prose-img:shadow-sm
                prose-blockquote:border-none prose-blockquote:pl-0 prose-blockquote:py-0 prose-blockquote:font-cormorant prose-blockquote:text-xl md:prose-blockquote:text-2xl prose-blockquote:italic prose-blockquote:text-zinc-800 dark:prose-blockquote:text-zinc-200 prose-blockquote:my-8 prose-blockquote:bg-transparent
                prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:text-zinc-800 dark:prose-code:text-zinc-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-zinc-200 dark:prose-code:border-zinc-800
                prose-ul:list-disc prose-ul:pl-8 prose-ul:marker:text-zinc-800 dark:prose-ul:marker:text-zinc-200
                prose-li:my-2">
                        <ReactMarkdown 
                            remarkPlugins={[remarkMath]} 
                            rehypePlugins={[rehypeKatex]}
                        >
                            {post.content}
                        </ReactMarkdown>
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
