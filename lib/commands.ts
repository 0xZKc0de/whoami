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
    { text: "  Software Engineer & Backend Developer", className: "text-zinc-500 text-xs uppercase tracking-wider mb-4" },

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

// ─── Register: skills (Visual Feature) ───────────────────────────
commandRegistry.set("skills", {
  name: "skills",
  description: "Display visual technical skills sequence",
  execute: () => {
    return [
      { text: "", className: "" },
      { text: "  >> Launching visual skills sequence...", className: "text-emerald-500/80 font-bold mb-3 font-mono" },
      { text: "  [SYSTEM] Background visualizer activated. Type 'clear' to dismiss.", className: "text-zinc-500 font-mono italic text-xs mb-2" },
      { text: "", className: "" },
    ]
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
