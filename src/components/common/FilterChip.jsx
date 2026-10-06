import React from "react";
import { INK, TEAL } from "../../data/theme";

export function FilterChip({ active, label, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className="ul-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        background: active ? TEAL : "#FFFFFF",
        color: active ? "#FFFFFF" : INK,
        border: `1.5px solid ${active ? TEAL : "#E5E3DC"}`,
        boxShadow: active ? "0 2px 8px rgba(14,124,102,0.25)" : "none"
      }}
    >
      {Icon && <Icon size={14} />}
      <span>{label}</span>
    </button>
  );
}
