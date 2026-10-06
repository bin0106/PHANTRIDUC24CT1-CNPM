import React from "react";
import { INK, SUBTEXT } from "../../data/theme";

export function SectionTitle({ children, action, subtitle }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: INK, margin: 0, letterSpacing: "-0.01em" }}>
          {children}
        </h2>
        {subtitle && (
          <p style={{ margin: "4px 0 0 0", fontSize: 13, color: SUBTEXT }}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
