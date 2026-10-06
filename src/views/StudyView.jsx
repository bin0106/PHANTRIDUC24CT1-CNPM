import React, { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { SUBTEXT, CARD, INK } from "../data/theme";
import { Badge } from "../components/common/Badge";
import { StarRow } from "../components/common/StarRow";

export function StudyView({ data, setStudyList, showToast }) {
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState("Tài liệu ôn tập");
  const [docDesc, setDocDesc] = useState("");

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!docTitle) return;
    const newDoc = {
      id: Date.now(),
      title: docTitle,
      author: "Thành viên UniLife",
      downloads: 1,
      rating: 5.0,
      type: docType,
      date: "Vừa xong",
      desc: docDesc || "Tài liệu học tập chia sẻ cho sinh viên."
    };
    setStudyList([newDoc, ...data]);
    setShowAddDoc(false);
    setDocTitle("");
    setDocDesc("");
    showToast("Đã chia sẻ tài liệu học tập mới thành công!");
  };

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>Góc học tập & Trao đổi đồ án</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Kho tài liệu, đề thi, slide ôn tập và diễn đàn ghép nhóm học tập</p>
        </div>
        <button
          className="ul-btn"
          onClick={() => setShowAddDoc(true)}
          style={{ background: "#378ADD", color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
        >
          <Plus size={16} /> Chia sẻ tài liệu
        </button>
      </div>

      {showAddDoc && (
        <form onSubmit={handleAddDoc} className="animate-fade-in" style={{ background: CARD, border: "1px solid #ECE7D8", borderRadius: 14, padding: 18, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, margin: "0 0 12px" }}>Chia sẻ tài liệu mới</h3>
          <div style={{ display: "grid", gap: 10, maxWidth: 600 }}>
            <input
              required
              placeholder="Tên tài liệu / Tiêu đề tìm nhóm..."
              value={docTitle} onChange={(e) => setDocTitle(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <select
                value={docType} onChange={(e) => setDocType(e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, flex: 1 }}
              >
                <option value="Tài liệu ôn tập">Tài liệu ôn tập</option>
                <option value="Đề thi mẫu">Đề thi mẫu</option>
                <option value="Sơ đồ tư duy">Sơ đồ tư duy</option>
                <option value="Ghép nhóm đồ án">Ghép nhóm đồ án</option>
              </select>
            </div>
            <textarea
              placeholder="Mô tả tóm tắt nội dung tài liệu..."
              rows={2}
              value={docDesc} onChange={(e) => setDocDesc(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="ul-btn" onClick={() => setShowAddDoc(false)} style={{ background: "#EAE6D9", padding: "8px 16px", borderRadius: 8, fontSize: 13 }}>Hủy</button>
              <button type="submit" className="ul-btn" style={{ background: "#378ADD", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Đăng tài liệu</button>
            </div>
          </div>
        </form>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {data.map((item) => (
          <div key={item.id} className="ul-card" style={{ background: CARD, borderRadius: 14, padding: 18, border: "1px solid #ECE7D8", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "#378ADD18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileText size={22} color="#378ADD" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Badge bg="#E8F2FA" color="#266FB5">{item.type}</Badge>
                  <span style={{ fontSize: 12, color: SUBTEXT }}>{item.date}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: INK }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: SUBTEXT, margin: "0 0 8px", maxWidth: 680 }}>{item.desc}</p>
                <div style={{ fontSize: 12, color: SUBTEXT, display: "flex", gap: 12 }}>
                  <span>Tác giả: <b>{item.author}</b></span>
                  <span>·</span>
                  <span>{item.downloads} lượt tải</span>
                  <span>·</span>
                  <StarRow rating={item.rating} size={12} />
                </div>
              </div>
            </div>
            <button
              className="ul-btn"
              onClick={() => showToast(`Đang tải file: ${item.title} (PDF)`)}
              style={{ background: INK, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13, flexShrink: 0 }}
            >
              Tải tài liệu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
