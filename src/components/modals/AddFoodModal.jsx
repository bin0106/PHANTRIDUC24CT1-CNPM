import React, { useState } from "react";
import { X, Utensils, Loader2 } from "lucide-react";
import { CARD, CORAL, INK, SUBTEXT } from "../../data/theme";

export function AddFoodModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Cơm");
  const [price, setPrice] = useState("25k - 40k");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("07:00 - 22:00");
  const [phone, setPhone] = useState("0905.888.777");
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
      phone,
      rating: 5.0,
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      status: "approved"
    });
    setIsSubmitting(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 480, width: "100%", padding: 24, boxShadow: "0 20px 45px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,93,62,0.12)", color: CORAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Utensils size={20} />
            </div>
            <div>
              <h2 className="ul-h" style={{ fontSize: 19, margin: 0, fontWeight: 700 }}>Đăng quán ăn / Cà phê mới</h2>
              <span style={{ fontSize: 12, color: SUBTEXT }}>Lưu trực tiếp vào CSDL phpMyAdmin</span>
            </div>
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tên quán ăn / nước uống *</label>
            <input required placeholder="Ví dụ: Cơm tấm sinh viên Cô Ba..." value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Phân loại</label>
              <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, background: CARD }}>
                <option value="Cơm">Cơm</option>
                <option value="Bún">Bún / Phở</option>
                <option value="Trà sữa">Trà sữa</option>
                <option value="Cafe">Cafe</option>
                <option value="Ăn vặt">Ăn vặt</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Khoảng giá</label>
              <input placeholder="25k - 40k" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Địa chỉ quán *</label>
            <input required placeholder="142 Huỳnh Thúc Kháng..." value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Giờ mở cửa</label>
              <input value={hours} onChange={(e) => setHours(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Số điện thoại</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="ul-btn"
            style={{
              background: CORAL,
              color: "#fff",
              padding: "12px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: isSubmitting ? "not-allowed" : "pointer"
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Đang lưu vào phpMyAdmin...</span>
              </>
            ) : (
              "Lưu quán ăn mới"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
