import React, { useState, useMemo, useEffect } from "react";
import {
  Bell, MessageCircle, LayoutDashboard, LogOut, LogIn, Lock, User, CheckCircle2
} from "lucide-react";
import "./App.css";

// 1. Dữ liệu & Thiết kế giao diện (Data & Design System)
import {
  INK, PAPER, MARIGOLD, CORAL, TEAL, CARD, SUBTEXT, VALID_TABS, TAB_TITLES, PRESET_AVATARS
} from "./data/theme";
import {
  initialUsers, initialHousing, initialFood, initialMarket,
  initialEntertainment, initialStudy
} from "./data/initialData";

// 2. Custom Hooks xử lý trạng thái & lưu trữ
import { usePersistentState } from "./hooks/usePersistentState";

// 3. Các thành phần Modals giao diện bật lên (Modals)
import { AuthModal } from "./components/modals/AuthModal";
import { DetailModal } from "./components/modals/DetailModal";
import { ContactModal } from "./components/modals/ContactModal";
import { AddMarketModal } from "./components/modals/AddMarketModal";
import { AddHousingModal } from "./components/modals/AddHousingModal";
import { NotificationModal } from "./components/modals/NotificationModal";
import { ChatModal } from "./components/modals/ChatModal";

// 4. Các màn hình giao diện chính (Views / Pages)
import { HomeView } from "./views/HomeView";
import { HousingView } from "./views/HousingView";
import { FoodView } from "./views/FoodView";
import { MarketView } from "./views/MarketView";
import { EntertainmentView } from "./views/EntertainmentView";
import { StudyView } from "./views/StudyView";
import { FavoritesView } from "./views/FavoritesView";
import { ProfileView } from "./views/ProfileView";
import { AdminView } from "./views/AdminView";

