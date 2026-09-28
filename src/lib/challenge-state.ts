import { levelSlots, type ChallengeProject } from "./challenge-parser";
export function getNextLevelTwoProjectNumber(
  projects: ChallengeProject[],
): number | null {
  return (
    levelSlots(projects, 11, 19).find((project) => !project.published)
      ?.number ?? null
  );
}
