import React, { useState } from "react";
import { Plus, PartyPopper } from "lucide-react";
import { SUBTEXT } from "../data/theme";
import { EntCard } from "../components/cards/EntCard";
import { AddEntertainmentModal } from "../components/modals/AddEntertainmentModal";

export function EntertainmentView({ data, favorites, toggleFav, setDetail, onAdd, onDelete }) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
            <span>Tụ điểm vui chơi & Giải trí</span>
            <span style={{ fontSize: 14, fontWeight: 500, padding: "2px 10px", borderRadius: 20, background: "rgba(127,119,221,0.15)", color: "#534AB7" }}>
              {data.length} địa điểm
            </span>
          </h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Xả stress sau giờ học và các kỳ thi căng thẳng cùng bạn bè (Đồng bộ CSDL MySQL)</p>
        </div>

        {onAdd && (
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="ul-btn"
            style={{
              background: "#534AB7",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 600,
              fontSize: 14,
              boxShadow: "0 4px 12px rgba(83,74,183,0.25)"
            }}
          >
            <Plus size={18} />
            <span>Thêm tụ điểm vui chơi</span>
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 18 }}>
        {data.map((e) => (
          <EntCard
            key={e.id}
            item={e}
            favorites={favorites}
            toggleFav={toggleFav}
            setDetail={setDetail}
            onDelete={onDelete}
          />
        ))}
      </div>

      {showAddModal && onAdd && (
        <AddEntertainmentModal
          onClose={() => setShowAddModal(false)}
          onAdd={async (item) => {
            await onAdd(item);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
