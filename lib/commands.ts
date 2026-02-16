import { profile } from "./data/profile"
import { projects } from "./data/projects"

export interface CommandOutput {
  text: string
  className?: string
}

export interface CommandContext {
  projects?: any[]
  [key: string]: any
}

export interface Command {
  name: string
  description: string
  usage?: string
  execute: (args?: string[], context?: CommandContext) => CommandOutput[]
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
    { text: "  Software Engineer & System Architect", className: "text-zinc-500 text-xs uppercase tracking-wider mb-4" },

    // Abstract / Intro
    { text: "  Building software and solving problems—driven by logic and algorithms.", className: "text-zinc-300 mb-6" },
    // Interests
    { text: "  INTERESTS", className: "text-emerald-500/80 text-xs font-bold tracking-widest mb-2" },
    { text: "  •  Software Engineering", className: "text-zinc-300" },
    { text: "  •  Cryptography", className: "text-zinc-300" },
    { text: "  •  Distributed Systems", className: "text-zinc-300" },

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
  description: "Display technical skills and domains",
  execute: () => {
    const lines: CommandOutput[] = [
      { text: "", className: "" },
      { text: "  ~/skills", className: "text-emerald-500 font-bold mb-1" },
      { text: "  ├── 01_Programming_&_Logic/", className: "text-zinc-700 font-bold" },
      { text: "  │   ├── Programming/", className: "text-zinc-500" },
      { text: "  │   │   ├── Java", className: "text-zinc-300" },
      { text: "  │   │   ├── Python", className: "text-zinc-300" },
      { text: "  │   │   └── SQL", className: "text-zinc-300" },
      { text: "  │   └── Algorithmic_Thinking/", className: "text-zinc-500" },
      { text: "  │       ├── Data_Structures", className: "text-zinc-300" },
      { text: "  │       ├── Algorithms", className: "text-zinc-300" },
      { text: "  │       └── Complexity_Analysis", className: "text-zinc-300" },
      { text: "  ├── 02_Architecture_&_Design/", className: "text-zinc-700 font-bold" },
      { text: "  │   ├── Software_Design/", className: "text-zinc-500" },
      { text: "  │   │   ├── OOP", className: "text-zinc-300" },
      { text: "  │   │   ├── Design_Patterns", className: "text-zinc-300" },
      { text: "  │   │   └── Clean_Code", className: "text-zinc-300" },
      { text: "  │   └── API_Development/", className: "text-zinc-500" },
      { text: "  │       ├── REST", className: "text-zinc-300" },
      { text: "  │       ├── GraphQL", className: "text-zinc-300" },
      { text: "  │       ├── Security", className: "text-zinc-300" },
      { text: "  │       ├── Documentation", className: "text-zinc-300" },
      { text: "  │       └── Testing", className: "text-zinc-300" },
      { text: "  └── 03_Data_&_Infrastructure/", className: "text-zinc-700 font-bold" },
      { text: "      ├── Database_Management/", className: "text-zinc-500" },
      { text: "      │   ├── Normalization", className: "text-zinc-300" },
      { text: "      │   ├── Indexing", className: "text-zinc-300" },
      { text: "      │   ├── Query_Optimization", className: "text-zinc-300" },
      { text: "      │   └── Administration", className: "text-zinc-300" },
      { text: "      └── DevOps_&_Cloud/", className: "text-zinc-500" },
      { text: "          ├── CI/CD_Implementation", className: "text-zinc-300" },
      { text: "          ├── Git", className: "text-zinc-300" },
      { text: "          └── Docker", className: "text-zinc-300" },
      { text: "", className: "" },
    ]

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

    const projectsList = (context?.projects || projects) as any[]

    projectsList.forEach((project, index) => {
      const num = String(index + 1).padStart(2, "0")

      lines.push({
        text: `  ${num}. ${String(project.title).toUpperCase()}`,
        className: "text-zinc-100 font-bold tracking-wide"
      })

      lines.push({
        text: `  ${project.description}`,
        className: "text-zinc-400 mb-2"
      })

      if (project.techStack && Array.isArray(project.techStack) && project.techStack.length > 0) {
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
export function executeCommand(input: string, context?: CommandContext): { output: CommandOutput[]; isClear: boolean } {
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
