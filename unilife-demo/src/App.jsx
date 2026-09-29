import React, { useState, useMemo } from "react";
import {
  Home, Search, Bell, MessageCircle, Heart, Star, MapPin, X,
  Wifi, Fan, WashingMachine, Bike, Filter, ChevronRight,
  Gamepad2, Mic2, CircleDot, Utensils, ShoppingBag, PartyPopper,
  BookOpen, LayoutDashboard, Users, Building2, ShoppingCart,
  Plus, Clock, Phone, ArrowRight, Sparkles, Send, CheckCircle2,
  Trash2, LogIn, LogOut, UserCheck, SlidersHorizontal, Image as ImageIcon,
  FileText, Bookmark, BookmarkCheck, User, Settings, BarChart2, Edit3
} from "lucide-react";
import "./App.css";

// Import dữ liệu & components
import {
  initialUsers,
  initialHousing,
  initialFood,
  initialMarket,
  initialEntertainment,
  initialStudy
} from "./data/mockData";

import AuthModal from "./components/AuthModal";
import DetailModal from "./components/DetailModal";
import AddLocationModal from "./components/AddLocationModal";
import AdminView from "./components/AdminView";

const INK = "#16192E";
const PAPER = "#F6F4EE";
const MARIGOLD = "#FFC145";
const CORAL = "#FF5D3E";
const TEAL = "#0E7C66";
const CARD = "#FFFFFF";
const SUBTEXT = "#6B6A63";

const rotations = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

const categories = [
  { id: "housing", label: "Phòng trọ", icon: Home, color: MARIGOLD, desc: "Tìm trọ & bạn ở ghép" },
  { id: "food", label: "Ăn uống", icon: Utensils, color: CORAL, desc: "Quán ngon giá sinh viên" },
  { id: "market", label: "Mua bán cũ", icon: ShoppingBag, color: TEAL, desc: "Trao đổi sách vở & đồ dùng" },
  { id: "entertainment", label: "Vui chơi", icon: PartyPopper, color: "#7F77DD", desc: "Tụ điểm giải trí quanh trường" },
  { id: "study", label: "Góc học tập", icon: BookOpen, color: "#378ADD", desc: "Tài liệu & nhóm đồ án" },
];

function StarRow({ rating, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <Star size={size} fill={MARIGOLD} color={MARIGOLD} />
      <span style={{ fontWeight: 600, fontSize: 13, color: INK }}>{rating}</span>
    </span>
  );
}

