import { VisualizationFrame } from "./visualization-frame";

type Point = readonly [number, number];
type Section = readonly [Point, Point, Point, Point];

// A ruled, continuously reconstructed form. These are construction contours,
// not links or a representation of a technology.
function sections(t: number): readonly [Section, Section] {
  const middle: Point = [294, 175 + 68 * t];
  return [
    [[80, 300 - 120 * t], [190, 415 - 120 * t], [208, 120 + 60 * t], middle],
    [middle, [378, 230 + 95 * t], [417, 345 - 75 * t], [524, 90 + 215 * t]],
  ];
}
function contour(t: number) {
  const [a, b] = sections(t);
  return `M${a[0].join(" ")}C${a[1].join(" ")} ${a[2].join(" ")} ${a[3].join(" ")}C${b[1].join(" ")} ${b[2].join(" ")} ${b[3].join(" ")}`;
}
function sample(section: Section, t: number): Point {
  const q = 1 - t;
  const coordinate = (axis: 0 | 1) =>
    q * q * q * section[0][axis] +
    3 * q * q * t * section[1][axis] +
    3 * q * t * t * section[2][axis] +
    t * t * t * section[3][axis];
  return [coordinate(0), coordinate(1)];
}
function sectionGuide(position: number) {
  const segment = position < 0.5 ? 0 : 1;
  const t = position < 0.5 ? position * 2 : (position - 0.5) * 2;
  const points = Array.from({ length: 15 }, (_, i) =>
    sample(sections(i / 14)[segment], t),
  );
  return points.map((p, i) => `${i ? "L" : "M"}${p.join(" ")}`).join(" ");
}
export function SystemMap() {
  return (
    <VisualizationFrame
      kind="engineering"
      caption="RQ / CONSTRUCTION FIELD"
      status="REV / 010"
      footer="RECONSTRUCTING"
      code="PASS / 01"
    >
      <svg viewBox="0 0 600 460" fill="none">
        <g
          className="engineering-guides"
          stroke="var(--muted)"
          strokeWidth=".75"
        >
          <path d="M60 65H529M552 83V379" opacity=".35" />
          {Array.from({ length: 24 }, (_, i) => (
            <path
              key={i}
              d={`M${62 + i * 20} 65v${i % 5 === 0 ? 8 : 3}`}
              opacity=".35"
            />
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <path
              key={i}
              d={`M552 ${85 + i * 20}h${i % 5 === 0 ? -8 : -3}`}
              opacity=".35"
            />
          ))}
          <path
            d="M64 116v-16h16M524 100h16v16M64 350v16h16M524 366h16v-16"
            opacity=".45"
          />
          <path
            d="M47 333L200 387M175 104L307 152M432 359L552 188"
            strokeDasharray="2 7"
            opacity=".25"
          />
          <path d="M63 278V97L494 355" strokeDasharray="5 9" opacity=".13" />
        </g>
        <g className="engineering-form">
          <path
            d="M80 300C190 415 208 120 294 175C378 230 417 345 524 90L524 305C417 270 378 325 294 243C208 180 190 295 80 180Z"
            fill="var(--text)"
            fillOpacity=".035"
          />
          <g stroke="var(--text)" strokeWidth=".85">
            {Array.from({ length: 36 }, (_, i) => (
              <path
                key={i}
                d={contour(i / 35)}
                opacity={0.16 + Math.sin((i / 35) * Math.PI) * 0.2}
                pathLength="100"
                className="engineering-contour"
                style={{ animationDelay: `-${i * 0.63}s` }}
              />
            ))}
          </g>
          <g stroke="var(--muted)" strokeWidth=".65" opacity=".25">
            {[0.07, 0.16, 0.25, 0.34, 0.44, 0.56, 0.66, 0.76, 0.86, 0.94].map(
              (p) => (
                <path key={p} d={sectionGuide(p)} />
              ),
            )}
          </g>
          <path
            d={contour(-0.12)}
            stroke="var(--cyan)"
            opacity=".22"
            strokeWidth="1"
          />
          <path
            d={contour(1.14)}
            stroke="var(--violet)"
            opacity=".26"
            strokeWidth="1"
          />
          <path
            d="M74 309C189 428 214 102 300 166C373 219 425 363 537 87"
            stroke="var(--violet)"
            opacity=".12"
            strokeWidth="1"
          />
          <path
            d={contour(0.37)}
            stroke="var(--yellow)"
            strokeWidth="6.5"
            strokeLinecap="square"
            pathLength="100"
            className="engineering-current"
          />
        </g>
        <g
          className="engineering-scan"
          stroke="var(--text)"
          strokeWidth=".8"
          opacity=".15"
        >
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`M38 ${186 + i * 5}C159 ${211 + i * 3} 354 ${153 + i * 7} 565 ${192 + i * 5}`}
            />
          ))}
        </g>
        <g stroke="var(--muted)" opacity=".5">
          <path d="M75 180h10M80 175v10M203 142h10M208 137v10M289 200h10M294 195v10M519 169h10M524 164v10" />
          <rect x="77" y="297" width="6" height="6" />
          <rect x="414" y="267" width="6" height="6" />
        </g>
        <g
          fontFamily="monospace"
          fontSize="10"
          fill="var(--muted)"
          opacity=".65"
        >
          <text x="64" y="89">
            X / 024.80
          </text>
          <text x="447" y="350">
            Y / 061.32
          </text>
          <text x="104" y="350">
            [ 008 : 037 ]
          </text>
        </g>
        <g fill="var(--muted)" className="engineering-particles">
          {[
            [96, 120],
            [467, 76],
            [350, 375],
            [539, 320],
            [57, 241],
            [188, 345],
            [384, 100],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="1.5" height="1.5" opacity=".35" />
          ))}
        </g>
      </svg>
    </VisualizationFrame>
  );
}
