"use client"

import { useEffect, useState } from "react"

interface SkillsMarqueeProps {
  isVisible: boolean
}

const webLogos = [
  { name: "Spring Boot", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Angular", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
  { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "GraphQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" },
  { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Oracle", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
]

const devopsLogos = [
  { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "NGINX", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub Actions", url: "https://cdn.simpleicons.org/githubactions" },
  { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Kubernetes", url: "https://cdn.simpleicons.org/kubernetes" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Grafana", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
  { name: "Prometheus", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Azure", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { name: "Kafka", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
]

const aiLogos = [
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "MCP", url: "https://cdn.simpleicons.org/anthropic" },
  { name: "Langchain", url: "https://cdn.simpleicons.org/langchain" },
  { name: "Langgraph", url: "https://cdn.simpleicons.org/langgraph" },
  { name: "LangSmith", url: "https://cdn.simpleicons.org/langchain" },
  { name: "PyTorch", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "ChromaDB", url: "https://dbdb.io/media/logos/chroma_H600YUl.svg" },
  { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
]

export function SkillsMarquee({ isVisible }: SkillsMarqueeProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const row1 = [...webLogos, ...webLogos, ...webLogos]
  const row2 = [...[...devopsLogos].reverse(), ...[...devopsLogos].reverse(), ...[...devopsLogos].reverse()]
  const row3 = [...aiLogos, ...aiLogos, ...aiLogos]

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 overflow-hidden flex flex-col justify-center gap-8 md:gap-12 ${
        isVisible ? "opacity-15 dark:opacity-20" : "opacity-0"
      }`}
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row1.map((skill, i) => (
          <div key={`r1-${i}`} className="mx-6 md:mx-10 flex flex-col items-center justify-center dark:brightness-0 dark:invert transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.url} alt={skill.name} className="h-14 w-14 md:h-20 md:w-20 object-contain opacity-70" />
            <span className="text-[10px] md:text-xs text-zinc-500 font-mono mt-2 opacity-50">{skill.name}</span>
          </div>
        ))}
      </div>
      
      <div className="flex w-max animate-marquee-reverse whitespace-nowrap">
        {row2.map((skill, i) => (
          <div key={`r2-${i}`} className="mx-6 md:mx-10 flex flex-col items-center justify-center dark:brightness-0 dark:invert transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.url} alt={skill.name} className="h-14 w-14 md:h-20 md:w-20 object-contain opacity-70" />
            <span className="text-[10px] md:text-xs text-zinc-500 font-mono mt-2 opacity-50">{skill.name}</span>
          </div>
        ))}
      </div>

      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row3.map((skill, i) => (
          <div key={`r3-${i}`} className="mx-6 md:mx-10 flex flex-col items-center justify-center dark:brightness-0 dark:invert transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.url} alt={skill.name} className="h-14 w-14 md:h-20 md:w-20 object-contain opacity-70" />
            <span className="text-[10px] md:text-xs text-zinc-500 font-mono mt-2 opacity-50">{skill.name}</span>
          </div>
        ))}
      </div>
      
      {/* Heavy fade at top, bottom, and sides to blend seamlessly into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-[#09090b] dark:via-transparent dark:to-[#09090b] z-10 pointer-events-none"></div>
    </div>
  )
}
