export interface CommandOutput {
  text: string
  className?: string
}

export interface Command {
  name: string
  description: string
  execute: (args?: string[]) => CommandOutput[]
}

const commandRegistry = new Map<string, Command>()

// ─── Register: whoami ────────────────────────────────────────────
commandRegistry.set("whoami", {
  name: "whoami",
  description: "Display information about Mohamed El Haddad",
  execute: () => [
    { text: "", className: "" },
    { text: "  ╭──────────────────────────────────────────────────────────╮", className: "text-zinc-700" },
    { text: "  │                                                          │", className: "text-zinc-700" },
    { text: "  │   Mohamed El Haddad                                      │", className: "text-zinc-100 text-base font-semibold" },
    { text: "  │   Software Engineer & Backend Developer                  │", className: "text-emerald-400/80" },
    { text: "  │                                                          │", className: "text-zinc-700" },
    { text: "  ╰──────────────────────────────────────────────────────────╯", className: "text-zinc-700" },
    { text: "", className: "" },
    //
    // ── About ──
    { text: "  ┌─ About ─────────────────────────────────────────────────", className: "text-cyan-500/70" },
    { text: "  │", className: "text-zinc-700" },
    { text: "  │  Master's student in Computer Engineering at Abdelmalek", className: "text-zinc-400" },
    { text: "  │  Essaâdi University, Tetouan. Passionate about building", className: "text-zinc-400" },
    { text: "  │  scalable systems and solving complex algorithmic", className: "text-zinc-400" },
    { text: "  │  challenges.", className: "text-zinc-400" },
    { text: "  │", className: "text-zinc-700" },
    //
    // ── Current Role ──
    { text: "  ├─ Current Role ────────────────────────────────────────", className: "text-cyan-500/70" },
    { text: "  │", className: "text-zinc-700" },
    { text: "  │  ► AI Developer Intern @ LIADTECH (Remote)", className: "text-zinc-300" },
    { text: "  │    Building intelligent RAG systems with FastAPI,", className: "text-zinc-500" },
    { text: "  │    LangChain, and OpenAI embeddings.", className: "text-zinc-500" },
    { text: "  │", className: "text-zinc-700" },
    //
    // ── Education ──
    { text: "  ├─ Education ──────────────────────────────────────────", className: "text-cyan-500/70" },
    { text: "  │", className: "text-zinc-700" },
    { text: "  │  ► Master — Computer Engineering", className: "text-zinc-300" },
    { text: "  │    Abdelmalek Essaâdi University", className: "text-zinc-500" },
    { text: "  │  ► Bachelor — Mathematics & Computer Science", className: "text-zinc-300" },
    { text: "  │    Graduated with Honors (Mention Bien)", className: "text-zinc-500" },
    { text: "  │", className: "text-zinc-700" },
    //
    // ── Tech Stack ──
    { text: "  ├─ Tech Stack ─────────────────────────────────────────", className: "text-cyan-500/70" },
    { text: "  │", className: "text-zinc-700" },
    { text: "  │  backend    Java · Spring Boot · FastAPI · Python", className: "text-emerald-400/60" },
    { text: "  │  databases  PostgreSQL · MySQL · Oracle · Neo4j", className: "text-emerald-400/60" },
    { text: "  │  devops     Docker · GitHub Actions · Azure · AWS", className: "text-emerald-400/60" },
    { text: "  │  frontend   Angular · TypeScript", className: "text-emerald-400/60" },
    { text: "  │  ai/ml      LangChain · OpenAI · RAG · Kafka", className: "text-emerald-400/60" },
    { text: "  │", className: "text-zinc-700" },
    //
    // ── Certifications ──
    { text: "  ├─ Certifications ─────────────────────────────────────", className: "text-cyan-500/70" },
    { text: "  │", className: "text-zinc-700" },
    { text: "  │  ✓ OCI 2025 Certified DevOps Professional", className: "text-yellow-500/70" },
    { text: "  │  ✓ Neo4j Certified Professional", className: "text-yellow-500/70" },
    { text: "  │  ✓ HackerRank Software Engineer", className: "text-yellow-500/70" },
    { text: "  │", className: "text-zinc-700" },
    //
    // ── Achievements ──
    { text: "  ├─ Achievements ───────────────────────────────────────", className: "text-cyan-500/70" },
    { text: "  │", className: "text-zinc-700" },
    { text: "  │  🏆 1st Place — Problem Solving Competition", className: "text-zinc-300" },
    { text: "  │  🏆 1st Place — Secure Challenge 2025", className: "text-zinc-300" },
    { text: "  │", className: "text-zinc-700" },
    //
    // ── Contact ──
    { text: "  └─ Contact ────────────────────────────────────────────", className: "text-cyan-500/70" },
    { text: "", className: "" },
    { text: "     ✉  elhaddadmohamed963@gmail.com", className: "text-zinc-400" },
    { text: "     ↗  github.com · linkedin.com · leetcode.com", className: "text-zinc-500" },
    { text: "", className: "" },
    { text: "  Type 'help' to see available commands.", className: "text-zinc-600 text-xs" },
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
      { text: "  Available commands:", className: "text-zinc-300" },
      { text: "  ─────────────────────────────────", className: "text-zinc-700" },
    ]

    commandRegistry.forEach((cmd) => {
      lines.push({
        text: `  ${cmd.name.padEnd(12)} ${cmd.description}`,
        className: "text-zinc-400",
      })
    })

    lines.push({ text: "", className: "" })
    return lines
  },
})

// ─── Register: clear ─────────────────────────────────────────────
commandRegistry.set("clear", {
  name: "clear",
  description: "Clear the terminal",
  execute: () => [],
})

// ─── Public API ──────────────────────────────────────────────────
export function executeCommand(input: string): { output: CommandOutput[]; isClear: boolean } {
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
        { text: `  Command not found: ${commandName}`, className: "text-red-400/80" },
        { text: "  Type 'help' to see available commands.", className: "text-zinc-600" },
        { text: "", className: "" },
      ],
      isClear: false,
    }
  }

  return { output: command.execute(args), isClear: false }
}

export { commandRegistry }
