"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section wrap">
      <p className="eyebrow">SYSTEM / INTERRUPTED</p>
      <h1>Let’s try again.</h1>
      <p className="level-description">
        This view could not load. You can retry or return to the portfolio.
      </p>
      <button className="button" onClick={reset}>
        Retry ↻
      </button>
      <Link className="text-link error-home" href="/">
        Return home ↗
      </Link>
    </section>
  );
}
