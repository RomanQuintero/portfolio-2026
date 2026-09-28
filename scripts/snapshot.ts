import { readFile, writeFile, mkdir } from "node:fs/promises";
import { parseChallengeReadme } from "../src/lib/challenge-parser";
const source = await readFile("challenge-readme.md", "utf8");
await mkdir("src/data", { recursive: true });
await writeFile(
  "src/data/challenge-snapshot.json",
  JSON.stringify(parseChallengeReadme(source), null, 2) + "\n",
);
