import type { ChallengeProject } from "@/lib/challenge-parser";
export function ChallengeCard({
  project,
  awaitingRelease = false,
  dayLabel,
}: {
  project: ChallengeProject;
  awaitingRelease?: boolean;
  /** Level III only: position of this build inside the central project. */
  dayLabel?: string;
}) {
  const number = String(project.number).padStart(2, "0");
  if (!project.published)
    return (
      <article
        className={`challenge-card locked ${awaitingRelease ? "awaiting-release" : ""}`}
      >
        <div className="challenge-card-top">
          <span className="challenge-number">{number}</span>
          <span className="mono">
            {awaitingRelease ? "AWAITING RELEASE" : "UNRELEASED"}
          </span>
        </div>
        {dayLabel && <span className="mono day-label">{dayLabel}</span>}
        <div className="restricted-pattern" aria-hidden="true" />
        <h3>{awaitingRelease ? "Awaiting release" : "Unreleased project"}</h3>
        <p>
          {awaitingRelease
            ? "Next in the build sequence."
            : "This slot opens when its project ships."}
        </p>
        <span className="mono locked-label">[ RESTRICTED ]</span>
      </article>
    );
  return (
    <article className="challenge-card">
      <div className="challenge-card-top">
        <span className="challenge-number">{number}</span>
        <span className="mono published-status">PUBLISHED</span>
      </div>
      {dayLabel && <span className="mono day-label">{dayLabel}</span>}
      <h3>
        <a href={project.repositoryUrl!} target="_blank" rel="noreferrer">
          {project.title}
          <span className="card-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </h3>
      <p>{project.description}</p>
      <ul className="tags" aria-label="Technologies">
        {project.technologies.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <a
        className="repo-link mono"
        href={project.repositoryUrl!}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${project.title} repository`}
      >
        VIEW REPOSITORY ↗
      </a>
    </article>
  );
}
