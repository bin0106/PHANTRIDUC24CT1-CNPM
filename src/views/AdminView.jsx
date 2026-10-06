import React, { useState, useMemo } from "react";
import { LayoutDashboard, Users, Building2, Utensils, ShoppingCart, PartyPopper, Star, MessageSquareWarning, ShieldCheck, Search, Trash2, CheckCircle2 } from "lucide-react";
import { CARD, PAPER, INK, CORAL, TEAL, MARIGOLD, SUBTEXT, PRESET_AVATARS } from "../data/theme";
import { Badge } from "../components/common/Badge";

const adminStats = [
  { label: "Người dùng đăng ký", value: "2,481", icon: Users, color: "#378ADD" },
  { label: "Phòng trọ cho thuê", value: "312", icon: Building2, color: MARIGOLD },
  { label: "Quán ăn sinh viên", value: "578", icon: Utensils, color: CORAL },
  { label: "Sản phẩm chợ cũ", value: "1,096", icon: ShoppingCart, color: TEAL },
  { label: "Địa điểm vui chơi", value: "204", icon: PartyPopper, color: "#7F77DD" },
  { label: "Đánh giá xác thực", value: "6,730", icon: Star, color: "#BA7517" },
  { label: "Báo cáo vi phạm", value: "14", icon: MessageSquareWarning, color: "#D85A30" },
];

const adminMenu = ["Users", "Housing", "Food", "Marketplace", "Reports"];

