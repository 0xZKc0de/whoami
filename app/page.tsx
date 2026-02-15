import { ProjectCard } from "@/components/project-card"

export default function Home() {
  const projects = [
    {
      title: "95ninefive - Distributed Online Judge",
      label: "Personal",
      description: "Architected a scalable code execution and validation system across 7 programming languages through an asynchronous, event-driven pipeline. Enabled safe execution of untrusted user code in ephemeral, network-isolated containers."
    },
    {
      title: "Oracle - Internship",
      label: "Research Assistant",
      description: "Built an AI-powered Code Review Assistant to automate detection of CRM-specific antipatterns in JavaScript customizations. Replaced resource-intensive manual reviews by experts, achieving consistent validation at scale across multiple client projects."
    },
    {
      title: "Git Internals",
      label: "Personal",
      description: "Implemented a minimal Git-like version control system from scratch, including content-addressable storage, object serialization, and tree traversal. Explored low-level filesystem operations and binary encoding formats to accurately replicate Git's internal architecture."
    },
    {
      title: "Oracle - Internship",
      label: "Research Assistant",
      description: "Optimized graph-based approximate nearest neighbor search by reducing computational cost during inference. Implemented precomputation techniques to bypass redundant distance calculations, achieving faster searches without sacrificing accuracy on high-dimensional datasets."
    }
  ]

  return (
      <main className="min-h-screen px-8 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section - Using Cormorant Garamond for elegant presentation style */}
          <div className="mb-24">
            <h1 className="font-cormorant text-4xl md:text-5xl font-medium mb-4 tracking-tight">
              Software Engineer
            </h1>
            <p className="text-sm text-zinc-400 font-mono font-light">
              Computer Science Student, Faculty of Science Tetouan
            </p>
          </div>

          {/* Projects Section */}
          <div id="work" className="space-y-0">
            {projects.map((project, index) => (
                <ProjectCard
                    key={index}
                    title={project.title}
                    label={project.label}
                    description={project.description}
                />
            ))}
          </div>
        </div>
      </main>
  )
}