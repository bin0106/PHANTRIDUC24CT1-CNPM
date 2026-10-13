import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { CARD, CORAL } from "../../data/theme";

export function AddMarketModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cond, setCond] = useState("Đã dùng - tốt");
  const [cat, setCat] = useState("Sách");
  const [seller, setSeller] = useState("Sinh viên UniLife");
  const [loc, setLoc] = useState("Ký túc xá ĐH Bách Khoa");
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return;

    setIsSubmitting(true);
    await onAdd({
      name,
      price: price.includes("đ") ? price : `${price}đ`,
      cond,
      cat,
      seller,
      phone: "0909.888.999",
      loc,
      desc: desc || "Sản phẩm sinh viên còn sử dụng rất tốt.",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      status: "approved"
    });
    setIsSubmitting(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 480, width: "100%", padding: 24, boxShadow: "0 20px 45px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="ul-h" style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>Đăng bán đồ cũ sinh viên</h2>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tên sản phẩm *</label>
            <input required placeholder="Ví dụ: Giáo trình Giải tích 1, Laptop cũ..." value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Giá bán (VNĐ) *</label>
              <input required placeholder="50.000đ" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Danh mục</label>
              <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, background: CARD }}>
                <option value="Sách">Sách & Giáo trình</option>
                <option value="Đồ công nghệ">Đồ công nghệ</option>
                <option value="Phương tiện">Phương tiện</option>
                <option value="Dụng cụ học tập">Dụng cụ học tập</option>
                <option value="Nội thất">Bàn ghế & Nội thất</option>
                <option value="Gia dụng">Đồ gia dụng</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tình trạng</label>
              <input value={cond} onChange={(e) => setCond(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tên người bán</label>
              <input value={seller} onChange={(e) => setSeller(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Địa điểm giao dịch</label>
            <input value={loc} onChange={(e) => setLoc(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Mô tả chi tiết</label>
            <textarea rows={3} placeholder="Mô tả thêm về tình trạng, phụ kiện tặng kèm..." value={desc} onChange={(e) => setDesc(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, fontFamily: "inherit" }} />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" className="ul-btn" onClick={onClose} style={{ background: "#EAE6D9", padding: "10px 18px", borderRadius: 10, fontSize: 14 }}>Hủy</button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="ul-btn"
              style={{
                background: CORAL,
                color: "#fff",
                padding: "10px 22px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Đang lưu phpMyAdmin...</span>
                </>
              ) : (
                "Đăng bán ngay"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
