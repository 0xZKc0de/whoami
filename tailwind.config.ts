import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
                habibi: ["var(--font-habibi)", "serif"],
                aref: ["var(--font-aref)", "serif"],
                cormorant: ["var(--font-cormorant)", "serif"],
            },
        },
    },
};

export default config;