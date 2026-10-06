import React from "react";

export function CardRow({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16
      }}
    >
      {children}
    </div>
  );
}
