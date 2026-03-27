"use client"

import { useEffect } from "react"

export function VisitorTracker() {
  useEffect(() => {
    // Only trigger once per session to avoid spamming your inbox
    const hasTracked = sessionStorage.getItem("portfolio_tracked")
    if (hasTracked) return
    
    // Optional: Bypass localhost to prevent developer spam
    // if (window.location.hostname === "localhost") return

    sessionStorage.setItem("portfolio_tracked", "true")

    try {
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAgent: navigator.userAgent,
          language: navigator.language,
          time: new Date().toISOString(),
          url: window.location.href,
        })
      })
    } catch (e) {
      // Silently fail if tracker is blocked
    }
  }, [])

  return null
}
