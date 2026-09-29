import React, { useState } from "react";
import {
  X, Heart, Star, MapPin, Users, Phone, Fan, WashingMachine, Wifi, Bike,
  Trash2, Send, Clock, Sparkles, MessageCircle, AlertCircle, Share2, Tag, Image as ImageIcon
} from "lucide-react";

function StarRow({ rating, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <Star size={size} fill="#FFC145" color="#FFC145" />
      <span style={{ fontWeight: 600, fontSize: 13, color: "#16192E" }}>{rating}</span>
    </span>
  );
}

function Badge({ children, bg, color }) {
  return (
    <span style={{ background: bg, color: color, fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 3 }}>
      {children}
    </span>
  );
}

export default function DetailModal({
  item,
  onClose,
  isFavorite,
  onToggleFav,
  onContact,
  onDeletePlace,
  onAddReview,
  onDeleteReview,
  currentUser,
  showToast
}) {
  const [commentText, setCommentText] = useState("");
  const [ratingStars, setRatingStars] = useState(5);

  if (!item) return null;

  const reviews = item.reviewsList || [];

  const handleSendReview = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newRev = {
      id: Date.now(),
      user: currentUser ? `${currentUser.name} (${currentUser.role})` : "Sinh viên ẩn danh",
      rating: ratingStars,
      comment: commentText.trim(),
      date: "Vừa xong"
    };

    onAddReview(item.type, item.id, newRev);
    setCommentText("");
    showToast("Đã gửi đánh giá thành công! Cảm ơn bạn.");
  };

  const handleDeletePlaceConfirm = () => {
    if (window.confirm(`Bạn có chắc chắn muốn bỏ/xóa địa điểm "${item.name}" khỏi hệ thống không?`)) {
      onDeletePlace(item.type, item.id);
      showToast(`Đã xóa "${item.name}" thành công!`);
      onClose();
    }
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 280, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: "#FFFFFF", borderRadius: 18, maxWidth: 580, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 45px rgba(0,0,0,0.25)" }}>
        
        {/* IMAGE / COVER SECTION */}
        <div style={{ position: "relative", width: "100%", height: 230, background: "#EAE6D9", overflow: "hidden" }}>
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #FFC14533, #FF5D3E33)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#16192E" }}>
              <Sparkles size={32} color="#FF5D3E" style={{ marginBottom: 6 }} />
              <div style={{ fontWeight: 700, fontSize: 16 }}>{item.name}</div>
              <span style={{ fontSize: 12, opacity: 0.7 }}>Chưa cập nhật ảnh</span>
            </div>
          )}

          {/* CLOSE BUTTON */}
          <button onClick={onClose} className="ul-btn" style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            <X size={18} />
          </button>

          {/* LIKES BADGE & FAVORITE BUTTON ON IMAGE */}
          <div style={{ position: "absolute", bottom: 12, left: 14, display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={onToggleFav}
              className="ul-btn"
              style={{
                background: "rgba(255,255,255,0.92)",
                padding: "6px 14px",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                color: isFavorite ? "#FF5D3E" : "#16192E",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
              }}
            >
              <Heart size={16} fill={isFavorite ? "#FF5D3E" : "none"} color={isFavorite ? "#FF5D3E" : "#16192E"} />
              <span>{item.likes || 0} lượt thích</span>
            </button>
            {item.area && <Badge bg="rgba(22,25,46,0.85)" color="#fff">{item.area}</Badge>}
          </div>
        </div>

        {/* CONTENT BODY */}
        <div style={{ padding: 24 }}>
          {/* TITLE & DELETE ACTION */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
            <div>
              <h2 className="ul-h" style={{ fontSize: 21, margin: 0, fontWeight: 700, color: "#16192E", lineHeight: 1.3 }}>{item.name}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <StarRow rating={item.rating || 5.0} size={15} />
                <span style={{ fontSize: 13, color: "#6B6A63" }}>({reviews.length} đánh giá thực tế)</span>
              </div>
            </div>

            {/* NÚT BỎ / XÓA ĐỊA ĐIỂM */}
            <button
              onClick={handleDeletePlaceConfirm}
              className="ul-btn"
              title="Xóa / Gỡ bỏ địa điểm này khỏi hệ thống"
              style={{ background: "#FCEBEB", color: "#791F1F", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}
            >
              <Trash2 size={14} /> Xóa địa điểm
            </button>
          </div>

          {/* BADGES & PRICING */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "14px 0" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#FF5D3E" }}>{item.price}{item.area ? "/tháng" : ""}</span>
            {item.cond && <Badge bg="#E1F5EE" color="#085041">Tình trạng: {item.cond}</Badge>}
            {item.hours && <Badge bg="#FAECE7" color="#712B13">Giờ mở cửa: {item.hours}</Badge>}
            {item.cat && <Badge bg="#EEEDFE" color="#3C3489">{item.cat}</Badge>}
            {item.tag && <Badge bg="#E0F2FE" color="#0369A1">{item.tag}</Badge>}
          </div>

          {/* ADDRESS & INFO */}
          {item.address && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#6B6A63", marginBottom: 8 }}>
              <MapPin size={16} color="#FF5D3E" />
              <span>{item.address} · Cách bạn <b>{item.distance}</b></span>
            </div>
          )}

          {item.host && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#6B6A63", marginBottom: 8 }}>
              <Users size={16} color="#0E7C66" />
              <span>Chủ trọ phụ trách: <b>{item.host}</b></span>
            </div>
          )}

          {item.seller && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#6B6A63", marginBottom: 8 }}>
              <Users size={16} color="#0E7C66" />
              <span>Người đăng bán: <b>{item.seller}</b> ({item.loc})</span>
            </div>
          )}

          {/* DESCRIPTION */}
          {item.desc && (
            <div style={{ background: "#F6F4EE", padding: "12px 14px", borderRadius: 10, margin: "14px 0", fontSize: 13.5, lineHeight: 1.5, color: "#16192E" }}>
              {item.desc}
            </div>
          )}

          {/* HOUSING AMENITIES */}
          {(item.ac || item.washer || item.wifi || item.parking) && (
            <div style={{ margin: "14px 0", padding: "12px", border: "1px solid #ECE7D8", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: "#16192E" }}>Tiện nghi phòng trọ:</div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {item.ac && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Fan size={15} color="#0E7C66" /> Có máy lạnh</span>}
                {item.washer && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><WashingMachine size={15} color="#0E7C66" /> Máy giặt dùng chung</span>}
                {item.wifi && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Wifi size={15} color="#0E7C66" /> Wifi tốc độ cao</span>}
                {item.parking && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Bike size={15} color="#0E7C66" /> Nhà để xe rộng rãi</span>}
              </div>
            </div>
          )}

          {/* REVIEWS SECTION - XEM, THÊM VÀ XÓA ĐÁNH GIÁ */}
          <div style={{ borderTop: "1px solid #ECE7D8", marginTop: 18, paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#16192E", display: "flex", alignItems: "center", gap: 6 }}>
                <MessageCircle size={17} color="#0E7C66" />
                <span>Đánh giá từ cộng đồng sinh viên ({reviews.length})</span>
              </div>
              <span style={{ fontSize: 12, color: "#6B6A63" }}>Đánh giá xác thực</span>
            </div>

            {/* DANH SÁCH ĐÁNH GIÁ */}
            <div style={{ display: "grid", gap: 10, maxHeight: 200, overflowY: "auto", marginBottom: 14 }}>
              {reviews.length === 0 ? (
                <div style={{ padding: "16px", background: "#F6F4EE", borderRadius: 10, textAlign: "center", fontSize: 13, color: "#6B6A63" }}>
                  Chưa có đánh giá nào. Hãy là sinh viên đầu tiên nhận xét về địa điểm này!
                </div>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} style={{ background: "#F6F4EE", padding: "10px 12px", borderRadius: 10, position: "relative" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#16192E" }}>{r.user}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: "#6B6A63" }}>{r.date}</span>
                        {/* NÚT BỎ / XÓA ĐÁNH GIÁ */}
                        <button
                          onClick={() => {
                            onDeleteReview(item.type, item.id, r.id);
                            showToast("Đã xóa đánh giá thành công!");
                          }}
                          className="ul-btn"
                          title="Xóa đánh giá này"
                          style={{ background: "none", color: "#6B6A63", padding: 2 }}
                        >
                          <Trash2 size={13} hover={{ color: "#FF5D3E" }} />
                        </button>
                      </div>
                    </div>
                    <StarRow rating={r.rating} size={12} />
                    <p style={{ fontSize: 13, color: "#16192E", margin: "4px 0 0", lineHeight: 1.4 }}>{r.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* FORM THÊM ĐÁNH GIÁ MỚI */}
            <form onSubmit={handleSendReview} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select
                value={ratingStars}
                onChange={(e) => setRatingStars(parseInt(e.target.value))}
                style={{ padding: "9px 8px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13, background: "#fff", fontWeight: 700 }}
              >
                <option value={5}>5 ★ Tuyệt vời</option>
                <option value={4}>4 ★ Rất tốt</option>
                <option value={3}>3 ★ Bình thường</option>
                <option value={2}>2 ★ Tạm được</option>
                <option value={1}>1 ★ Kém</option>
              </select>
              <input
                placeholder={currentUser ? `Nhận xét với tư cách ${currentUser.name}...` : "Viết đánh giá của bạn về địa điểm này..."}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13 }}
              />
              <button
                type="submit"
                className="ul-btn"
                style={{ background: "#16192E", color: "#fff", padding: "9px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
              >
                <Send size={14} /> Gửi
              </button>
            </form>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={() => onContact(item)}
            className="ul-btn"
            style={{
              width: "100%",
              marginTop: 18,
              background: "#FF5D3E",
              color: "#fff",
              padding: "13px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 14.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 6px 18px rgba(255,93,62,0.3)"
            }}
          >
            <Phone size={16} /> Liên hệ ngay (Gọi điện & Chat Zalo)
          </button>
        </div>
      </div>
    </div>
  );
}
