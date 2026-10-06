import React from "react";
import { CARD, CORAL, SUBTEXT } from "../../data/theme";
import { Placeholder } from "../common/Placeholder";
import { FavButton } from "../common/FavButton";
import { Badge } from "../common/Badge";

export function ProductCard({ item, favorites, toggleFav, setDetail }) {
  const key = `market-${item.id}`;
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
      onClick={() => setDetail({ ...item, type: "market" })}
    >
      <div style={{ position: "relative" }}>
        <Placeholder seed={item.img} text={item.name} />
        <FavButton active={!!favorites[key]} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} />
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg="rgba(0,0,0,0.75)" color="#fff">{item.cond}</Badge>
        </div>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.35, minHeight: 38 }}>
          {item.name}
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: CORAL, marginBottom: 8 }}>{item.price}</div>
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
          <span>{item.seller}</span>
          <span>{item.loc}</span>
        </div>
      </div>
    </div>
  );
}
