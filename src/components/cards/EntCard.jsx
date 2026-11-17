import React from "react";
import { MapPin, Clock, Trash2 } from "lucide-react";
import { CARD, SUBTEXT } from "../../data/theme";
import { Placeholder } from "../common/Placeholder";
import { FavButton } from "../common/FavButton";
import { Badge } from "../common/Badge";
import { StarRow } from "../common/StarRow";

export function EntCard({ item, favorites, toggleFav, setDetail, onDelete }) {
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
        cursor: "pointer",
        position: "relative"
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
        {onDelete && (
          <button
            type="button"
            title="Xóa địa điểm khỏi CSDL"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Bạn có chắc chắn muốn xóa "${item.name}" khỏi CSDL?`)) {
                onDelete(item.id);
              }
            }}
            style={{
              position: "absolute",
              top: 8,
              right: 44,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(220,53,69,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#dc3545",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "transform 0.15s ease"
            }}
          >
            <Trash2 size={15} />
          </button>
        )}
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