function Badge({ children, bg, color }) {
  return (
    <span style={{ background: bg, color: color, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 3 }}>
      {children}
    </span>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState({ "housing-1": true, "food-1": true });
  // Bookmark riêng biệt với favorites (like)
  const [bookmarks, setBookmarks] = useState({});
  const [detail, setDetail] = useState(null);
  const [toast, setToast] = useState("");

  // BỘ DỮ LIỆU CHÍNH
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null); // Mặc định chưa đăng nhập
  const [housingList, setHousingList] = useState(initialHousing);
  const [foodList, setFoodList] = useState(initialFood);
  const [marketList, setMarketList] = useState(initialMarket);
  const [entertainmentList, setEntertainmentList] = useState(initialEntertainment);
  const [studyList, setStudyList] = useState(initialStudy);

  // BỘ LỌC PHÒNG TRỌ
  const [housingFilters, setHousingFilters] = useState({ ac: false, washer: false, wifi: false, parking: false });
  const [priceMax, setPriceMax] = useState(4);

  // MODALS
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [addPlaceDefaultType, setAddPlaceDefaultType] = useState("housing");
  const [contactItem, setContactItem] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  // Toast feedback
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  // Kiểm tra quyền
  const isAdmin = currentUser?.role === "Admin";
  const isLoggedIn = !!currentUser;

  // Hàm mở Add modal — yêu cầu đăng nhập
  const handleOpenAdd = (type) => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
      showToast("⚠️ Vui lòng đăng nhập để thêm địa điểm!");
      return;
    }
    setAddPlaceDefaultType(type);
    setIsAddPlaceOpen(true);
  };

  // 1. Quản lý Đăng ký / Duyệt tài khoản
  const handleRegisterUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleApproveUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "Active" } : u))
    );
  };

  const handleRejectUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleToggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, status: u.status === "Active" ? "Banned" : "Active" };
        }
        return u;
      })
    );
  };

  // Số lượng tài khoản chờ Admin duyệt
  const pendingUsersCount = useMemo(() => {
    return users.filter((u) => u.status === "Pending").length;
  }, [users]);

  // 2. Thêm và Bỏ (Xóa) nội dung địa điểm
  const handleAddPlace = (type, newItem) => {
    if (type === "housing") setHousingList((prev) => [newItem, ...prev]);
    else if (type === "food") setFoodList((prev) => [newItem, ...prev]);
    else if (type === "market") setMarketList((prev) => [newItem, ...prev]);
    else if (type === "entertainment") setEntertainmentList((prev) => [newItem, ...prev]);
  };

  const handleDeletePlace = (type, id) => {
    if (type === "housing") setHousingList((prev) => prev.filter((item) => item.id !== id));
    else if (type === "food") setFoodList((prev) => prev.filter((item) => item.id !== id));
    else if (type === "market") setMarketList((prev) => prev.filter((item) => item.id !== id));
    else if (type === "entertainment") setEntertainmentList((prev) => prev.filter((item) => item.id !== id));

    // Xóa khỏi danh sách yêu thích nếu có
    const favKey = `${type}-${id}`;
    if (favorites[favKey]) {
      setFavorites((prev) => {
        const next = { ...prev };
        delete next[favKey];
        return next;
      });
    }
    // Xóa khỏi bookmark nếu có
    const bKey = `${type}-${id}`;
    if (bookmarks[bKey]) {
      setBookmarks((prev) => {
        const next = { ...prev };
        delete next[bKey];
        return next;
      });
    }

    if (detail && detail.id === id && detail.type === type) {
      setDetail(null);
    }
  };

  // 3. Quản lý Lượt thích (Likes) & Yêu thích (Favorites)
  const handleToggleFav = (type, id) => {
    const key = `${type}-${id}`;
    const currentlyFav = !!favorites[key];
    const delta = currentlyFav ? -1 : 1;

    const updateLikes = (list) =>
      list.map((item) => {
        if (item.id === id) {
          const currentLikes = item.likes || 0;
          return { ...item, likes: Math.max(0, currentLikes + delta) };
        }
        return item;
      });

    if (type === "housing") setHousingList(updateLikes);
    else if (type === "food") setFoodList(updateLikes);
    else if (type === "market") setMarketList(updateLikes);
    else if (type === "entertainment") setEntertainmentList(updateLikes);

    if (detail && detail.id === id && detail.type === type) {
      setDetail((prev) => ({
        ...prev,
        likes: Math.max(0, (prev.likes || 0) + delta)
      }));
    }

    setFavorites((prev) => {
      const next = { ...prev, [key]: !currentlyFav };
      showToast(!currentlyFav ? "Đã thích! ❤️" : "Đã bỏ thích!");
      return next;
    });
  };

  // 4. Quản lý Bookmark (Lưu bài)
  const handleToggleBookmark = (type, id) => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
      showToast("⚠️ Đăng nhập để lưu bài viết!");
      return;
    }
    const key = `${type}-${id}`;
    const isBookmarked = !!bookmarks[key];
    setBookmarks((prev) => {
      const next = { ...prev, [key]: !isBookmarked };
      showToast(!isBookmarked ? "✅ Đã lưu bài vào Bộ sưu tập!" : "🗑️ Đã bỏ lưu bài!");
      return next;
    });
  };

  // 5. Thêm & Bỏ (Xóa) Đánh giá (Reviews)
  const handleAddReview = (type, placeId, newReview) => {
    const updateRev = (list) =>
      list.map((item) => {
        if (item.id === placeId) {
          const updatedReviews = [newReview, ...(item.reviewsList || [])];
          return { ...item, reviewsList: updatedReviews };
        }
        return item;
      });

    if (type === "housing") setHousingList(updateRev);
    else if (type === "food") setFoodList(updateRev);
    else if (type === "market") setMarketList(updateRev);
    else if (type === "entertainment") setEntertainmentList(updateRev);

    if (detail && detail.id === placeId && detail.type === type) {
      setDetail((prev) => ({
        ...prev,
        reviewsList: [newReview, ...(prev.reviewsList || [])]
      }));
    }
  };

  const handleDeleteReview = (type, placeId, reviewId) => {
    const removeRev = (list) =>
      list.map((item) => {
        if (item.id === placeId) {
          const updatedReviews = (item.reviewsList || []).filter((r) => r.id !== reviewId);
          return { ...item, reviewsList: updatedReviews };
        }
        return item;
      });

    if (type === "housing") setHousingList(removeRev);
    else if (type === "food") setFoodList(removeRev);
    else if (type === "market") setMarketList(removeRev);
    else if (type === "entertainment") setEntertainmentList(removeRev);

    if (detail && detail.id === placeId && detail.type === type) {
      setDetail((prev) => ({
        ...prev,
        reviewsList: (prev.reviewsList || []).filter((r) => r.id !== reviewId)
      }));
    }
  };

  // LỌC PHÒNG TRỌ
  const filteredHousing = useMemo(() => {
    return housingList.filter((h) => {
      if (h.priceNum > priceMax) return false;
      if (housingFilters.ac && !h.ac) return false;
      if (housingFilters.washer && !h.washer) return false;
      if (housingFilters.wifi && !h.wifi) return false;
      if (housingFilters.parking && !h.parking) return false;
      if (query && !h.name.toLowerCase().includes(query.toLowerCase()) && !h.address.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [housingList, housingFilters, priceMax, query]);

  // Đếm yêu thích & bookmark
  const favCount = useMemo(() => Object.values(favorites).filter(Boolean).length, [favorites]);
  const bookmarkCount = useMemo(() => Object.values(bookmarks).filter(Boolean).length, [bookmarks]);

  const navItems = [
    { id: "home", label: "Trang chủ" },
    { id: "housing", label: "Phòng trọ" },
    { id: "food", label: "Ăn uống" },
    { id: "market", label: "Chợ đồ cũ" },
    { id: "entertainment", label: "Vui chơi" },
    { id: "study", label: "Góc học tập" },
    { id: "favorites", label: `❤️ Thích (${favCount})` },
    ...(isLoggedIn ? [{ id: "saved", label: `🔖 Đã lưu (${bookmarkCount})` }] : []),
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: PAPER, minHeight: "100vh", color: INK, display: "flex", flexDirection: "column" }}>
      
      {/* TOP NOTIFICATION BAR */}
      <div style={{ background: "#21253B", color: "#E0DFD5", fontSize: 12, padding: "6px 20px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={13} color={MARIGOLD} />
            <b>UniLife 2026:</b> Nền tảng tiện ích thông minh kết nối trọn vẹn đời sống sinh viên
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {pendingUsersCount > 0 && isAdmin && (
              <span
                onClick={() => setTab("admin")}
                style={{ background: CORAL, color: "#fff", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                ⚠️ Có {pendingUsersCount} tài khoản chờ duyệt
              </span>
            )}
            <span style={{ color: MARIGOLD, fontWeight: 600 }}>
              Sinh viên thực hiện: <b>Phan Trí Đức</b> · Lớp <b>24CT1</b> (CNPM - DAU)
            </span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: INK, color: "#fff", boxShadow: "0 4px 18px rgba(0,0,0,0.12)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64, gap: 16 }}>
          {/* LOGO */}
          <div
            className="ul-h"
            onClick={() => setTab("home")}
            style={{ fontSize: 24, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
          >
            <span style={{ color: MARIGOLD, display: "flex", alignItems: "center" }}>
              Uni<span style={{ color: "#fff" }}>Life</span>
            </span>
            <span style={{ fontSize: 10, background: CORAL, color: "#fff", padding: "2px 6px", borderRadius: 4, fontWeight: 600, letterSpacing: 0.5 }}>
              DEMO
            </span>
          </div>

          {/* NAVIGATION */}
          <nav style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }} className="ul-scroll">
            {navItems.map((n) => (
              <div
                key={n.id}
                className="ul-tab"
                onClick={() => setTab(n.id)}
                style={{
                  padding: "8px 13px",
                  borderRadius: 8,
                  fontSize: 13.5,
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

          {/* ACTIONS & USER PROFILE */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {/* THÊM ĐỊA ĐIỂM — chỉ hiện khi đã đăng nhập */}
            {isLoggedIn && (
              <button
                className="ul-btn"
                onClick={() => {
                  const type = tab === "food" || tab === "market" || tab === "entertainment" ? tab : "housing";
                  handleOpenAdd(type);
                }}
                title="Thêm địa điểm / sản phẩm mới"
                style={{ background: TEAL, color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}
              >
                <Plus size={15} /> Thêm
              </button>
            )}

            {/* NOTIFICATION */}
            <button
              className="ul-btn"
              onClick={() => setShowNotificationModal(true)}
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Bell size={17} />
            </button>

            {/* CHAT */}
            <button
              className="ul-btn"
              onClick={() => setShowChatModal(true)}
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <MessageCircle size={17} />
            </button>

            {/* NÚT ADMIN DASHBOARD — CHỈ HIỆN VỚI ADMIN */}
            {isAdmin && (
              <div
                onClick={() => setTab("admin")}
                title="Khu vực Quản trị Admin"
                style={{
                  background: tab === "admin" ? MARIGOLD : "rgba(255,193,69,0.2)",
                  color: tab === "admin" ? INK : MARIGOLD,
                  border: `1.5px solid ${MARIGOLD}`,
                  padding: "5px 10px",
                  borderRadius: 20,
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <LayoutDashboard size={14} />
                <span>Admin</span>
                {pendingUsersCount > 0 && (
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: CORAL }} />
                )}
              </div>
            )}

            {/* AUTH / USER PROFILE */}
            {currentUser ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", padding: "4px 8px 4px 6px", borderRadius: 20, cursor: "pointer" }}
                onClick={() => setTab("profile")}
                title="Xem hồ sơ cá nhân"
              >
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: MARIGOLD, color: INK, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11 }}>
                  {currentUser.avatar || "SV"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 110 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentUser.name}</span>
                  <span style={{ fontSize: 10, color: MARIGOLD }}>{currentUser.role}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentUser(null);
                    setTab("home");
                    showToast("Đã đăng xuất tài khoản.");
                  }}
                  className="ul-btn"
                  title="Đăng xuất"
                  style={{ background: "none", color: "#fff", padding: "2px" }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="ul-btn"
                style={{ background: CORAL, color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}
              >
                <LogIn size={15} /> Đăng nhập / Đăng ký
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN VIEW CONTAINER */}
      <main style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px 60px", flex: 1, width: "100%" }}>
        {tab === "home" && (
          <HomeView
            query={query} setQuery={setQuery} setTab={setTab}
            favorites={favorites} onToggleFav={handleToggleFav}
            bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark}
            setDetail={setDetail}
            housingList={housingList} foodList={foodList} marketList={marketList}
            isLoggedIn={isLoggedIn}
          />
        )}

        {tab === "housing" && (
          <HousingView
            data={filteredHousing} favorites={favorites} onToggleFav={handleToggleFav}
            bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark}
            filters={housingFilters} setFilters={setHousingFilters}
            priceMax={priceMax} setPriceMax={setPriceMax}
            query={query} setQuery={setQuery} setDetail={setDetail}
            onOpenAdd={() => handleOpenAdd("housing")}
            onDeletePlace={handleDeletePlace}
            isLoggedIn={isLoggedIn}
          />
        )}

        {tab === "food" && (
          <FoodView
            data={foodList} favorites={favorites} onToggleFav={handleToggleFav}
            bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark}
            setDetail={setDetail}
            onOpenAdd={() => handleOpenAdd("food")}
            onDeletePlace={handleDeletePlace}
            isLoggedIn={isLoggedIn}
          />
        )}

        {tab === "market" && (
          <MarketView
            data={marketList} favorites={favorites} onToggleFav={handleToggleFav}
            bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark}
            setDetail={setDetail}
            onOpenAdd={() => handleOpenAdd("market")}
            onDeletePlace={handleDeletePlace}
            isLoggedIn={isLoggedIn}
          />
        )}

        {tab === "entertainment" && (
          <EntertainmentView
            data={entertainmentList} favorites={favorites} onToggleFav={handleToggleFav}
            bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark}
            setDetail={setDetail}
            onOpenAdd={() => handleOpenAdd("entertainment")}
            onDeletePlace={handleDeletePlace}
            isLoggedIn={isLoggedIn}
          />
        )}

        {tab === "study" && (
          <StudyView data={studyList} setStudyList={setStudyList} showToast={showToast} currentUser={currentUser} />
        )}

        {tab === "favorites" && (
          <FavoritesView
            housingList={housingList} foodList={foodList} marketList={marketList}
            entertainmentList={entertainmentList} favorites={favorites}
            bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark}
            onToggleFav={handleToggleFav} setDetail={setDetail} setTab={setTab}
          />
        )}

        {tab === "saved" && isLoggedIn && (
          <SavedView
            housingList={housingList} foodList={foodList} marketList={marketList}
            entertainmentList={entertainmentList}
            bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark}
            favorites={favorites} onToggleFav={handleToggleFav}
            setDetail={setDetail} setTab={setTab}
          />
        )}

        {tab === "profile" && isLoggedIn && (
          <ProfileView
            currentUser={currentUser}
            bookmarks={bookmarks}
            favorites={favorites}
            housingList={housingList} foodList={foodList}
            marketList={marketList} entertainmentList={entertainmentList}
            setTab={setTab}
            onLogout={() => { setCurrentUser(null); setTab("home"); showToast("Đã đăng xuất."); }}
            showToast={showToast}
          />
        )}

        {tab === "admin" && isAdmin && (
          <AdminView
            users={users}
            onApproveUser={handleApproveUser}
            onRejectUser={handleRejectUser}
            onToggleUserStatus={handleToggleUserStatus}
            housingList={housingList}
            foodList={foodList}
            marketList={marketList}
            entertainmentList={entertainmentList}
            onDeletePlace={handleDeletePlace}
            onOpenAddModal={(t) => { setAddPlaceDefaultType(t); setIsAddPlaceOpen(true); }}
            showToast={showToast}
          />
        )}

        {/* Nếu user thường cố vào admin, hiện thông báo */}
        {tab === "admin" && !isAdmin && (
          <div style={{ paddingTop: 80, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Khu vực giới hạn</h2>
            <p style={{ color: SUBTEXT, fontSize: 15, marginBottom: 24 }}>
              Trang này chỉ dành cho Quản trị viên (Admin) của hệ thống UniLife.
            </p>
            <button onClick={() => setTab("home")} className="ul-btn"
              style={{ background: CORAL, color: "#fff", padding: "12px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15 }}>
              ← Về trang chủ
            </button>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E2DED2", background: "#EFECE3", padding: "30px 20px", color: SUBTEXT, fontSize: 13.5 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: CORAL }}>UniLife</span> — Đồng hành cùng sinh viên mọi nẻo đường
            </div>
            <div>Dự án Học phần Công Nghệ Phần Mềm (CNPM - DAU) · Sinh viên: <b>Phan Trí Đức</b> · Lớp: <b>24CT1</b></div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("housing")}>Phòng trọ</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("food")}>Ăn uống</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("market")}>Chợ cũ</span>
            {isAdmin && (
              <>
                <span>·</span>
                <span style={{ cursor: "pointer", color: CORAL, fontWeight: 700 }} onClick={() => setTab("admin")}>Bảng Admin ({pendingUsersCount} chờ duyệt)</span>
              </>
            )}
          </div>
        </div>
      </footer>

      {/* MODAL CHI TIẾT */}
      {detail && (
        <DetailModal
          item={detail}
          onClose={() => setDetail(null)}
          isFavorite={!!favorites[`${detail.type}-${detail.id}`]}
          onToggleFav={() => handleToggleFav(detail.type, detail.id)}
          isBookmarked={!!bookmarks[`${detail.type}-${detail.id}`]}
          onToggleBookmark={() => handleToggleBookmark(detail.type, detail.id)}
          onContact={(item) => {
            setDetail(null);
            setContactItem(item);
          }}
          onDeletePlace={handleDeletePlace}
          onAddReview={handleAddReview}
          onDeleteReview={handleDeleteReview}
          currentUser={currentUser}
          showToast={showToast}
        />
      )}

      {/* MODAL THÊM ĐỊA ĐIỂM */}
      <AddLocationModal
        isOpen={isAddPlaceOpen}
        onClose={() => setIsAddPlaceOpen(false)}
        onAddPlace={handleAddPlace}
        showToast={showToast}
        defaultType={addPlaceDefaultType}
        currentUser={currentUser}
      />

      {/* MODAL ĐĂNG NHẬP / ĐĂNG KÝ */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        users={users}
        onRegister={handleRegisterUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setTab("home");
        }}
        showToast={showToast}
      />

      {/* MODAL LIÊN HỆ */}
      {contactItem && (
        <ContactModal item={contactItem} onClose={() => setContactItem(null)} showToast={showToast} />
      )}

      {/* MODAL THÔNG BÁO */}
      {showNotificationModal && (
        <NotificationModal onClose={() => setShowNotificationModal(false)} />
      )}

      {/* MODAL CHAT DEMO */}
      {showChatModal && (
        <ChatModal onClose={() => setShowChatModal(false)} showToast={showToast} />
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="animate-fade-in" style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: INK, color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 400, boxShadow: "0 10px 28px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 10 }}>
          <CheckCircle2 size={18} color={MARIGOLD} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// CÁC VIEW HIỂN THỊ CHI TIẾT
// ----------------------------------------------------

function SectionTitle({ children, action, subtitle }) {
  return (
    <div style={{ margin: "38px 0 16px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h2 className="ul-h" style={{ fontSize: 22, fontWeight: 700, margin: 0, color: INK }}>{children}</h2>
        {action}
      </div>
      {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13.5, color: SUBTEXT }}>{subtitle}</p>}
    </div>
  );
}

function CardRow({ children }) {
  return (
    <div className="ul-scroll" style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 10, paddingTop: 4 }}>
      {React.Children.map(children, (c) => (
        <div style={{ minWidth: 260, flex: "0 0 260px" }}>{c}</div>
      ))}
    </div>
  );
}

// --- HOME VIEW ---
function HomeView({ query, setQuery, setTab, favorites, onToggleFav, bookmarks, onToggleBookmark, setDetail, housingList, foodList, marketList, isLoggedIn }) {
  return (
    <div>
      <section style={{ paddingTop: 38, paddingBottom: 16, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,193,69,0.22)", color: "#8A5B00", padding: "6px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, marginBottom: 16 }}>
          <Sparkles size={14} color="#8A5B00" /> Hệ thống tiện ích đời sống sinh viên UniLife
        </div>
        <h1 className="ul-h" style={{ fontSize: 42, lineHeight: 1.2, margin: "0 0 16px", maxWidth: 700, marginLeft: "auto", marginRight: "auto", fontWeight: 700 }}>
          Cuộc sống đại học dễ dàng và tiện lợi hơn với <span style={{ color: CORAL }}>UniLife</span>
        </h1>
        <p style={{ color: SUBTEXT, fontSize: 15.5, maxWidth: 540, margin: "0 auto 28px", lineHeight: 1.5 }}>
          Tìm phòng trọ an ninh, quán ăn hợp túi tiền, trao đổi sách giáo trình cũ và tụ điểm vui chơi quanh trường học.
        </p>

        {/* SEARCH BAR */}
        <div style={{ maxWidth: 620, margin: "0 auto", display: "flex", gap: 8, background: CARD, padding: 8, borderRadius: 16, boxShadow: "0 10px 30px rgba(22,25,46,0.09)", border: "1px solid #EAE6D9" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
            <Search size={19} color={SUBTEXT} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") setTab("housing"); }}
              placeholder="Tìm phòng trọ dưới 2 triệu, quán ăn ngon, giáo trình..."
              style={{ border: "none", outline: "none", fontSize: 14.5, width: "100%", background: "transparent" }}
            />
          </div>
          <button className="ul-btn" onClick={() => setTab("housing")} style={{ background: INK, color: "#fff", borderRadius: 12, padding: "12px 24px", fontWeight: 600, fontSize: 14.5, display: "flex", alignItems: "center", gap: 6 }}>
            <span>Tìm kiếm</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* DANH MỤC CORKBOARD */}
      <SectionTitle subtitle="Khám phá ngay các dịch vụ sinh viên cần thiết">
        Danh mục dịch vụ sinh viên
      </SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {categories.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              className="ul-card"
              onClick={() => setTab(c.id)}
              style={{
                background: CARD,
                borderRadius: 14,
                padding: "22px 14px",
                textAlign: "center",
                cursor: "pointer",
                transform: `rotate(${rotations[i % rotations.length]})`,
                boxShadow: "0 6px 18px rgba(22,25,46,0.06)",
                border: "1px solid #ECE7D8",
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: c.color + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <Icon size={24} color={c.color === MARIGOLD ? "#8A5B00" : c.color} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: SUBTEXT }}>{c.desc}</div>
            </div>
          );
        })}
      </div>

      {/* PHÒNG TRỌ GẦN BẠN */}
      <SectionTitle
        subtitle="Phòng trọ xác thực, an ninh quanh trường học"
        action={
          <button className="ul-btn" onClick={() => setTab("housing")} style={{ background: "transparent", color: CORAL, fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 4 }}>
            Xem tất cả trọ ({housingList.length}) <ChevronRight size={16} />
          </button>
        }
      >
        Phòng trọ gần bạn nhất
      </SectionTitle>
      <CardRow>
        {housingList.slice(0, 5).map((h) => (
          <PlaceCard key={h.id} item={h} type="housing" favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />
        ))}
      </CardRow>

      {/* QUÁN ĂN */}
      <SectionTitle
        subtitle="Quán cơm, trà sữa, cafe học bài giá sinh viên"
        action={
          <button className="ul-btn" onClick={() => setTab("food")} style={{ background: "transparent", color: TEAL, fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 4 }}>
            Xem quán ăn ({foodList.length}) <ChevronRight size={16} />
          </button>
        }
      >
        Được sinh viên yêu thích & đánh giá cao
      </SectionTitle>
      <CardRow>
        {foodList.map((f) => (
          <FoodCard key={f.id} item={f} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />
        ))}
      </CardRow>

      {/* CHỢ ĐỒ CŨ */}
      <SectionTitle
        subtitle="Tiết kiệm chi phí với đồ dùng & sách vở pass lại"
        action={
          <button className="ul-btn" onClick={() => setTab("market")} style={{ background: "transparent", color: INK, fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 4 }}>
            Vào Chợ sinh viên ({marketList.length}) <ChevronRight size={16} />
          </button>
        }
      >
        Tin đăng mua bán đồ cũ mới nhất
      </SectionTitle>
      <CardRow>
        {marketList.map((p) => (
          <ProductCard key={p.id} item={p} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />
        ))}
      </CardRow>
    </div>
  );
}

// --- BOOKMARK BUTTON nhỏ gọn ---
function BookmarkBtn({ isBookmarked, onClick }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="ul-btn"
      title={isBookmarked ? "Bỏ lưu" : "Lưu bài"}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        background: isBookmarked ? "#16192E" : "rgba(255,255,255,0.92)",
        borderRadius: 999,
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
        gap: 3,
        fontSize: 11,
        fontWeight: 700,
        color: isBookmarked ? "#fff" : "#16192E",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
      }}
    >
      {isBookmarked ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
    </button>
  );
}

// --- PLACE CARD ---
function PlaceCard({ item, type, favorites, onToggleFav, bookmarks, onToggleBookmark, setDetail, onDeletePlace }) {
  const key = `${type}-${item.id}`;
  const isFav = !!favorites[key];
  const isBookmarked = !!bookmarks[key];
  const reviewsCount = item.reviewsList?.length || 0;

  return (
    <div
      className="ul-card"
      style={{ background: CARD, borderRadius: 14, overflow: "hidden", border: "1px solid #ECE7D8", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%", position: "relative" }}
      onClick={() => setDetail({ ...item, type })}
    >
      <div style={{ position: "relative", height: 150, background: "#EAE6D9", overflow: "hidden" }}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #FFC14533, #FF5D3E33)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#16192E" }}>
            UniLife Trọ
          </div>
        )}

        {/* BOOKMARK */}
        <BookmarkBtn isBookmarked={isBookmarked} onClick={() => onToggleBookmark(type, item.id)} />

        {/* LIKE */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(type, item.id); }}
          className="ul-btn"
          title={isFav ? "Bỏ thích" : "Yêu thích"}
          style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(255,255,255,0.92)", borderRadius: 999,
            padding: "4px 8px", display: "flex", alignItems: "center", gap: 4,
            fontSize: 12, fontWeight: 700, color: isFav ? CORAL : INK,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
          }}
        >
          <Heart size={14} fill={isFav ? CORAL : "none"} color={isFav ? CORAL : INK} />
          <span>{item.likes || 0}</span>
        </button>

        {item.area && (
          <div style={{ position: "absolute", bottom: 8, left: 8 }}>
            <Badge bg="rgba(22,25,46,0.85)" color="#fff">{item.area}</Badge>
          </div>
        )}
      </div>

      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6, lineHeight: 1.35, minHeight: 40 }}>{item.name}</div>
        <div style={{ fontSize: 15, color: CORAL, fontWeight: 800, marginBottom: 8 }}>{item.price}<span style={{ color: SUBTEXT, fontWeight: 400, fontSize: 12 }}>/tháng</span></div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: "1px dashed #EAE6D9" }}>
          <span style={{ fontSize: 12.5, color: SUBTEXT, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} color={CORAL} /> {item.distance}</span>
          <span style={{ fontSize: 12, color: SUBTEXT }}>★ {reviewsCount} đánh giá</span>
        </div>
      </div>
    </div>
  );
}

