import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { Project } from "@/lib/api";

export const SectionTitle = ({ children, line = true }: { children: ReactNode; line?: boolean }) => (
  <div className="flex items-center gap-4">
    <h2 className="shrink-0 text-[32px] font-medium leading-none text-white">
      <span className="text-primary">#</span>{children}
    </h2>
    {line && <span className="h-px w-full max-w-[510px] bg-primary" aria-hidden="true" />}
  </div>
);

export const DotGrid = ({ className = "" }: { className?: string }) => (
  <span className={`dot-grid block h-[84px] w-[84px] ${className}`} aria-hidden="true" />
);

export const OutlineSquares = ({ className = "" }: { className?: string }) => (
  <span className={`relative block h-[112px] w-[112px] ${className}`} aria-hidden="true">
    <span className="absolute left-0 top-8 h-16 w-16 border border-primary" />
    <span className="absolute right-0 top-0 h-16 w-16 border border-primary" />
    <span className="absolute bottom-0 right-6 h-16 w-16 border border-primary" />
  </span>
);

export const ProjectCard = ({ project, compact = false }: { project: Project; compact?: boolean }) => (
  <article className="flex h-full flex-col border border-muted-foreground bg-background transition-colors hover:border-primary">
    {!compact && (
      <Link to={`/projects/${project.slug}`} className="block aspect-[330/201] overflow-hidden border-b border-muted-foreground">
        <img
          src={project.image_url}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
    )}
    <div className="flex min-h-10 flex-wrap gap-x-2 gap-y-1 border-b border-muted-foreground px-2 py-2 text-sm text-muted-foreground">
      {project.technologies.slice(0, compact ? 4 : 6).map((technology) => (
        <span key={technology}>{technology}</span>
      ))}
    </div>
    <div className="flex flex-1 flex-col items-start gap-4 p-4">
      <h3 className="text-2xl font-medium leading-tight text-white">{project.title}</h3>
      <p className="line-clamp-2 text-base leading-relaxed text-muted-foreground">{project.short_description}</p>
      <div className="mt-auto flex flex-wrap gap-4">
        <Link to={`/projects/${project.slug}`} className="portfolio-button">
          Détails <ExternalLink className="h-4 w-4" />
        </Link>
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" className="portfolio-button portfolio-button-muted">
            Code <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  </article>
);

export const SkillBlock = ({ title, items }: { title: string; items: string[] }) => (
  <div className="border border-muted-foreground bg-background">
    <h3 className="border-b border-muted-foreground px-2 py-2 font-semibold text-white">{title}</h3>
    <p className="flex flex-wrap gap-x-2 gap-y-1 px-2 py-2 leading-relaxed text-muted-foreground">
      {items.map((item) => <span key={item}>{item}</span>)}
    </p>
  </div>
);
