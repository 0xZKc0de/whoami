interface ProjectCardProps {
    title: string
    label: string
    description: string
}

export function ProjectCard({ title, label, description }: ProjectCardProps) {
    return (
        <div className="border-t border-zinc-800 pt-6 pb-6">
            <div className="mb-2">
                <h3 className="text-sm font-cormorant inline font-medium">
                    {title}
                </h3>
                <span className="text-sm font-mono text-zinc-500 italic ml-2 font-light">
          {label}
        </span>
            </div>
            <p className="text-xs font-mono text-zinc-400 leading-relaxed font-light">
                {description}
            </p>
        </div>
    )
}