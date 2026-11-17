import React, { useState } from "react";
import { X, PartyPopper, Loader2 } from "lucide-react";
import { CARD, CORAL, SUBTEXT } from "../../data/theme";

export function AddEntertainmentModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Bida");
  const [price, setPrice] = useState("35.000đ - 50.000đ/giờ");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("08:00 - 24:00");
  const [distance, setDistance] = useState("500m");
  const [rating, setRating] = useState("4.8");
  const [img, setImg] = useState("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    setIsSubmitting(true);
    await onAdd({
      name: name.trim(),
      cat,
      price,
      address: address.trim(),
      hours,
      distance: distance.trim() || "Gần trường",
      rating: parseFloat(rating) || 4.8,
      img: img.trim() || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
      status: "approved"
    });
    setIsSubmitting(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 480, width: "100%", padding: 24, boxShadow: "0 20px 45px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(127,119,221,0.15)", color: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PartyPopper size={20} />
            </div>
            <div>
              <h2 className="ul-h" style={{ fontSize: 19, margin: 0, fontWeight: 700 }}>Thêm tụ điểm vui chơi mới</h2>
              <span style={{ fontSize: 12, color: SUBTEXT }}>Lưu tự động vào CSDL phpMyAdmin (MySQL)</span>
            </div>
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tên tụ điểm giải trí *</label>
            <input required placeholder="Ví dụ: CyberCore Gaming, Bida Zone..." value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Phân loại</label>
              <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, background: CARD }}>
                <option value="Bida">Bida</option>
                <option value="Gaming/Net">Gaming / Net</option>
                <option value="Karaoke Mini">Karaoke Mini</option>
                <option value="Thể thao">Thể thao (Cầu lông/Bóng đá)</option>
                <option value="Board Game">Board Game Cafe</option>
                <option value="Giải trí">Giải trí tổng hợp</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Bảng giá dịch vụ</label>
              <input placeholder="30.000đ - 50.000đ/giờ" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Địa chỉ chi tiết *</label>
            <input required placeholder="Ví dụ: 45 Hoàng Diệu 2, P. Linh Tây..." value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Giờ mở cửa</label>
              <input placeholder="08:00 - 24:00 hoặc 24/7" value={hours} onChange={(e) => setHours(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Khoảng cách</label>
              <input placeholder="Ví dụ: 500m" value={distance} onChange={(e) => setDistance(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Link hình ảnh minh họa</label>
            <input placeholder="https://..." value={img} onChange={(e) => setImg(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button type="button" onClick={onClose} className="ul-btn" style={{ flex: 1, background: "none", border: "1px solid #E0DCD0", color: SUBTEXT }}>Hủy bỏ</button>
            <button type="submit" disabled={isSubmitting} className="ul-btn" style={{ flex: 2, background: "#534AB7", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Đang lưu...</> : "Lưu vào CSDL & Đăng ngay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
