import React from "react";
import { MapPin, Clock } from "lucide-react";
import { CARD, TEAL, SUBTEXT } from "../../data/theme";
import { Placeholder } from "../common/Placeholder";
import { FavButton } from "../common/FavButton";
import { Badge } from "../common/Badge";
import { StarRow } from "../common/StarRow";

export function FoodCard({ item, favorites, toggleFav, setDetail }) {
  const key = `food-${item.id}`;
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
      onClick={() => setDetail({ ...item, type: "food" })}
    >
      <div style={{ position: "relative" }}>
        <Placeholder seed={item.img} text={item.name} />
        <FavButton active={!!favorites[key]} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} />
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg={TEAL} color="#fff">{item.cat}</Badge>
        </div>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: TEAL }}>{item.price}</span>
          <StarRow rating={item.rating} />
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 12,
            color: SUBTEXT,
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
            borderTop: "1px dashed #EAE6D9"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <MapPin size={12} color={TEAL} />{item.distance}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Clock size={12} />{item.hours ? item.hours.split(" - ")[0] : "07:00"}
          </span>
        </div>
      </div>
    </div>
  );
}
