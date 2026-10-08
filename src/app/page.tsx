import Link from "next/link";
import { getChallengeProjects } from "@/lib/challenge";
import { levelSlots } from "@/lib/challenge-parser";
import { getShippedCount } from "@/lib/challenge-state";
import { pageMetadata, siteDescription } from "@/lib/site";
export const metadata = pageMetadata("Home", siteDescription, "/");
import { SystemMap } from "@/components/system-map";
import { WorkCard } from "@/components/work-card";
import { selectedWork } from "@/lib/work";
import { profile } from "@/lib/profile";
export const revalidate = 3600;
export default async function Home() {
  const { projects } = await getChallengeProjects();
  const foundations = levelSlots(projects, 1, 9).filter(p => p.published).length;
  const levelTwoComplete = levelSlots(projects, 11, 19).every(p => p.published);
  const milestones = levelSlots(projects, 21, 30).filter(p => p.published).length;
  const shipped = getShippedCount(projects);
  return (
    <>
      <section className="hero wrap">
        <div className="hero-top mono">
          <span>01 / IDENTITY</span>
          <span className="status">
            <i /> SYSTEM ONLINE
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">SOFTWARE ENGINEER</p>
            <h1>
              ROMAN
              <br />
              <span>
                QUINTERO<span className="heading-dot">.</span>
              </span>
            </h1>
            <div className="hero-focus">
              <span>APPLIED AI</span>
              <span>SYSTEMS</span>
              <span>EDGE</span>
            </div>
            <p className="hero-description">
              Building intelligent software.
              <br />
              Connecting ideas to the real world.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/projects">
                Explore my work <span>↗</span>
              </Link>
              <Link className="text-link" href="/about">
                About me ↗
              </Link>
            </div>
            <div className="socials">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              {profile.linkedin ? (
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              ) : (
                <span>
                  LinkedIn <small>COMING SOON</small>
                </span>
              )}
              {profile.cv ? (
                <a href={profile.cv}>CV ↓</a>
              ) : (
                <span>
                  CV <small>COMING SOON</small>
                </span>
              )}
            </div>
          </div>
          <div className="hero-field">
            <SystemMap />
            <div className="field-label mono">
              <span>INTELLIGENCE IN MOTION</span>
              <span>AI × SOFTWARE × HARDWARE</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom mono">
          <span>RESEARCH / ENGINEERING / EXPERIMENTATION</span>
          <a href="#selected">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>
      <section id="selected" className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / SELECTED WORK</p>
            <h2>Ideas, engineered.</h2>
          </div>
          <Link className="text-link" href="/projects">
            View all projects ↗
          </Link>
        </div>
        <div className="work-grid">
          {selectedWork.slice(0, 2).map((work) => (
            <WorkCard key={work.id} work={work} compact />
          ))}
        </div>
      </section>
      <section className="program-section">
        <div className="wrap program-grid">
          <div>
            <p className="eyebrow">03 / EXPERIMENTAL BUILD PROGRAM</p>
            <h2>
              30 projects.
              <br />
              An open-ended
              <br />
              <span className="yellow">experiment.</span>
            </h2>
            <p>
              Small builds. Different disciplines. One continuous practice of
              making things work.
            </p>
            <Link className="button" href="/30-projects">
              Enter the program <span>↗</span>
            </Link>
          </div>
          <div className="program-preview">
            <div className="program-preview-top mono">
              <span>BUILD SEQUENCE</span>
              <span>{String(shipped).padStart(2, "0")} / 30 SHIPPED</span>
            </div>
            <div className="sequence-row">
              <span>01—09</span>
              <strong>LEVEL I</strong>
              <span className="pill">{foundations === 9 ? "COMPLETE" : foundations + " / 9 RELEASED"}</span>
            </div>
            <div className="sequence-row">
              <span>10</span>
              <strong>PORTFOLIO / STAGE I</strong>
              <span className="pill">COMPLETE</span>
            </div>
            <div className="sequence-row">
              <span>11—19</span>
              <strong>LEVEL II</strong>
              <span className="pill">{levelTwoComplete ? "COMPLETE" : "ACTIVE"}</span>
            </div>
            <Link href="/30-projects" className="sequence-current">
              <span className="sequence-ten">20</span>
              <div>
                <span className="mono">YOU ARE HERE</span>
                <h3>Portfolio / Stage II</h3>
              </div>
              <span>↗</span>
            </Link>
            <div className="sequence-row">
              <span>21—29</span>
              <strong>LEVEL III / PRODUCT</strong>
              <span className="pill">{milestones === 10 ? "COMPLETE" : milestones + " / 10 MILESTONES"}</span>
            </div>
            <div className="sequence-row muted">
              <span>30</span>
              <strong>PORTFOLIO / STAGE III</strong>
              <span className="mono">FINAL CHECKPOINT</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section wrap about-preview">
        <p className="eyebrow">04 / PROFILE</p>
        <div>
          <h2>
            Between intelligence
            <br />
            and infrastructure.
          </h2>
          <p>
            I’m Roman, a software engineer exploring applied AI, computer vision
            and systems that reach beyond the screen.
          </p>
          <Link className="text-link" href="/about">
            More about me / Get in touch ↗
          </Link>
        </div>
      </section>
    </>
  );
}
