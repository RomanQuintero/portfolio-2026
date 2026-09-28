import Link from "next/link";
import { WorkVisualization } from "./work-visualization";
import type { Work } from "@/lib/work";
export function WorkCard({
  work,
  compact = false,
}: {
  work: Work;
  compact?: boolean;
}) {
  return (
    <article className={`work-card ${compact ? "compact" : ""}`}>
      <div className="work-visual">
        <WorkVisualization variant={work.diagram} />
        <span className="work-number">{work.id}</span>
      </div>
      <div className="work-content">
        <p className="eyebrow">{work.category}</p>
        <h3>
          <Link href={`/projects/${work.slug}`}>{work.title}</Link>
        </h3>
        <p>{work.description}</p>
        <ul className="tags" aria-label="Technologies">
          {work.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <span className="work-status mono">{work.status}</span>
      </div>
    </article>
  );
}
