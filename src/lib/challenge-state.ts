import { levelSlots, type ChallengeProject } from "./challenge-parser";
/** The first unpublished slot of a level, or null once the level is complete. */
export function getNextProjectNumber(
  projects: ChallengeProject[],
  start: number,
  end: number,
): number | null {
  return (
    levelSlots(projects, start, end).find((project) => !project.published)
      ?.number ?? null
  );
}
export function getNextLevelTwoProjectNumber(
  projects: ChallengeProject[],
): number | null {
  return getNextProjectNumber(projects, 11, 19);
}
/** Portfolio checkpoints already live: #10 Stage I and #20 Stage II. #30 Stage III counts once its README row is published. */
export const portfolioCheckpoints = [10, 20];
/** Builds shipped across #01–#30, always counting the live portfolio checkpoints. */
export function getShippedCount(projects: ChallengeProject[]): number {
  const shipped = new Set(portfolioCheckpoints);
  for (const project of levelSlots(projects, 1, 30))
    if (project.published) shipped.add(project.number);
  return shipped.size;
}
