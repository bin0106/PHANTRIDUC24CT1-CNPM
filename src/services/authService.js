/**
 * AuthService - Dịch vụ xử lý đăng nhập, đăng ký và phân quyền người dùng
 */

export const ROLES = {
  ADMIN: "Quản trị viên",
  CUSTOMER: "Khách hàng",
  LANDLORD: "Chủ nhà trọ",
  RESTAURANT: "Chủ quán ăn",
  RESELLER: "Người bán đồ cũ"
};

/**
 * Kiểm tra đăng nhập
 * @param {Array} users - Danh sách người dùng hiện tại
 * @param {string} email - Email đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {{success: boolean, user?: object, message?: string}}
 */
export function loginUser(users, email, password) {
  const trimmedEmail = (email || "").trim().toLowerCase();
  const trimmedPass = (password || "").trim();

  if (!trimmedEmail || !trimmedPass) {
    return { success: false, message: "Vui lòng nhập đầy đủ email và mật khẩu!" };
  }

  const found = users.find(u => u.email.toLowerCase() === trimmedEmail && u.password === trimmedPass);
  if (!found) {
    return { success: false, message: "Email hoặc mật khẩu không chính xác!" };
  }

  if (found.status === "Banned") {
    return { success: false, message: "Tài khoản của bạn đã bị khóa bởi Quản trị viên!" };
  }

  return { success: true, user: found, message: `Chào mừng ${found.name} đăng nhập thành công!` };
}

/**
 * Đăng ký tài khoản mới với vai trò phân loại
 * @param {Array} users - Danh sách người dùng hiện tại
 * @param {object} newUserData - Thông tin tài khoản mới
 * @returns {{success: boolean, newUser?: object, message?: string}}
 */
export function registerUser(users, { name, email, password, phone, role, avatar }) {
  const trimmedEmail = (email || "").trim().toLowerCase();
  const trimmedName = (name || "").trim();
  const trimmedPass = (password || "").trim();

  if (!trimmedName || !trimmedEmail || !trimmedPass) {
    return { success: false, message: "Vui lòng điền họ tên, email và mật khẩu!" };
  }

  if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
    return { success: false, message: "Email này đã được sử dụng, vui lòng chọn email khác!" };
  }

  const newUser = {
    id: Date.now(),
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPass,
    phone: phone || "Chưa cập nhật",
    role: role || ROLES.CUSTOMER,
    status: "Active",
    avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    joined: new Date().toLocaleDateString("vi-VN")
  };

  return { success: true, newUser, message: "Đăng ký tài khoản mới thành công!" };
}

/**
 * Kiểm tra xem người dùng có quyền Quản trị (Admin) hay không
 * @param {object} user - Thông tin người dùng
 * @returns {boolean}
 */
export function isAdmin(user) {
  return user && user.role === ROLES.ADMIN;
}
