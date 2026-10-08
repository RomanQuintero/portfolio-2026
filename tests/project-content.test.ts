import { test } from "node:test";
import assert from "node:assert/strict";
import { projects, getProject, projectHref } from "../src/lib/projects";
import {
  getNextLevelTwoProjectNumber,
  getNextProjectNumber,
  getShippedCount,
} from "../src/lib/challenge-state";
import type { ChallengeProject } from "../src/lib/challenge-parser";
const release = (number: number, published = true): ChallengeProject => ({
  number,
  title: "Build",
  description: "",
  technologies: [],
  repositoryUrl: published ? "https://github.com/example/build" : null,
  published,
});
test("case studies have unique slugs and section anchors; unknown slugs are absent", () => {
  assert.equal(new Set(projects.map((p) => p.slug)).size, 3);
  for (const project of projects) {
    assert.equal(
      new Set(project.sections.map((s) => s.id)).size,
      project.sections.length,
    );
    assert.equal(getProject(project.slug), project);
    assert.equal(projectHref(project), `/projects/${project.slug}`);
  }
  assert.equal(getProject("unknown-project"), undefined);
});
test("ongoing research and the open lab preserve their explicit content boundaries", () => {
  assert.equal(getProject("multi-uav")?.status, "ongoing");
  assert.equal(getProject("remote-4g-drone")?.status, "completed");
  const lab = getProject("mugen-no-sekai")!;
  assert.equal(lab.status, "archive");
  assert.deepEqual(lab.archiveEntries, []);
  assert.ok(lab.sections.every((section) => section.kind !== "pipeline"));
  assert.ok(
    projects.every(
      (p) => p.repository === undefined && p.externalLinks === undefined,
    ),
  );
});
test("exactly the next missing Level II slot is active, including gaps", () => {
  assert.equal(getNextLevelTwoProjectNumber([]), 11);
  assert.equal(
    getNextLevelTwoProjectNumber([release(11), release(12), release(13)]),
    14,
  );
  assert.equal(getNextLevelTwoProjectNumber([release(11), release(13)]), 12);
  assert.equal(
    getNextLevelTwoProjectNumber([release(11, false), release(12)]),
    11,
  );
  assert.equal(
    getNextLevelTwoProjectNumber(
      Array.from({ length: 9 }, (_, i) => release(i + 11)),
    ),
    null,
  );
  assert.equal(
    getNextLevelTwoProjectNumber([release(10), release(20), release(21)]),
    11,
  );
});
test("Level III (#21–#29) marks only its next missing build and the counter includes the live portfolio stages", () => {
  assert.equal(getNextProjectNumber([], 21, 29), 21);
  assert.equal(getNextProjectNumber([release(21), release(22)], 21, 29), 23);
  assert.equal(getNextProjectNumber([release(21), release(23)], 21, 29), 22);
  assert.equal(
    getNextProjectNumber(Array.from({ length: 9 }, (_, i) => release(i + 21)), 21, 29),
    null,
  );
  assert.equal(getShippedCount([]), 2);
  assert.equal(getShippedCount([release(30, false)]), 2);
  assert.equal(getShippedCount([release(30)]), 3);
  assert.equal(getShippedCount([release(1), release(10), release(20, false)]), 3);
  assert.equal(
    getShippedCount(Array.from({ length: 30 }, (_, i) => release(i + 1))),
    30,
  );
});
