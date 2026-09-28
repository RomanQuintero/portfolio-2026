import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { getChallengeProjects } from "@/lib/challenge";
import { levelSlots } from "@/lib/challenge-parser";
import { getNextLevelTwoProjectNumber } from "@/lib/challenge-state";
import { ChallengeCard } from "@/components/challenge-card";
import { profile } from "@/lib/profile";
export const metadata = pageMetadata("30 Projects", "An experimental build program across AI, software, systems and hardware. Follow the published projects and upcoming levels.", "/30-projects");
export const revalidate = 3600;
export default async function Challenge() {
  const { projects, source } = await getChallengeProjects();
  const levelI = levelSlots(projects, 1, 9),
    levelII = levelSlots(projects, 11, 19);
  const complete = levelI.filter((p) => p.published).length;
  const released = levelII.filter((p) => p.published).length;
  const nextProjectNumber = getNextLevelTwoProjectNumber(levelII);
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
            {String(complete + released + 1).padStart(2, "0")}
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
            aria-valuenow={complete + released + 1}
          >
            <span
              style={{ width: `${((complete + released + 1) / 30) * 100}%` }}
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
        <section className="stage-transition" aria-labelledby="stage-one">
          <span className="stage-number">10</span>
          <div>
            <p className="eyebrow">CHECKPOINT / YOU ARE HERE</p>
            <h2 id="stage-one">Portfolio — Stage I</h2>
            <p>The experiments now have a home. You’re looking at build #10.</p>
          </div>
          <Link className="button dark-button" href="/">
            Explore the portfolio <span>↗</span>
          </Link>
        </section>
        <section className="level-section" aria-labelledby="level-two">
          <div className="level-heading">
            <div>
              <p className="eyebrow">11—19 / NEXT ITERATION</p>
              <h2 id="level-two">Level II</h2>
            </div>
            <span className="pill">{released === 9 ? "COMPLETE · 9 / 9" : "ACTIVE · " + released + " / 9 RELEASED"}</span>
          </div>
          <p className="level-description">
            New territory, one build at a time. Each project reveals itself when
            it ships.
          </p>
          <div className="challenge-grid">
            {levelII.map((project) => (
              <ChallengeCard
                key={project.number}
                project={project}
                awaitingRelease={project.number === nextProjectNumber}
              />
            ))}
          </div>
        </section>
        <section className="stage-two">
          <span className="mono">20 / NEXT CHECKPOINT</span>
          <h3>Portfolio — Stage II</h3>
          <span className="mono">FUTURE BUILD</span>
        </section>
        <section className="level-three" aria-labelledby="level-three">
          <div className="level-heading">
            <div>
              <p className="eyebrow">21—30 / BEYOND THE PERIMETER</p>
              <h2 id="level-three">Level III</h2>
            </div>
            <span className="mono">[ LOCKED ]</span>
          </div>
          <div className="sealed-level">
            <span className="seal-icon" aria-hidden="true">
              ⌑
            </span>
            <p>Restricted territory.</p>
            <span className="mono">UNLOCKS WITH PORTFOLIO STAGE II / #20</span>
          </div>
        </section>
      </div>
    </>
  );
}
