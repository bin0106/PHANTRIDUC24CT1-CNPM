import React from "react";
import { Search, X, SlidersHorizontal, Fan, WashingMachine, Wifi, Bike, Plus } from "lucide-react";
import { SUBTEXT, CARD, CORAL, INK } from "../data/theme";
import { FilterChip } from "../components/common/FilterChip";
import { EmptyState } from "../components/common/EmptyState";
import { PlaceCard } from "../components/cards/PlaceCard";

export function HousingView({ data, favorites, toggleFav, filters, setFilters, priceMax, setPriceMax, query, setQuery, setDetail, onOpenAddModal }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>Tìm phòng trọ sinh viên</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Có {data.length} phòng trọ phù hợp với tiêu chí của bạn</p>
        </div>
        <button
          className="ul-btn"
          onClick={onOpenAddModal}
          style={{ background: CORAL, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
        >
          <Plus size={16} /> Đăng tin cho thuê trọ
        </button>
      </div>

      {/* SEARCH INPUT */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={18} color={SUBTEXT} style={{ position: "absolute", left: 14 }} />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên phòng, đường, quận hoặc khu vực quanh trường..."
            style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 12, border: "1px solid #E0DCD0", fontSize: 14, outline: "none", background: CARD }}
          />
          {query && (
            <X size={16} color={SUBTEXT} onClick={() => setQuery("")} style={{ position: "absolute", right: 14, cursor: "pointer" }} />
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background: CARD, padding: "14px 16px", borderRadius: 14, border: "1px solid #ECE7D8", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: INK, display: "flex", alignItems: "center", gap: 4 }}>
          <SlidersHorizontal size={14} /> Tiện ích:
        </span>
        <FilterChip icon={Fan} active={filters.ac} label="Máy lạnh" onClick={() => setFilters((f) => ({ ...f, ac: !f.ac }))} />
        <FilterChip icon={WashingMachine} active={filters.washer} label="Máy giặt" onClick={() => setFilters((f) => ({ ...f, washer: !f.washer }))} />
        <FilterChip icon={Wifi} active={filters.wifi} label="Wifi miễn phí" onClick={() => setFilters((f) => ({ ...f, wifi: !f.wifi }))} />
        <FilterChip icon={Bike} active={filters.parking} label="Chỗ giữ xe" onClick={() => setFilters((f) => ({ ...f, parking: !f.parking }))} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto", fontSize: 13.5, color: SUBTEXT }}>
          <span>Mức giá tối đa: <b style={{ color: CORAL, fontSize: 15 }}>{priceMax} triệu</b></span>
          <input
            type="range" min="1" max="5" step="0.2" value={priceMax}
            onChange={(e) => setPriceMax(parseFloat(e.target.value))}
            style={{ accentColor: CORAL, cursor: "pointer" }}
          />
        </div>
      </div>

      {/* LISTINGS */}
      {data.length === 0 ? (
        <EmptyState text="Không tìm thấy phòng phù hợp với bộ lọc hiện tại. Thử tăng mức giá hoặc giảm bớt tiêu chí tiện ích." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {data.map((h) => <PlaceCard key={h.id} item={h} type="housing" favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />)}
        </div>
      )}
    </div>
  );
}