function FoodCard({ item, favorites, onToggleFav, bookmarks, onToggleBookmark, setDetail }) {
  const key = `food-${item.id}`;
  const isFav = !!favorites[key];
  const isBookmarked = !!bookmarks[key];
  const reviewsCount = item.reviewsList?.length || 0;

  return (
    <div className="ul-card" style={{ background: CARD, borderRadius: 14, overflow: "hidden", border: "1px solid #ECE7D8", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }} onClick={() => setDetail({ ...item, type: "food" })}>
      <div style={{ position: "relative", height: 150, background: "#EAE6D9", overflow: "hidden" }}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #0E7C6633, #FFC14533)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: TEAL }}>
            {item.name}
          </div>
        )}

        <BookmarkBtn isBookmarked={isBookmarked} onClick={() => onToggleBookmark("food", item.id)} />

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav("food", item.id); }}
          className="ul-btn"
          style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(255,255,255,0.92)", borderRadius: 999,
            padding: "4px 8px", display: "flex", alignItems: "center", gap: 4,
            fontSize: 12, fontWeight: 700, color: isFav ? CORAL : INK
          }}
        >
          <Heart size={14} fill={isFav ? CORAL : "none"} color={isFav ? CORAL : INK} />
          <span>{item.likes || 0}</span>
        </button>

        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg={TEAL} color="#fff">{item.cat}</Badge>
        </div>
      </div>

      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: TEAL }}>{item.price}</span>
          <span style={{ fontSize: 12, color: SUBTEXT }}>★ {reviewsCount} đánh giá</span>
        </div>
        <div style={{ marginTop: "auto", fontSize: 12, color: SUBTEXT, display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px dashed #EAE6D9" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={12} color={TEAL} />{item.distance}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={12} />{item.hours.split(" - ")[0]}</span>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ item, favorites, onToggleFav, bookmarks, onToggleBookmark, setDetail }) {
  const key = `market-${item.id}`;
  const isFav = !!favorites[key];
  const isBookmarked = !!bookmarks[key];

  return (
    <div className="ul-card" style={{ background: CARD, borderRadius: 14, overflow: "hidden", border: "1px solid #ECE7D8", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }} onClick={() => setDetail({ ...item, type: "market" })}>
      <div style={{ position: "relative", height: 150, background: "#EAE6D9", overflow: "hidden" }}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #16192E22, #7F77DD33)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
            {item.name}
          </div>
        )}

        <BookmarkBtn isBookmarked={isBookmarked} onClick={() => onToggleBookmark("market", item.id)} />

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav("market", item.id); }}
          className="ul-btn"
          style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(255,255,255,0.92)", borderRadius: 999,
            padding: "4px 8px", display: "flex", alignItems: "center", gap: 4,
            fontSize: 12, fontWeight: 700, color: isFav ? CORAL : INK
          }}
        >
          <Heart size={14} fill={isFav ? CORAL : "none"} color={isFav ? CORAL : INK} />
          <span>{item.likes || 0}</span>
        </button>

        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg="rgba(0,0,0,0.75)" color="#fff">{item.cond}</Badge>
        </div>
      </div>

      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.35, minHeight: 38 }}>{item.name}</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: CORAL, marginBottom: 8 }}>{item.price}</div>
        <div style={{ marginTop: "auto", fontSize: 12, color: SUBTEXT, display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px dashed #EAE6D9" }}>
          <span>{item.seller}</span>
          <span>{item.loc}</span>
        </div>
      </div>
    </div>
  );
}