const readTabFromHash = () => {
  const h = window.location.hash.replace(/^#\/?/, "");
  return VALID_TABS.includes(h) ? h : "home";
};

export default function App() {
  const [tab, setTabState] = useState(readTabFromHash);

  // Điều hướng bằng Hash Router (#/housing, #/food,...)
  const setTab = (t) => {
    if (t === tab) {
      window.scrollTo(0, 0);
      return;
    }
    window.location.hash = "/" + t;
  };

  useEffect(() => {
    const onHashChange = () => {
      setTabState(readTabFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = `${TAB_TITLES[tab] || "Trang chủ"} · UniLife`;
  }, [tab]);

  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = usePersistentState("unilife:favorites", { "housing-1": true, "food-1": true });
  const [detail, setDetail] = useState(null);
  const [housingFilters, setHousingFilters] = useState({ ac: false, washer: false, wifi: false, parking: false });
  const [priceMax, setPriceMax] = useState(4);
  const [toast, setToast] = useState("");

  // Dữ liệu đồng bộ với LocalStorage
  const [housingList, setHousingList] = usePersistentState("unilife:housing", initialHousing);
  const [foodList, setFoodList] = usePersistentState("unilife:food", initialFood);
  const [marketList, setMarketList] = usePersistentState("unilife:market", initialMarket);
  const [entertainmentList] = useState(initialEntertainment);
  const [studyList, setStudyList] = usePersistentState("unilife:study", initialStudy);

  // Quản lý trạng thái các Modals
  const [showAddMarketModal, setShowAddMarketModal] = useState(false);
  const [showAddHousingModal, setShowAddHousingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  // Quản lý người dùng & phân quyền (Auth State)
  const [users, setUsers] = usePersistentState("unilife:users", initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Thông báo phản hồi nhanh (Toast)
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // Đóng modal bằng phím Escape
  const anyModalOpen = !!(detail || showContactModal || showAddMarketModal || showAddHousingModal || showNotificationModal || showChatModal || showAuthModal);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (showAuthModal) setShowAuthModal(false);
      else if (showContactModal) setShowContactModal(null);
      else if (showAddMarketModal) setShowAddMarketModal(false);
      else if (showAddHousingModal) setShowAddHousingModal(false);
      else if (showChatModal) setShowChatModal(false);
      else if (showNotificationModal) setShowNotificationModal(false);
      else if (detail) setDetail(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detail, showContactModal, showAddMarketModal, showAddHousingModal, showNotificationModal, showChatModal, showAuthModal]);

  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [anyModalOpen]);

  // Xử lý yêu thích
  const toggleFav = (key) => {
    setFavorites((f) => {
      const next = { ...f, [key]: !f[key] };
      showToast(next[key] ? "Đã thêm vào mục Yêu thích! ❤️" : "Đã bỏ khỏi mục Yêu thích!");
      return next;
    });
  };

  // Lọc phòng trọ theo tiêu chí
  const filteredHousing = useMemo(() => {
    return housingList.filter((h) => {
      if (h.status === "hidden") return false;
      if (h.priceNum > priceMax) return false;
      if (housingFilters.ac && !h.ac) return false;
      if (housingFilters.washer && !h.washer) return false;
      if (housingFilters.wifi && !h.wifi) return false;
      if (housingFilters.parking && !h.parking) return false;
      if (query && !h.name.toLowerCase().includes(query.toLowerCase()) && !h.address.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [housingList, housingFilters, priceMax, query]);

  // Đếm số lượng mục đã lưu
  const favCount = useMemo(() => {
    return Object.values(favorites).filter(Boolean).length;
  }, [favorites]);

  const publicFood = useMemo(() => foodList.filter((f) => f.status !== "hidden"), [foodList]);
  const publicMarket = useMemo(() => marketList.filter((m) => m.status !== "hidden"), [marketList]);

  const navItems = [
    { id: "home", label: "Trang chủ" },
    { id: "housing", label: "Phòng trọ" },
    { id: "food", label: "Ăn uống" },
    { id: "market", label: "Chợ đồ cũ" },
    { id: "entertainment", label: "Vui chơi" },
    { id: "study", label: "Góc học tập" },
    { id: "favorites", label: `Yêu thích (${favCount})` },
    ...(currentUser ? [{ id: "profile", label: "Trang cá nhân" }] : []),
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: PAPER, minHeight: "100vh", color: INK, display: "flex", flexDirection: "column" }}>

      {/* HEADER / NAVIGATION BAR */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: INK, color: "#fff", boxShadow: "0 4px 18px rgba(0,0,0,0.12)" }}>
        <div className="ul-header-inner" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64, gap: 20 }}>
          {/* LOGO */}
          <div
            className="ul-h"
            onClick={() => setTab("home")}
            style={{ fontSize: 24, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
          >
            <span style={{ color: MARIGOLD, display: "flex", alignItems: "center" }}>
              Uni<span style={{ color: "#fff" }}>Life</span>
            </span>
          </div>

          {/* MENU TABS */}
          <nav style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }} className="ul-scroll ul-nav">
            {navItems.map((n) => (
              <div
                key={n.id}
                className="ul-tab"
                onClick={() => setTab(n.id)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  background: tab === n.id ? "rgba(255,193,69,0.18)" : "transparent",
                  color: tab === n.id ? MARIGOLD : "rgba(255,255,255,0.85)",
                  borderBottom: tab === n.id ? `2px solid ${MARIGOLD}` : "2px solid transparent",
                }}
              >
                {n.label}
              </div>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                className="ul-btn"
                onClick={() => setShowNotificationModal(true)}
                title="Thông báo sinh viên"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Bell size={18} />
              </button>
              <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: CORAL }} />
            </div>

            {/* Messages */}
            <div style={{ position: "relative" }}>
              <button
                className="ul-btn"
                onClick={() => setShowChatModal(true)}
                title="Tin nhắn trao đổi"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <MessageCircle size={18} />
              </button>
              <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: TEAL }} />
            </div>

            {/* User Account / Login & Admin */}
            {currentUser ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {currentUser.role === "Quản trị viên" && (
                  <button
                    className="ul-btn"
                    onClick={() => setTab("admin")}
                    title="Khu vực Quản trị (Admin Dashboard)"
                    style={{
                      background: tab === "admin" ? MARIGOLD : "rgba(255,193,69,0.22)",
                      color: tab === "admin" ? INK : MARIGOLD,
                      border: `1.5px solid ${MARIGOLD}`,
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    <LayoutDashboard size={14} />
                    <span>Admin</span>
                  </button>
                )}
                <div
                  className="ul-btn"
                  onClick={() => setTab("profile")}
                  style={{
                    background: tab === "profile" ? "rgba(255,193,69,0.25)" : "rgba(255,255,255,0.12)",
                    border: tab === "profile" ? `1.5px solid ${MARIGOLD}` : "1.5px solid transparent",
                    color: "#fff",
                    padding: "4px 10px 4px 5px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}
                  title="Nhấp để vào Trang cá nhân & Đổi ảnh đại diện"
                >
                  <img
                    src={currentUser.avatar || PRESET_AVATARS[0]}
                    alt={currentUser.name}
                    style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #fff" }}
                    onError={(e) => { e.target.src = PRESET_AVATARS[0]; }}
                  />
                  <span>{currentUser.name.length > 12 ? currentUser.name.slice(0, 12) + "..." : currentUser.name}</span>
                  <span style={{ fontSize: 10, background: currentUser.role === "Quản trị viên" ? CORAL : TEAL, color: "#fff", padding: "1px 6px", borderRadius: 8, fontWeight: 700 }}>
                    {currentUser.role === "Quản trị viên" ? "Admin" : "Khách"}
                  </span>
                </div>
                <button
                  className="ul-btn"
                  onClick={() => {
                    setCurrentUser(null);
                    showToast("Đã đăng xuất tài khoản!");
                    if (tab === "admin") setTab("home");
                  }}
                  title="Đăng xuất"
                  style={{
                    background: "rgba(235,87,87,0.18)",
                    color: "#FF8B8B",
                    border: "1px solid rgba(235,87,87,0.3)",
                    padding: "6px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  <LogOut size={13} />
                  <span>Thoát</span>
                </button>
              </div>
            ) : (
              <button
                className="ul-btn"
                onClick={() => setShowAuthModal(true)}
                style={{
                  background: CORAL,
                  color: "#fff",
                  border: "none",
                  padding: "7px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 8px rgba(224,90,71,0.35)"
                }}
              >
                <LogIn size={14} />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* PHÂN HỆ MÀN HÌNH CHÍNH (MAIN VIEWS) */}
      <main style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px 60px", flex: 1, width: "100%" }}>
        {tab === "home" && (
          <HomeView
            query={query} setQuery={setQuery} setTab={setTab}
            favorites={favorites} toggleFav={toggleFav} setDetail={setDetail}
            housingList={housingList} foodList={foodList} marketList={marketList}
            entertainmentList={entertainmentList} studyList={studyList}
          />
        )}
        {tab === "housing" && (
          <HousingView
            data={filteredHousing} favorites={favorites} toggleFav={toggleFav}
            filters={housingFilters} setFilters={setHousingFilters}
            priceMax={priceMax} setPriceMax={setPriceMax}
            query={query} setQuery={setQuery} setDetail={setDetail}
            onOpenAddModal={() => setShowAddHousingModal(true)}
          />
        )}
        {tab === "food" && (
          <FoodView
            data={publicFood} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail}
          />
        )}
        {tab === "market" && (
          <MarketView
            data={publicMarket} favorites={favorites} toggleFav={toggleFav}
            setDetail={setDetail} onOpenAddModal={() => setShowAddMarketModal(true)}
          />
        )}
        {tab === "entertainment" && (
          <EntertainmentView
            data={entertainmentList} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail}
          />
        )}
        {tab === "study" && (
          <StudyView
            data={studyList} setStudyList={setStudyList} showToast={showToast}
          />
        )}
        {tab === "favorites" && (
          <FavoritesView
            housingList={housingList} foodList={foodList} marketList={marketList}
            entertainmentList={entertainmentList} favorites={favorites}
            toggleFav={toggleFav} setDetail={setDetail} setTab={setTab}
          />
        )}
        {tab === "admin" && (
          currentUser?.role === "Quản trị viên" ? (
            <AdminView
              users={users}
              setUsers={setUsers}
              currentUser={currentUser}
              housingList={housingList}
              setHousingList={setHousingList}
              foodList={foodList}
              setFoodList={setFoodList}
              marketList={marketList}
              setMarketList={setMarketList}
              showToast={showToast}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", maxWidth: 520, margin: "40px auto", background: "#fff", borderRadius: 16, border: "1px solid #E0DCD0", boxShadow: "0 6px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(224,90,71,0.12)", color: CORAL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Lock size={32} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: INK }}>Yêu cầu quyền Quản trị viên</h3>
              <p style={{ color: SUBTEXT, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
                {currentUser
                  ? `Tài khoản "${currentUser.name}" hiện đang ở vai trò "${currentUser.role}", không có quyền truy cập trang quản trị hệ thống.`
                  : "Khu vực này chỉ dành riêng cho Quản trị viên (Admin). Vui lòng đăng nhập với tài khoản quản trị để tiếp tục."}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button
                  className="ul-btn"
                  onClick={() => setShowAuthModal(true)}
                  style={{ background: CORAL, color: "#fff", padding: "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14 }}
                >
                  {currentUser ? "Đổi tài khoản Admin" : "Đăng nhập ngay"}
                </button>
                <button
                  className="ul-btn"
                  onClick={() => setTab("home")}
                  style={{ background: "#F0EFEA", color: INK, padding: "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14 }}
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          )
        )}
        {tab === "profile" && (
          currentUser ? (
            <ProfileView
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              users={users}
              setUsers={setUsers}
              favorites={favorites}
              toggleFav={toggleFav}
              housingList={housingList}
              foodList={foodList}
              marketList={marketList}
              entertainmentList={entertainmentList}
              setDetail={setDetail}
              setTab={setTab}
              showToast={showToast}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", maxWidth: 440, margin: "40px auto", background: "#fff", borderRadius: 16, border: "1px solid #ECE7D8" }}>
              <User size={48} color={SUBTEXT} style={{ marginBottom: 12, opacity: 0.5 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Vui lòng đăng nhập</h3>
              <p style={{ color: SUBTEXT, fontSize: 14, marginBottom: 20 }}>Bạn cần đăng nhập để xem thông tin trang cá nhân và các bài viết đã thích.</p>
              <button onClick={() => setShowAuthModal(true)} className="ul-btn" style={{ background: CORAL, color: "#fff", padding: "10px 20px", borderRadius: 10, fontWeight: 700 }}>
                Đăng nhập ngay
              </button>
            </div>
          )
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E2DED2", background: "#EFECE3", padding: "30px 20px", color: SUBTEXT, fontSize: 13.5 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: CORAL }}>UniLife</span> — Đồng hành cùng sinh viên mọi nẻo đường
            </div>
            <div>Nền tảng tiện ích kết nối toàn diện đời sống sinh viên © 2026 UniLife</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("housing")}>Phòng trọ</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("food")}>Ăn uống</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("market")}>Chợ đồ cũ</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("study")}>Góc học tập</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("entertainment")}>Vui chơi</span>
          </div>
        </div>
      </footer>

      {/* CÁC CỬA SỔ MODAL NỔI */}
      {detail && (
        <DetailModal
          item={detail}
          onClose={() => setDetail(null)}
          favorites={favorites}
          toggleFav={toggleFav}
          onContact={(item) => {
            setDetail(null);
            setShowContactModal(item);
          }}
          showToast={showToast}
        />
      )}

      {showContactModal && (
        <ContactModal
          item={showContactModal}
          onClose={() => setShowContactModal(null)}
          showToast={showToast}
        />
      )}

      {showAddMarketModal && (
        <AddMarketModal
          onClose={() => setShowAddMarketModal(false)}
          onAdd={(newItem) => {
            setMarketList([newItem, ...marketList]);
            setShowAddMarketModal(false);
            showToast("Đã đăng tin bán sản phẩm thành công lên Chợ UniLife!");
          }}
        />
      )}

      {showAddHousingModal && (
        <AddHousingModal
          onClose={() => setShowAddHousingModal(false)}
          onAdd={(newItem) => {
            setHousingList([newItem, ...housingList]);
            setShowAddHousingModal(false);
            showToast("Đã đăng tin phòng trọ mới thành công!");
          }}
        />
      )}

      {showNotificationModal && (
        <NotificationModal onClose={() => setShowNotificationModal(false)} />
      )}

      {showChatModal && (
        <ChatModal onClose={() => setShowChatModal(false)} showToast={showToast} />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        users={users}
        onRegister={(newUser) => {
          setUsers([...users, newUser]);
          setCurrentUser(newUser);
          setShowAuthModal(false);
          showToast(`Chào mừng thành viên mới, ${newUser.name}! 🎉`);
        }}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setShowAuthModal(false);
          showToast(`Đăng nhập thành công! Xin chào ${user.name} 👋`);
        }}
        showToast={showToast}
      />

      {/* TOAST THÔNG BÁO NHANH */}
      {toast && (
        <div className="animate-fade-in" style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: INK, color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 300, boxShadow: "0 10px 28px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 10 }}>
          <CheckCircle2 size={18} color={MARIGOLD} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
