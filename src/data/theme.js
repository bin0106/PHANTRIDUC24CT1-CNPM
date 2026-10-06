import { Home, Utensils, ShoppingBag, PartyPopper, BookOpen } from "lucide-react";

// Bảng màu giao diện chuẩn UniLife (Design System)
export const INK = "#16192E";
export const PAPER = "#F6F4EE";
export const MARIGOLD = "#FFC145";
export const CORAL = "#FF5D3E";
export const TEAL = "#0E7C66";
export const CARD = "#FFFFFF";
export const SUBTEXT = "#6B6A63";

export const rotations = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

// Danh mục tiện ích chính
export const categories = [
  { id: "housing", label: "Phòng trọ", icon: Home, color: MARIGOLD, desc: "Tìm trọ & bạn ở ghép" },
  { id: "food", label: "Ăn uống", icon: Utensils, color: CORAL, desc: "Quán ngon giá sinh viên" },
  { id: "market", label: "Mua bán cũ", icon: ShoppingBag, color: TEAL, desc: "Trao đổi sách vở & đồ dùng" },
  { id: "entertainment", label: "Vui chơi", icon: PartyPopper, color: "#7F77DD", desc: "Tụ điểm giải trí quanh trường" },
  { id: "study", label: "Góc học tập", icon: BookOpen, color: "#378ADD", desc: "Tài liệu & nhóm học tập" },
];

export const VALID_TABS = ["home", "housing", "food", "market", "entertainment", "study", "favorites", "admin", "profile"];

export const TAB_TITLES = {
  home: "Trang chủ",
  housing: "Phòng trọ",
  food: "Ăn uống",
  market: "Chợ đồ cũ",
  entertainment: "Vui chơi",
  study: "Góc học tập",
  favorites: "Yêu thích",
  admin: "Quản trị",
  profile: "Trang cá nhân"
};

export const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
];
