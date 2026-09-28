import "server-only";
import { profile } from "./profile";
import { loadChallengeProjects } from "./challenge-loader";
export type { ChallengeData } from "./challenge-loader";

/** Provider details and cache policy remain outside the UI. */
export async function getChallengeProjects() {
  return loadChallengeProjects(async () => {
    const response = await fetch(process.env.CHALLENGE_README_URL || profile.challengeReadme, {
      next: { revalidate: 3600, tags: ["challenge-projects"] },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("README unavailable");
    return response.text();
  });
}
