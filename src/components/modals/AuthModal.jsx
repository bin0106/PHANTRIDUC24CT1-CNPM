import React, { useState } from "react";
import { X, LogIn, UserPlus, Mail, Lock, User, AlertCircle } from "lucide-react";
import { CARD, PAPER, INK, CORAL, TEAL, SUBTEXT, PRESET_AVATARS } from "../../data/theme";

export function AuthModal({ isOpen, onClose, users, onRegister, onLoginSuccess, showToast }) {
  const [mode, setMode] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState("Khách hàng");

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const user = users.find((u) => u.email.trim().toLowerCase() === loginEmail.trim().toLowerCase());

    if (!user) {
      setLoginError("Không tìm thấy tài khoản với email này trên hệ thống.");
      return;
    }

    if (user.password !== loginPassword) {
      setLoginError("Mật khẩu không chính xác. Vui lòng kiểm tra lại.");
      return;
    }

    if (user.status === "Banned") {
      setLoginError("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ ban quản trị.");
      return;
    }

    onLoginSuccess(user);
    showToast(`Chào mừng ${user.name}! Đăng nhập thành công (${user.role}).`);
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoginError("");

    const exists = users.find((u) => u.email.trim().toLowerCase() === regEmail.trim().toLowerCase());
    if (exists) {
      setLoginError("Email này đã được sử dụng. Vui lòng chọn email khác.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword,
      phone: regPhone || "0900.000.000",
      role: regRole,
      status: "Active",
      avatar: PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)],
      joined: new Date().toLocaleDateString("vi-VN")
    };

    onRegister(newUser);
    onLoginSuccess(newUser);
    showToast(`Đăng ký thành công! Chào mừng ${newUser.name} (${newUser.role}).`);
    onClose();
  };

  const quickFill = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setLoginError("");
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 350, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 18, maxWidth: 440, width: "100%", padding: "26px 24px", boxShadow: "0 20px 45px rgba(0,0,0,0.25)" }}>
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,93,62,0.12)", color: CORAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {mode === "login" ? <LogIn size={20} /> : <UserPlus size={20} />}
            </div>
            <div>
              <h2 className="ul-h" style={{ fontSize: 18, margin: 0, fontWeight: 700 }}>
                {mode === "login" ? "Đăng nhập tài khoản" : "Đăng ký tài khoản mới"}
              </h2>
              <span style={{ fontSize: 12, color: SUBTEXT }}>Nền tảng sinh viên UniLife</span>
            </div>
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        {/* TABS CHỌN ĐĂNG NHẬP / ĐĂNG KÝ */}
        <div style={{ display: "flex", background: PAPER, borderRadius: 10, padding: 4, marginBottom: 18 }}>
          <button
            onClick={() => { setMode("login"); setLoginError(""); }}
            style={{
              flex: 1, padding: "8px", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
              background: mode === "login" ? INK : "transparent",
              color: mode === "login" ? "#fff" : SUBTEXT
            }}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => { setMode("register"); setLoginError(""); }}
            style={{
              flex: 1, padding: "8px", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
              background: mode === "register" ? INK : "transparent",
              color: mode === "register" ? "#fff" : SUBTEXT
            }}
          >
            Đăng ký tài khoản
          </button>
        </div>

        {/* FORM ĐĂNG NHẬP */}
        {mode === "login" && (
          <form onSubmit={handleLogin} style={{ display: "grid", gap: 13 }}>
            {loginError && (
              <div style={{ background: "#FCEBEB", border: "1px solid #F7C5C5", padding: "10px 14px", borderRadius: 10, color: "#791F1F", fontSize: 13, display: "flex", gap: 8, alignItems: "center" }}>
                <AlertCircle size={17} style={{ flexShrink: 0 }} />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 5 }}>Email tài khoản</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Mail size={16} color={SUBTEXT} style={{ position: "absolute", left: 12 }} />
                <input
                  required
                  type="email"
                  placeholder="name@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: 10, border: "1px solid #E0DCD0", fontSize: 14, outline: "none" }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 5 }}>Mật khẩu</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Lock size={16} color={SUBTEXT} style={{ position: "absolute", left: 12 }} />
                <input
                  required
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: 10, border: "1px solid #E0DCD0", fontSize: 14, outline: "none" }}
                />
              </div>
            </div>

            <button type="submit" className="ul-btn" style={{ background: INK, color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14.5, marginTop: 4 }}>
              Đăng nhập ngay
            </button>

            {/* TÀI KHOẢN MẪU ĐỂ TEST */}
            <div style={{ borderTop: "1px dashed #E0DCD0", paddingTop: 14, marginTop: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: SUBTEXT, marginBottom: 8 }}>
                ⚡ Tài khoản có sẵn để trải nghiệm:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => quickFill("khachhang@gmail.com", "123456")}
                  className="ul-btn"
                  style={{ background: "#E8F2FA", color: "#266FB5", padding: "8px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "left" }}
                >
                  👤 Khách hàng (User)
                </button>
                <button
                  type="button"
                  onClick={() => quickFill("admin@unilife.vn", "admin123")}
                  className="ul-btn"
                  style={{ background: "#FFE9C2", color: "#8A5B00", padding: "8px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "left" }}
                >
                  🛡️ Quản trị viên (Admin)
                </button>
              </div>
            </div>
          </form>
        )}

        {/* FORM ĐĂNG KÝ */}
        {mode === "register" && (
          <form onSubmit={handleRegister} style={{ display: "grid", gap: 12 }}>
            <div style={{ background: "rgba(14,124,102,0.08)", border: "1px solid rgba(14,124,102,0.2)", padding: "8px 12px", borderRadius: 8, fontSize: 12, color: TEAL }}>
              ℹ️ Đăng ký tài khoản để trải nghiệm toàn bộ tính năng tìm trọ, quán ăn, đăng tin thanh lý và lưu yêu thích.
            </div>

            {loginError && (
              <div style={{ background: "#FCEBEB", border: "1px solid #F7C5C5", padding: "8px 12px", borderRadius: 8, color: "#791F1F", fontSize: 12.5 }}>
                {loginError}
              </div>
            )}

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Họ và tên *</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <User size={15} color={SUBTEXT} style={{ position: "absolute", left: 12 }} />
                <input
                  required
                  placeholder="Ví dụ: Nguyễn Văn Khang"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13.5 }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Email đăng ký *</label>
                <input
                  required
                  type="email"
                  placeholder="email@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13.5 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Số điện thoại</label>
                <input
                  placeholder="09xx.xxx.xxx"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13.5 }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Mật khẩu *</label>
              <input
                required
                type="password"
                placeholder="Tối thiểu 6 ký tự"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13.5 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
                Chọn loại tài khoản đăng ký: *
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { id: "Khách hàng", label: "🎓 Khách hàng / Sinh viên", desc: "Tìm trọ, ăn uống, mua sắm" },
                  { id: "Chủ nhà trọ", label: "🏠 Chủ nhà trọ", desc: "Đăng tin cho thuê phòng" },
                  { id: "Chủ quán ăn", label: "🍜 Chủ quán ăn", desc: "Quảng bá quán ăn ngon" },
                  { id: "Người bán đồ cũ", label: "📦 Người bán đồ cũ", desc: "Thanh lý sách, đồ dùng" },
                ].map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setRegRole(r.id)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: regRole === r.id ? `2px solid ${CORAL}` : "1px solid #E0DCD0",
                      background: regRole === r.id ? "rgba(255,93,62,0.06)" : CARD,
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: regRole === r.id ? CORAL : INK }}>
                      {r.label}
                    </div>
                    <div style={{ fontSize: 10.5, color: SUBTEXT, marginTop: 2 }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="ul-btn" style={{ background: CORAL, color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14, marginTop: 4 }}>
              Đăng ký tài khoản ({regRole})
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
