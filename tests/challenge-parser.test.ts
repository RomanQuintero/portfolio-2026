import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  levelSlots,
  parseChallengeReadme,
  safeUrl,
} from "../src/lib/challenge-parser";
test("actual README preserves numbering and detects the nine published projects", () => {
  const projects = parseChallengeReadme(
    readFileSync("challenge-readme.md", "utf8"),
  );
  assert.equal(projects.filter((p) => p.published).length, 9);
  assert.equal(projects[5].number, 6);
  assert.equal(projects[5].title, "Adaptive Edge-Cloud Inference");
  assert.equal(projects.find((p) => p.number === 10)?.published, false);
  assert.equal(levelSlots(projects, 11, 19).length, 9);
  assert.ok(levelSlots(projects, 11, 19).every((p) => !p.published));
});
test("future releases reveal by number even with reordered columns and escaped pipes", () => {
  const rows = parseChallengeReadme(
    "| Tech | Project | # | Description | Status |\n|---|---|---|---|---|\n| Python · C++ | [New build](https://github.com/r/build) | 12 | Edge \\| cloud | Published |\n| Java | [Draft](https://github.com/r/draft) | 11 | Unfinished | Draft |",
  );
  assert.deepEqual(
    rows.map((p) => p.number),
    [11, 12],
  );
  assert.equal(rows[1].description, "Edge | cloud");
  assert.deepEqual(rows[1].technologies, ["Python", "C++"]);
  const slots = levelSlots(rows, 11, 19);
  assert.equal(slots[0].published, false);
  assert.equal(slots[1].published, true);
  assert.equal(slots[2].published, false);
});
test("malformed tables fail safely and unsafe links cannot be published", () => {
  assert.throws(() => parseChallengeReadme("No table here"));
  assert.equal(safeUrl("javascript:alert(1)"), null);
  assert.equal(safeUrl("https://user:password@example.com"), null);
  const rows = parseChallengeReadme(
    "| # | Project | Tech |\n|---|---|---|\n| 11 | [Unsafe](javascript:alert) | JS |\n| ... | ... | ... |\n| 31 | Invalid | — |",
  );
  assert.equal(rows.length, 1);
  assert.equal(rows[0].published, false);
});
