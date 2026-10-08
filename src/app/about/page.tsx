import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { profile } from "@/lib/profile";
export const metadata = pageMetadata("About / Contact", "Roman Quintero, software engineer exploring applied AI, intelligent systems, edge computing and computer vision.", "/about");
export default function About() {
  return (
    <>
      <section className="page-intro wrap">
        <p className="eyebrow">04 / PROFILE</p>
        <h1>
          Software.
          <br />
          Systems.
          <br />
          <span>Possibility.</span>
        </h1>
      </section>
      <section className="section wrap profile-grid">
        <div>
          <p className="eyebrow">ROMAN QUINTERO</p>
          <h2>
            Engineering across
            <br />
            the boundaries.
          </h2>
          <p className="profile-lead">
            I’m a software engineer working at the intersection of applied AI,
            intelligent systems and the physical world.
          </p>
          <p>
            My background spans years of professional software development, from
            application and web systems to increasingly hardware-aware and
            AI-driven projects.
          </p>
          <p>
            Today, I’m moving deeper into applied AI and intelligent systems.
            My current Master’s thesis explores cooperative multi-UAV search,
            bringing together language models, reinforcement learning and flight
            systems. Previously, my Computer Engineering final project focused
            on remote drone control over 4G.
          </p>
          <p>
            Alongside deeper research and engineering work, the 30 Projects
            challenge is a space to experiment across disciplines: build
            something, understand its constraints, and ship a working result.
          </p>
          <Link className="text-link" href="/projects">
            See selected work ↗
          </Link>
        </div>
        <aside className="focus-panel">
          <p className="eyebrow">CURRENT FOCUS</p>
          {[
            "Applied AI",
            "Intelligent systems",
            "Edge / Embedded",
            "Computer vision",
            "Experimental software",
          ].map((focus, i) => (
            <div className="focus-row" key={focus}>
              <span className="mono">0{i + 1}</span>
              <span>{focus}</span>
            </div>
          ))}
          <p className="mono focus-note">
            PORTFOLIO / STAGE II<br />THE FINAL LEVEL IS OPEN.
          </p>
        </aside>
      </section>
      <section id="contact" className="contact-section wrap">
        <p className="eyebrow">05 / CONTACT</p>
        <div className="contact-heading">
          <h2>Let’s connect.</h2>
          <p>
            For conversations about software,
            <br />
            research and the next interesting problem.
          </p>
        </div>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <span>
              GitHub<small>Code, experiments & build logs</small>
            </span>
            <span>↗</span>
          </a>
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <span>
                LinkedIn<small>Professional profile</small>
              </span>
              <span>↗</span>
            </a>
          ) : (
            <div className="contact-placeholder">
              <span>
                LinkedIn<small>Profile link coming soon</small>
              </span>
              <span className="mono">PENDING</span>
            </div>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`}>
              <span>
                Email<small>{profile.email}</small>
              </span>
              <span>↗</span>
            </a>
          )}
          {profile.cv ? (
            <a href={profile.cv}>
              <span>
                Curriculum vitae<small>View CV</small>
              </span>
              <span>↓</span>
            </a>
          ) : (
            <div className="contact-placeholder">
              <span>
                Curriculum vitae<small>Document coming soon</small>
              </span>
              <span className="mono">PENDING</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
