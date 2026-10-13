/**
 * PostService - Dịch vụ xử lý đăng bài, lọc dữ liệu và đồng bộ với phpMyAdmin / MySQL
 */

export const POST_STATUS = {
  APPROVED: "approved",
  PENDING: "pending",
  HIDDEN: "hidden"
};

const callApi = async (path, options = {}) => {
  const urls = [`/api/${path}`, `http://localhost/api/${path}`];
  for (const url of urls) {
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Thử URL tiếp theo
    }
  }
  return null;
};

// ======================== HOUSING ========================
export async function fetchHousingFromBackend() {
  const data = await callApi("housing.php");
  return data && data.success && Array.isArray(data.housing) ? data.housing : null;
}

export async function addHousingToBackend(item) {
  return await callApi("housing.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
}

export async function updateHousingStatusInBackend(id, status) {
  return await callApi("housing.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status })
  });
}

export async function deleteHousingFromBackend(id) {
  return await callApi("housing.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
}

// ======================== FOOD ========================
export async function fetchFoodFromBackend() {
  const data = await callApi("food.php");
  return data && data.success && Array.isArray(data.food) ? data.food : null;
}

export async function addFoodToBackend(item) {
  return await callApi("food.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
}

export async function updateFoodStatusInBackend(id, status) {
  return await callApi("food.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status })
  });
}

export async function deleteFoodFromBackend(id) {
  return await callApi("food.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
}

// ======================== MARKETPLACE ========================
export async function fetchMarketFromBackend() {
  const data = await callApi("market.php");
  return data && data.success && Array.isArray(data.market) ? data.market : null;
}

export async function addMarketToBackend(item) {
  return await callApi("market.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
}

export async function updateMarketStatusInBackend(id, status) {
  return await callApi("market.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status })
  });
}

export async function deleteMarketFromBackend(id) {
  return await callApi("market.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
}

// ======================== STUDY ========================
export async function fetchStudyFromBackend() {
  const data = await callApi("study.php");
  return data && data.success && Array.isArray(data.study) ? data.study : null;
}

export async function addStudyToBackend(item) {
  return await callApi("study.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });
}

export async function deleteStudyFromBackend(id) {
  return await callApi("study.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
}

// ======================== LOCAL HELPERS ========================
export function approvePost(list, id) {
  return list.map(item => item.id === id ? { ...item, status: POST_STATUS.APPROVED } : item);
}

export function hidePost(list, id) {
  return list.map(item => item.id === id ? { ...item, status: POST_STATUS.HIDDEN } : item);
}

export function deletePost(list, id) {
  return list.filter(item => item.id !== id);
}

export function getVisiblePosts(list, isUserAdmin = false) {
  if (isUserAdmin) return list;
  return list.filter(item => !item.status || item.status === POST_STATUS.APPROVED);
}
