import React from "react";

export function Badge({ children, bg, color }) {
  return (
    <span
      style={{
        background: bg,
        color: color,
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 3
      }}
    >
      {children}
    </span>
  );
}
