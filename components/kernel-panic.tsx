"use client"

import { useState, useEffect } from "react"

interface KernelPanicProps {
  isActive: boolean
  onRecoveryComplete: () => void
}

const PANIC_LINES = [
  { text: "Kernel panic - not syncing: Attempted to kill init! exitcode=0x0000000b", delay: 0 },
  { text: "", delay: 50 },
  { text: " CPU: 0 PID: 1 Comm: portfolio Not tainted 5.15.0-elhaddad #1", delay: 100 },
  { text: " Hardware name: Vercel Edge Network (DT)", delay: 130 },
  { text: " Call Trace:", delay: 170 },
  { text: "  do_exit+0xba5/0xbc0", delay: 190 },
  { text: "  do_group_exit+0x33/0xb0", delay: 210 },
  { text: "  __x64_sys_exit_group+0x14/0x20", delay: 230 },
  { text: "  entry_SYSCALL_64_after_hwframe+0x44/0xae", delay: 260 },
  { text: " RIP: 0033:0x7f2c8e8a5d3a RSP: 002b:00007fff5e3a7ce8", delay: 300 },
  { text: "", delay: 350 },
  { text: " ---[ end Kernel panic - not syncing: Attempted to kill init! ]---", delay: 400 },
  { text: "", delay: 500 },
  { text: " Nice try. This system is immutable. 😏", delay: 600 },
]

export function KernelPanic({ isActive, onRecoveryComplete }: KernelPanicProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)
  const [showPanic, setShowPanic] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setVisibleLines(0)
      setGlitchActive(false)
      setShowPanic(false)
      return
    }

    // Quick glitch flash then show panic
    setGlitchActive(true)
    const t = setTimeout(() => {
      setGlitchActive(false)
      setShowPanic(true)
    }, 400)

    return () => clearTimeout(t)
  }, [isActive])

  // Animate panic lines fast
  useEffect(() => {
    if (!showPanic) return
    if (visibleLines >= PANIC_LINES.length) {
      // Auto-recover after 2 seconds
      const t = setTimeout(() => onRecoveryComplete(), 2000)
      return () => clearTimeout(t)
    }

    const next = PANIC_LINES[visibleLines]
    const t = setTimeout(() => setVisibleLines(p => p + 1), next?.delay || 50)
    return () => clearTimeout(t)
  }, [showPanic, visibleLines, onRecoveryComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black font-mono text-sm overflow-hidden">
      {/* Glitch flash */}
      {glitchActive && <div className="absolute inset-0 kernel-glitch" />}

      {/* Panic content */}
      {showPanic && (
        <div className="p-6 md:p-10">
          {PANIC_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.text === "" ? "" :
                line.text.includes("Kernel panic") ? "text-red-500 font-bold" :
                line.text.includes("end Kernel panic") ? "text-red-400 font-bold" :
                line.text.includes("Nice try") ? "text-amber-400 font-bold text-lg mt-2" :
                "text-zinc-500"
              }`}
            >
              {line.text || "\u00A0"}
            </div>
          ))}
          {visibleLines > 0 && visibleLines < PANIC_LINES.length && (
            <span className="inline-block w-2 h-4 bg-red-500 animate-pulse" />
          )}
        </div>
      )}
    </div>
  )
}
