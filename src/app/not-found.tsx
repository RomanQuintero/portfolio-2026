import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section wrap">
      <p className="eyebrow">404 / OUTSIDE THE PERIMETER</p>
      <h1>Unknown route.</h1>
      <p className="level-description">
        This page isn’t part of the current build.
      </p>
      <Link className="button" href="/">
        Return home <span>↗</span>
      </Link>
    </section>
  );
}
