import React, { useState } from "react";
import { X, Heart, Star, MapPin, Users, Fan, WashingMachine, Wifi, Bike, Phone } from "lucide-react";
import { CARD, PAPER, INK, CORAL, TEAL, SUBTEXT } from "../../data/theme";
import { reviewsSample } from "../../data/initialData";
import { Placeholder } from "../common/Placeholder";
import { Badge } from "../common/Badge";
import { StarRow } from "../common/StarRow";

export function DetailModal({ item, onClose, favorites, toggleFav, onContact, showToast }) {
  const key = `${item.type}-${item.id}`;
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState(reviewsSample);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const rev = {
      user: "Bạn (Sinh viên)",
      rating: newRating,
      comment: newComment.trim(),
      date: "Vừa xong"
    };
    setReviews([rev, ...reviews]);
    setNewComment("");
    showToast("Cảm ơn bạn đã gửi đánh giá xác thực!");
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 18, maxWidth: 540, width: "100%", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
        <div style={{ position: "relative" }}>
          <Placeholder seed={item.img || item.name} height={210} text={item.name} />
          <button onClick={onClose} className="ul-btn" style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
            <h2 className="ul-h" style={{ fontSize: 20, margin: 0, fontWeight: 700, lineHeight: 1.3 }}>{item.name}</h2>
            <button onClick={() => toggleFav(key)} className="ul-btn" style={{ background: "none", flexShrink: 0 }}>
              <Heart size={24} fill={favorites[key] ? CORAL : "none"} color={favorites[key] ? CORAL : INK} />
            </button>
          </div>

          {/* RATING */}
          {item.rating && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <StarRow rating={item.rating} size={16} />
              {item.reviews && <span style={{ fontSize: 13, color: SUBTEXT }}>({item.reviews} sinh viên đã đánh giá)</span>}
            </div>
          )}

          {/* BADGES */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {item.price && <Badge bg="#FFE9C2" color="#8A5B00">{item.price}{item.area ? "/tháng" : ""}</Badge>}
            {item.area && <Badge bg="#EEEDFE" color="#3C3489">Diện tích: {item.area}</Badge>}
            {item.cond && <Badge bg="#E1F5EE" color="#085041">Tình trạng: {item.cond}</Badge>}
            {item.hours && <Badge bg="#FAECE7" color="#712B13">Giờ mở cửa: {item.hours}</Badge>}
            {item.tag && <Badge bg="#E0F2FE" color="#0369A1">{item.tag}</Badge>}
          </div>

          {/* ADDRESS & HOST */}
          {item.address && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: SUBTEXT, marginBottom: 8 }}>
              <MapPin size={16} color={CORAL} />
              <span>{item.address} · Cách bạn <b>{item.distance}</b></span>
            </div>
          )}

          {item.host && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: SUBTEXT, marginBottom: 8 }}>
              <Users size={16} color={TEAL} />
              <span>Chủ phòng: <b>{item.host}</b></span>
            </div>
          )}

          {item.seller && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: SUBTEXT, marginBottom: 8 }}>
              <Users size={16} color={TEAL} />
              <span>Người bán: <b>{item.seller}</b> ({item.loc})</span>
            </div>
          )}

          {/* DESCRIPTION */}
          {item.desc && (
            <div style={{ background: PAPER, padding: "12px 14px", borderRadius: 10, margin: "14px 0", fontSize: 13.5, lineHeight: 1.5, color: INK }}>
              {item.desc}
            </div>
          )}

          {/* HOUSING AMENITIES */}
          {(item.ac || item.washer || item.wifi || item.parking) && (
            <div style={{ margin: "16px 0", padding: "12px", border: "1px solid #ECE7D8", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: INK }}>Tiện ích phòng trọ:</div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {item.ac && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Fan size={16} color={TEAL} /> Có máy lạnh</span>}
                {item.washer && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><WashingMachine size={16} color={TEAL} /> Máy giặt dùng chung</span>}
                {item.wifi && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Wifi size={16} color={TEAL} /> Wifi tốc độ cao</span>}
                {item.parking && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Bike size={16} color={TEAL} /> Nhà để xe rộng</span>}
              </div>
            </div>
          )}

          {/* REVIEWS SECTION */}
          <div style={{ borderTop: "1px solid #ECE7D8", marginTop: 18, paddingTop: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Đánh giá từ cộng đồng sinh viên</span>
              <span style={{ fontSize: 12, color: SUBTEXT }}>{reviews.length} đánh giá</span>
            </div>

            {/* REVIEW LIST */}
            <div style={{ display: "grid", gap: 10, maxHeight: 180, overflowY: "auto", marginBottom: 14 }}>
              {reviews.map((r, i) => (
                <div key={i} style={{ background: PAPER, padding: "10px 12px", borderRadius: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{r.user}</span>
                    <span style={{ fontSize: 11.5, color: SUBTEXT }}>{r.date}</span>
                  </div>
                  <StarRow rating={r.rating} size={12} />
                  <p style={{ fontSize: 13, color: INK, margin: "4px 0 0" }}>{r.comment}</p>
                </div>
              ))}
            </div>

            {/* ADD REVIEW FORM */}
            <form onSubmit={handleAddReview} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select
                value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))}
                style={{ padding: "8px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13, background: CARD }}
              >
                <option value={5}>5 ★</option>
                <option value={4}>4 ★</option>
                <option value={3}>3 ★</option>
                <option value={2}>2 ★</option>
                <option value={1}>1 ★</option>
              </select>
              <input
                placeholder="Viết nhận xét của bạn về địa điểm này..."
                value={newComment} onChange={(e) => setNewComment(e.target.value)}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13 }}
              />
              <button type="submit" className="ul-btn" style={{ background: INK, color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                Gửi
              </button>
            </form>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={() => onContact(item)}
            className="ul-btn"
            style={{ width: "100%", marginTop: 18, background: CORAL, color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 18px rgba(255,93,62,0.3)" }}
          >
            <Phone size={17} /> Liên hệ ngay (Gọi điện & Chat Zalo)
          </button>
        </div>
      </div>
    </div>
  );
}
