import Link from "next/link";
import {
  projectHref,
  projects,
  type Project,
  type ProjectSection,
} from "@/lib/projects";
import { ProjectStatus, ProjectTags } from "./project-showcase";
import { ProjectVisual } from "./project-visual";
function CaseSection({
  section,
  index,
}: {
  section: ProjectSection;
  index: number;
}) {
  return (
    <section
      id={section.id}
      className={`case-section case-section-${section.kind}`}
      aria-labelledby={`section-${section.id}`}
    >
      <div className="case-section-label">
        <span className="mono">
          {String(index + 1).padStart(2, "0")} / CASE NOTES
        </span>
        <h2 id={`section-${section.id}`}>{section.title}</h2>
      </div>
      <div className="case-section-body">
        {section.introduction && (
          <p className="case-introduction">{section.introduction}</p>
        )}
        {section.kind === "prose" &&
          section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        {section.kind === "pipeline" && (
          <ol className="case-pipeline" aria-label={section.title}>
            {section.steps.map((step, i) => (
              <li key={step.title}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                {step.description && <p>{step.description}</p>}
              </li>
            ))}
          </ol>
        )}
        {section.kind === "cards" && (
          <div className="case-note-grid">
            {section.items.map((item) => (
              <div className="case-note" key={item.title}>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                {item.tags && <ProjectTags tags={item.tags} />}
              </div>
            ))}
          </div>
        )}
        {section.kind === "fragments" && (
          <ul className="case-fragments">
            {section.fragments.map((fragment) => (
              <li key={fragment}>{fragment}</li>
            ))}
          </ul>
        )}
        {section.note && <p className="case-note-caption">{section.note}</p>}
      </div>
    </section>
  );
}
export function ProjectDetail({ project }: { project: Project }) {
  const related = projects.filter((other) => other.slug !== project.slug);
  return (
    <article className={`project-detail detail-${project.visual}`}>
      <div className="wrap">
        <nav className="case-breadcrumb mono" aria-label="Breadcrumb">
          <Link href="/projects">← Selected work</Link>
          <span>
            {project.id} / {project.eyebrow}
          </span>
        </nav>
        <header className="case-hero">
          <ProjectStatus project={project} />
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>
            {project.title}
            <span>.</span>
          </h1>
          {project.visual === "lab" ? (
            <p className="case-lab-line">
              Not one project.
              <br />A place where many of them started.
            </p>
          ) : (
            <p className="case-summary">{project.shortDescription}</p>
          )}
          <ProjectTags tags={project.technologies} />
        </header>
        <ProjectVisual kind={project.visual} detail />
        <nav className="case-index" aria-label="Case study sections">
          {project.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
        <div className="case-sections">
          {project.sections.map((section, i) => (
            <CaseSection key={section.id} section={section} index={i} />
          ))}
        </div>
        {project.archiveEntries && project.archiveEntries.length > 0 && (
          <section className="case-archive">
            <h2>From the archive</h2>
            {project.archiveEntries.map((entry) => (
              <article key={entry.title}>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                <ProjectTags tags={entry.technologies} />
                {entry.url && (
                  <a href={entry.url} target="_blank" rel="noreferrer">
                    View material ↗
                  </a>
                )}
              </article>
            ))}
          </section>
        )}
        {project.repository || project.externalLinks?.length ? (
          <aside className="case-resources" aria-label="Project materials">
            {project.repository && (
              <a
                className="text-link"
                href={project.repository}
                target="_blank"
                rel="noreferrer"
              >
                Project repository ↗
              </a>
            )}
            {project.externalLinks?.map((link) => (
              <a
                className="text-link"
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label} ↗
              </a>
            ))}
          </aside>
        ) : null}
        <nav className="case-related" aria-label="More selected work">
          <p className="eyebrow">CONTINUE EXPLORING</p>
          <div>
            {related.map((other) => (
              <Link key={other.slug} href={projectHref(other)}>
                <span className="mono">
                  {other.id} / {other.eyebrow}
                </span>
                <span>{other.title} ↗</span>
              </Link>
            ))}
          </div>
          <Link className="text-link" href="/projects">
            ← All selected work
          </Link>
        </nav>
      </div>
    </article>
  );
}
