import React, { useState } from "react";
import { X, Lock, Mail, User, Phone, ShieldCheck, AlertTriangle, CheckCircle2, LogIn, UserPlus } from "lucide-react";

export default function AuthModal({ isOpen, onClose, users, onRegister, onLoginSuccess, showToast }) {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState("Sinh viên");
  const [regSuccessMsg, setRegSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const user = users.find((u) => u.email.trim().toLowerCase() === loginEmail.trim().toLowerCase());

    if (!user) {
      setLoginError("Không tìm thấy tài khoản với email này trong hệ thống.");
      return;
    }

    if (user.password !== loginPassword) {
      setLoginError("Mật khẩu không chính xác. Vui lòng kiểm tra lại.");
      return;
    }

    // KIỂM TRA PHÊ DUYỆT CỦA ADMIN
    if (user.status === "Pending") {
      setLoginError("⚠️ TÀI KHOẢN CHƯA ĐƯỢC DUYỆT! Tài khoản của bạn đang ở trạng thái chờ Quản trị viên (Admin) xét duyệt. Vui lòng liên hệ Admin hoặc chờ duyệt để truy cập.");
      return;
    }

    if (user.status === "Banned") {
      setLoginError("⛔ Tài khoản này đã bị khóa do vi phạm tiêu chuẩn cộng đồng sinh viên UniLife.");
      return;
    }

    // Đăng nhập thành công
    onLoginSuccess(user);
    showToast(`Xin chào ${user.name} (${user.role})! Đăng nhập thành công.`);
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegSuccessMsg("");

    const exists = users.find((u) => u.email.trim().toLowerCase() === regEmail.trim().toLowerCase());
    if (exists) {
      setLoginError("Email này đã được sử dụng. Vui lòng dùng email khác.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword,
      phone: regPhone || "0900.000.000",
      role: regRole,
      status: "Pending", // Bắt buộc thông qua admin duyệt
      createdAt: "Vừa xong",
      avatar: regName.trim().slice(0, 2).toUpperCase()
    };

    onRegister(newUser);
    setRegSuccessMsg("Đăng ký thành công! Hồ sơ của bạn đã được gửi đến Admin để xét duyệt quyền truy cập theo quy định. Sau khi Admin phê duyệt, bạn mới có thể đăng nhập.");
    showToast("Đã gửi yêu cầu đăng ký tài khoản tới Admin!");
  };

  const quickLogin = (email, password) => {
    setLoginEmail(email);
    setLoginPassword(password);
    setLoginError("");
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 350, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: "#FFFFFF", borderRadius: 18, maxWidth: 460, width: "100%", padding: "28px 24px", boxShadow: "0 20px 45px rgba(0,0,0,0.25)" }}>
        {/* MODAL HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,93,62,0.12)", color: "#FF5D3E", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {mode === "login" ? <LogIn size={20} /> : <UserPlus size={20} />}
            </div>
            <div>
              <h2 className="ul-h" style={{ fontSize: 19, margin: 0, fontWeight: 700 }}>
                {mode === "login" ? "Đăng nhập tài khoản" : "Đăng ký thành viên"}
              </h2>
              <span style={{ fontSize: 12, color: "#6B6A63" }}>Nền tảng sinh viên UniLife</span>
            </div>
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", background: "#F6F4EE", borderRadius: 10, padding: 4, marginBottom: 18 }}>
          <button
            onClick={() => { setMode("login"); setLoginError(""); setRegSuccessMsg(""); }}
            style={{
              flex: 1, padding: "8px", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
              background: mode === "login" ? "#16192E" : "transparent",
              color: mode === "login" ? "#FFFFFF" : "#6B6A63"
            }}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => { setMode("register"); setLoginError(""); setRegSuccessMsg(""); }}
            style={{
              flex: 1, padding: "8px", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
              background: mode === "register" ? "#16192E" : "transparent",
              color: mode === "register" ? "#FFFFFF" : "#6B6A63"
            }}
          >
            Đăng ký tài khoản
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === "login" && (
          <form onSubmit={handleLogin} style={{ display: "grid", gap: 14 }}>
            {loginError && (
              <div style={{ background: "#FCEBEB", border: "1px solid #F7C5C5", padding: "10px 14px", borderRadius: 10, color: "#791F1F", fontSize: 13, lineHeight: 1.45, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 5 }}>Email hoặc MSSV</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Mail size={16} color="#6B6A63" style={{ position: "absolute", left: 12 }} />
                <input
                  required
                  type="email"
                  placeholder="name@student.edu.vn"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: 10, border: "1px solid #E0DCD0", fontSize: 14, outline: "none" }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 5 }}>Mật khẩu</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Lock size={16} color="#6B6A63" style={{ position: "absolute", left: 12 }} />
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

            <button type="submit" className="ul-btn" style={{ background: "#16192E", color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14.5, marginTop: 4 }}>
              Đăng nhập ngay
            </button>

            {/* QUICK TEST ACCOUNTS */}
            <div style={{ borderTop: "1px dashed #E0DCD0", paddingTop: 14, marginTop: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6B6A63", marginBottom: 8 }}>
                ⚡ Tài khoản thử nghiệm nhanh (Demo):
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => quickLogin("admin@unilife.vn", "admin")}
                  className="ul-btn"
                  style={{ background: "#FFE9C2", color: "#8A5B00", padding: "7px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "left" }}
                >
                  🛡️ Admin: Phan Trí Đức
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin("an.student@dau.edu.vn", "123")}
                  className="ul-btn"
                  style={{ background: "#E8F2FA", color: "#266FB5", padding: "7px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "left" }}
                >
                  🎓 Sinh viên (Đã duyệt)
                </button>
              </div>
              <div style={{ marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => quickLogin("mai.k24@dau.edu.vn", "123")}
                  className="ul-btn"
                  style={{ background: "#FCEBEB", color: "#791F1F", padding: "6px 10px", borderRadius: 8, fontSize: 11.5, fontWeight: 600, width: "100%", textAlign: "left" }}
                >
                  ⏳ Test nick đang chờ duyệt: Mai (SV K24)
                </button>
              </div>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === "register" && (
          <form onSubmit={handleRegister} style={{ display: "grid", gap: 12 }}>
            {regSuccessMsg ? (
              <div style={{ background: "#E1F5EE", border: "1px solid #A2E2CD", padding: "14px", borderRadius: 12, color: "#085041", fontSize: 13.5, lineHeight: 1.5, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2, color: "#0E7C66" }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Yêu cầu đăng ký đã được ghi nhận!</div>
                  <span>{regSuccessMsg}</span>
                  <div style={{ marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="ul-btn"
                      style={{ background: "#0E7C66", color: "#fff", padding: "6px 12px", borderRadius: 6, fontSize: 12.5, fontWeight: 600 }}
                    >
                      Quay lại trang Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ background: "#FFF8EA", border: "1px solid #FFE3A8", padding: "8px 12px", borderRadius: 8, fontSize: 12, color: "#8A5B00", display: "flex", gap: 6, alignItems: "center" }}>
                  <ShieldCheck size={16} />
                  <span>Chính sách: Tài khoản sau khi đăng ký cần được <b>Admin phê duyệt</b> trước khi đăng nhập.</span>
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Họ và tên *</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <User size={15} color="#6B6A63" style={{ position: "absolute", left: 12 }} />
                    <input
                      required
                      placeholder="Ví dụ: Nguyễn Văn Nam"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13.5 }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Email / MSSV *</label>
                    <input
                      required
                      type="email"
                      placeholder="mssv@dau.edu.vn"
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

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
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
                    <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Vai trò đăng ký</label>
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13.5, background: "#fff" }}
                    >
                      <option value="Sinh viên">Sinh viên</option>
                      <option value="Chủ trọ">Chủ nhà trọ</option>
                      <option value="Người bán">Người bán đồ cũ</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="ul-btn" style={{ background: "#FF5D3E", color: "#fff", padding: "11px", borderRadius: 10, fontWeight: 700, fontSize: 14, marginTop: 6 }}>
                  Đăng ký ngay
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
