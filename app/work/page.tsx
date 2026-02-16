import { getProjects } from "@/lib/projects"
import { ProjectCard } from "@/components/project-card"

export default function WorkPage() {
    const projects = getProjects()

    return (
        <main className="min-h-screen pt-24 pb-16 px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
                {/* ── Header ────────────────────────────────────────── */}
                <div className="mb-20">
                    <h1 className="font-cormorant text-5xl md:text-6xl font-medium tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
                        Selected Work
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 font-light max-w-xl text-lg leading-relaxed">
                        Explore a collection of my projects designing and building digital products — both personal and academic.
                    </p>
                </div>

                {/* ── Projects Grid ─────────────────────────────────── */}
                <div className="flex flex-col gap-16">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                    ))}
                </div>

                {/* ── Empty State ───────────────────────────────────── */}
                {projects.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-500">No projects found in content/projects/</p>
                    </div>
                )}
            </div>
        </main>
    )
}
