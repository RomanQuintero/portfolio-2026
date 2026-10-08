import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { getChallengeProjects } from "@/lib/challenge";
import { levelSlots } from "@/lib/challenge-parser";
import { getNextProjectNumber, getShippedCount } from "@/lib/challenge-state";
import { ChallengeCard } from "@/components/challenge-card";
import { profile } from "@/lib/profile";
export const metadata = pageMetadata("30 Projects", "An experimental build program across AI, software, systems and hardware. Follow the published projects and upcoming levels.", "/30-projects");
export const revalidate = 3600;
export default async function Challenge() {
  const { projects, source } = await getChallengeProjects();
  const levelI = levelSlots(projects, 1, 9),
    levelII = levelSlots(projects, 11, 19),
    levelIII = levelSlots(projects, 21, 29);
  const complete = levelI.filter((p) => p.published).length;
  const released = levelII.filter((p) => p.published).length;
  const milestones = levelSlots(projects, 21, 30).filter((p) => p.published)
    .length;
  const shipped = getShippedCount(projects);
  const nextLevelTwo = getNextProjectNumber(projects, 11, 19);
  const nextLevelThree = getNextProjectNumber(projects, 21, 29);
  return (
    <>
      <section className="page-intro wrap challenge-intro">
        <div>
          <p className="eyebrow">03 / EXPERIMENTAL BUILD PROGRAM</p>
          <h1>
            30 PROJECTS<span>.</span>
          </h1>
          <p>
            A practice of building. Thirty small projects exploring software
            engineering, artificial intelligence and hardware.
          </p>
        </div>
        <div className="challenge-stats">
          <strong>
            {String(shipped).padStart(2, "0")}
            <span>/ 30</span>
          </strong>
          <span className="mono">
            BUILDS SHIPPED · INCLUDING THIS PORTFOLIO
          </span>
          <div
            className="build-progress"
            role="progressbar"
            aria-label="Challenge builds shipped"
            aria-valuemin={0}
            aria-valuemax={30}
            aria-valuenow={shipped}
          >
            <span
              style={{ width: `${(shipped / 30) * 100}%` }}
            />
          </div>
        </div>
      </section>
      <div className="wrap">
        <div className="challenge-toolbar mono">
          <span>THE BUILD LOG</span>
          <a href={profile.challenge} target="_blank" rel="noreferrer">
            FOLLOW ON GITHUB ↗
          </a>
        </div>
        {source === "snapshot" && (
          <p className="data-notice" role="status">
            The live build log is temporarily unavailable. Showing the last
            verified project snapshot.
          </p>
        )}
        <section className="level-section" aria-labelledby="level-one">
          <div className="level-heading">
            <div>
              <p className="eyebrow">01—09 / FOUNDATIONS</p>
              <h2 id="level-one">Level I</h2>
            </div>
            <span className="pill">
              {complete === 9 ? "COMPLETE" : `${complete} / 9 RELEASED`}
            </span>
          </div>
          <div className="challenge-grid">
            {levelI.map((project) => (
              <ChallengeCard key={project.number} project={project} />
            ))}
          </div>
        </section>
        <section className="stage-two" aria-labelledby="stage-one">
          <span className="mono">10 / CHECKPOINT</span>
          <h2 id="stage-one">Portfolio — Stage I</h2>
          <span className="pill">COMPLETE</span>
        </section>
        <section className="level-section" aria-labelledby="level-two">
          <div className="level-heading">
            <div>
              <p className="eyebrow">11—19 / NEXT ITERATION</p>
              <h2 id="level-two">Level II</h2>
            </div>
            <span className="pill">{released === 9 ? "COMPLETE · 9 / 9" : released + " / 9 RELEASED"}</span>
          </div>
          <div className="challenge-grid">
            {levelII.map((project) => (
              <ChallengeCard
                key={project.number}
                project={project}
                awaitingRelease={project.number === nextLevelTwo}
              />
            ))}
          </div>
        </section>
        <section className="stage-transition" aria-labelledby="stage-two">
          <span className="stage-number">20</span>
          <div>
            <p className="eyebrow">CHECKPOINT / YOU ARE HERE</p>
            <h2 id="stage-two">Portfolio — Stage II</h2>
            <p>
              The portfolio opens the final level. You’re looking at build #20.
            </p>
          </div>
          <Link className="button dark-button" href="/">
            Explore the portfolio <span>↗</span>
          </Link>
        </section>
        <section
          className="level-section level-three"
          aria-labelledby="level-three"
        >
          <div className="level-heading">
            <div>
              <p className="eyebrow">21—30 / 10 DEVELOPMENT MILESTONES</p>
              <h2 id="level-three">Level III</h2>
            </div>
            <span className="pill">
              {milestones === 10
                ? "COMPLETE · 10 / 10"
                : "ACTIVE · " + milestones + " / 10 MILESTONES"}
            </span>
          </div>
          <div className="level-three-brief">
            <div>
              <h3>From projects to product.</h3>
              <p className="level-description">
                Ten days. One independent product. A different challenge:
                moving beyond prototypes into release, real-world use and
                iteration.
              </p>
              <p className="level-description">
                Levels I and II were independent experiments. Here every
                milestone belongs to the same product, released in order as
                its own repository, up to the final checkpoint.
              </p>
            </div>
            <ul className="brief-facts">
              {[
                ["SHAPE", "One independent product"],
                ["CADENCE", "One milestone per day"],
                ["SPAN", "#21 — #30"],
                ["CLOSES WITH", "#30 / Stage III"],
              ].map(([label, value]) => (
                <li key={label}>
                  <span className="mono">{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>
          </div>
          <p className="mono grid-note">
            Milestones will be revealed as the challenge progresses.
          </p>
          <div className="challenge-grid">
            {levelIII.map((project) => (
              <ChallengeCard
                key={project.number}
                project={project}
                awaitingRelease={project.number === nextLevelThree}
                dayLabel={"MILESTONE " + (project.number - 20) + " / 10"}
              />
            ))}
          </div>
        </section>
        <section
          className="stage-two stage-final level-three"
          aria-labelledby="stage-three"
        >
          <span className="mono">30 / MILESTONE 10 / 10</span>
          <h2 id="stage-three">Portfolio — Stage III</h2>
          <span className="mono">FINAL CHECKPOINT</span>
        </section>
      </div>
    </>
  );
}