function EntCard({ item, favorites, onToggleFav, bookmarks, onToggleBookmark, setDetail }) {
  const key = `entertainment-${item.id}`;
  const isFav = !!favorites[key];
  const isBookmarked = !!bookmarks[key];

  return (
    <div className="ul-card" style={{ background: CARD, borderRadius: 14, overflow: "hidden", border: "1px solid #ECE7D8", cursor: "pointer" }} onClick={() => setDetail({ ...item, type: "entertainment" })}>
      <div style={{ position: "relative", height: 150, background: "#EAE6D9", overflow: "hidden" }}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ height: "100%", background: "linear-gradient(135deg, #7F77DD20, #7F77DD40)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Gamepad2 size={38} color="#534AB7" />
          </div>
        )}

        <BookmarkBtn isBookmarked={isBookmarked} onClick={() => onToggleBookmark("entertainment", item.id)} />

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav("entertainment", item.id); }}
          className="ul-btn"
          style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(255,255,255,0.92)", borderRadius: 999,
            padding: "4px 8px", display: "flex", alignItems: "center", gap: 4,
            fontSize: 12, fontWeight: 700, color: isFav ? CORAL : INK
          }}
        >
          <Heart size={14} fill={isFav ? CORAL : "none"} color={isFav ? CORAL : INK} />
          <span>{item.likes || 0}</span>
        </button>

        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg="#534AB7" color="#fff">{item.cat}</Badge>
        </div>
      </div>

      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#534AB7" }}>{item.price}</span>
          <StarRow rating={item.rating || 5.0} />
        </div>
        <div style={{ fontSize: 12, color: SUBTEXT, display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px dashed #EAE6D9" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={12} color="#534AB7" />{item.distance}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={12} />{item.hours}</span>
        </div>
      </div>
    </div>
  );
}

