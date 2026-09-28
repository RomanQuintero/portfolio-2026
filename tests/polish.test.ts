import { test } from "node:test";
import assert from "node:assert/strict";
import { loadChallengeProjects } from "../src/lib/challenge-loader";
import { parseChallengeReadme } from "../src/lib/challenge-parser";
import { pageMetadata, publicOrigin } from "../src/lib/site";

test("README loading falls back on network errors, malformed and empty replacement tables", async () => {
  for (const read of [
    async () => { throw new Error("network"); },
    async () => "Not a table",
    async () => "| # | Project |\n|---|---|\n| 11 | — |",
  ]) {
    const result = await loadChallengeProjects(read);
    assert.equal(result.source, "snapshot");
    assert.equal(result.projects.filter(p => p.published).length, 9);
  }
});
test("README provider preserves future releases without a manual portfolio update", async () => {
  const result = await loadChallengeProjects(async () => "| # | Project | Repository |\n|---|---|---|\n| **11** | **New release** | <https://github.com/owner/project> |");
  assert.equal(result.source, "github");
  assert.equal(result.projects[0].number, 11);
  assert.equal(result.projects[0].published, true);
});
test("Markdown variation and corrupt duplicate rows cannot erase valid published work", () => {
  const rows = parseChallengeReadme("| Number | Title | Repo |\n:--- | ---: | ---\n12 | [A build](<https://github.com/owner/build> \"Repository\") |\n12 | Broken\n12 | — | —\n13 | **Another build** | <https://github.com/owner/another>");
  assert.equal(rows.length, 2);
  assert.equal(rows[0].published, true);
  assert.equal(rows[1].published, true);
});
test("production origin is explicit and social metadata remains project-specific", () => {
  assert.equal(publicOrigin(undefined), null);
  assert.equal(publicOrigin("javascript:alert(1)"), null);
  assert.equal(publicOrigin("https://user:secret@example.com"), null);
  assert.equal(publicOrigin("https://portfolio.example/path"), "https://portfolio.example");
  const metadata = pageMetadata("Project name", "Project description", "/projects/example");
  assert.equal(metadata.openGraph?.title, "Project name / Roman Quintero");
  assert.equal(metadata.twitter?.description, "Project description");
});
