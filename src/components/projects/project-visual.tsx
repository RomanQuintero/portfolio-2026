import type { CSSProperties } from "react";
import type { ProjectVisual as VisualKind } from "@/lib/projects";

const routes = [
  "M88 322L88 98L121 98L121 322L154 322L154 98L187 98L187 322L220 322L220 98",
  "M279 302L406 101L406 147L279 348L279 294L406 93",
  "M486 313C509 258 623 328 630 267S471 220 489 169S613 182 634 98",
];
function MissionViewer({ detail = false }: { detail?: boolean }) {
  return (
    <figure
      className={`project-visual mission-viewer ${detail ? "visual-detail" : ""}`}
    >
      <div className="visual-toolbar">
        <span className="mono">MISSION VIEW / COOPERATIVE SEARCH</span>
        <span className="visual-example mono">DEMO / ILLUSTRATIVE</span>
      </div>
      <div className="mission-board">
        <div className="mission-map">
          <svg viewBox="0 0 720 420" fill="none" aria-hidden="true">
            <path d="M48 65H665V355H48Z" stroke="var(--muted)" opacity=".35" />
            <path
              d="M40 65h16m-8-8v16M657 65h16m-8-8v16M40 355h16m-8-8v16M657 355h16m-8-8v16"
              stroke="var(--muted)"
              opacity=".6"
            />
            <g stroke="var(--line)" strokeDasharray="3 7">
              <path d="M246 65V355M447 65V355" />
            </g>
            {routes.map((d, i) => (
              <g
                key={d}
                style={{
                  color: ["var(--yellow)", "var(--cyan)", "var(--violet)"][i],
                }}
              >
                {[0, 1, 2, 3, 4].map((j) => (
                  <rect
                    key={j}
                    x={74 + i * 204}
                    y={82 + j * 52}
                    width={i === 2 ? 145 : 153}
                    height="48"
                    fill="currentColor"
                    className="mission-coverage"
                    style={{ animationDelay: `-${j * 3 + i * 7}s` }}
                  />
                ))}
                <path
                  d={d}
                  stroke="currentColor"
                  opacity=".2"
                  strokeWidth="1.5"
                />
                <path
                  d={d}
                  stroke="currentColor"
                  opacity=".7"
                  strokeWidth="1.5"
                  pathLength="100"
                  className="mission-trail"
                  style={{ animationDelay: `-${i * 9}s` }}
                />
                <g
                  className="showcase-uav"
                  style={
                    {
                      offsetPath: `path('${d}')`,
                      offsetDistance: `${20 + i * 25}%`,
                      animationDuration: `${40 + i * 7}s`,
                      animationDelay: `-${i * 11}s`,
                    } as CSSProperties
                  }
                >
                  <path d="M0-8L7 7L0 4L-7 7Z" fill="currentColor" />
                  <path
                    d="M-10-10h-4v5M10 10h4V5"
                    stroke="currentColor"
                    opacity=".5"
                  />
                </g>
              </g>
            ))}
            <g stroke="var(--text)" opacity=".65" className="mission-targets">
              <path d="M198 182l6-6 6 6-6 6ZM557 289l6-6 6 6-6 6Z" />
              <path
                d="M204 168v-5m0 33v5m-14-19h-5m33 0h5M563 275v-5m0 33v5m-14-19h-5m33 0h5"
                opacity=".4"
              />
            </g>
            <g
              className="visual-secondary"
              fill="var(--muted)"
              fontFamily="monospace"
              fontSize="11"
            >
              <text x="48" y="390">
                SEARCH FIELD / TOP DOWN
              </text>
              <text x="535" y="390">
                X / 072 · Y / 042
              </text>
            </g>
          </svg>
        </div>
        <div className="mission-readout">
          <div className="visual-reading">
            <span>DEMO COVERAGE</span>
            <strong>Progressive</strong>
            <div className="coverage-meter" aria-hidden="true">
              <i />
            </div>
          </div>
          <div className="visual-reading">
            <span>DEMO TARGETS</span>
            <strong>
              02 <small>/ demo</small>
            </strong>
          </div>
          <div className="visual-reading visual-secondary">
            <span>DEMO TIME</span>
            <strong>
              00:42 <small>/ demo</small>
            </strong>
          </div>
          <ul className="uav-key">
            <li>
              <i />
              UAV-01 <small>Sweep</small>
            </li>
            <li>
              <i />
              UAV-02 <small>Diagonal</small>
            </li>
            <li>
              <i />
              UAV-03 <small>Contour</small>
            </li>
          </ul>
        </div>
      </div>
      <figcaption className="project-visual-caption">
        Illustrative mission view. Paths and coverage demonstrate the visual
        concept; they are not research results.
      </figcaption>
    </figure>
  );
}
function ControlViewer({ detail = false }: { detail?: boolean }) {
  return (
    <figure
      className={`project-visual control-viewer ${detail ? "visual-detail" : ""}`}
    >
      <div className="visual-toolbar">
        <span className="mono">GROUND CONTROL / REMOTE UAV</span>
        <span className="visual-example mono">INTERFACE STUDY</span>
      </div>
      <div className="control-board">
        <div className="control-feed">
          <div className="feed-top mono">
            <span>USB CAMERA / VIDEO</span>
            <span>SYSTEM VISUALIZATION</span>
          </div>
          <svg viewBox="0 0 500 340" fill="none" aria-hidden="true">
            <g stroke="var(--muted)" opacity=".45">
              <path d="M38 60V38h22M440 38h22v22M38 280v22h22M440 302h22v-22" />
              <path d="M59 186H211m78 0h152M195 156h110M221 140h58M218 212h64" />
            </g>
            <g stroke="var(--text)" strokeWidth="1.5">
              <path d="M230 149l20-11 20 11v28l-20 11-20-11ZM230 149l-36-29M270 149l36-29M230 177l-36 28M270 177l36 28" />
              <path d="M178 119h29M193 105v28M293 119h29M307 105v28M178 205h29M193 191v28M293 205h29M307 191v28" />
            </g>
            <path
              d="M250 132v-12M250 194v12"
              stroke="var(--yellow)"
              strokeWidth="2"
            />
            <path
              d="M70 262L101 258L131 264L164 244L197 251L228 237L259 246L292 229L326 236L359 217L396 227L431 209"
              stroke="var(--cyan)"
              opacity=".27"
              className="control-stream"
            />
          </svg>
          <div className="control-feed-scan" aria-hidden="true" />
          <div className="feed-bottom mono">
            <span>RTSP → WHEP / WEBRTC</span>
            <span className="visual-secondary">VIDEO PATH</span>
          </div>
        </div>
        <div className="control-readout">
          <div className="control-state">
            <span className="mono">CONTROL MODE</span>
            <strong>INTERFACE STUDY</strong>
          </div>
          <div className="visual-reading">
            <span>TELEMETRY VIEW</span>
            <strong>Illustrative</strong>
          </div>
          <div className="visual-reading">
            <span>COMMAND PATH</span>
            <strong>MAVLink</strong>
          </div>
          <div className="visual-reading visual-secondary">
            <span>VIDEO TRANSPORT</span>
            <strong>WebRTC</strong>
          </div>
          <span className="control-link mono">LINK / 4G</span>
        </div>
      </div>
      <div className="control-transport mono">
        <span>UAV / PI</span>
        <i aria-hidden="true" />
        <span>4G</span>
        <i aria-hidden="true" />
        <span>VPS</span>
        <i aria-hidden="true" />
        <span>WEB CLIENT</span>
      </div>
      <figcaption className="project-visual-caption">
        Ground-control interface study. No live aircraft connection or telemetry
        feed.
      </figcaption>
    </figure>
  );
}
const fragments = [
  { label: "ANDROID", kind: "mobile", note: "Mobile experiments" },
  { label: "WEB", kind: "browser", note: "Interface fragments" },
  { label: "FIREBASE", kind: "storage", note: "Tools to try" },
  { label: "NFC", kind: "tag", note: "Physical interactions" },
  { label: "UNITY", kind: "interactive", note: "Interactive prototypes" },
  { label: "BACKEND", kind: "code", note: "Systems behind the screen" },
];
function LabWorkbench({ detail = false }: { detail?: boolean }) {
  return (
    <figure
      className={`project-visual lab-workbench ${detail ? "visual-detail" : ""}`}
    >
      <div className="visual-toolbar">
        <span className="mono">PERSONAL LAB / IDEA FRAGMENTS</span>
        <span className="visual-example mono">OPEN ARCHIVE</span>
      </div>
      <div className="lab-surface">
        <span className="lab-construction mono" aria-hidden="true">
          BUILD / TRY / REVISIT
        </span>
        <ul className="lab-fragments">
          {fragments.map((fragment, i) => (
            <li
              className={`lab-fragment fragment-${fragment.kind}`}
              key={fragment.label}
            >
              <span className="fragment-index mono">0{i + 1} / FRAGMENT</span>
              <p className="fragment-title">{fragment.label}</p>
              <div
                className={`fragment-sketch sketch-${fragment.kind}`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="fragment-note">{fragment.note}</span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="project-visual-caption">
        An idea workbench, not a reconstruction of specific products. Historical
        entries remain open for accurate documentation.
      </figcaption>
    </figure>
  );
}
export function ProjectVisual({
  kind,
  detail = false,
}: {
  kind: VisualKind;
  detail?: boolean;
}) {
  if (kind === "mission") return <MissionViewer detail={detail} />;
  if (kind === "control") return <ControlViewer detail={detail} />;
  return <LabWorkbench detail={detail} />;
}
