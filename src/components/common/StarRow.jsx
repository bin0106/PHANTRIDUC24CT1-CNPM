import React from "react";
import { Star } from "lucide-react";
import { MARIGOLD, INK } from "../../data/theme";

export function StarRow({ rating, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <Star size={size} fill={MARIGOLD} color={MARIGOLD} />
      <span style={{ fontWeight: 600, fontSize: 13, color: INK }}>{rating}</span>
    </span>
  );
}
