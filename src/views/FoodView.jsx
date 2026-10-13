import React, { useState } from "react";
import { Plus } from "lucide-react";
import { SUBTEXT, CORAL } from "../data/theme";
import { FilterChip } from "../components/common/FilterChip";
import { FoodCard } from "../components/cards/FoodCard";

export function FoodView({ data, favorites, toggleFav, setDetail, onOpenAddModal }) {
  const [cat, setCat] = useState("Tất cả");
  const cats = ["Tất cả", "Cơm", "Bún", "Trà sữa", "Cafe", "Ăn vặt"];
  const filtered = cat === "Tất cả" ? data : data.filter((f) => f.cat === cat);

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>Quán ăn & Cà phê sinh viên</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Địa điểm ẩm thực ngon, sạch, đảm bảo vệ sinh và giá cả hợp lý cho sinh viên</p>
        </div>
        {onOpenAddModal && (
          <button
            className="ul-btn"
            onClick={onOpenAddModal}
            style={{ background: CORAL, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
          >
            <Plus size={16} /> Đăng quán ăn mới
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {cats.map((c) => <FilterChip key={c} active={cat === c} label={c} onClick={() => setCat(c)} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
        {filtered.map((f) => <FoodCard key={f.id} item={f} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />)}
      </div>
    </div>
  );
}
