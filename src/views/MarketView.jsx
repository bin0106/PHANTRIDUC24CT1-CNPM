import React, { useState } from "react";
import { Plus } from "lucide-react";
import { SUBTEXT, CORAL } from "../data/theme";
import { FilterChip } from "../components/common/FilterChip";
import { ProductCard } from "../components/cards/ProductCard";

export function MarketView({ data, favorites, toggleFav, setDetail, onOpenAddModal }) {
  const [cat, setCat] = useState("Tất cả");
  const cats = ["Tất cả", "Sách", "Đồ công nghệ", "Phương tiện", "Dụng cụ học tập", "Nội thất", "Gia dụng"];
  const filtered = cat === "Tất cả" ? data : data.filter((p) => p.cat === cat);

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>Chợ sinh viên & Trao đổi đồ cũ</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Thanh lý giáo trình, laptop, xe đạp, đồ dùng học tập giá sinh viên</p>
        </div>
        <button
          className="ul-btn"
          onClick={onOpenAddModal}
          style={{ background: CORAL, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
        >
          <Plus size={16} /> Đăng bán đồ cũ
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, margin: "18px 0 24px", flexWrap: "wrap" }}>
        {cats.map((c) => <FilterChip key={c} active={cat === c} label={c} onClick={() => setCat(c)} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
        {filtered.map((p) => <ProductCard key={p.id} item={p} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />)}
      </div>
    </div>
  );
}
