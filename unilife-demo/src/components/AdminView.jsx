import React, { useState } from "react";
import {
  LayoutDashboard, Users, Building2, Utensils, ShoppingCart, PartyPopper,
  Star, MessageSquareWarning, ShieldCheck, Check, X, Trash2, Plus, Heart,
  Phone, Eye, Sparkles, AlertCircle, UserCheck, UserX
} from "lucide-react";

export default function AdminView({
  users,
  onApproveUser,
  onRejectUser,
  onToggleUserStatus,
  housingList,
  foodList,
  marketList,
  entertainmentList,
  onDeletePlace,
  onOpenAddModal,
  showToast
}) {
  const [activeTab, setActiveTab] = useState("PendingUsers"); // 'PendingUsers', 'AllUsers', 'Housing', 'Food', 'Market', 'Entertainment'

  const pendingUsers = users.filter((u) => u.status === "Pending");
  const activeUsers = users.filter((u) => u.status !== "Pending");

  // Tính tổng số lượng
  const totalLikes = (
    housingList.reduce((acc, h) => acc + (h.likes || 0), 0) +
    foodList.reduce((acc, f) => acc + (f.likes || 0), 0) +
    marketList.reduce((acc, m) => acc + (m.likes || 0), 0) +
    entertainmentList.reduce((acc, e) => acc + (e.likes || 0), 0)
  );

  const totalReviews = (
    housingList.reduce((acc, h) => acc + (h.reviewsList?.length || 0), 0) +
    foodList.reduce((acc, f) => acc + (f.reviewsList?.length || 0), 0) +
    marketList.reduce((acc, m) => acc + (m.reviewsList?.length || 0), 0) +
    entertainmentList.reduce((acc, e) => acc + (e.reviewsList?.length || 0), 0)
  );

  const stats = [
    { label: "Chờ duyệt tài khoản", value: pendingUsers.length, color: "#FF5D3E", alert: pendingUsers.length > 0 },
    { label: "Tổng người dùng", value: users.length, color: "#378ADD" },
    { label: "Phòng trọ hiển thị", value: housingList.length, color: "#FFC145" },
    { label: "Quán ăn sinh viên", value: foodList.length, color: "#FF5D3E" },
    { label: "Sản phẩm chợ cũ", value: marketList.length, color: "#0E7C66" },
    { label: "Tổng lượt thích ❤️", value: totalLikes, color: "#E11D48" },
    { label: "Tổng đánh giá ★", value: totalReviews, color: "#8A5B00" },
  ];

  return (
    <div style={{ paddingTop: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: 220, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, marginBottom: 18, fontSize: 16 }}>
          <LayoutDashboard size={20} color="#FF5D3E" />
          <span>Admin Quản Trị</span>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <button
            onClick={() => setActiveTab("PendingUsers")}
            className="ul-tab ul-btn"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 700,
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: activeTab === "PendingUsers" ? "#16192E" : "transparent",
              color: activeTab === "PendingUsers" ? "#fff" : "#16192E",
              border: activeTab === "PendingUsers" ? "none" : "1px solid #ECE7D8"
            }}
          >
            <span>Duyệt tài khoản mới</span>
            {pendingUsers.length > 0 && (
              <span style={{ background: "#FF5D3E", color: "#fff", padding: "1px 7px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
                {pendingUsers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("AllUsers")}
            className="ul-tab ul-btn"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 600,
              textAlign: "left",
              background: activeTab === "AllUsers" ? "#16192E" : "transparent",
              color: activeTab === "AllUsers" ? "#fff" : "#16192E",
              border: activeTab === "AllUsers" ? "none" : "1px solid #ECE7D8"
            }}
          >
            Danh sách người dùng ({activeUsers.length})
          </button>

          <button
            onClick={() => setActiveTab("Housing")}
            className="ul-tab ul-btn"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 600,
              textAlign: "left",
              background: activeTab === "Housing" ? "#16192E" : "transparent",
              color: activeTab === "Housing" ? "#fff" : "#16192E",
              border: activeTab === "Housing" ? "none" : "1px solid #ECE7D8"
            }}
          >
            Quản lý Phòng trọ ({housingList.length})
          </button>

          <button
            onClick={() => setActiveTab("Food")}
            className="ul-tab ul-btn"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 600,
              textAlign: "left",
              background: activeTab === "Food" ? "#16192E" : "transparent",
              color: activeTab === "Food" ? "#fff" : "#16192E",
              border: activeTab === "Food" ? "none" : "1px solid #ECE7D8"
            }}
          >
            Quản lý Quán ăn ({foodList.length})
          </button>

          <button
            onClick={() => setActiveTab("Market")}
            className="ul-tab ul-btn"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 600,
              textAlign: "left",
              background: activeTab === "Market" ? "#16192E" : "transparent",
              color: activeTab === "Market" ? "#fff" : "#16192E",
              border: activeTab === "Market" ? "none" : "1px solid #ECE7D8"
            }}
          >
            Quản lý Chợ cũ ({marketList.length})
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT */}
      <div style={{ flex: 1, minWidth: 320 }}>
        {/* STATS TILES */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 22 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: s.alert ? "#FFF0F0" : "#FFFFFF",
                border: s.alert ? "2px solid #FF5D3E" : "1px solid #ECE7D8",
                borderRadius: 12,
                padding: 12
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11.5, color: "#6B6A63", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* --- TAB 1: DUYỆT TÀI KHOẢN MỚI --- */}
        {activeTab === "PendingUsers" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #ECE7D8", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #ECE7D8", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAF9F5" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#16192E", display: "flex", alignItems: "center", gap: 8 }}>
                  <ShieldCheck size={18} color="#FF5D3E" />
                  <span>Danh sách tài khoản chờ Admin phê duyệt ({pendingUsers.length})</span>
                </h3>
                <span style={{ fontSize: 12.5, color: "#6B6A63" }}>
                  Người dùng chỉ có thể đăng nhập sau khi Admin xác nhận hợp lệ.
                </span>
              </div>
            </div>

            {pendingUsers.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#6B6A63" }}>
                <Check size={36} color="#0E7C66" style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 15, fontWeight: 700, color: "#16192E" }}>Không có tài khoản nào chờ duyệt!</div>
                <p style={{ fontSize: 13, margin: "4px 0 0" }}>Tất cả các thành viên đăng ký mới đã được xử lý đầy đủ.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                  <thead>
                    <tr style={{ background: "#F6F4EE", textAlign: "left" }}>
                      <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Họ tên</th>
                      <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Email / MSSV</th>
                      <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Vai trò</th>
                      <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Số điện thoại</th>
                      <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Thời gian gửi</th>
                      <th style={{ padding: "10px 16px", color: "#6B6A63", textAlign: "center" }}>Phê duyệt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((u) => (
                      <tr key={u.id} style={{ borderTop: "1px solid #ECE7D8" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 700 }}>{u.name}</td>
                        <td style={{ padding: "12px 16px", color: "#266FB5" }}>{u.email}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ background: "#FFE9C2", color: "#8A5B00", padding: "2px 8px", borderRadius: 999, fontSize: 11.5, fontWeight: 700 }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>{u.phone}</td>
                        <td style={{ padding: "12px 16px", color: "#6B6A63", fontSize: 12.5 }}>{u.createdAt}</td>
                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
                          <div style={{ display: "inline-flex", gap: 6 }}>
                            <button
                              onClick={() => {
                                onApproveUser(u.id);
                                showToast(`Đã phê duyệt tài khoản: ${u.name}! Thành viên này có thể đăng nhập ngay.`);
                              }}
                              className="ul-btn"
                              style={{ background: "#0E7C66", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}
                            >
                              <UserCheck size={14} /> Phê duyệt
                            </button>
                            <button
                              onClick={() => {
                                onRejectUser(u.id);
                                showToast(`Đã từ chối tài khoản: ${u.name}`);
                              }}
                              className="ul-btn"
                              style={{ background: "#FCEBEB", color: "#791F1F", padding: "6px 10px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                            >
                              <UserX size={14} /> Từ chối
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 2: QUẢN LÝ TẤT CẢ NGƯỜI DÙNG --- */}
        {activeTab === "AllUsers" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #ECE7D8", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #ECE7D8", background: "#FAF9F5" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#16192E" }}>
                Danh sách thành viên chính thức ({activeUsers.length})
              </h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: "#F6F4EE", textAlign: "left" }}>
                    <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Họ tên</th>
                    <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Email</th>
                    <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Vai trò</th>
                    <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Trạng thái</th>
                    <th style={{ padding: "10px 16px", color: "#6B6A63" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {activeUsers.map((u) => (
                    <tr key={u.id} style={{ borderTop: "1px solid #ECE7D8" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 700 }}>{u.name}</td>
                      <td style={{ padding: "12px 16px", color: "#6B6A63" }}>{u.email}</td>
                      <td style={{ padding: "12px 16px" }}>{u.role}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          background: u.status === "Active" ? "#E1F5EE" : "#FCEBEB",
                          color: u.status === "Active" ? "#085041" : "#791F1F",
                          padding: "3px 9px",
                          borderRadius: 999,
                          fontSize: 11.5,
                          fontWeight: 700
                        }}>
                          {u.status === "Active" ? "Đang hoạt động" : "Bị tạm khóa"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {u.role !== "Admin" && (
                          <button
                            onClick={() => {
                              onToggleUserStatus(u.id);
                              showToast(`Đã thay đổi trạng thái tài khoản: ${u.name}`);
                            }}
                            className="ul-btn"
                            style={{
                              background: u.status === "Active" ? "#FCEBEB" : "#E1F5EE",
                              color: u.status === "Active" ? "#791F1F" : "#085041",
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600
                            }}
                          >
                            {u.status === "Active" ? "Khóa tài khoản" : "Mở khóa"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: QUẢN LÝ PHÒNG TRỌ (THÊM / XÓA ĐỊA ĐIỂM) --- */}
        {activeTab === "Housing" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #ECE7D8", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #ECE7D8", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAF9F5" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#16192E" }}>
                Danh sách phòng trọ cho thuê ({housingList.length})
              </h3>
              <button
                onClick={() => onOpenAddModal("housing")}
                className="ul-btn"
                style={{ background: "#0E7C66", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}
              >
                <Plus size={15} /> Thêm phòng trọ mới
              </button>
            </div>

            <div style={{ padding: 16, display: "grid", gap: 10 }}>
              {housingList.map((h) => (
                <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #ECE7D8", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 8, overflow: "hidden", background: "#EAE6D9", flexShrink: 0 }}>
                      {h.imageUrl ? (
                        <img src={h.imageUrl} alt={h.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#6B6A63" }}>No Image</div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{h.name}</div>
                      <div style={{ fontSize: 12.5, color: "#6B6A63", display: "flex", gap: 10, marginTop: 2 }}>
                        <span style={{ color: "#FF5D3E", fontWeight: 700 }}>{h.price}</span>
                        <span>· {h.address}</span>
                        <span>· ❤️ {h.likes || 0} thích</span>
                        <span>· ★ {h.reviewsList?.length || 0} đánh giá</span>
                      </div>
                    </div>
                  </div>

                  {/* NÚT BỎ / XÓA NỘI DUNG ĐỊA ĐIỂM */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Xóa phòng trọ "${h.name}" khỏi sàn?`)) {
                        onDeletePlace("housing", h.id);
                        showToast(`Đã xóa phòng trọ: ${h.name}`);
                      }
                    }}
                    className="ul-btn"
                    title="Xóa địa điểm này"
                    style={{ background: "#FCEBEB", color: "#791F1F", padding: "6px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Trash2 size={14} /> Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: QUẢN LÝ QUÁN ĂN (THÊM / XÓA ĐỊA ĐIỂM) --- */}
        {activeTab === "Food" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #ECE7D8", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #ECE7D8", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAF9F5" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#16192E" }}>
                Danh sách quán ăn & cafe sinh viên ({foodList.length})
              </h3>
              <button
                onClick={() => onOpenAddModal("food")}
                className="ul-btn"
                style={{ background: "#0E7C66", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}
              >
                <Plus size={15} /> Thêm quán ăn mới
              </button>
            </div>

            <div style={{ padding: 16, display: "grid", gap: 10 }}>
              {foodList.map((f) => (
                <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #ECE7D8", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 8, overflow: "hidden", background: "#EAE6D9", flexShrink: 0 }}>
                      {f.imageUrl ? (
                        <img src={f.imageUrl} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#6B6A63" }}>No Image</div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{f.name}</div>
                      <div style={{ fontSize: 12.5, color: "#6B6A63", display: "flex", gap: 10, marginTop: 2 }}>
                        <span style={{ color: "#0E7C66", fontWeight: 700 }}>{f.price}</span>
                        <span>· {f.cat}</span>
                        <span>· ❤️ {f.likes || 0} thích</span>
                        <span>· ★ {f.reviewsList?.length || 0} đánh giá</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm(`Xóa quán ăn "${f.name}"?`)) {
                        onDeletePlace("food", f.id);
                        showToast(`Đã xóa quán ăn: ${f.name}`);
                      }
                    }}
                    className="ul-btn"
                    style={{ background: "#FCEBEB", color: "#791F1F", padding: "6px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Trash2 size={14} /> Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 5: QUẢN LÝ CHỢ ĐỒ CŨ (THÊM / XÓA SẢN PHẨM) --- */}
        {activeTab === "Market" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #ECE7D8", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #ECE7D8", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAF9F5" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#16192E" }}>
                Tin đăng chợ đồ cũ sinh viên ({marketList.length})
              </h3>
              <button
                onClick={() => onOpenAddModal("market")}
                className="ul-btn"
                style={{ background: "#0E7C66", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}
              >
                <Plus size={15} /> Đăng sản phẩm mới
              </button>
            </div>

            <div style={{ padding: 16, display: "grid", gap: 10 }}>
              {marketList.map((m) => (
                <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #ECE7D8", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 8, overflow: "hidden", background: "#EAE6D9", flexShrink: 0 }}>
                      {m.imageUrl ? (
                        <img src={m.imageUrl} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#6B6A63" }}>No Image</div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{m.name}</div>
                      <div style={{ fontSize: 12.5, color: "#6B6A63", display: "flex", gap: 10, marginTop: 2 }}>
                        <span style={{ color: "#FF5D3E", fontWeight: 700 }}>{m.price}</span>
                        <span>· Người bán: {m.seller}</span>
                        <span>· ❤️ {m.likes || 0} thích</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm(`Xóa tin đăng "${m.name}"?`)) {
                        onDeletePlace("market", m.id);
                        showToast(`Đã xóa sản phẩm: ${m.name}`);
                      }
                    }}
                    className="ul-btn"
                    style={{ background: "#FCEBEB", color: "#791F1F", padding: "6px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Trash2 size={14} /> Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