// --- FILTER CHIP ---
function FilterChip({ active, label, onClick, icon: Icon }) {
  return (
    <button
      className="ul-btn"
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
        background: active ? INK : CARD, color: active ? "#fff" : INK,
        border: `1px solid ${active ? INK : "#E0DCD0"}`,
      }}
    >
      {Icon && <Icon size={14} />} {label}
    </button>
  );
}

// --- HOUSING VIEW ---
function HousingView({ data, favorites, onToggleFav, bookmarks, onToggleBookmark, filters, setFilters, priceMax, setPriceMax, query, setQuery, setDetail, onOpenAdd, isLoggedIn }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>Tìm phòng trọ sinh viên</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Có {data.length} phòng trọ phù hợp với tiêu chí của bạn</p>
        </div>
        <button
          className="ul-btn"
          onClick={onOpenAdd}
          style={{ background: CORAL, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
        >
          <Plus size={16} /> {isLoggedIn ? "Thêm phòng trọ mới (kèm ảnh)" : "Đăng nhập để thêm"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={18} color={SUBTEXT} style={{ position: "absolute", left: 14 }} />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên phòng, đường, quận hoặc khu vực quanh trường..."
            style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 12, border: "1px solid #E0DCD0", fontSize: 14, outline: "none", background: CARD }}
          />
          {query && <X size={16} color={SUBTEXT} onClick={() => setQuery("")} style={{ position: "absolute", right: 14, cursor: "pointer" }} />}
        </div>
      </div>

      <div style={{ background: CARD, padding: "14px 16px", borderRadius: 14, border: "1px solid #ECE7D8", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: INK, display: "flex", alignItems: "center", gap: 4 }}>
          <SlidersHorizontal size={14} /> Tiện ích:
        </span>
        <FilterChip icon={Fan} active={filters.ac} label="Máy lạnh" onClick={() => setFilters((f) => ({ ...f, ac: !f.ac }))} />
        <FilterChip icon={WashingMachine} active={filters.washer} label="Máy giặt" onClick={() => setFilters((f) => ({ ...f, washer: !f.washer }))} />
        <FilterChip icon={Wifi} active={filters.wifi} label="Wifi miễn phí" onClick={() => setFilters((f) => ({ ...f, wifi: !f.wifi }))} />
        <FilterChip icon={Bike} active={filters.parking} label="Chỗ giữ xe" onClick={() => setFilters((f) => ({ ...f, parking: !f.parking }))} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto", fontSize: 13.5, color: SUBTEXT }}>
          <span>Mức giá tối đa: <b style={{ color: CORAL, fontSize: 15 }}>{priceMax} triệu</b></span>
          <input
            type="range" min="1" max="5" step="0.2" value={priceMax}
            onChange={(e) => setPriceMax(parseFloat(e.target.value))}
            style={{ accentColor: CORAL, cursor: "pointer" }}
          />
        </div>
      </div>

      {data.length === 0 ? (
        <EmptyState text="Không tìm thấy phòng phù hợp. Bạn có thể bấm 'Thêm phòng trọ mới' để đăng tải phòng!" />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {data.map((h) => (
            <PlaceCard key={h.id} item={h} type="housing" favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />
          ))}
        </div>
      )}
    </div>
  );
}

