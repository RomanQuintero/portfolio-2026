export type ChallengeProject = {
  number: number;
  title: string;
  description: string;
  technologies: string[];
  repositoryUrl: string | null;
  published: boolean;
};
function cells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replace(/\\\|/g, "|"));
}
function plain(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*`]/g, "")
    .trim();
}
function isPlaceholder(value: string): boolean {
  return /^(?:[—–-]+|\.{3}|tbd|coming soon|pending)?$/i.test(value.trim());
}
export function safeUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
/** Parse tables by column names, never by repository names or row order. */
export function parseChallengeReadme(markdown: string): ChallengeProject[] {
  const lines = markdown.split(/\r?\n/);
  const projects = new Map<number, ChallengeProject>();
  for (let i = 0; i < lines.length - 1; i++) {
    if (!lines[i].includes("|") || !/^\s*\|?\s*:?-{3,}/.test(lines[i + 1]))
      continue;
    const headers = cells(lines[i]).map((h) => plain(h).toLowerCase());
    const numberIndex = headers.findIndex((h) =>
      /^(#|number|no\.?|project #|nº)$/.test(h),
    );
    const titleIndex = headers.findIndex((h) =>
      /^(project|name|title)$/.test(h),
    );
    const descriptionIndex = headers.findIndex((h) =>
      /^(description|summary)$/.test(h),
    );
    const techIndex = headers.findIndex((h) =>
      /^(tech|technologies|stack|tech stack)$/.test(h),
    );
    const repoIndex = headers.findIndex((h) =>
      /^(repo|repository|link|url)$/.test(h),
    );
    const statusIndex = headers.findIndex((h) => h === "status");
    if (numberIndex < 0 || titleIndex < 0) continue;
    i += 2;
    for (; i < lines.length && lines[i].trim().includes("|"); i++) {
      const row = cells(lines[i]);
      if (row.length <= Math.max(numberIndex, titleIndex)) continue;
      const rawNumber = plain(row[numberIndex] || "").replace(/^#/, "");
      if (!/^\d{1,2}$/.test(rawNumber)) continue;
      const number = Number(rawNumber);
      if (number < 1 || number > 30) continue;
      const titleCell = row[titleIndex] || "";
      const title = plain(titleCell);
      const linkCell = repoIndex >= 0 ? row[repoIndex] || titleCell : titleCell;
      const link =
        linkCell.match(
          /\[[^\]]*\]\(<?(https?:\/\/[^\s)>]+)>?(?:\s+"[^"]*")?\)/,
        )?.[1] || (/^<?https?:\/\//.test(linkCell) ? linkCell.replace(/^<|>$/g, "") : "");
      const repositoryUrl = safeUrl(link);
      const status = statusIndex >= 0 ? plain(row[statusIndex] || "") : "";
      const unpublished =
        /^(draft|planned|unreleased|locked|pending|in progress)$/i.test(status);
      if (projects.get(number)?.published) continue;
      projects.set(number, {
        number,
        title: isPlaceholder(title) ? "" : title,
        description:
          descriptionIndex >= 0 && !isPlaceholder(row[descriptionIndex] || "")
            ? plain(row[descriptionIndex] || "")
            : "",
        technologies:
          techIndex >= 0 && !isPlaceholder(row[techIndex] || "")
            ? plain(row[techIndex] || "")
                .split(/\s*[·,;]\s*/)
                .filter(Boolean)
            : [],
        repositoryUrl,
        published: Boolean(
          repositoryUrl && !isPlaceholder(title) && !unpublished,
        ),
      });
    }
  }
  if (projects.size === 0) throw new Error("No numbered challenge table found");
  return [...projects.values()].sort((a, b) => a.number - b.number);
}
export function levelSlots(
  projects: ChallengeProject[],
  start: number,
  end: number,
): ChallengeProject[] {
  const indexed = new Map(projects.map((p) => [p.number, p]));
  return Array.from(
    { length: end - start + 1 },
    (_, i) =>
      indexed.get(start + i) || {
        number: start + i,
        title: "",
        description: "",
        technologies: [],
        repositoryUrl: null,
        published: false,
      },
  );
}
