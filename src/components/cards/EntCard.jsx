import React from "react";
import { MapPin, Clock } from "lucide-react";
import { CARD, SUBTEXT } from "../../data/theme";
import { Placeholder } from "../common/Placeholder";
import { FavButton } from "../common/FavButton";
import { Badge } from "../common/Badge";
import { StarRow } from "../common/StarRow";

export function EntCard({ item, favorites, toggleFav, setDetail }) {
  const key = `ent-${item.id}`;
  const Icon = item.icon;
  return (
    <div
      className="ul-card"
      style={{
        background: CARD,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #ECE7D8",
        cursor: "pointer"
      }}
      onClick={() => setDetail({ ...item, type: "entertainment" })}
    >
      <div style={{ position: "relative" }}>
        {item.img ? (
          <Placeholder seed={item.img} height={140} text={item.name} />
        ) : (
          <div
            style={{
              height: 140,
              background: "linear-gradient(135deg, #7F77DD20, #7F77DD40)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {Icon && <Icon size={38} color="#534AB7" />}
          </div>
        )}
        <FavButton active={!!favorites[key]} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} />
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg="#534AB7" color="#fff">{item.cat}</Badge>
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#534AB7" }}>{item.price}</span>
          <StarRow rating={item.rating} />
        </div>
        <div
          style={{
            fontSize: 12,
            color: SUBTEXT,
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
            borderTop: "1px dashed #EAE6D9"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <MapPin size={12} color="#534AB7" />{item.distance}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Clock size={12} />{item.hours}
          </span>
        </div>
      </div>
    </div>
  );
}
