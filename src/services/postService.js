/**
 * PostService - Dịch vụ xử lý đăng bài, lọc dữ liệu và kiểm duyệt nội dung của Admin
 */

export const POST_STATUS = {
  APPROVED: "approved",
  PENDING: "pending",
  HIDDEN: "hidden"
};

/**
 * Duyệt bài viết (Admin)
 * @param {Array} list - Danh sách bài viết
 * @param {number|string} id - ID bài viết
 * @returns {Array}
 */
export function approvePost(list, id) {
  return list.map(item => item.id === id ? { ...item, status: POST_STATUS.APPROVED } : item);
}

/**
 * Ẩn bài viết khỏi trang công khai (Admin)
 * @param {Array} list - Danh sách bài viết
 * @param {number|string} id - ID bài viết
 * @returns {Array}
 */
export function hidePost(list, id) {
  return list.map(item => item.id === id ? { ...item, status: POST_STATUS.HIDDEN } : item);
}

/**
 * Xóa vĩnh viễn bài viết (Admin hoặc Chủ bài)
 * @param {Array} list - Danh sách bài viết
 * @param {number|string} id - ID bài viết
 * @returns {Array}
 */
export function deletePost(list, id) {
  return list.filter(item => item.id !== id);
}

/**
 * Lọc danh sách bài hiển thị cho khách hàng (chỉ hiện bài đã được approved)
 * @param {Array} list - Toàn bộ danh sách bài viết
 * @param {boolean} isUserAdmin - Người dùng có phải là Admin không
 * @returns {Array}
 */
export function getVisiblePosts(list, isUserAdmin = false) {
  if (isUserAdmin) return list;
  return list.filter(item => !item.status || item.status === POST_STATUS.APPROVED);
}
