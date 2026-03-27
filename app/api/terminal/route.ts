import { NextResponse } from 'next/server'
import os from 'os'

export async function POST(req: Request) {
  try {
    const { command } = await req.json()

    if (command === 'server') {
      // Collect real-time server stats
      const memoryUsage = process.memoryUsage()
      const rssMB = (memoryUsage.rss / 1024 / 1024).toFixed(2)
      const heapMB = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2)
      
      const uptimeSecs = process.uptime()
      const uptimeStr = `${Math.floor(uptimeSecs / 3600)}h ${Math.floor((uptimeSecs % 3600) / 60)}m`
      const cpus = os.cpus()
      const cpuModel = cpus.length > 0 ? cpus[0].model : 'Unknown Architecture'

      // Slight delay to demonstrate the async fetch loader effectively
      await new Promise(resolve => setTimeout(resolve, 800))

      return NextResponse.json({
        output: [
          { text: "", className: "" },
          { text: "  [ESTABLISHED] Secure connection to backend sandbox", className: "text-emerald-500/90 font-bold mb-3 font-mono" },
          { text: "  SYSTEM SPECIFICATIONS", className: "text-zinc-500 tracking-widest text-[10px] uppercase mb-1 font-mono font-bold" },
          { text: `  OS/Platform : ${os.platform()} (${os.release()})`, className: "text-zinc-300 font-mono" },
          { text: `  Architecture: ${os.arch()}`, className: "text-zinc-300 font-mono" },
          { text: `  CPU Model   : ${cpuModel}`, className: "text-zinc-300 font-mono" },
          { text: `  Node Version: ${process.version}`, className: "text-zinc-300 font-mono" },
          { text: "", className: "" },
          { text: "  RUNTIME METRICS", className: "text-zinc-500 tracking-widest text-[10px] uppercase mb-1 font-mono font-bold" },
          { text: `  Instance Uptime: ${uptimeStr}`, className: "text-amber-400/80 font-mono" },
          { text: `  Memory RSS     : ${rssMB} MB`, className: "text-cyan-400/80 font-mono" },
          { text: `  Heap Used      : ${heapMB} MB`, className: "text-cyan-400/80 font-mono" },
          { text: "", className: "" },
          { text: "  [INFO] Running inside a Vercel Serverless Function environment.", className: "text-zinc-600 italic text-[10px] md:text-xs mb-2 font-mono" },
          { text: "", className: "" },
        ]
      })
    }

    return NextResponse.json({ 
      output: [{ text: `  Unknown server task: ${command}`, className: "text-red-500" }] 
    })

  } catch (error) {
    return NextResponse.json(
      { output: [{ text: "  [ERROR] Internal server error processing API Route.", className: "text-red-500" }] },
      { status: 500 }
    )
  }
}
