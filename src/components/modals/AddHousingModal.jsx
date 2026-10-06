import React, { useState } from "react";
import { X } from "lucide-react";
import { CARD, CORAL } from "../../data/theme";

export function AddHousingModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [priceNum, setPriceNum] = useState(2.0);
  const [area, setArea] = useState("22m²");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("500m");
  const [ac, setAc] = useState(true);
  const [washer, setWasher] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [parking, setParking] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address) return;
    onAdd({
      id: Date.now(),
      name,
      price: `${priceNum} triệu`,
      priceNum: parseFloat(priceNum),
      area,
      address,
      distance,
      rating: 5.0,
      reviews: 1,
      ac,
      washer,
      wifi,
      parking,
      phone: "0908.777.666",
      host: "Chủ trọ mới đăng ký",
      desc: "Phòng trọ mới cập nhật trên UniLife, liên hệ để xem phòng trực tiếp.",
      img: `new_room_${Date.now()}`
    });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 500, width: "100%", padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="ul-h" style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>Đăng tin phòng trọ cho thuê</h2>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tiêu đề phòng trọ *</label>
            <input required placeholder="Ví dụ: Phòng trọ ban công gần ĐH Kiến Trúc..." value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Giá thuê (Triệu/tháng) *</label>
              <input required type="number" step="0.1" value={priceNum} onChange={(e) => setPriceNum(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Diện tích</label>
              <input value={area} onChange={(e) => setArea(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Địa chỉ chi tiết *</label>
            <input required placeholder="Số nhà, tên đường, phường, quận..." value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Tiện nghi có sẵn:</label>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 13 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} /> Máy lạnh
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="checkbox" checked={washer} onChange={(e) => setWasher(e.target.checked)} /> Máy giặt
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="checkbox" checked={wifi} onChange={(e) => setWifi(e.target.checked)} /> Wifi
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="checkbox" checked={parking} onChange={(e) => setParking(e.target.checked)} /> Chỗ để xe
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" className="ul-btn" onClick={onClose} style={{ background: "#EAE6D9", padding: "10px 18px", borderRadius: 10, fontSize: 14 }}>Hủy</button>
            <button type="submit" className="ul-btn" style={{ background: CORAL, color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700 }}>Đăng phòng ngay</button>
          </div>
        </form>
      </div>
    </div>
  );
}
