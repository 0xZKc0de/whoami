import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { ProjectMetadata } from "@/lib/projects"

export function ProjectCard({ project, index }: ProjectCardProps) {
    const isEven = index % 2 === 0

    return (
        <div className={`relative group flex flex-col md:flex-row gap-8 items-center ${isEven ? "" : "md:flex-row-reverse"
            } p-6 md:p-10 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500 hover:bg-zinc-900/50`}>

            {/* ── Image Area ───────────────────────────────────── */}
            <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 relative group-hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 opacity-40 z-10" />

                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-zinc-700 font-mono text-xs">{project.title} Preview</span>
                    </div>
                )}
            </div>

            {/* ── Content Area ──────────────────────────────────── */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-emerald-500/80 font-mono text-xs tracking-widest uppercase">{project.category || "Project"}</span>
                    <span className="text-zinc-600 font-mono text-xs">{project.year}</span>
                </div>

                <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 my-2">
                    {project.techStack.map((tech: string) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-[10px] text-zinc-400 font-mono">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-2">
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            <span>Source</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
