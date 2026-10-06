import React from "react";
import { Sparkles } from "lucide-react";
import { CARD, SUBTEXT, TEAL } from "../../data/theme";

export function EmptyState({ text = "Chưa có dữ liệu nào phù hợp." }) {
  return (
    <div
      style={{
        background: CARD,
        borderRadius: 14,
        padding: "48px 24px",
        textAlign: "center",
        border: "1.5px dashed #E5E3DC",
        margin: "16px 0"
      }}
    >
      <Sparkles size={32} color={TEAL} style={{ margin: "0 auto 12px", opacity: 0.7 }} />
      <p style={{ margin: 0, fontSize: 14, color: SUBTEXT, fontWeight: 500 }}>{text}</p>
    </div>
  );
}
