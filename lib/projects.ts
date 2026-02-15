import fs from "fs"
import path from "path"
import matter from "gray-matter"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export interface ProjectMetadata {
    title: string
    description: string
    year: string
    techStack: string[]
    link?: string
    github?: string
    image?: string
    category?: string
    slug: string
}

export function getProjects(): ProjectMetadata[] {
    // Create directory if it doesn't exist (safety check)
    if (!fs.existsSync(projectsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    const allProjectsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, "")

        // Read markdown file as string
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // Use gray-matter to parse the post metadata section
        const { data } = matter(fileContents)

        return {
            slug,
            ...(data as any),
        } as ProjectMetadata
    })

    // Sort projects by year (newest first)
    return allProjectsData.sort((a, b) => {
        if (a.year < b.year) {
            return 1
        } else {
            return -1
        }
    })
}
