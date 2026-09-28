import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectShowcase } from "@/components/projects/project-showcase";
export const metadata = pageMetadata("Projects", "Three ways Roman Quintero builds: current cooperative UAV research, end-to-end drone engineering and an early personal lab.", "/projects");
export default function Projects() {
  return (
    <div className="projects-exhibition">
      <section className="exhibition-intro wrap">
        <div>
          <p className="eyebrow">02 / SELECTED WORK</p>
          <h1>
            Three ways
            <br />
            to <span>build.</span>
          </h1>
        </div>
        <div className="exhibition-intro-note">
          <p>
            Current research. End-to-end engineering.
            <br />
            An early laboratory of ideas.
          </p>
          <span className="mono">
            03 BODIES OF WORK / ONE CONTINUOUS PRACTICE
          </span>
        </div>
      </section>
      <div className="wrap exhibition-works">
        {projects.map((project) => (
          <ProjectShowcase key={project.slug} project={project} />
        ))}
        <div className="route-callout">
          <p>Looking for the smaller, faster experiments?</p>
          <Link className="text-link" href="/30-projects">
            Explore 30 Projects ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
