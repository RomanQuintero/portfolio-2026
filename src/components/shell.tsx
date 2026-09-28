"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/profile";
export function Header() {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link className="brand" href="/" aria-label="Roman Quintero home">
        <span className="brand-mark">
          RQ<span>↗</span>
        </span>
        <span>
          ROMAN QUINTERO<small>SOFTWARE ENGINEER</small>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        {[
          ["/", "Home"],
          ["/projects", "Projects"],
          ["/30-projects", "30 Projects"],
          ["/about", "About / Contact"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              pathname === href
                ? "page"
                : href !== "/" && pathname.startsWith(href + "/")
                  ? "location"
                  : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <a
        className="header-github"
        href={profile.github}
        target="_blank"
        rel="noreferrer"
      >
        GitHub ↗
      </a>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <Link href="/" className="footer-name">
        ROMAN QUINTERO<span>SOFTWARE ENGINEER</span>
      </Link>
      <div>
        <span className="mono">PORTFOLIO / STAGE I</span>
        <p>Built to explore. Designed to evolve.</p>
      </div>
      <a href={profile.github} target="_blank" rel="noreferrer">
        GitHub ↗
      </a>
      <span className="mono">CURRENT BUILD / #10</span>
    </footer>
  );
}
