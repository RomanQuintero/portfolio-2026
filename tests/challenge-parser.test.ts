import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  levelSlots,
  parseChallengeReadme,
  safeUrl,
} from "../src/lib/challenge-parser";
test("actual README preserves numbering through Level II and leaves Level III open", () => {
  const projects = parseChallengeReadme(
    readFileSync("challenge-readme.md", "utf8"),
  );
  assert.equal(projects.filter((p) => p.published).length, 19);
  assert.equal(projects[5].number, 6);
  assert.equal(projects[5].title, "Adaptive Edge-Cloud Inference");
  assert.equal(projects.find((p) => p.number === 10)?.title, "Portfolio 2026");
  assert.ok(levelSlots(projects, 11, 19).every((p) => p.published));
  assert.equal(projects.find((p) => p.number === 20)?.published, false);
  assert.equal(levelSlots(projects, 21, 29).length, 9);
  assert.ok(levelSlots(projects, 21, 29).every((p) => !p.published));
  assert.equal(projects.find((p) => p.number === 30)?.published, false);
});
test("Level III releases are read from the same table format as earlier levels", () => {
  const rows = parseChallengeReadme(
    "| # | Project | Description | Tech |\n|---|---|---|---|\n| 21 | [Day one](https://github.com/owner/day-one) | First daily build. | Rust · WebGPU |\n| 22 | — | — | — |\n| 23 | [Day three](https://github.com/owner/day-three) | Third daily build. | Go |",
  );
  const slots = levelSlots(rows, 21, 29);
  assert.equal(slots.length, 9);
  assert.deepEqual(
    slots.filter((p) => p.published).map((p) => p.number),
    [21, 23],
  );
  assert.deepEqual(slots[0].technologies, ["Rust", "WebGPU"]);
  assert.equal(slots[1].published, false);
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
