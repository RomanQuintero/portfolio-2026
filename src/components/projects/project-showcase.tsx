import Link from "next/link";
import { projectHref, type Project } from "@/lib/projects";
import { ProjectVisual } from "./project-visual";
export function ProjectStatus({ project }: { project: Project }) {
  return (
    <div className={`project-status project-status-${project.status}`}>
      <span className="mono">{project.typeLabel}</span>
      <span className="pill">{project.statusLabel}</span>
    </div>
  );
}
export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="tags project-tags" aria-label="Technologies and concepts">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
export function ProjectShowcase({ project }: { project: Project }) {
  const href = projectHref(project);
  return (
    <article
      className={`project-showcase showcase-${project.visual}`}
      aria-labelledby={`title-${project.slug}`}
    >
      <div className="showcase-kicker">
        <span className="showcase-number">{project.id}</span>
        <p className="eyebrow">{project.eyebrow}</p>
        <ProjectStatus project={project} />
      </div>
      <div className="showcase-content">
        <div className="showcase-copy">
          <h2 id={`title-${project.slug}`}>
            <Link href={href}>{project.title}</Link>
          </h2>
          {project.visual === "lab" ? (
            <p className="showcase-lab-line">
              Not one project.
              <br />A place where many of them started.
            </p>
          ) : null}
          <p className="showcase-description">
            {project.visual === "lab"
              ? "A personal workbench for ideas, prototypes and learning by building."
              : project.shortDescription}
          </p>
        </div>
        <ProjectVisual kind={project.visual} />
      </div>
      <div className="showcase-footer">
        <ProjectTags tags={project.technologies} />
        <Link
          className="button"
          href={href}
          aria-label={`View case study: ${project.title}`}
        >
          View case study <span>↗</span>
        </Link>
      </div>
    </article>
  );
}
