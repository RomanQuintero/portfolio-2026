import { parseChallengeReadme, type ChallengeProject } from "./challenge-parser";
import snapshot from "@/data/challenge-snapshot.json";
export type ChallengeData = {
  projects: ChallengeProject[];
  source: "github" | "snapshot";
};
/** A verified emergency snapshot protects the page from provider/parser failure. */
export async function loadChallengeProjects(readMarkdown: () => Promise<string>): Promise<ChallengeData> {
  try {
    const projects = parseChallengeReadme(await readMarkdown());
    if (!projects.some(project => project.published)) throw new Error("No released work");
    return { projects, source: "github" };
  } catch {
    return { projects: snapshot as ChallengeProject[], source: "snapshot" };
  }
}
