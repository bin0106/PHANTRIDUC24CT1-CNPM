import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { CARD, PAPER, INK, CORAL } from "../../data/theme";

export function ChatModal({ onClose, showToast }) {
  const [messages, setMessages] = useState([
    { sender: "other", text: "Chào bạn! Bạn cần hỏi về phòng trọ hay giáo trình sinh viên ạ?", time: "14:20" },
    { sender: "me", text: "Dạ em muốn hỏi phòng trọ Xanh gần ĐHBK còn phòng trống không ạ?", time: "14:22" },
    { sender: "other", text: "Phòng đó còn 1 phòng tầng 2 thoáng mát lắm em nhé, giá 1.8tr/tháng có wifi miễn phí.", time: "14:23" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "me", text: input.trim(), time: "Vừa xong" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, {
        sender: "other",
        text: "Cảm ơn bạn đã nhắn tin! Chủ trọ / người bán sẽ phản hồi trực tiếp cho bạn qua số Zalo ngay nhé.",
        time: "Vừa xong"
      }]);
    }, 900);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 440, width: "100%", height: 500, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* HEADER */}
        <div style={{ padding: "14px 18px", background: INK, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>Hỗ trợ sinh viên UniLife</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Đang hoạt động</div>
            </div>
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none", color: "#fff" }}><X size={18} /></button>
        </div>

        {/* MESSAGES BODY */}
        <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, background: PAPER }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.sender === "me" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                background: m.sender === "me" ? INK : CARD,
                color: m.sender === "me" ? "#fff" : INK,
                padding: "10px 14px",
                borderRadius: m.sender === "me" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                fontSize: 13.5
              }}
            >
              <div>{m.text}</div>
              <div style={{ fontSize: 10.5, opacity: 0.6, textAlign: "right", marginTop: 4 }}>{m.time}</div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <form onSubmit={handleSend} style={{ padding: 12, background: CARD, borderTop: "1px solid #ECE7D8", display: "flex", gap: 8 }}>
          <input
            placeholder="Nhập nội dung tin nhắn..."
            value={input} onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DCD0", fontSize: 13.5, outline: "none" }}
          />
          <button type="submit" className="ul-btn" style={{ background: CORAL, color: "#fff", padding: "10px 16px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
