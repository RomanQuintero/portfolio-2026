/** Verified personal destinations. Invalid optional overrides are omitted. */
function destination(value: string): string {
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : "";
  } catch { return ""; }
}
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";
export const profile = {
  name: "Roman Quintero",
  github: "https://github.com/RomanQuintero",
  challenge: "https://github.com/RomanQuintero/30-projects",
  challengeReadme: "https://raw.githubusercontent.com/RomanQuintero/30-projects/main/README.md",
  linkedin: destination(process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/roman-quintero-royo-all-in/"),
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail) ? contactEmail : "",
  cv: destination(process.env.NEXT_PUBLIC_CV_URL || "/Roman_Quintero_Royo_CV_2026.pdf"),
};
