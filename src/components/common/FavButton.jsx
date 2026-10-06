import React from "react";
import { Heart } from "lucide-react";
import { CORAL, INK } from "../../data/theme";

export function FavButton({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="ul-btn"
      title={active ? "Bỏ yêu thích" : "Lưu vào yêu thích"}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "none",
        background: "rgba(255,255,255,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        zIndex: 5
      }}
    >
      <Heart size={16} fill={active ? CORAL : "none"} color={active ? CORAL : INK} />
    </button>
  );
}
