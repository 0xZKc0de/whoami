"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const currentScrollY = window.scrollY
            const maxScrollY = document.documentElement.scrollHeight - window.innerHeight
            
            if (maxScrollY > 0) {
                const percentage = (currentScrollY / maxScrollY) * 100
                setProgress(percentage)
            } else {
                setProgress(0)
            }
        }

        window.addEventListener("scroll", updateProgress, { passive: true })
        
        // Initial call
        updateProgress()

        return () => window.removeEventListener("scroll", updateProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-900 z-50">
            <div 
                className="h-full bg-emerald-500 transition-all duration-150 ease-out" 
                style={{ width: `${progress}%` }} 
            />
        </div>
    )
}
