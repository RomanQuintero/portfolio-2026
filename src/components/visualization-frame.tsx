import type { ReactNode } from "react";
export function VisualizationFrame({
  kind,
  caption,
  status,
  footer,
  code,
  children,
}: {
  kind: string;
  caption: string;
  status: string;
  footer: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <div className={`system-map visualization-${kind}`} aria-hidden="true">
      <div className="map-caption">
        <span>{caption}</span>
        <span>{status}</span>
      </div>
      {children}
      <div className="map-footer">
        <span>
          <i />
          {footer}
        </span>
        <span>{code}</span>
      </div>
    </div>
  );
}
