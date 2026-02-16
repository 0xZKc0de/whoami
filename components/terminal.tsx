"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { executeCommand, commandRegistry, type CommandOutput } from "@/lib/commands"

interface HistoryEntry {
    command: string
    output: CommandOutput[]
}

interface TerminalProps {
    projects?: any[]
}

export function Terminal({ projects }: TerminalProps) {
    const [history, setHistory] = useState<HistoryEntry[]>([])
    const [currentInput, setCurrentInput] = useState("")
    const [commandHistoryList, setCommandHistoryList] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [isAnimating, setIsAnimating] = useState(false)
    const [visibleLines, setVisibleLines] = useState(0)
    const [currentAnimatingEntry, setCurrentAnimatingEntry] = useState<number>(-1)
    const [isFocused, setIsFocused] = useState(true)

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
        }, 20)

        return () => clearTimeout(timer)
    }, [visibleLines, currentAnimatingEntry, history])

    function runCommand(input: string, isInitial = false) {
        const { output, isClear } = executeCommand(input, { projects })

        if (isClear) {
            setHistory([])
            setCurrentInput("")
            return
        }

        const newEntry: HistoryEntry = { command: isInitial ? "whoami" : input, output }

        setHistory((prev) => [...prev, newEntry])
        setCurrentInput("")

        if (!isInitial) {
            setCommandHistoryList((prev) => [input, ...prev])
        }
        setHistoryIndex(-1)

        // Start animation
        setIsAnimating(true)
        setVisibleLines(0)
        setCurrentAnimatingEntry(() => {
            return history.length
        })
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && currentInput.trim() && !isAnimating) {
            runCommand(currentInput)
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            if (commandHistoryList.length > 0 && historyIndex < commandHistoryList.length - 1) {
                const newIndex = historyIndex + 1
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistoryList[newIndex])
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault()
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistoryList[newIndex])
            } else if (historyIndex === 0) {
                setHistoryIndex(-1)
                setCurrentInput("")
            }
        } else if (e.key === "Tab") {
            e.preventDefault()
            // Simple tab completion
            if (currentInput.trim()) {
                const match = Array.from(commandRegistry.keys()).find((cmd) =>
                    cmd.startsWith(currentInput.trim().toLowerCase())
                )
                if (match) {
                    setCurrentInput(match)
                }
            }
        }
    }

    function focusInput() {
        inputRef.current?.focus()
    }

    // Get suggestion for autocomplete hint
    const suggestion = currentInput.trim()
        ? Array.from(commandRegistry.keys()).find((cmd) =>
            cmd.startsWith(currentInput.trim().toLowerCase()) && cmd !== currentInput.trim().toLowerCase()
        )
        : undefined

    const commandCount = commandRegistry.size

    return (
        <div
            className={`w-full max-w-4xl mx-auto rounded-xl overflow-hidden transition-all duration-500 
                ${isFocused
                    ? "shadow-[0_0_60px_-15px_rgba(16,185,129,0.15)] border border-zinc-700/50"
                    : "shadow-2xl shadow-black/50 border border-zinc-800/50"
                }`}
            onClick={focusInput}
        >
            {/* ── Title Bar ────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-800/50">
                <div className="flex items-center gap-3">
                    {/* Traffic lights */}
                    <div className="flex gap-2 group">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-400 transition-colors relative cursor-pointer">
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity font-bold">×</span>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-400 transition-colors relative cursor-pointer">
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity font-bold">−</span>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 group-hover:bg-green-400 transition-colors relative cursor-pointer">
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-green-900 opacity-0 group-hover:opacity-100 transition-opacity font-bold">+</span>
                        </div>
                    </div>

                    {/* Tab indicator */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800/50 border border-zinc-700/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                        <span className="text-[10px] font-mono text-zinc-500 select-none">
                            guest@portfolio:~/whoami
                        </span>
                    </div>
                </div>

                {/* Right side tab area */}
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-600 select-none">
                        bash
                    </span>
                </div>
            </div>

            {/* ── Terminal Body ────────────────────────────────── */}
            <div className="relative">
                {/* Top scroll shadow */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-zinc-950 to-transparent z-10 pointer-events-none opacity-60" />

                <div
                    ref={scrollRef}
                    className="bg-zinc-950/95 backdrop-blur-sm p-5 min-h-[380px] max-h-[520px] overflow-y-auto font-mono text-sm
                       cursor-text terminal-scrollbar"
                >
                    {/* Welcome message */}
                    <div className="text-zinc-600 text-xs mb-4 select-none space-y-1 pt-2">
                        <div className="text-zinc-500">
                            Welcome to <span className="text-emerald-500/60">Mohamed&apos;s</span> portfolio terminal.
                        </div>
                        <div>
                            Type <span className="text-zinc-400">&apos;help&apos;</span> for available commands. Tab to autocomplete.
                        </div>
                    </div>

                    {/* Command history */}
                    {history.map((entry, i) => (
                        <div key={i} className="mb-1">
                            {/* Command line with styled prompt */}
                            <div className="flex items-center gap-0 flex-wrap">
                                <span className="text-cyan-500/60 select-none text-xs">guest</span>
                                <span className="text-zinc-600 select-none text-xs">@</span>
                                <span className="text-cyan-500/60 select-none text-xs">portfolio</span>
                                <span className="text-zinc-600 select-none text-xs mx-1">:</span>
                                <span className="text-purple-400/50 select-none text-xs">~</span>
                                <span className="text-emerald-500/70 select-none ml-1.5 mr-2 text-xs">$</span>
                                <span className="text-zinc-200">{entry.command}</span>
                            </div>

                            {/* Output lines with animation */}
                            <div>
                                {entry.output.map((line, j) => {
                                    const shouldShow =
                                        i < currentAnimatingEntry ||
                                        currentAnimatingEntry === -1 ||
                                        (i === currentAnimatingEntry && j < visibleLines)

                                    if (!shouldShow) return null
                                    return (
                                        <div
                                            key={j}
                                            className={`${line.className || "text-zinc-400"} whitespace-pre-wrap leading-relaxed terminal-line-enter`}
                                        >
                                            {line.text || "\u00A0"}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Input line */}
                    <div className="flex items-center gap-0 flex-wrap">
                        <span className="text-cyan-500/60 select-none text-xs">guest</span>
                        <span className="text-zinc-600 select-none text-xs">@</span>
                        <span className="text-cyan-500/60 select-none text-xs">portfolio</span>
                        <span className="text-zinc-600 select-none text-xs mx-1">:</span>
                        <span className="text-purple-400/50 select-none text-xs">~</span>
                        <span className="text-emerald-500/70 select-none ml-1.5 mr-2 text-xs">$</span>
                        <div className="flex-1 relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="w-full bg-transparent text-zinc-200 outline-none caret-transparent
                                     font-mono text-sm"
                                spellCheck={false}
                                autoComplete="off"
                                autoFocus
                                disabled={isAnimating}
                            />
                            {/* Custom blinking cursor */}
                            <span
                                className="absolute top-0 pointer-events-none text-zinc-200"
                                style={{ left: `${currentInput.length}ch` }}
                            >
                                <span className="terminal-cursor">▎</span>
                            </span>
                            {/* Autocomplete suggestion */}
                            {suggestion && (
                                <span
                                    className="absolute top-0 pointer-events-none text-zinc-700"
                                    style={{ left: `${currentInput.length}ch` }}
                                >
                                    {suggestion.slice(currentInput.trim().length)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom scroll shadow */}
                <div className="absolute bottom-8 left-0 right-0 h-6 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none opacity-60" />
            </div>

            {/* ── Status Bar ────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800/50 text-[10px] font-mono select-none">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${isAnimating ? "bg-amber-500/80 animate-pulse" : "bg-emerald-500/80"}`} />
                        <span className="text-zinc-500">
                            {isAnimating ? "Processing..." : "Ready"}
                        </span>
                    </div>
                    <span className="text-zinc-700">│</span>
                    <span className="text-zinc-600">{commandCount} commands</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-zinc-600">UTF-8</span>
                    <span className="text-zinc-700">│</span>
                    <span className="text-zinc-600">bash</span>
                </div>
            </div>
        </div>
    )
}
