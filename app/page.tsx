import { Terminal } from "@/components/terminal"
import { Footer } from "@/components/footer"
import { getProjects } from "@/lib/projects"

export default function Home() {
  const projects = getProjects()

  return (
    <>
      <main className="min-h-screen px-8 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="mb-20 text-center pt-12">
            <h1 className="font-cormorant text-5xl md:text-7xl font-medium tracking-tight mb-4">
              Software Engineer
            </h1>
            <p className="font-mono text-sm md:text-base text-zinc-400 font-light">
              Computer Engineering Student, Abdelmalek Essaâdi University
            </p>
          </section>

          {/* Terminal Section */}
          <section id="about" className="mb-24 scroll-mt-24">
            <Terminal projects={projects} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}