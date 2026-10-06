import React from "react";
import { SUBTEXT } from "../data/theme";
import { EntCard } from "../components/cards/EntCard";

export function EntertainmentView({ data, favorites, toggleFav, setDetail }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Tụ điểm vui chơi & Giải trí</h1>
      <p style={{ color: SUBTEXT, fontSize: 14, marginBottom: 24 }}>Xả stress sau giờ học và các kỳ thi căng thẳng cùng bạn bè</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 18 }}>
        {data.map((e) => <EntCard key={e.id} item={e} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />)}
      </div>
    </div>
  );
}
