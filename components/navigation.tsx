"use client"

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function Navigation() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900/50">
            <nav className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xs font-cormorant hover:text-zinc-400 transition-colors font-medium text-zinc-100"
                >
                    Mohamed EL HADDAD
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className={`text-xs font-mono transition-colors font-light ${pathname === "/" ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-400"
                            }`}
                    >
                        About
                    </Link>
                    <Link
                        href="/work"
                        className={`text-xs font-mono transition-colors font-light ${pathname === "/work" ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-400"
                            }`}
                    >
                        Work
                    </Link>
                    <Link
                        href="/blog"
                        className={`text-xs font-mono transition-colors font-light ${pathname === "/blog" ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-400"
                            }`}
                    >
                        Blog
                    </Link>

                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-1 hover:text-zinc-400 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Moon className="w-3.5 h-3.5" />
                            ) : (
                                <Sun className="w-3.5 h-3.5" />
                            )}
                        </button>
                    )}
                </div>
            </nav>
        </header>
    )
}