import React, { useState, useMemo } from "react";
import { Camera, Edit3, Heart, X, Check } from "lucide-react";
import { CARD, INK, CORAL, TEAL, MARIGOLD, SUBTEXT, PRESET_AVATARS } from "../data/theme";
import { PlaceCard } from "../components/cards/PlaceCard";
import { FoodCard } from "../components/cards/FoodCard";
import { ProductCard } from "../components/cards/ProductCard";
import { EntCard } from "../components/cards/EntCard";

export function ProfileView({
  currentUser,
  setCurrentUser,
  users,
  setUsers,
  favorites,
  toggleFav,
  housingList,
  foodList,
  marketList,
  entertainmentList,
  setDetail,
  setTab,
  showToast
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [activeFavTab, setActiveFavTab] = useState("all");

  const likedHousing = useMemo(() => housingList.filter((h) => favorites[`housing-${h.id}`]), [housingList, favorites]);
  const likedFood = useMemo(() => foodList.filter((f) => favorites[`food-${f.id}`]), [foodList, favorites]);
  const likedMarket = useMemo(() => marketList.filter((m) => favorites[`market-${m.id}`]), [marketList, favorites]);
  const likedEntertainment = useMemo(() => entertainmentList.filter((e) => favorites[`entertainment-${e.id}`]), [entertainmentList, favorites]);

  const allLikedItems = useMemo(() => [
    ...likedHousing.map((i) => ({ ...i, type: "housing" })),
    ...likedFood.map((i) => ({ ...i, type: "food" })),
    ...likedMarket.map((i) => ({ ...i, type: "market" })),
    ...likedEntertainment.map((i) => ({ ...i, type: "entertainment" })),
  ], [likedHousing, likedFood, likedMarket, likedEntertainment]);

  const displayedFavs = useMemo(() => {
    if (activeFavTab === "housing") return likedHousing.map((i) => ({ ...i, type: "housing" }));
    if (activeFavTab === "food") return likedFood.map((i) => ({ ...i, type: "food" }));
    if (activeFavTab === "market") return likedMarket.map((i) => ({ ...i, type: "market" }));
    if (activeFavTab === "entertainment") return likedEntertainment.map((i) => ({ ...i, type: "entertainment" }));
    return allLikedItems;
  }, [activeFavTab, allLikedItems, likedHousing, likedFood, likedMarket, likedEntertainment]);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const updated = { ...currentUser, name: name.trim(), phone: phone.trim() };
    setCurrentUser(updated);
    setUsers(users.map((u) => (u.id === currentUser.id ? updated : u)));
    setEditing(false);
    showToast("Đã cập nhật thông tin cá nhân! ✨");
  };

  const handleSelectAvatar = (url) => {
    const updated = { ...currentUser, avatar: url };
    setCurrentUser(updated);
    setUsers(users.map((u) => (u.id === currentUser.id ? updated : u)));
    setShowAvatarModal(false);
    showToast("Đã thay đổi ảnh đại diện thành công! 📸");
  };

  return (
    <div style={{ paddingTop: 28, maxWidth: 1040, margin: "0 auto" }}>
      {/* PROFILE HEADER CARD */}
      <div style={{
        background: CARD,
        borderRadius: 20,
        padding: "32px 28px",
        border: "1px solid #ECE7D8",
        boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
        display: "flex",
        flexWrap: "wrap",
        gap: 28,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {/* AVATAR WITH CAMERA OVERLAY */}
          <div style={{ position: "relative" }}>
            <img
              src={currentUser.avatar || PRESET_AVATARS[0]}
              alt={currentUser.name}
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                objectFit: "cover",
                border: `3px solid ${MARIGOLD}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
              }}
              onError={(e) => { e.target.src = PRESET_AVATARS[0]; }}
            />
            <button
              className="ul-btn"
              onClick={() => setShowAvatarModal(true)}
              title="Đổi ảnh đại diện"
              style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: INK,
                color: "#fff",
                border: "2px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
              }}
            >
              <Camera size={15} />
            </button>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <h1 className="ul-h" style={{ fontSize: 24, margin: 0 }}>{currentUser.name}</h1>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                background: currentUser.role === "Quản trị viên" ? "#FFE9C2" : "#E1F5EE",
                color: currentUser.role === "Quản trị viên" ? "#8A5B00" : "#085041",
                padding: "3px 10px",
                borderRadius: 20,
              }}>
                {currentUser.role}
              </span>
              <span style={{ fontSize: 11.5, background: "#E8F2FA", color: "#266FB5", padding: "2px 8px", borderRadius: 12, fontWeight: 600 }}>
                🟢 Đang hoạt động
              </span>
            </div>
            <div style={{ color: SUBTEXT, fontSize: 13.5, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <span>✉️ {currentUser.email}</span>
              <span>📞 {currentUser.phone || "Chưa cập nhật SĐT"}</span>
              {currentUser.joined && <span>📅 Tham gia: {currentUser.joined}</span>}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="ul-btn"
            onClick={() => setShowAvatarModal(true)}
            style={{
              background: "rgba(255,193,69,0.2)",
              color: INK,
              border: `1.5px solid ${MARIGOLD}`,
              padding: "10px 16px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 13.5,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <Camera size={16} color={CORAL} /> Đổi Avatar
          </button>
          <button
            className="ul-btn"
            onClick={() => setEditing(!editing)}
            style={{
              background: editing ? INK : "#F0EFEA",
              color: editing ? "#fff" : INK,
              padding: "10px 16px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 13.5,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <Edit3 size={15} /> {editing ? "Đóng chỉnh sửa" : "Sửa thông tin"}
          </button>
        </div>
      </div>

      {/* EDIT FORM */}
      {editing && (
        <form onSubmit={handleSaveInfo} className="animate-fade-in" style={{
          background: CARD,
          border: "1px solid #ECE7D8",
          borderRadius: 16,
          padding: 24,
          marginBottom: 32,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr)) auto",
          gap: 16,
          alignItems: "end"
        }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DCD0", fontSize: 14, outline: "none" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Số điện thoại</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="090x.xxx.xxx"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DCD0", fontSize: 14, outline: "none" }}
            />
          </div>
          <button type="submit" className="ul-btn" style={{ background: TEAL, color: "#fff", padding: "11px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
            Lưu thay đổi
          </button>
        </form>
      )}

      {/* SECTION BÀI VIẾT ĐÃ THÍCH */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 className="ul-h" style={{ fontSize: 20, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
              <Heart size={20} fill={CORAL} color={CORAL} /> Bài viết & Địa điểm đã thích
            </h2>
            <span style={{ fontSize: 13.5, color: SUBTEXT }}>Tất cả những phòng trọ, quán ăn, đồ chợ cũ bạn đã thả tim lưu lại</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { id: "all", label: `Tất cả (${allLikedItems.length})` },
              { id: "housing", label: `Phòng trọ (${likedHousing.length})` },
              { id: "food", label: `Ăn uống (${likedFood.length})` },
              { id: "market", label: `Chợ cũ (${likedMarket.length})` },
              { id: "entertainment", label: `Vui chơi (${likedEntertainment.length})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveFavTab(t.id)}
                className="ul-btn"
                style={{
                  padding: "7px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  background: activeFavTab === t.id ? INK : "rgba(0,0,0,0.06)",
                  color: activeFavTab === t.id ? "#fff" : INK,
                  border: "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {displayedFavs.length === 0 ? (
          <div style={{
            background: CARD,
            borderRadius: 16,
            border: "1px dashed #E0DCD0",
            padding: "60px 20px",
            textAlign: "center",
            color: SUBTEXT
          }}>
            <Heart size={44} color="#D0CBC0" style={{ marginBottom: 12 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Chưa có bài viết nào trong danh mục này</div>
            <p style={{ fontSize: 14, maxWidth: 420, margin: "0 auto 20px" }}>
              Hãy dạo một vòng khám phá phòng trọ, quán ăn ngon quanh trường và bấm vào biểu tượng trái tim để lưu lại bạn nhé!
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setTab("housing")} className="ul-btn" style={{ background: INK, color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 600 }}>
                Tìm phòng trọ
              </button>
              <button onClick={() => setTab("food")} className="ul-btn" style={{ background: "#F0EFEA", color: INK, padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 600 }}>
                Xem quán ăn ngon
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
            {displayedFavs.map((item) => {
              if (item.type === "housing") return <PlaceCard key={`prof-h-${item.id}`} item={item} type="housing" favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />;
              if (item.type === "food") return <FoodCard key={`prof-f-${item.id}`} item={item} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />;
              if (item.type === "market") return <ProductCard key={`prof-m-${item.id}`} item={item} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />;
              if (item.type === "entertainment") return <EntCard key={`prof-e-${item.id}`} item={item} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />;
              return null;
            })}
          </div>
        )}
      </div>

      {/* MODAL CHỌN AVATAR */}
      {showAvatarModal && (
        <div onClick={() => setShowAvatarModal(false)} style={{
          position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, padding: 20
        }}>
          <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{
            background: CARD, borderRadius: 20, maxWidth: 480, width: "100%", padding: 26, boxShadow: "0 20px 45px rgba(0,0,0,0.25)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <h3 className="ul-h" style={{ fontSize: 18, margin: 0, fontWeight: 700 }}>Chọn ảnh đại diện mới</h3>
                <span style={{ fontSize: 12.5, color: SUBTEXT }}>Chọn ảnh có sẵn hoặc dán link ảnh tùy thích</span>
              </div>
              <button onClick={() => setShowAvatarModal(false)} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
            </div>

            {/* PRESET AVATARS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
              {PRESET_AVATARS.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectAvatar(url)}
                  className="ul-card"
                  style={{
                    cursor: "pointer",
                    borderRadius: 14,
                    overflow: "hidden",
                    border: currentUser.avatar === url ? `3px solid ${CORAL}` : "2px solid #EAE6D8",
                    position: "relative",
                    aspectRatio: "1/1"
                  }}
                >
                  <img src={url} alt={`avatar-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {currentUser.avatar === url && (
                    <div style={{
                      position: "absolute", inset: 0, background: "rgba(255,93,62,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <div style={{ background: CORAL, color: "#fff", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={14} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CUSTOM AVATAR URL */}
            <div style={{ borderTop: "1px dashed #E0DCD0", paddingTop: 16 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, display: "block", marginBottom: 6 }}>Hoặc dán URL ảnh đại diện của bạn:</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  style={{ flex: 1, padding: "9px 12px", borderRadius: 10, border: "1px solid #E0DCD0", fontSize: 13, outline: "none" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!customUrl.trim()) return;
                    handleSelectAvatar(customUrl.trim());
                  }}
                  className="ul-btn"
                  style={{ background: INK, color: "#fff", padding: "9px 16px", borderRadius: 10, fontWeight: 700, fontSize: 13 }}
                >
                  Sử dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
