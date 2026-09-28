import type { CSSProperties } from "react";
import type { Work } from "@/lib/work";
import { VisualizationFrame } from "./visualization-frame";
const searchPaths = [
  "M78 94L153 85L160 112L85 122L92 150L167 140L174 168L99 179",
  "M236 84L310 92L307 119L231 111L227 139L303 147L299 175L224 167",
  "M371 112L446 94L453 119L378 137L385 162L460 144L467 170L392 188",
];
function SearchArea() {
  return (
    <VisualizationFrame
      kind="search"
      caption="MULTI-UAV / SEARCH AREA"
      status="COOPERATIVE SEARCH"
      footer="3 UAV / SHARED MISSION"
      code="AREA / 01"
    >
      <svg viewBox="0 0 600 260" fill="none">
        <path
          d="M58 77L321 63L477 83L510 192L293 211L77 203Z"
          stroke="var(--muted)"
          opacity=".3"
          strokeDasharray="4 7"
        />
        <g strokeWidth="1">
          <path
            d="M66 86L163 74L190 186L91 197Z"
            fill="var(--yellow)"
            fillOpacity=".035"
            stroke="var(--yellow)"
            strokeOpacity=".18"
          />
          <path
            d="M225 74L325 84L311 190L211 179Z"
            fill="var(--cyan)"
            fillOpacity=".045"
            stroke="var(--cyan)"
            strokeOpacity=".2"
          />
          <path
            d="M359 103L456 80L483 185L382 206Z"
            fill="var(--violet)"
            fillOpacity=".06"
            stroke="var(--violet)"
            strokeOpacity=".25"
          />
        </g>
        {searchPaths.map((d, i) => (
          <g
            key={d}
            style={{
              color: ["var(--yellow)", "var(--cyan)", "var(--violet)"][i],
            }}
          >
            <path d={d} stroke="currentColor" opacity=".35" strokeWidth="1" />
            <circle
              r="3.5"
              fill="currentColor"
              className="mission-uav"
              style={
                {
                  offsetPath: `path('${d}')`,
                  offsetDistance: `${20 + i * 25}%`,
                  animationDuration: `${24 + i * 5}s`,
                  animationDelay: `-${i * 8}s`,
                } as CSSProperties
              }
            />
          </g>
        ))}
        <g stroke="var(--muted)" opacity=".45">
          <path d="M191 105h8m-4-4v8M337 155h8m-4-4v8M489 132h8m-4-4v8" />
        </g>
        <g fontFamily="monospace" fontSize="10" fill="var(--muted)">
          <text x="95" y="218">
            UAV / 01
          </text>
          <text x="236" y="218">
            UAV / 02
          </text>
          <text x="386" y="225">
            UAV / 03
          </text>
        </g>
      </svg>
    </VisualizationFrame>
  );
}
function TelemetryLink() {
  const uplink = "M91 132H141Q156 132 156 113V101H218";
  const downlink = "M236 101H282Q301 101 301 121V162H349";
  const control = "M367 162H413Q432 162 432 141V119H500";
  return (
    <VisualizationFrame
      kind="telemetry"
      caption="REMOTE FLIGHT / DATA LINK"
      status="TELEMETRY + CONTROL"
      footer="PX4 / 4G / WEBRTC"
      code="LINK / 02"
    >
      <svg viewBox="0 0 600 260" fill="none">
        <g stroke="var(--cyan)" opacity=".25">
          <path d={uplink} />
          <path d={downlink} />
          <path d={control} />
        </g>
        {[uplink, downlink, control].map((d, i) => (
          <path
            key={d}
            d={d}
            stroke={i === 1 ? "var(--violet)" : "var(--cyan)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="2 98"
            className="telemetry-signal"
            style={{
              animationDuration: `${12 + i * 3}s`,
              animationDelay: `-${i * 4}s`,
            }}
          />
        ))}
        <path
          d="M500 140H457Q449 140 449 151V190H144Q126 190 126 172V151H91"
          stroke="var(--violet)"
          opacity=".2"
          strokeDasharray="3 6"
        />
        <g stroke="var(--muted)" fill="var(--bg)">
          <rect x="59" y="116" width="32" height="32" />
          <rect x="218" y="85" width="18" height="32" />
          <rect x="349" y="146" width="18" height="32" />
          <rect x="500" y="102" width="40" height="37" />
        </g>
        <path d="M66 132h18M75 123v18" stroke="var(--yellow)" />
        <g fill="var(--cyan)">
          <rect x="224" y="100" width="6" height="11" />
          <rect x="354" y="153" width="8" height="3" />
          <rect x="354" y="162" width="8" height="3" />
        </g>
        <path d="M507 129v-6l5-6 5 4 6-12 9 7" stroke="var(--violet)" />
        <g stroke="var(--cyan)" opacity=".3">
          <path d="M169 73v6M176 66v13M183 60v19M190 69v10" />
          <path d="M304 201v-4M313 201v-13M322 201v-7M331 201v-18M340 201v-11M349 201v-5" />
        </g>
        <g fontFamily="monospace" fontSize="10" fill="var(--muted)">
          <text x="57" y="166">
            DRONE
          </text>
          <text x="204" y="72">
            4G NETWORK
          </text>
          <text x="321" y="133">
            EDGE / CLOUD
          </text>
          <text x="485" y="160">
            CONTROL
          </text>
          <text x="189" y="207" fill="var(--violet)" opacity=".65">
            RETURN CHANNEL
          </text>
        </g>
      </svg>
    </VisualizationFrame>
  );
}
export function WorkVisualization({ variant }: { variant: Work["diagram"] }) {
  if (variant === "swarm") return <SearchArea />;
  if (variant === "edge") return <TelemetryLink />;
  return null;
}
