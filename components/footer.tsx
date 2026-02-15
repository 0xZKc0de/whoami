import { Github, Linkedin, Mail, Code2, Trophy } from "lucide-react"

export function Footer() {
    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com/yourusername",
            icon: Github,
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/yourusername",
            icon: Linkedin,
        },
        {
            name: "LeetCode",
            href: "https://leetcode.com/yourusername",
            icon: Code2,
        },
        {
            name: "Codeforces",
            href: "https://codeforces.com/profile/yourusername",
            icon: Trophy,
        },
        {
            name: "Email",
            href: "mailto:elhaddadmohamed963@gmail.com",
            icon: Mail,
        },
    ]

    return (
        <footer className="relative z-10 py-12 px-8">
            <div className="max-w-4xl mx-auto">
                <div className="border-t border-zinc-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Left side - Copyright */}
                        <div className="text-xs font-mono text-zinc-500 font-light">
                            © 2025 Mohamed El Haddad. All rights reserved.
                        </div>

                        {/* Right side - Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 hover:text-zinc-100 transition-colors"
                                        aria-label={link.name}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}