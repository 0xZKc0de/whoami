import { profile } from "./data/profile"
import { projects } from "./data/projects"

export interface CommandOutput {
  text: string
  className?: string
}

export interface Command {
  name: string
  description: string
  usage?: string
  execute: (args?: string[], context?: any) => CommandOutput[]
}

const commandRegistry = new Map<string, Command>()

// ─── Register: whoami (MINIMAL / EXPERT STYLE) ──────────────────
commandRegistry.set("whoami", {
  name: "whoami",
  description: "Display profile",
  execute: () => [
    { text: "", className: "" },
    // Minimal Banner - Just the Name
    { text: "  MOHAMED EL HADDAD", className: "text-zinc-100 font-bold tracking-widest text-lg" },
    { text: "  Software Engineer & Backend Developer", className: "text-zinc-500 text-xs uppercase tracking-wider mb-4" },

    // Abstract / Intro
    { text: "  Building scalable systems and solving complex algorithmic challenges.", className: "text-zinc-300 mb-2" },
    { text: "  Master's student in Computer Engineering.", className: "text-zinc-400 mb-6" },

    // Current Focus / Interests (The "What I do" section)
    { text: "  CURRENT FOCUS", className: "text-emerald-500/80 text-xs font-bold tracking-widest mb-2" },
    { text: "  •  Designing high-throughput backend architectures", className: "text-zinc-300" },
    { text: "  •  Developing intelligent RAG systems with LLMs", className: "text-zinc-300" },
    { text: "  •  Cloud-native DevOps & Infrastructure as Code", className: "text-zinc-300" },
    { text: "  •  Graph databases & Knowledge representation", className: "text-zinc-300" },

    { text: "", className: "" },
    { text: "  Usage: type 'help' to see available commands", className: "text-zinc-600 text-xs" },
    { text: "", className: "" },
  ],
})

// ─── Register: help ──────────────────────────────────────────────
commandRegistry.set("help", {
  name: "help",
  description: "List all available commands",
  execute: () => {
    const lines: CommandOutput[] = [
      { text: "", className: "" },
      { text: "  Available Commands", className: "text-emerald-500/80 text-xs font-bold tracking-widest uppercase mb-3" },
    ]

    commandRegistry.forEach((cmd) => {
      lines.push({
        text: `  ${cmd.name.padEnd(12)}  ${cmd.description}`,
        className: "text-zinc-300",
      })
    })

    lines.push({ text: "", className: "" })
    lines.push({ text: "  Navigation: ↑↓ arrows for history • Tab for autocomplete", className: "text-zinc-600 text-xs" })
    lines.push({ text: "", className: "" })
    return lines
  },
})

// ─── Register: skills ────────────────────────────────────────────
commandRegistry.set("skills", {
  name: "skills",
  description: "Display technical skills with proficiency",
  execute: () => {
    const skills = [
      {
        category: "Languages", items: [
          { name: "Java", level: 9 },
          { name: "Python", level: 8 },
          { name: "TypeScript", level: 7 },
          { name: "SQL", level: 8 },
        ]
      },
      {
        category: "Backend", items: [
          { name: "Spring Boot", level: 9 },
          { name: "FastAPI", level: 8 },
          { name: "Node.js", level: 6 },
          { name: "REST APIs", level: 9 },
        ]
      },
      {
        category: "DevOps", items: [
          { name: "Docker", level: 8 },
          { name: "CI/CD", level: 8 },
          { name: "AWS", level: 7 },
          { name: "Azure", level: 7 },
        ]
      },
      {
        category: "AI / ML", items: [
          { name: "LangChain", level: 8 },
          { name: "OpenAI", level: 8 },
          { name: "RAG Systems", level: 8 },
          { name: "Kafka", level: 7 },
        ]
      },
    ]

    const lines: CommandOutput[] = [
      { text: "", className: "" },
      { text: "  Technical Proficiency", className: "text-emerald-500/80 text-xs font-bold tracking-widest uppercase mb-3" },
    ]

    skills.forEach((cat) => {
      lines.push({ text: `  ${cat.category}`, className: "text-cyan-400/80 text-xs uppercase tracking-wider mb-2" })

      cat.items.forEach((skill) => {
        const filled = "█".repeat(skill.level)
        const empty = "░".repeat(10 - skill.level)
        const pct = `${skill.level * 10}%`
        lines.push({
          text: `  ${skill.name.padEnd(14)} ${filled}${empty}  ${pct}`,
          className: skill.level >= 8 ? "text-emerald-300/80" : skill.level >= 6 ? "text-cyan-300/60" : "text-zinc-500",
        })
      })

      lines.push({ text: "", className: "" })
    })

    return lines
  },
})

// ─── Register: projects (card style) ─────────────────────────────
commandRegistry.set("projects", {
  name: "projects",
  description: "List featured projects",
  execute: (args, context) => {
    const lines: CommandOutput[] = [
      { text: "", className: "" },
      { text: "  Featured Projects", className: "text-emerald-500/80 text-xs font-bold tracking-widest uppercase mb-3" },
    ]

    const projectsList = context?.projects || projects

    projectsList.forEach((project: any, index: number) => {
      const num = String(index + 1).padStart(2, "0")

      lines.push({
        text: `  ${num}. ${project.title.toUpperCase()}`,
        className: "text-zinc-100 font-bold tracking-wide"
      })

      lines.push({
        text: `  ${project.description}`,
        className: "text-zinc-400 mb-2"
      })

      if (project.techStack && project.techStack.length > 0) {
        lines.push({
          text: `  [ ${project.techStack.join(" / ")} ]`,
          className: "text-emerald-500/60 text-xs"
        })
      }

      if (project.link || project.github) {
        lines.push({
          text: `  ➜ ${project.link || project.github}`,
          className: "text-blue-400/60 text-xs hover:text-blue-300 transition-colors cursor-pointer"
        })
      }

      lines.push({ text: "", className: "" })
    })

    return lines
  },
})

// ─── Register: social ────────────────────────────────────────────
commandRegistry.set("social", {
  name: "social",
  description: "Display social links",
  execute: () => {
    const lines: CommandOutput[] = [
      { text: "", className: "" },
      { text: "  Connect", className: "text-emerald-500/80 text-xs font-bold tracking-widest uppercase mb-3" },
    ]

    profile.social.forEach((link) => {
      lines.push({ text: `  ${link.platform.padEnd(12)} ${link.url}`, className: "text-zinc-300" })
    })

    lines.push({ text: "", className: "" })
    return lines
  },
})

// ─── Register: clear ─────────────────────────────────────────────
commandRegistry.set("clear", {
  name: "clear",
  description: "Clear terminal",
  execute: () => [],
})

// ─── Public API ──────────────────────────────────────────────────
export function executeCommand(input: string, context?: any): { output: CommandOutput[]; isClear: boolean } {
  const trimmed = input.trim().toLowerCase()
  const [commandName, ...args] = trimmed.split(/\s+/)

  if (!commandName) {
    return { output: [], isClear: false }
  }

  if (commandName === "clear") {
    return { output: [], isClear: true }
  }

  const command = commandRegistry.get(commandName)

  if (!command) {
    return {
      output: [
        { text: "", className: "" },
        { text: `  Command not found: ${commandName}`, className: "text-red-400/80" },
        { text: "  Type 'help' to see available commands.", className: "text-zinc-600 text-xs" },
        { text: "", className: "" },
      ],
      isClear: false,
    }
  }

  return { output: command.execute(args, context), isClear: false }
}

export { commandRegistry }
