/**
 * UserService - Dịch vụ xử lý tài khoản người dùng, đổi thông tin cá nhân và quản trị
 */

/**
 * Đổi ảnh đại diện cho tài khoản
 * @param {Array} users - Danh sách người dùng
 * @param {number} userId - ID người dùng cần đổi avatar
 * @param {string} newAvatarUrl - Link avatar mới
 * @returns {Array} Danh sách người dùng mới
 */
export function updateUserAvatar(users, userId, newAvatarUrl) {
  return users.map(u => u.id === userId ? { ...u, avatar: newAvatarUrl } : u);
}

/**
 * Khóa hoặc Mở khóa tài khoản người dùng (Admin)
 * @param {Array} users - Danh sách người dùng
 * @param {number} userId - ID tài khoản
 * @returns {Array}
 */
export function toggleUserStatus(users, userId) {
  return users.map(u => {
    if (u.id === userId) {
      const nextStatus = u.status === "Active" ? "Banned" : "Active";
      return { ...u, status: nextStatus };
    }
    return u;
  });
}

/**
 * Xóa tài khoản người dùng (Admin)
 * @param {Array} users - Danh sách người dùng
 * @param {number} userId - ID tài khoản cần xóa
 * @returns {Array}
 */
export function removeUser(users, userId) {
  return users.filter(u => u.id !== userId);
}
