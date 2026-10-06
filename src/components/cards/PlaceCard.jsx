import React from "react";
import { MapPin } from "lucide-react";
import { CARD, CORAL, SUBTEXT } from "../../data/theme";
import { Placeholder } from "../common/Placeholder";
import { FavButton } from "../common/FavButton";
import { Badge } from "../common/Badge";
import { StarRow } from "../common/StarRow";

export function PlaceCard({ item, type = "housing", favorites, toggleFav, setDetail }) {
  const key = `${type}-${item.id}`;
  return (
    <div
      className="ul-card"
      style={{
        background: CARD,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #ECE7D8",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      onClick={() => setDetail({ ...item, type })}
    >
      <div style={{ position: "relative" }}>
        <Placeholder seed={item.img || item.name} text="Phòng Trọ UniLife" />
        <FavButton active={!!favorites[key]} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} />
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg="rgba(22,25,46,0.85)" color="#fff">{item.area}</Badge>
        </div>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6, lineHeight: 1.35, minHeight: 40 }}>
          {item.name}
        </div>
        <div style={{ fontSize: 15, color: CORAL, fontWeight: 800, marginBottom: 8 }}>
          {item.price}<span style={{ color: SUBTEXT, fontWeight: 400, fontSize: 12 }}>/tháng</span>
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 8,
            borderTop: "1px dashed #EAE6D9"
          }}
        >
          <span style={{ fontSize: 12.5, color: SUBTEXT, display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={13} color={CORAL} /> {item.distance}
          </span>
          <StarRow rating={item.rating} />
        </div>
      </div>
    </div>
  );
}
