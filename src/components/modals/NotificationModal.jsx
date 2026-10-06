import React from "react";
import { X, Bell } from "lucide-react";
import { CARD, PAPER, INK, CORAL, MARIGOLD, SUBTEXT } from "../../data/theme";

export function NotificationModal({ onClose }) {
  const notifs = [
    { title: "Ưu đãi sinh viên K24!", desc: "Giảm ngay 20% tại Cafe Học Bài Góc Ký Túc Xá khi xuất trình thẻ sinh viên.", time: "10 phút trước", unread: true },
    { title: "Phòng trọ mới đăng gần bạn", desc: "Chung cư mini Thủ Đức giá 3.2 triệu vừa cập nhật thêm 1 phòng trống tầng 3.", time: "1 giờ trước", unread: true },
    { title: "Tin nhắn chợ đồ cũ", desc: "Minh Anh đã phản hồi yêu cầu mua Giáo trình Giải tích 1 của bạn.", time: "Hôm qua", unread: false }
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 440, width: "100%", padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 17 }}>
            <Bell size={18} color={CORAL} /> Thông báo sinh viên
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={18} /></button>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {notifs.map((n, i) => (
            <div key={i} style={{ background: n.unread ? "rgba(255,193,69,0.12)" : PAPER, padding: 12, borderRadius: 10, borderLeft: n.unread ? `3px solid ${MARIGOLD}` : "3px solid transparent" }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: INK, marginBottom: 2 }}>{n.title}</div>
              <div style={{ fontSize: 12.5, color: SUBTEXT, marginBottom: 4 }}>{n.desc}</div>
              <div style={{ fontSize: 11, color: "#8A5B00", fontWeight: 500 }}>{n.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
