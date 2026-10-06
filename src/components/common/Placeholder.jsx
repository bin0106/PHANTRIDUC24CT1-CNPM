import React from "react";
import { Sparkles } from "lucide-react";

export function Placeholder({ seed, height = 140, text = "UniLife" }) {
  const isUrl = typeof seed === "string" && (seed.startsWith("http://") || seed.startsWith("https://") || seed.startsWith("/"));
  if (isUrl) {
    return (
      <div style={{ height, width: "100%", overflow: "hidden", position: "relative", borderRadius: "10px 10px 0 0" }}>
        <img
          src={seed}
          alt={text}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)", pointerEvents: "none" }} />
      </div>
    );
  }

  const hue = Array.from(String(seed || "UniLife")).reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div
      style={{
        height,
        borderRadius: "10px 10px 0 0",
        background: `linear-gradient(135deg, hsl(${hue},65%,88%), hsl(${hue + 45},60%,76%))`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: `hsl(${hue},45%,25%)`,
        fontSize: 13,
        fontWeight: 700,
        position: "relative",
        userSelect: "none"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5, opacity: 0.85 }}>
        <Sparkles size={16} />
        <span>{text}</span>
      </div>
      <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.65, marginTop: 2 }}>UniLife Community</span>
    </div>
  );
}
