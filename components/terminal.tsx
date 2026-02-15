"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { executeCommand, type CommandOutput } from "@/lib/commands"

interface HistoryEntry {
    command: string
    output: CommandOutput[]
}

export function Terminal() {
    const [history, setHistory] = useState<HistoryEntry[]>([])
    const [currentInput, setCurrentInput] = useState("")
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [isAnimating, setIsAnimating] = useState(false)
    const [visibleLines, setVisibleLines] = useState(0)
    const [currentAnimatingEntry, setCurrentAnimatingEntry] = useState<number>(-1)

    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-execute whoami on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            runCommand("whoami", true)
        }, 600)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [history, visibleLines])

    // Animate output lines
    useEffect(() => {
        if (currentAnimatingEntry < 0 || currentAnimatingEntry >= history.length) return

        const entry = history[currentAnimatingEntry]
        if (!entry || visibleLines >= entry.output.length) {
            setIsAnimating(false)
            setCurrentAnimatingEntry(-1)
            return
        }

        const timer = setTimeout(() => {
            setVisibleLines((prev) => prev + 1)
        }, 25)

        return () => clearTimeout(timer)
    }, [visibleLines, currentAnimatingEntry, history])

    function runCommand(input: string, isInitial = false) {
        const { output, isClear } = executeCommand(input)

        if (isClear) {
            setHistory([])
            setCurrentInput("")
            return
        }

        const newEntry: HistoryEntry = { command: isInitial ? "whoami" : input, output }

        setHistory((prev) => [...prev, newEntry])
        setCurrentInput("")

        if (!isInitial) {
            setCommandHistory((prev) => [input, ...prev])
        }
        setHistoryIndex(-1)

        // Start animation
        setIsAnimating(true)
        setVisibleLines(0)
        setCurrentAnimatingEntry((prev) => {
            // We just added an entry, so the index is the previous history length
            return history.length
        })
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && currentInput.trim() && !isAnimating) {
            runCommand(currentInput)
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistory[newIndex])
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault()
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistory[newIndex])
            } else if (historyIndex === 0) {
                setHistoryIndex(-1)
                setCurrentInput("")
            }
        }
    }

    function focusInput() {
        inputRef.current?.focus()
    }

    return (
        <div
            className="w-full max-w-4xl mx-auto rounded-lg border border-zinc-800 overflow-hidden
                 shadow-2xl shadow-black/50"
            onClick={focusInput}
        >
            {/* ── Title Bar ────────────────────────────────────── */}
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-zinc-500 ml-2 select-none">
                    whoami@portfolio ~
                </span>
            </div>

            {/* ── Terminal Body ────────────────────────────────── */}
            <div
                ref={scrollRef}
                className="bg-black/90 p-4 min-h-[350px] max-h-[500px] overflow-y-auto font-mono text-sm
                   cursor-text"
            >
                {/* Welcome message */}
                <div className="text-zinc-600 text-xs mb-4 select-none">
                    Welcome to Mohamed&apos;s portfolio terminal. Type &apos;help&apos; for commands.
                </div>

                {/* Command history */}
                {history.map((entry, i) => (
                    <div key={i} className="mb-1">
                        {/* Command line */}
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500/70 select-none">$</span>
                            <span className="text-zinc-300">{entry.command}</span>
                        </div>

                        {/* Output lines with animation */}
                        <div>
                            {entry.output.map((line, j) => {
                                // If this is the currently animating entry, only show up to visibleLines
                                const shouldShow =
                                    i < currentAnimatingEntry ||
                                    currentAnimatingEntry === -1 ||
                                    (i === currentAnimatingEntry && j < visibleLines)

                                if (!shouldShow) return null
                                return (
                                    <div
                                        key={j}
                                        className={`${line.className || "text-zinc-400"} whitespace-pre-wrap leading-relaxed`}
                                    >
                                        {line.text || "\u00A0"}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}

                {/* Input line */}
                <div className="flex items-center gap-2">
                    <span className="text-emerald-500/70 select-none">$</span>
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent text-zinc-300 outline-none caret-emerald-500/70
                         font-mono text-sm"
                            spellCheck={false}
                            autoComplete="off"
                            autoFocus
                            disabled={isAnimating}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
