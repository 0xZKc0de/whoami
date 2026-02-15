export interface Project {
    title: string
    techStack: string[]
    description: string
    link: string // Link to the project repo or live demo
}

export const projects: Project[] = [
    {
        title: "AI Resume Builder",
        techStack: ["React", "Node.js", "OpenAI API", "MongoDB"],
        description: "Build ATS-friendly resumes in minutes using AI.",
        link: "https://github.com/0xZKc0de/ai-resume-builder",
    },
    {
        title: "EcoTrack - Carbon Footprint Monitor",
        techStack: ["Flutter", "Firebase", "Google Maps API"],
        description: "Mobile app to track daily carbon emissions and suggest eco-friendly habits.",
        link: "https://github.com/0xZKc0de/ecotrack",
    },
    {
        title: "DevDocs Search CLI",
        techStack: ["Rust", "Clap", "Algolia"],
        description: "Fast, offline-first CLI tool to search developer documentation.",
        link: "https://github.com/0xZKc0de/devdocs-cli",
    },
    {
        title: "Crypto portfolio tracker",
        techStack: ["Next.js", "Tailwind CSS", "CoinGecko API"],
        description: "Real-time cryptocurrency portfolio tracker with customizable alerts.",
        link: "https://github.com/0xZKc0de/crypto-tracker",
    },
];
