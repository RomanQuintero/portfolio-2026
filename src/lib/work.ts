import { projects } from "./projects";
export type Work = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  description: string;
  tags: string[];
  diagram: "swarm" | "edge" | "lab";
};
// Preserve the approved Home summaries while case studies carry the deeper content.
export const selectedWork: Work[] = projects.map((project) => ({
  id: project.id,
  slug: project.slug,
  ...project.preview,
  status:
    project.slug === "multi-uav"
      ? "MASTER’S THESIS · IN PROGRESS"
      : project.typeLabel,
}));