// --- FOOD VIEW ---
function FoodView({ data, favorites, onToggleFav, bookmarks, onToggleBookmark, setDetail, onOpenAdd, isLoggedIn }) {
  const [cat, setCat] = useState("Tất cả");
  const cats = ["Tất cả", "Cơm", "Bún", "Trà sữa", "Cafe", "Ăn vặt"];
  const filtered = cat === "Tất cả" ? data : data.filter((f) => f.cat === cat);

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Quán ăn & Cà phê sinh viên</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: "4px 0 0" }}>Địa điểm ẩm thực ngon, đảm bảo vệ sinh và giá cả hợp lý</p>
        </div>
        <button className="ul-btn" onClick={onOpenAdd} style={{ background: TEAL, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={16} /> {isLoggedIn ? "Thêm quán ăn mới" : "Đăng nhập để thêm"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {cats.map((c) => <FilterChip key={c} active={cat === c} label={c} onClick={() => setCat(c)} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
        {filtered.map((f) => (
          <FoodCard key={f.id} item={f} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />
        ))}
      </div>
    </div>
  );
}

// --- MARKET VIEW ---
function MarketView({ data, favorites, onToggleFav, bookmarks, onToggleBookmark, setDetail, onOpenAdd, isLoggedIn }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Chợ sinh viên & Trao đổi đồ cũ</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: "4px 0 0" }}>Thanh lý giáo trình, laptop, xe đạp giá sinh viên</p>
        </div>
        <button className="ul-btn" onClick={onOpenAdd} style={{ background: CORAL, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={16} /> {isLoggedIn ? "Đăng bán đồ cũ (kèm ảnh)" : "Đăng nhập để đăng"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
        {data.map((p) => (
          <ProductCard key={p.id} item={p} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />
        ))}
      </div>
    </div>
  );
}

// --- ENTERTAINMENT VIEW ---
function EntertainmentView({ data, favorites, onToggleFav, bookmarks, onToggleBookmark, setDetail, onOpenAdd, isLoggedIn }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Tụ điểm vui chơi & Giải trí</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: "4px 0 0" }}>Xả stress sau các kỳ thi căng thẳng cùng bạn bè</p>
        </div>
        <button className="ul-btn" onClick={onOpenAdd} style={{ background: "#7F77DD", color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={16} /> {isLoggedIn ? "Thêm địa điểm vui chơi" : "Đăng nhập để thêm"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 18 }}>
        {data.map((e) => (
          <EntCard key={e.id} item={e} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />
        ))}
      </div>
    </div>
  );
}

// --- STUDY VIEW ---
function StudyView({ data, setStudyList, showToast, currentUser }) {
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
      author: currentUser ? `${currentUser.name}` : "Ẩn danh",
      downloads: 1,
      rating: 5.0,
      likes: 1,
      type: docType,
      date: "Vừa xong",
      desc: docDesc || "Tài liệu học tập chia sẻ cho sinh viên.",
      reviewsList: []
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
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Góc học tập & Trao đổi đồ án</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: "4px 0 0" }}>Kho tài liệu, đề thi, slide ôn tập và ghép nhóm học tập</p>
        </div>
        {currentUser ? (
          <button
            className="ul-btn"
            onClick={() => setShowAddDoc(true)}
            style={{ background: "#378ADD", color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
          >
            <Plus size={16} /> Chia sẻ tài liệu
          </button>
        ) : (
          <div style={{ fontSize: 13, color: SUBTEXT, fontStyle: "italic" }}>Đăng nhập để chia sẻ tài liệu</div>
        )}
      </div>

      {showAddDoc && (
        <form onSubmit={handleAddDoc} className="animate-fade-in" style={{ background: CARD, border: "1px solid #ECE7D8", borderRadius: 14, padding: 18, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, margin: "0 0 12px" }}>Chia sẻ tài liệu mới</h3>
          <div style={{ display: "grid", gap: 10, maxWidth: 600 }}>
            <input
              required placeholder="Tên tài liệu / Tiêu đề tìm nhóm..."
              value={docTitle} onChange={(e) => setDocTitle(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            />
            <select
              value={docType} onChange={(e) => setDocType(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            >
              <option value="Tài liệu ôn tập">Tài liệu ôn tập</option>
              <option value="Đề thi mẫu">Đề thi mẫu</option>
              <option value="Sơ đồ tư duy">Sơ đồ tư duy</option>
              <option value="Ghép nhóm đồ án">Ghép nhóm đồ án</option>
            </select>
            <textarea
              placeholder="Mô tả tóm tắt nội dung tài liệu..."
              rows={2} value={docDesc} onChange={(e) => setDocDesc(e.target.value)}
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
                <p style={{ fontSize: 13, color: SUBTEXT, margin: "0 0 8px" }}>{item.desc}</p>
                <div style={{ fontSize: 12, color: SUBTEXT, display: "flex", gap: 12 }}>
                  <span>Tác giả: <b>{item.author}</b></span>
                  <span>·</span>
                  <span>{item.downloads} lượt tải</span>
                  <span>·</span>
                  <span>❤️ {item.likes || 0} thích</span>
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

// --- FAVORITES VIEW ---
function FavoritesView({ housingList, foodList, marketList, entertainmentList, favorites, bookmarks, onToggleBookmark, onToggleFav, setDetail, setTab }) {
  const allFavItems = useMemo(() => {
    const items = [];
    housingList.forEach((h) => { if (favorites[`housing-${h.id}`]) items.push({ ...h, type: "housing" }); });
    foodList.forEach((f) => { if (favorites[`food-${f.id}`]) items.push({ ...f, type: "food" }); });
    marketList.forEach((m) => { if (favorites[`market-${m.id}`]) items.push({ ...m, type: "market" }); });
    entertainmentList.forEach((e) => { if (favorites[`entertainment-${e.id}`]) items.push({ ...e, type: "entertainment" }); });
    return items;
  }, [housingList, foodList, marketList, entertainmentList, favorites]);

  return (
    <div style={{ paddingTop: 24 }}>
      <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>❤️ Danh sách đã thích</h1>
      <p style={{ color: SUBTEXT, fontSize: 14, marginBottom: 24 }}>Bạn đã thích {allFavItems.length} mục</p>

      {allFavItems.length === 0 ? (
        <EmptyState text="Chưa có mục nào được thích. Bấm vào biểu tượng ❤️ ở bất kỳ bài viết nào để lưu lại." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {allFavItems.map((item) => {
            if (item.type === "housing") return <PlaceCard key={`fav-h-${item.id}`} item={item} type="housing" favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />;
            if (item.type === "food") return <FoodCard key={`fav-f-${item.id}`} item={item} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />;
            if (item.type === "market") return <ProductCard key={`fav-m-${item.id}`} item={item} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />;
            if (item.type === "entertainment") return <EntCard key={`fav-e-${item.id}`} item={item} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />;
            return null;
          })}
        </div>
      )}
    </div>
  );
}

// --- SAVED VIEW (Bộ sưu tập) ---
function SavedView({ housingList, foodList, marketList, entertainmentList, bookmarks, onToggleBookmark, favorites, onToggleFav, setDetail }) {
  const savedItems = useMemo(() => {
    const items = [];
    housingList.forEach((h) => { if (bookmarks[`housing-${h.id}`]) items.push({ ...h, type: "housing" }); });
    foodList.forEach((f) => { if (bookmarks[`food-${f.id}`]) items.push({ ...f, type: "food" }); });
    marketList.forEach((m) => { if (bookmarks[`market-${m.id}`]) items.push({ ...m, type: "market" }); });
    entertainmentList.forEach((e) => { if (bookmarks[`entertainment-${e.id}`]) items.push({ ...e, type: "entertainment" }); });
    return items;
  }, [housingList, foodList, marketList, entertainmentList, bookmarks]);

  return (
    <div style={{ paddingTop: 24 }}>
      <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>🔖 Bộ sưu tập đã lưu</h1>
      <p style={{ color: SUBTEXT, fontSize: 14, marginBottom: 24 }}>Bạn đã lưu {savedItems.length} bài viết vào bộ sưu tập</p>

      {savedItems.length === 0 ? (
        <EmptyState text="Chưa có bài nào được lưu. Bấm vào biểu tượng 🔖 ở góc trái mỗi bài để lưu vào đây." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {savedItems.map((item) => {
            if (item.type === "housing") return <PlaceCard key={`sv-h-${item.id}`} item={item} type="housing" favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />;
            if (item.type === "food") return <FoodCard key={`sv-f-${item.id}`} item={item} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />;
            if (item.type === "market") return <ProductCard key={`sv-m-${item.id}`} item={item} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />;
            if (item.type === "entertainment") return <EntCard key={`sv-e-${item.id}`} item={item} favorites={favorites} onToggleFav={onToggleFav} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} setDetail={setDetail} />;
            return null;
          })}
        </div>
      )}
    </div>
  );
}

// --- PROFILE VIEW ---
function ProfileView({ currentUser, bookmarks, favorites, housingList, foodList, marketList, entertainmentList, setTab, onLogout, showToast }) {
  const savedCount = useMemo(() => Object.values(bookmarks).filter(Boolean).length, [bookmarks]);
  const likedCount = useMemo(() => Object.values(favorites).filter(Boolean).length, [favorites]);

  const roleColors = {
    "Admin": { bg: "#FFF0C2", color: "#8A5B00", border: "#FFE080" },
    "Sinh viên": { bg: "#E8F2FA", color: "#1A5EA8", border: "#B8D8F0" },
    "Chủ trọ": { bg: "#E6F7F0", color: "#0A6B4A", border: "#A0DFC5" },
    "Người bán": { bg: "#F3EFFF", color: "#5A35B0", border: "#C8B8F0" },
  };
  const rc = roleColors[currentUser.role] || roleColors["Sinh viên"];

  return (
    <div style={{ paddingTop: 32, maxWidth: 720, margin: "0 auto" }}>
      {/* PROFILE HEADER CARD */}
      <div style={{ background: CARD, borderRadius: 20, padding: 32, border: "1px solid #ECE7D8", boxShadow: "0 4px 20px rgba(22,25,46,0.07)", marginBottom: 24, display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* AVATAR */}
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${MARIGOLD}, ${CORAL})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 26, flexShrink: 0, boxShadow: "0 4px 16px rgba(255,193,69,0.4)" }}>
          {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
        </div>

        {/* INFO */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: INK }}>{currentUser.name}</h2>
            <span style={{ background: rc.bg, color: rc.color, border: `1px solid ${rc.border}`, fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
              {currentUser.role}
            </span>
          </div>
          <div style={{ fontSize: 14, color: SUBTEXT, marginBottom: 4 }}>📧 {currentUser.email}</div>
          {currentUser.phone && <div style={{ fontSize: 14, color: SUBTEXT, marginBottom: 12 }}>📱 {currentUser.phone}</div>}
          <div style={{ fontSize: 12, color: SUBTEXT }}>Thành viên từ: {currentUser.createdAt || "20/08/2026"}</div>
        </div>

        {/* LOGOUT */}
        <button onClick={onLogout} className="ul-btn"
          style={{ background: "#FCEBEB", color: "#8B1F1F", border: "1px solid #F7C5C5", padding: "8px 16px", borderRadius: 10, fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          <LogOut size={15} /> Đăng xuất
        </button>
      </div>

      {/* THỐNG KÊ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Bài đã lưu", value: savedCount, icon: Bookmark, color: INK, onClick: () => setTab("saved") },
          { label: "Đã thích", value: likedCount, icon: Heart, color: CORAL, onClick: () => setTab("favorites") },
          { label: "Đánh giá", value: 0, icon: Star, color: MARIGOLD, onClick: null },
        ].map((stat) => (
          <div
            key={stat.label}
            onClick={stat.onClick}
            className={stat.onClick ? "ul-card" : ""}
            style={{ background: CARD, borderRadius: 14, padding: "20px 16px", border: "1px solid #ECE7D8", textAlign: "center", cursor: stat.onClick ? "pointer" : "default" }}
          >
            <stat.icon size={24} color={stat.color} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 28, fontWeight: 800, color: INK, marginBottom: 2 }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: SUBTEXT }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* THÔNG TIN TÀI KHOẢN */}
      <div style={{ background: CARD, borderRadius: 16, border: "1px solid #ECE7D8", overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #ECE7D8", fontWeight: 700, fontSize: 15, color: INK, display: "flex", alignItems: "center", gap: 8 }}>
          <User size={16} color={CORAL} /> Thông tin cá nhân
        </div>
        <div style={{ padding: "16px 20px", display: "grid", gap: 12 }}>
          {[
            { label: "Họ và tên", value: currentUser.name },
            { label: "Email / MSSV", value: currentUser.email },
            { label: "Số điện thoại", value: currentUser.phone || "Chưa cập nhật" },
            { label: "Vai trò", value: currentUser.role },
            { label: "Trạng thái", value: currentUser.status === "Active" ? "✅ Đang hoạt động" : "⛔ Bị khóa" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, paddingBottom: 10, borderBottom: "1px dashed #ECE7D8" }}>
              <span style={{ color: SUBTEXT, fontWeight: 500 }}>{row.label}</span>
              <span style={{ fontWeight: 600, color: INK }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOẠT ĐỘNG NHANH */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <button onClick={() => setTab("saved")} className="ul-btn"
          style={{ background: INK, color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Bookmark size={18} /> Xem bài đã lưu ({savedCount})
        </button>
        <button onClick={() => setTab("favorites")} className="ul-btn"
          style={{ background: CORAL, color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Heart size={18} /> Xem bài đã thích ({likedCount})
        </button>
      </div>
    </div>
  );
}

// --- CONTACT MODAL ---
function ContactModal({ item, onClose, showToast }) {
  const phone = item.phone || "0905.123.456";
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 420, width: "100%", padding: 24, textAlign: "center" }}>
        <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,93,62,0.12)", color: CORAL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <Phone size={24} />
        </div>
        <h3 className="ul-h" style={{ fontSize: 20, margin: "0 0 6px" }}>Liên hệ: {item.name}</h3>
        <p style={{ color: SUBTEXT, fontSize: 13.5, margin: "0 0 20px" }}>Kết nối trực tiếp nhanh chóng</p>

        <div style={{ background: PAPER, padding: 14, borderRadius: 12, marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: SUBTEXT, marginBottom: 4 }}>Số điện thoại / Zalo:</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: CORAL }}>{phone}</div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <button className="ul-btn" onClick={() => showToast(`Đang kết nối cuộc gọi tới: ${phone}`)} style={{ background: INK, color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Phone size={16} /> Gọi điện thoại ngay
          </button>
          <button className="ul-btn" onClick={() => showToast(`Đang mở Zalo kết nối với: ${phone}`)} style={{ background: "#0068FF", color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <MessageCircle size={16} /> Nhắn tin qua Zalo
          </button>
          <button className="ul-btn" onClick={onClose} style={{ background: "transparent", color: SUBTEXT, padding: "8px", fontSize: 13 }}>Đóng cửa sổ</button>
        </div>
      </div>
    </div>
  );
}

// --- NOTIFICATION MODAL ---
function NotificationModal({ onClose }) {
  const notifs = [
    { title: "Ưu đãi sinh viên K24!", desc: "Giảm ngay 20% tại Cafe Học Bài Góc Ký Túc Xá khi xuất trình thẻ sinh viên.", time: "10 phút trước", unread: true },
    { title: "Phòng trọ mới đăng gần bạn", desc: "Chung cư mini Thủ Đức giá 3.2 triệu vừa cập nhật thêm 1 phòng trống tầng 3.", time: "1 giờ trước", unread: true },
    { title: "Hồ sơ đăng ký tài khoản", desc: "Một thành viên vừa gửi yêu cầu mở tài khoản chủ trọ đang chờ Admin duyệt.", time: "2 giờ trước", unread: false }
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 20 }}>
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

// --- CHAT MODAL ---
function ChatModal({ onClose, showToast }) {
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
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 440, width: "100%", height: 500, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", background: INK, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>Hỗ trợ sinh viên UniLife</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Đang trực tuyến</div>
            </div>
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none", color: "#fff" }}><X size={18} /></button>
        </div>

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

// --- EMPTY STATE ---
function EmptyState({ text }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: SUBTEXT, background: CARD, borderRadius: 16, border: "1px dashed #E0DCD0", margin: "20px 0" }}>
      <Search size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
      <div style={{ fontSize: 14.5, fontWeight: 500, maxWidth: 440, margin: "0 auto" }}>{text}</div>
    </div>
  );
}
