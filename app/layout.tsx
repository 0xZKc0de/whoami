import type { Metadata } from "next"
import { Habibi, Aref_Ruqaa, IBM_Plex_Mono, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { GrainOverlay } from "@/components/grain-overlay"

const habibi = Habibi({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-habibi",
})

const arefRuqaa = Aref_Ruqaa({
    weight: ["400", "700"],
    subsets: ["latin", "arabic"],
    variable: "--font-aref",
})

const ibmPlexMono = IBM_Plex_Mono({
    weight: ["300", "400", "500", "600"],
    subsets: ["latin"],
    variable: "--font-mono",
})

// Elegant serif font like in Kafka presentation
const cormorantGaramond = Cormorant_Garamond({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-cormorant",
})

export const metadata: Metadata = {
    title: "Marouane Boufarouj - Software Engineer",
    description: "Computer Science graduate, National School of Applied Sciences",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${habibi.variable} ${arefRuqaa.variable} ${ibmPlexMono.variable} ${cormorantGaramond.variable} font-mono antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <GrainOverlay />
            <Navigation />
            <div className="pt-24">
                {children}
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}