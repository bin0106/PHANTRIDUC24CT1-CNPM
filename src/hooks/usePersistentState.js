import { useState, useEffect } from "react";

/**
 * Custom Hook: usePersistentState
 * Tự động đồng bộ và lưu trữ state vào LocalStorage của trình duyệt.
 * Giúp dữ liệu không bị mất khi người dùng bấm F5 reload trang.
 *
 * @param {string} key - Khóa định danh trong LocalStorage
 * @param {*} initial - Giá trị mặc định ban đầu
 * @returns {[*, Function]} - [value, setValue]
 */
export function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Bỏ qua nếu bộ nhớ đầy hoặc bảo mật trình duyệt chặn */
    }
  }, [key, value]);

  return [value, setValue];
}
