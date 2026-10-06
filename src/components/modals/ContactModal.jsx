import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { CARD, PAPER, INK, CORAL, SUBTEXT } from "../../data/theme";

export function ContactModal({ item, onClose, showToast }) {
  const phone = item.phone || "0905.123.456";
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 420, width: "100%", padding: 24, textAlign: "center" }}>
        <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,93,62,0.12)", color: CORAL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <Phone size={24} />
        </div>
        <h3 className="ul-h" style={{ fontSize: 20, margin: "0 0 6px" }}>Liên hệ: {item.name}</h3>
        <p style={{ color: SUBTEXT, fontSize: 13.5, margin: "0 0 20px" }}>Kết nối trực tiếp không qua trung gian môi giới</p>

        <div style={{ background: PAPER, padding: 14, borderRadius: 12, marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: SUBTEXT, marginBottom: 4 }}>Số điện thoại / Zalo:</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: CORAL }}>{phone}</div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <button
            className="ul-btn"
            onClick={() => showToast(`Đang thực hiện cuộc gọi tới: ${phone}`)}
            style={{ background: INK, color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <Phone size={16} /> Gọi điện thoại ngay
          </button>
          <button
            className="ul-btn"
            onClick={() => showToast(`Đang mở Zalo kết bạn với số: ${phone}`)}
            style={{ background: "#0068FF", color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <MessageCircle size={16} /> Nhắn tin qua Zalo
          </button>
          <button
            className="ul-btn"
            onClick={onClose}
            style={{ background: "transparent", color: SUBTEXT, padding: "8px", fontSize: 13 }}
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
}