export function AdminView({ users, setUsers, currentUser, housingList, setHousingList, foodList, setFoodList, marketList, setMarketList, showToast }) {
  const [active, setActive] = useState("Users");
  const [userSearch, setUserSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const activeCount = users.filter((u) => u.status === "Active").length;
  const bannedCount = users.filter((u) => u.status === "Banned").length;

  const toggleHousingStatus = (id) => {
    setHousingList(housingList.map((h) => {
      if (h.id === id) {
        const nextStatus = h.status === "hidden" ? "approved" : "hidden";
        showToast(nextStatus === "approved" ? `Đã duyệt hiển thị bài phòng trọ "${h.name}"! ✅` : `Đã ẩn bài phòng trọ "${h.name}"! 🔒`);
        return { ...h, status: nextStatus };
      }
      return h;
    }));
  };

  const deleteHousingPost = (id) => {
    const item = housingList.find((h) => h.id === id);
    if (!item) return;
    if (!window.confirm(`Bạn có chắc chắn muốn XÓA VĨNH VIỄN bài đăng phòng trọ "${item.name}"?`)) return;
    setHousingList(housingList.filter((h) => h.id !== id));
    showToast(`Đã xóa bài đăng phòng trọ "${item.name}"! 🗑️`);
  };

  const toggleMarketStatus = (id) => {
    setMarketList(marketList.map((m) => {
      if (m.id === id) {
        const nextStatus = m.status === "hidden" ? "approved" : "hidden";
        showToast(nextStatus === "approved" ? `Đã duyệt tin chợ đồ cũ "${m.name}"! ✅` : `Đã ẩn tin đăng "${m.name}"! 🔒`);
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const deleteMarketPost = (id) => {
    const item = marketList.find((m) => m.id === id);
    if (!item) return;
    if (!window.confirm(`Bạn có chắc chắn muốn XÓA VĨNH VIỄN sản phẩm "${item.name}" khỏi chợ?`)) return;
    setMarketList(marketList.filter((m) => m.id !== id));
    showToast(`Đã xóa sản phẩm "${item.name}"! 🗑️`);
  };

  const toggleFoodStatus = (id) => {
    setFoodList(foodList.map((f) => {
      if (f.id === id) {
        const nextStatus = f.status === "hidden" ? "approved" : "hidden";
        showToast(nextStatus === "approved" ? `Đã duyệt hiển thị quán "${f.name}"! ✅` : `Đã ẩn quán "${f.name}"! 🔒`);
        return { ...f, status: nextStatus };
      }
      return f;
    }));
  };

  const deleteFoodPost = (id) => {
    const item = foodList.find((f) => f.id === id);
    if (!item) return;
    if (!window.confirm(`Bạn có chắc chắn muốn XÓA VĨNH VIỄN quán ăn "${item.name}"?`)) return;
    setFoodList(foodList.filter((f) => f.id !== id));
    showToast(`Đã xóa quán ăn "${item.name}"! 🗑️`);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (statusFilter === "Active" && u.status !== "Active") return false;
      if (statusFilter === "Banned" && u.status !== "Banned") return false;
      if (userSearch) {
        const q = userSearch.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.phone && u.phone.includes(q))
        );
      }
      return true;
    });
  }, [users, statusFilter, userSearch]);

  const toggleUserStatus = (id) => {
    const target = users.find((u) => u.id === id);
    if (!target) return;
    if (target.id === currentUser?.id) {
      showToast("Bạn không thể tự khóa tài khoản Admin đang sử dụng!");
      return;
    }
    const newStatus = target.status === "Active" ? "Banned" : "Active";
    setUsers(users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
    showToast(`Đã ${newStatus === "Banned" ? "khóa" : "mở khóa"} tài khoản "${target.name}"!`);
  };

  const handleDeleteUser = (id) => {
    const target = users.find((u) => u.id === id);
    if (!target) return;
    if (target.id === currentUser?.id) {
      showToast("Bạn không thể tự xóa tài khoản Admin đang sử dụng!");
      return;
    }
    if (!window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản "${target.name}" (${target.email}) khỏi hệ thống?`)) return;
    setUsers(users.filter((u) => u.id !== id));
    showToast(`Đã xóa vĩnh viễn tài khoản "${target.name}"! 🗑️`);
  };

  return (
    <div style={{ paddingTop: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      <aside style={{ width: 200, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, marginBottom: 18, fontSize: 16 }}>
          <LayoutDashboard size={20} color={CORAL} /> Admin Control
        </div>
        {adminMenu.map((m) => (
          <div
            key={m}
            onClick={() => setActive(m)}
            className="ul-tab"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 6,
              background: active === m ? INK : "transparent",
              color: active === m ? "#fff" : INK
            }}
          >
            Quản lý {m}
          </div>
        ))}
      </aside>

      <div style={{ flex: 1, minWidth: 320 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h1 className="ul-h" style={{ fontSize: 24, margin: 0 }}>Bảng điều khiển hệ thống</h1>
          <Badge bg="rgba(14,124,102,0.15)" color={TEAL}>Hệ thống vận hành bình thường 100%</Badge>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 28 }}>
          {adminStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ background: CARD, border: "1px solid #ECE7D8", borderRadius: 12, padding: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color + "22", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <Icon size={16} color={s.color} />
                </div>
                <div style={{ fontSize: 19, fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: SUBTEXT }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* ACTIVE TABLE */}
        <div style={{ background: CARD, border: "1px solid #ECE7D8", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #ECE7D8", fontWeight: 700, fontSize: 14.5, display: "flex", alignItems: "center", gap: 8 }}>
            <ShieldCheck size={18} color={TEAL} /> Dữ liệu {active}
          </div>

          {active === "Users" && (
            <div style={{ padding: 18 }}>
              {/* FILTER & SEARCH BAR */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { id: "all", label: `Tất cả (${users.length})` },
                    { id: "Active", label: `🟢 Hoạt động (${activeCount})` },
                    { id: "Banned", label: `🔴 Bị khóa (${bannedCount})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setStatusFilter(f.id)}
                      className="ul-btn"
                      style={{
                        padding: "6px 14px",
                        borderRadius: 20,
                        fontSize: 12.5,
                        fontWeight: 600,
                        background: statusFilter === f.id ? INK : "rgba(0,0,0,0.05)",
                        color: statusFilter === f.id ? "#fff" : INK,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <div style={{ position: "relative", minWidth: 240 }}>
                  <Search size={14} color={SUBTEXT} style={{ position: "absolute", left: 12, top: 10 }} />
                  <input
                    type="text"
                    placeholder="Tìm tên, email, số điện thoại..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    style={{
                      padding: "7px 12px 7px 34px",
                      borderRadius: 18,
                      border: "1px solid #E0DCD0",
                      fontSize: 12.5,
                      outline: "none",
                      width: "100%",
                      background: PAPER
                    }}
                  />
                </div>
              </div>

              {/* TABLE */}
              <div style={{ overflowX: "auto", border: "1px solid #ECE7D8", borderRadius: 10 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                  <thead>
                    <tr style={{ background: PAPER, textAlign: "left" }}>
                      <th style={{ padding: "10px 14px", fontWeight: 600, color: SUBTEXT }}>Tài khoản</th>
                      <th style={{ padding: "10px 14px", fontWeight: 600, color: SUBTEXT }}>Liên hệ</th>
                      <th style={{ padding: "10px 14px", fontWeight: 600, color: SUBTEXT }}>Vai trò</th>
                      <th style={{ padding: "10px 14px", fontWeight: 600, color: SUBTEXT }}>Trạng thái</th>
                      <th style={{ padding: "10px 14px", fontWeight: 600, color: SUBTEXT, textAlign: "center" }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: 32, textAlign: "center", color: SUBTEXT }}>
                          Không tìm thấy tài khoản nào khớp với bộ lọc tìm kiếm.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((r) => (
                        <tr key={r.id} style={{ borderTop: "1px solid #ECE7D8" }}>
                          <td style={{ padding: "12px 14px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <img
                                src={r.avatar || PRESET_AVATARS[0]}
                                alt={r.name}
                                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1px solid #E0DCD0" }}
                                onError={(e) => { e.target.src = PRESET_AVATARS[0]; }}
                              />
                              <div>
                                <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                                  <span>{r.name}</span>
                                  {r.id === currentUser?.id && (
                                    <span style={{ fontSize: 10, background: MARIGOLD, color: INK, padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>
                                      Bạn
                                    </span>
                                  )}
                                </div>
                                <div style={{ fontSize: 11.5, color: SUBTEXT }}>
                                  ID: #{r.id} {r.joined ? `· Ngày tạo: ${r.joined}` : ""}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <div style={{ color: INK, fontWeight: 500 }}>{r.email}</div>
                            <div style={{ fontSize: 12, color: SUBTEXT }}>{r.phone || "Chưa có SĐT"}</div>
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <span style={{
                              fontSize: 12,
                              fontWeight: 700,
                              background: r.role === "Quản trị viên" ? "#FFE9C2" : "#E1F5EE",
                              color: r.role === "Quản trị viên" ? "#8A5B00" : "#085041",
                              padding: "3px 9px",
                              borderRadius: 6,
                            }}>
                              {r.role}
                            </span>
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <Badge bg={r.status === "Active" ? "#E1F5EE" : "#FCEBEB"} color={r.status === "Active" ? "#085041" : "#791F1F"}>
                              {r.status === "Active" ? "🟢 Hoạt động" : "🔴 Bị khóa"}
                            </Badge>
                          </td>
                          <td style={{ padding: "12px 14px", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                              <button
                                className="ul-btn"
                                onClick={() => toggleUserStatus(r.id)}
                                title={r.status === "Active" ? "Khóa tài khoản này" : "Mở khóa tài khoản"}
                                disabled={r.id === currentUser?.id}
                                style={{
                                  background: r.status === "Active" ? "#FCEBEB" : "#E1F5EE",
                                  color: r.status === "Active" ? "#791F1F" : "#085041",
                                  border: "none",
                                  padding: "5px 12px",
                                  borderRadius: 6,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  opacity: r.id === currentUser?.id ? 0.4 : 1,
                                  cursor: r.id === currentUser?.id ? "not-allowed" : "pointer"
                                }}
                              >
                                {r.status === "Active" ? "Khóa acc" : "Mở khóa"}
                              </button>
                              <button
                                className="ul-btn"
                                onClick={() => handleDeleteUser(r.id)}
                                title={r.id === currentUser?.id ? "Không thể xóa tài khoản của chính mình" : "Xóa vĩnh viễn tài khoản"}
                                disabled={r.id === currentUser?.id}
                                style={{
                                  background: "rgba(224,90,71,0.12)",
                                  color: CORAL,
                                  border: "none",
                                  padding: "5px 9px",
                                  borderRadius: 6,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  opacity: r.id === currentUser?.id ? 0.4 : 1,
                                  cursor: r.id === currentUser?.id ? "not-allowed" : "pointer"
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "Housing" && (
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  Kiểm duyệt bài đăng Phòng trọ ({housingList.length} tin)
                </div>
                <div style={{ fontSize: 12, color: SUBTEXT }}>
                  Admin có quyền duyệt hiển thị, tạm ẩn hoặc xóa bài vi phạm.
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {housingList.map((h) => (
                  <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: PAPER, borderRadius: 12, border: "1px solid #ECE7D8", gap: 14, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 240 }}>
                      <img
                        src={h.img || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=150&q=80"}
                        alt={h.name}
                        style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{h.name}</div>
                        <div style={{ fontSize: 12, color: SUBTEXT }}>{h.price} · {h.address}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Badge bg={h.status === "hidden" ? "#FCEBEB" : "#E1F5EE"} color={h.status === "hidden" ? "#791F1F" : "#085041"}>
                        {h.status === "hidden" ? "🔴 Đã ẩn / Khóa" : "🟢 Đã duyệt (Hiển thị)"}
                      </Badge>
                      <button
                        className="ul-btn"
                        onClick={() => toggleHousingStatus(h.id)}
                        style={{
                          background: h.status === "hidden" ? "#E1F5EE" : "rgba(0,0,0,0.06)",
                          color: h.status === "hidden" ? "#085041" : INK,
                          padding: "6px 12px",
                          borderRadius: 8,
                          fontSize: 12.5,
                          fontWeight: 600,
                          border: "none"
                        }}
                      >
                        {h.status === "hidden" ? "Duyệt hiển thị" : "Tạm ẩn bài"}
                      </button>
                      <button
                        className="ul-btn"
                        onClick={() => deleteHousingPost(h.id)}
                        title="Xóa vĩnh viễn bài đăng phòng trọ này"
                        style={{
                          background: "rgba(224,90,71,0.12)",
                          color: CORAL,
                          padding: "6px 10px",
                          borderRadius: 8,
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "Marketplace" && (
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  Kiểm duyệt tin đăng Chợ đồ cũ ({marketList.length} tin)
                </div>
                <div style={{ fontSize: 12, color: SUBTEXT }}>
                  Kiểm tra tin đăng bán sách vở, giáo trình, thiết bị sinh viên.
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {marketList.map((m) => (
                  <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: PAPER, borderRadius: 12, border: "1px solid #ECE7D8", gap: 14, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 240 }}>
                      <img
                        src={m.img || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=150&q=80"}
                        alt={m.name}
                        style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: SUBTEXT }}>
                          {m.price} · Người đăng: <b>{m.seller}</b> ({m.phone})
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Badge bg={m.status === "hidden" ? "#FCEBEB" : "#E8F2FA"} color={m.status === "hidden" ? "#791F1F" : "#266FB5"}>
                        {m.status === "hidden" ? "🔴 Đã ẩn / Khóa" : "🟢 Đã duyệt (Hiển thị)"}
                      </Badge>
                      <button
                        className="ul-btn"
                        onClick={() => toggleMarketStatus(m.id)}
                        style={{
                          background: m.status === "hidden" ? "#E8F2FA" : "rgba(0,0,0,0.06)",
                          color: m.status === "hidden" ? "#266FB5" : INK,
                          padding: "6px 12px",
                          borderRadius: 8,
                          fontSize: 12.5,
                          fontWeight: 600,
                          border: "none"
                        }}
                      >
                        {m.status === "hidden" ? "Duyệt hiển thị" : "Tạm ẩn bài"}
                      </button>
                      <button
                        className="ul-btn"
                        onClick={() => deleteMarketPost(m.id)}
                        title="Xóa vĩnh viễn tin đăng này khỏi chợ"
                        style={{
                          background: "rgba(224,90,71,0.12)",
                          color: CORAL,
                          padding: "6px 10px",
                          borderRadius: 8,
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "Food" && (
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  Kiểm duyệt Quán ăn sinh viên ({foodList.length} quán)
                </div>
                <div style={{ fontSize: 12, color: SUBTEXT }}>
                  Duyệt hoặc loại bỏ quán ăn không đạt chuẩn vệ sinh an toàn.
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {foodList.map((f) => (
                  <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: PAPER, borderRadius: 12, border: "1px solid #ECE7D8", gap: 14, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 240 }}>
                      <img
                        src={f.img || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80"}
                        alt={f.name}
                        style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{f.name}</div>
                        <div style={{ fontSize: 12, color: SUBTEXT }}>{f.cat} · {f.price} · {f.address}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Badge bg={f.status === "hidden" ? "#FCEBEB" : "#FFF0D4"} color={f.status === "hidden" ? "#791F1F" : "#8A5B00"}>
                        {f.status === "hidden" ? "🔴 Đã ẩn / Tắt" : "🟢 Đã duyệt"}
                      </Badge>
                      <button
                        className="ul-btn"
                        onClick={() => toggleFoodStatus(f.id)}
                        style={{
                          background: f.status === "hidden" ? "#FFF0D4" : "rgba(0,0,0,0.06)",
                          color: f.status === "hidden" ? "#8A5B00" : INK,
                          padding: "6px 12px",
                          borderRadius: 8,
                          fontSize: 12.5,
                          fontWeight: 600,
                          border: "none"
                        }}
                      >
                        {f.status === "hidden" ? "Duyệt hiển thị" : "Tạm ẩn quán"}
                      </button>
                      <button
                        className="ul-btn"
                        onClick={() => deleteFoodPost(f.id)}
                        title="Xóa vĩnh viễn quán ăn này khỏi hệ thống"
                        style={{
                          background: "rgba(224,90,71,0.12)",
                          color: CORAL,
                          padding: "6px 10px",
                          borderRadius: 8,
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "Reports" && (
            <div style={{ padding: 20, textAlign: "center", color: SUBTEXT }}>
              <CheckCircle2 size={32} color={TEAL} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>Không có báo cáo vi phạm tồn đọng!</div>
              <p style={{ fontSize: 13, margin: "4px 0 0" }}>Tất cả các tin đăng đều tuân thủ đúng quy chế bảo vệ sinh viên của UniLife.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
