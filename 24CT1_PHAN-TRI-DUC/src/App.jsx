import React, { useState, useMemo } from "react";
import {
  Home, Search, Bell, MessageCircle, Heart, Star, MapPin, X,
  Wifi, Fan, WashingMachine, Bike, Filter, ChevronLeft, ChevronRight,
  Gamepad2, Mic2, CircleDot, Utensils, ShoppingBag, PartyPopper,
  BookOpen, LayoutDashboard, Users, Building2, ShoppingCart,
  MessageSquareWarning, ShieldCheck, TrendingUp, Plus, Clock, Phone,
  ArrowRight, Sparkles, Send, CheckCircle2, Bookmark, ExternalLink,
  SlidersHorizontal, Coffee, FileText, Share2, AlertCircle, Info
} from "lucide-react";
import "./App.css";

// Bảng màu thiết kế UniLife
const INK = "#16192E";
const PAPER = "#F6F4EE";
const MARIGOLD = "#FFC145";
const CORAL = "#FF5D3E";
const TEAL = "#0E7C66";
const CARD = "#FFFFFF";
const SUBTEXT = "#6B6A63";

const rotations = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

const categories = [
  { id: "housing", label: "Phòng trọ", icon: Home, color: MARIGOLD, desc: "Tìm trọ & bạn ở ghép" },
  { id: "food", label: "Ăn uống", icon: Utensils, color: CORAL, desc: "Quán ngon giá sinh viên" },
  { id: "market", label: "Mua bán cũ", icon: ShoppingBag, color: TEAL, desc: "Trao đổi sách vở & đồ dùng" },
  { id: "entertainment", label: "Vui chơi", icon: PartyPopper, color: "#7F77DD", desc: "Tụ điểm giải trí quanh trường" },
  { id: "study", label: "Góc học tập", icon: BookOpen, color: "#378ADD", desc: "Tài liệu & nhóm học tập" },
];

const initialHousing = [
  {
    id: 1,
    name: "Phòng trọ Xanh - gần ĐH Bách Khoa & Kiến Trúc",
    price: "1.8 triệu",
    priceNum: 1.8,
    area: "20m²",
    address: "Khu vực cổng phụ ĐH Bách Khoa, TP.HCM",
    distance: "350m",
    rating: 4.8,
    reviews: 36,
    ac: true,
    washer: false,
    wifi: true,
    parking: true,
    phone: "0905.123.456",
    host: "Cô Tư Quản Trọ",
    desc: "Phòng mới sơn sửa, giờ giấc tự do, có gác lửng đúc chắc chắn, khu an ninh cao cho sinh viên.",
    img: "room1"
  },
  {
    id: 2,
    name: "Chung cư mini Full nội thất - Giờ tự do",
    price: "3.2 triệu",
    priceNum: 3.2,
    area: "28m²",
    address: "Đường số 8, Phường Linh Trung, TP. Thủ Đức",
    distance: "800m",
    rating: 4.9,
    reviews: 58,
    ac: true,
    washer: true,
    wifi: true,
    parking: true,
    phone: "0912.345.678",
    host: "Anh Hoàng BQL",
    desc: "Căn hộ mini cao cấp có khóa vân tay, camera 24/7, máy giặt riêng từng phòng, ban công thoáng gió.",
    img: "room2"
  },
  {
    id: 3,
    name: "Phòng trọ giá rẻ sinh viên năm nhất",
    price: "1.3 triệu",
    priceNum: 1.3,
    area: "16m²",
    address: "Hẻm 120 Trần Bình Trọng, Q.5, TP.HCM",
    distance: "250m",
    rating: 4.3,
    reviews: 21,
    ac: false,
    washer: false,
    wifi: true,
    parking: true,
    phone: "0988.765.432",
    host: "Bác Năm",
    desc: "Phòng trọ mát mẻ yên tĩnh, điện nước giá nhà nước quy định cho sinh viên, chủ nhà hiền hậu.",
    img: "room3"
  },
  {
    id: 4,
    name: "Căn hộ ghép đôi thoáng mát, có ban công",
    price: "2.4 triệu",
    priceNum: 2.4,
    area: "24m²",
    address: "Gần ngã tư Bảy Hiền, Q. Tân Bình, TP.HCM",
    distance: "600m",
    rating: 4.5,
    reviews: 29,
    ac: true,
    washer: true,
    wifi: true,
    parking: true,
    phone: "0934.567.890",
    host: "Chị Lan Anh",
    desc: "Tìm 1 bạn sinh viên ở ghép phòng master, đã có sẵn tủ lạnh, máy lạnh, bếp từ, chỉ cần dọn vali vào.",
    img: "room4"
  },
  {
    id: 5,
    name: "Ký túc xá dịch vụ máy lạnh giường tầng",
    price: "1.1 triệu",
    priceNum: 1.1,
    area: "35m²",
    address: "Đường D2 (Nguyễn Gia Trí), Q. Bình Thạnh",
    distance: "400m",
    rating: 4.7,
    reviews: 44,
    ac: true,
    washer: true,
    wifi: true,
    parking: true,
    phone: "0977.112.233",
    host: "Hệ thống SleepBox UniZone",
    desc: "Bao trọn chi phí điện nước, wifi tốc độ cao, có rèm che riêng tư, tủ đồ cá nhân khóa số.",
    img: "room5"
  },
  {
    id: 6,
    name: "Phòng studio gác lửng cao, cửa sổ trời",
    price: "3.5 triệu",
    priceNum: 3.5,
    area: "26m²",
    address: "Khu Làng Đại Học, TP. Thủ Đức",
    distance: "950m",
    rating: 4.6,
    reviews: 19,
    ac: true,
    washer: true,
    wifi: true,
    parking: true,
    phone: "0966.889.900",
    host: "Chú Bình",
    desc: "Nhà mới xây xong 100%, gác cao đứng không đụng đầu, bếp riêng tách biệt không lo ám mùi.",
    img: "room6"
  }
];

const initialFood = [
  {
    id: 1,
    name: "Cơm tấm Cô Ba - Đậm vị Sài Gòn",
    cat: "Cơm",
    price: "25.000đ - 35.000đ",
    rating: 4.8,
    reviews: 145,
    distance: "180m",
    hours: "06:00 - 21:00",
    phone: "0901.234.567",
    address: "Hẻm 45 ĐH Bách Khoa",
    tag: "Quán ruột sinh viên",
    desc: "Cơm thêm miễn phí, trà đá free thoải mái, sườn ướp mật ong đậm đà nóng hổi.",
    img: "food1"
  },
  {
    id: 2,
    name: "Trà sữa TocoToco & Đồ Ăn Vặt",
    cat: "Trà sữa",
    price: "22.000đ - 38.000đ",
    rating: 4.6,
    reviews: 98,
    distance: "320m",
    hours: "08:00 - 22:30",
    phone: "0902.345.678",
    address: "12 Đại lộ Trường Đại Học",
    tag: "Giảm 20% thẻ SV",
    desc: "Không gian máy lạnh 2 tầng ngồi làm bài tập nhóm cực êm, ổ cắm điện trang bị tận bàn.",
    img: "food2"
  },
  {
    id: 3,
    name: "Bún bò Huế O Oanh - Nước dùng đậm đà",
    cat: "Bún",
    price: "30.000đ - 40.000đ",
    rating: 4.9,
    reviews: 210,
    distance: "450m",
    hours: "06:30 - 13:30",
    phone: "0903.456.789",
    address: "88 Đường số 6",
    tag: "Đông khách buổi sáng",
    desc: "Tô bún đầy đặn giò, nạm, chả cua, rau sống tươi sạch xin thêm thoải mái.",
    img: "food3"
  },
  {
    id: 4,
    name: "Cafe 24/7 Góc Sinh Viên Học Bài",
    cat: "Cafe",
    price: "20.000đ - 32.000đ",
    rating: 4.7,
    reviews: 82,
    distance: "150m",
    hours: "24/24 Tất cả các ngày",
    phone: "0904.567.890",
    address: "Góc ngã ba khu Ký Túc Xá",
    tag: "Chuyên cày Deadline",
    desc: "Mở xuyên đêm cho mùa đồ án, wifi cáp quang 300Mbps, không gian tĩnh lặng có khu vực thảo luận nhóm riêng.",
    img: "food4"
  },
  {
    id: 5,
    name: "Bánh mì chảo & Bò né Cô Phượng",
    cat: "Ăn vặt",
    price: "25.000đ - 35.000đ",
    rating: 4.7,
    reviews: 115,
    distance: "280m",
    hours: "06:00 - 20:00",
    phone: "0905.678.901",
    address: "24 Đường Nhà Thờ",
    tag: "Bổ rẻ no lâu",
    desc: "Chảo sốt xèo xèo pate béo ngậy kèm bánh mì giòn tan, dưa leo xà lách tươi sạch.",
    img: "food5"
  },
  {
    id: 6,
    name: "Lẩu Sinh Viên Đêm - Buffet Cay Cay",
    cat: "Cơm",
    price: "69.000đ/người",
    rating: 4.5,
    reviews: 130,
    distance: "700m",
    hours: "16:00 - 23:30",
    phone: "0906.789.012",
    address: "Khu chợ đêm sinh viên",
    tag: "Tụ tập liên hoan",
    desc: "Món tủ của sinh viên khi họp lớp hoặc mừng qua môn, đồ nhúng phong phú tươi ngon.",
    img: "food6"
  }
];

const initialMarket = [
  {
    id: 1,
    name: "Bộ Giáo trình Giải tích 1 & 2 + Bài tập có lời giải",
    price: "45.000đ",
    cond: "Đã dùng - 95%",
    seller: "Nguyễn Minh Anh (K23)",
    phone: "0918.234.567",
    loc: "Ký túc xá ĐHQG",
    cat: "Sách",
    desc: "Sách còn rất mới, đã highlight các dạng bài trọng tâm hay ra đề thi giữa kỳ và cuối kỳ.",
    img: "prod1"
  },
  {
    id: 2,
    name: "Laptop Dell Inspiron 15 Core i5 16GB RAM đồ họa mượt",
    price: "7.800.000đ",
    cond: "Đã dùng - 90%",
    seller: "Trần Quốc Huy (K22)",
    phone: "0919.345.678",
    loc: "Q.5, gần ĐH Sư Phạm",
    cat: "Đồ công nghệ",
    desc: "Máy dùng vẽ AutoCAD, Photoshop và code web rất tốt, pin còn 3-4 tiếng, tặng kèm chuột không dây và túi chống sốc.",
    img: "prod2"
  },
  {
    id: 3,
    name: "Xe đạp thể thao Martin đi học tiết kiệm xăng",
    price: "850.000đ",
    cond: "Đã dùng - tốt",
    seller: "Lê Thảo Vy (K24)",
    phone: "0920.456.789",
    loc: "Q. Bình Thạnh",
    cat: "Phương tiện",
    desc: "Xe chạy êm ru, líp xích mới thay dầu, có sẵn giỏ xe đựng cặp và khóa số chống trộm tặng kèm.",
    img: "prod3"
  },
  {
    id: 4,
    name: "Máy tính cầm tay Casio FX-580VN X chính hãng",
    price: "320.000đ",
    cond: "Đã dùng - như mới",
    seller: "Đặng Tuấn Kiệt (K24)",
    phone: "0921.567.890",
    loc: "Q. Thủ Đức",
    cat: "Dụng cụ học tập",
    desc: "Còn nguyên tem bảo hành Bitex, đầy đủ nắp trượt, màn hình sáng rõ không điểm chết.",
    img: "prod4"
  },
  {
    id: 5,
    name: "Bàn học gấp gọn sinh viên + Đèn LED chống cận",
    price: "120.000đ",
    cond: "Mới 98%",
    seller: "Phạm Thu Trang (K23)",
    phone: "0922.678.901",
    loc: "Quận 10",
    cat: "Nội thất",
    desc: "Bàn có rãnh để iPad và khay đựng ly nước tiện dụng khi học bài trên giường hoặc trên gác lửng.",
    img: "prod5"
  },
  {
    id: 6,
    name: "Ấm đun siêu tốc inox 1.8L Sunhouse",
    price: "80.000đ",
    cond: "Đang dùng tốt",
    seller: "Hoàng Đức Nam (K22)",
    phone: "0923.789.012",
    loc: "Thủ Đức",
    cat: "Gia dụng",
    desc: "Sôi nhanh 3 phút tự ngắt an toàn, thích hợp nấu mì gói đêm khuya cày đồ án.",
    img: "prod6"
  }
];

const initialEntertainment = [
  {
    id: 1,
    name: "CyberCore Gaming Center Pro 240Hz",
    cat: "Gaming/Net",
    icon: Gamepad2,
    price: "8.000đ - 12.000đ/giờ",
    rating: 4.8,
    distance: "350m",
    hours: "Mở 24/7 cả ngày đêm",
    phone: "028.3888.999",
    address: "Số 15 Đường số 3, gần làng ĐH",
    desc: "Dàn máy RTX 4060, ghế gaming êm ái, phòng máy lạnh không khói thuốc, menu đồ ăn đêm phong phú."
  },
  {
    id: 2,
    name: "Box Music Mini - Phòng Thu & Hát Tự Do",
    cat: "Karaoke Mini",
    icon: Mic2,
    price: "60.000đ - 90.000đ/giờ",
    rating: 4.7,
    distance: "550m",
    hours: "09:00 - 24:00",
    phone: "0938.112.244",
    address: "45/2 Hoàng Diệu 2",
    desc: "Phòng cách âm chất lượng cao, màn hình cảm ứng chọn bài Youtube cực nhanh, địa điểm xả stress tuyệt vời sau thi cử."
  },
  {
    id: 3,
    name: "CLB Bida Sinh Viên Billiards Zone",
    cat: "Bida",
    icon: CircleDot,
    price: "35.000đ - 50.000đ/giờ",
    rating: 4.6,
    distance: "600m",
    hours: "08:30 - 02:00",
    phone: "0939.223.355",
    address: "Đường số 9, Linh Tây",
    desc: "Bàn Min chuẩn thi đấu, cơ libre & carom mới thay đầu, không gian thoáng đãng có trà đá miễn phí."
  },
  {
    id: 4,
    name: "Sân Cầu Lông Sinh Viên Trẻ",
    cat: "Thể thao",
    icon: PartyPopper,
    price: "50.000đ - 70.000đ/giờ",
    rating: 4.9,
    distance: "900m",
    hours: "05:30 - 22:30",
    phone: "0940.334.466",
    address: "Nhà thi đấu ĐH Bách Khoa",
    tag: "Ưu đãi sinh viên",
    desc: "Mặt thảm chuẩn thi đấu, đèn LED chống chói mắt, có cho thuê vợt và bán cầu giá rẻ cho sinh viên."
  }
];

const initialStudy = [
  {
    id: 1,
    title: "Tài liệu & Đề cương ôn thi môn Công Nghệ Phần Mềm (CNPM)",
    author: "Ban Học Tập 24CT1",
    downloads: 342,
    rating: 4.9,
    type: "Tài liệu ôn tập",
    date: "Hôm qua",
    desc: "Tổng hợp toàn bộ kiến thức: Mô hình Agile/Scrum, thiết kế Use Case, sơ đồ lớp, quy trình kiểm thử và câu hỏi vấn đáp."
  },
  {
    id: 2,
    title: "Tuyển tập 10 đề thi Giải Tích 1 có lời giải chi tiết từng bước",
    author: "CLB Gia Sư Áo Xanh",
    downloads: 820,
    rating: 4.8,
    type: "Đề thi mẫu",
    date: "3 ngày trước",
    desc: "Đầy đủ dạng bài giới hạn, đạo hàm, tích phân suy rộng và chuỗi số bám sát ma trận đề thi các năm."
  },
  {
    id: 3,
    title: "Slide bài giảng & Tóm tắt Triết học Mác - Lênin sơ đồ tư duy",
    author: "Nhóm Sinh Viên DAU",
    downloads: 512,
    rating: 4.7,
    type: "Sơ đồ tư duy",
    date: "1 tuần trước",
    desc: "Học thuộc nhanh các quy luật phủ định của phủ định, lượng - chất và mối quan hệ biện chứng trong 3 trang mindmap."
  },
  {
    id: 4,
    title: "Tìm 2 bạn sinh viên ghép nhóm làm Đồ Án Lập Trình Web React + Node",
    author: "Phan Trí Đức (24CT1)",
    downloads: 78,
    rating: 5.0,
    type: "Ghép nhóm đồ án",
    date: "Vừa xong",
    desc: "Cần bạn chịu khó làm việc nhóm, có tinh thần trách nhiệm cao để cùng hoàn thành sản phẩm điểm A."
  }
];

const reviewsSample = [
  { user: "Ngọc Hân (SV Năm 2)", rating: 5, comment: "Phòng trọ rất sạch sẽ, an ninh tốt, cô chủ thân thiện như người nhà!", date: "2 ngày trước" },
  { user: "Tấn Phát (SV Năm 3)", rating: 4, comment: "Vị trí sát bên trường tiện đi bộ, đồ ăn quanh đây vừa túi tiền sinh viên.", date: "1 tuần trước" },
  { user: "Thùy Linh (SV Năm 1)", rating: 5, comment: "Nhờ UniLife mà mình tìm được trọ ưng ý chỉ sau 1 buổi chiều tìm kiếm.", date: "2 tuần trước" }
];

function StarRow({ rating, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <Star size={size} fill={MARIGOLD} color={MARIGOLD} />
      <span style={{ fontWeight: 600, fontSize: 13, color: INK }}>{rating}</span>
    </span>
  );
}

function Placeholder({ seed, height = 140, text = "UniLife" }) {
  const hue = Array.from(String(seed)).reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div
      style={{
        height,
        borderRadius: "10px 10px 0 0",
        background: `linear-gradient(135deg, hsl(${hue},65%,88%), hsl(${hue + 45},60%,76%))`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: `hsl(${hue},45%,25%)`,
        fontSize: 13,
        fontWeight: 700,
        position: "relative",
        userSelect: "none"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5, opacity: 0.85 }}>
        <Sparkles size={16} />
        <span>{text}</span>
      </div>
      <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.65, marginTop: 2 }}>Hình ảnh thực tế xác thực</span>
    </div>
  );
}

function Badge({ children, bg, color }) {
  return (
    <span
      style={{
        background: bg,
        color: color,
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 3
      }}
    >
      {children}
    </span>
  );
}

function FavButton({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="ul-btn"
      title={active ? "Bỏ yêu thích" : "Lưu vào yêu thích"}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "none",
        background: "rgba(255,255,255,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        zIndex: 5
      }}
    >
      <Heart size={16} fill={active ? CORAL : "none"} color={active ? CORAL : INK} />
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState({ "housing-1": true, "food-1": true });
  const [detail, setDetail] = useState(null);
  const [housingFilters, setHousingFilters] = useState({ ac: false, washer: false, wifi: false, parking: false });
  const [priceMax, setPriceMax] = useState(4);
  const [toast, setToast] = useState("");

  // Dữ liệu ứng dụng
  const [housingList, setHousingList] = useState(initialHousing);
  const [foodList, setFoodList] = useState(initialFood);
  const [marketList, setMarketList] = useState(initialMarket);
  const [entertainmentList] = useState(initialEntertainment);
  const [studyList, setStudyList] = useState(initialStudy);

  // Modals tương tác
  const [showAddMarketModal, setShowAddMarketModal] = useState(false);
  const [showAddHousingModal, setShowAddHousingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  // Toast feedback
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // Toggle favorite
  const toggleFav = (key) => {
    setFavorites((f) => {
      const next = { ...f, [key]: !f[key] };
      showToast(next[key] ? "Đã thêm vào mục Yêu thích! ❤️" : "Đã bỏ khỏi mục Yêu thích!");
      return next;
    });
  };

  // Lọc phòng trọ
  const filteredHousing = useMemo(() => {
    return housingList.filter((h) => {
      if (h.priceNum > priceMax) return false;
      if (housingFilters.ac && !h.ac) return false;
      if (housingFilters.washer && !h.washer) return false;
      if (housingFilters.wifi && !h.wifi) return false;
      if (housingFilters.parking && !h.parking) return false;
      if (query && !h.name.toLowerCase().includes(query.toLowerCase()) && !h.address.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [housingList, housingFilters, priceMax, query]);

  // Đếm số lượng yêu thích
  const favCount = useMemo(() => {
    return Object.values(favorites).filter(Boolean).length;
  }, [favorites]);

  const navItems = [
    { id: "home", label: "Trang chủ" },
    { id: "housing", label: "Phòng trọ" },
    { id: "food", label: "Ăn uống" },
    { id: "market", label: "Chợ đồ cũ" },
    { id: "entertainment", label: "Vui chơi" },
    { id: "study", label: "Góc học tập" },
    { id: "favorites", label: `Yêu thích (${favCount})` },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: PAPER, minHeight: "100vh", color: INK, display: "flex", flexDirection: "column" }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: INK, color: "#fff", boxShadow: "0 4px 18px rgba(0,0,0,0.12)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64, gap: 20 }}>
          {/* LOGO */}
          <div
            className="ul-h"
            onClick={() => setTab("home")}
            style={{ fontSize: 24, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
          >
            <span style={{ color: MARIGOLD, display: "flex", alignItems: "center" }}>
              Uni<span style={{ color: "#fff" }}>Life</span>
            </span>
          </div>

          {/* NAVIGATION */}
          <nav style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }} className="ul-scroll">
            {navItems.map((n) => (
              <div
                key={n.id}
                className="ul-tab"
                onClick={() => setTab(n.id)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  background: tab === n.id ? "rgba(255,193,69,0.18)" : "transparent",
                  color: tab === n.id ? MARIGOLD : "rgba(255,255,255,0.85)",
                  borderBottom: tab === n.id ? `2px solid ${MARIGOLD}` : "2px solid transparent",
                }}
              >
                {n.label}
              </div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                className="ul-btn"
                onClick={() => setShowNotificationModal(true)}
                title="Thông báo sinh viên"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Bell size={18} />
              </button>
              <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: CORAL }} />
            </div>

            {/* Messages */}
            <div style={{ position: "relative" }}>
              <button
                className="ul-btn"
                onClick={() => setShowChatModal(true)}
                title="Tin nhắn trao đổi"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <MessageCircle size={18} />
              </button>
              <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: TEAL }} />
            </div>

            {/* Admin Avatar */}
            <div
              onClick={() => setTab("admin")}
              title="Khu vực Quản trị (Admin Dashboard)"
              style={{
                background: tab === "admin" ? MARIGOLD : "rgba(255,193,69,0.22)",
                color: tab === "admin" ? INK : MARIGOLD,
                border: `1.5px solid ${MARIGOLD}`,
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <LayoutDashboard size={14} />
              <span>Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main style={{ maxWidth: 1140, margin: "0 auto", padding: "0 20px 60px", flex: 1, width: "100%" }}>
        {tab === "home" && (
          <HomeView
            query={query} setQuery={setQuery} setTab={setTab}
            favorites={favorites} toggleFav={toggleFav} setDetail={setDetail}
            housingList={housingList} foodList={foodList} marketList={marketList}
            entertainmentList={entertainmentList} studyList={studyList}
          />
        )}
        {tab === "housing" && (
          <HousingView
            data={filteredHousing} favorites={favorites} toggleFav={toggleFav}
            filters={housingFilters} setFilters={setHousingFilters}
            priceMax={priceMax} setPriceMax={setPriceMax}
            query={query} setQuery={setQuery} setDetail={setDetail}
            onOpenAddModal={() => setShowAddHousingModal(true)}
          />
        )}
        {tab === "food" && (
          <FoodView
            data={foodList} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail}
          />
        )}
        {tab === "market" && (
          <MarketView
            data={marketList} favorites={favorites} toggleFav={toggleFav}
            setDetail={setDetail} onOpenAddModal={() => setShowAddMarketModal(true)}
          />
        )}
        {tab === "entertainment" && (
          <EntertainmentView
            data={entertainmentList} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail}
          />
        )}
        {tab === "study" && (
          <StudyView
            data={studyList} setStudyList={setStudyList} showToast={showToast}
          />
        )}
        {tab === "favorites" && (
          <FavoritesView
            housingList={housingList} foodList={foodList} marketList={marketList}
            entertainmentList={entertainmentList} favorites={favorites}
            toggleFav={toggleFav} setDetail={setDetail} setTab={setTab}
          />
        )}
        {tab === "admin" && (
          <AdminView
            housingList={housingList} foodList={foodList} marketList={marketList}
            showToast={showToast}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E2DED2", background: "#EFECE3", padding: "32px 20px", color: SUBTEXT, fontSize: 13.5 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: INK, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: CORAL }}>UniLife</span> — Đồng hành cùng sinh viên mọi nẻo đường
            </div>
            <div>Nền tảng tiện ích kết nối toàn diện đời sống sinh viên © 2026 UniLife</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("housing")}>Phòng trọ</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("food")}>Ăn uống</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("market")}>Chợ cũ</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }} onClick={() => setTab("study")}>Góc học tập</span>
            <span>·</span>
            <span style={{ cursor: "pointer", color: CORAL, fontWeight: 600 }} onClick={() => setTab("admin")}>Bảng Admin</span>
          </div>
        </div>
      </footer>

      {/* DETAIL MODAL */}
      {detail && (
        <DetailModal
          item={detail}
          onClose={() => setDetail(null)}
          favorites={favorites}
          toggleFav={toggleFav}
          onContact={(item) => {
            setDetail(null);
            setShowContactModal(item);
          }}
          showToast={showToast}
        />
      )}

      {/* CONTACT MODAL */}
      {showContactModal && (
        <ContactModal
          item={showContactModal}
          onClose={() => setShowContactModal(null)}
          showToast={showToast}
        />
      )}

      {/* ADD MARKET ITEM MODAL */}
      {showAddMarketModal && (
        <AddMarketModal
          onClose={() => setShowAddMarketModal(false)}
          onAdd={(newItem) => {
            setMarketList([newItem, ...marketList]);
            setShowAddMarketModal(false);
            showToast("Đã đăng tin bán sản phẩm thành công lên Chợ UniLife!");
          }}
        />
      )}

      {/* ADD HOUSING MODAL */}
      {showAddHousingModal && (
        <AddHousingModal
          onClose={() => setShowAddHousingModal(false)}
          onAdd={(newItem) => {
            setHousingList([newItem, ...housingList]);
            setShowAddHousingModal(false);
            showToast("Đã đăng tin phòng trọ mới thành công!");
          }}
        />
      )}

      {/* NOTIFICATIONS MODAL */}
      {showNotificationModal && (
        <NotificationModal onClose={() => setShowNotificationModal(false)} />
      )}

      {/* CHAT MODAL */}
      {showChatModal && (
        <ChatModal onClose={() => setShowChatModal(false)} showToast={showToast} />
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="animate-fade-in" style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: INK, color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 300, boxShadow: "0 10px 28px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 10 }}>
          <CheckCircle2 size={18} color={MARIGOLD} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// SUB COMPONENTS
// ----------------------------------------------------

function SectionTitle({ children, action, subtitle }) {
  return (
    <div style={{ margin: "38px 0 16px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h2 className="ul-h" style={{ fontSize: 22, fontWeight: 700, margin: 0, color: INK }}>{children}</h2>
        {action}
      </div>
      {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13.5, color: SUBTEXT }}>{subtitle}</p>}
    </div>
  );
}

function CardRow({ children }) {
  return (
    <div className="ul-scroll" style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 10, paddingTop: 4 }}>
      {React.Children.map(children, (c) => (
        <div style={{ minWidth: 260, flex: "0 0 260px" }}>{c}</div>
      ))}
    </div>
  );
}

// --- HOME VIEW ---
function HomeView({ query, setQuery, setTab, favorites, toggleFav, setDetail, housingList, foodList, marketList, entertainmentList, studyList }) {
  return (
    <div>
      {/* HERO SECTION */}
      <section style={{ paddingTop: 38, paddingBottom: 16, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,193,69,0.22)", color: "#8A5B00", padding: "6px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, marginBottom: 16 }}>
          <Sparkles size={14} color="#8A5B00" /> Nền tảng chuyên biệt dành cho sinh viên
        </div>
        <h1 className="ul-h" style={{ fontSize: 42, lineHeight: 1.2, margin: "0 0 16px", maxWidth: 700, marginLeft: "auto", marginRight: "auto", fontWeight: 700 }}>
          Cuộc sống đại học dễ dàng và tiện lợi hơn với <span style={{ color: CORAL }}>UniLife</span>
        </h1>
        <p style={{ color: SUBTEXT, fontSize: 15.5, maxWidth: 540, margin: "0 auto 28px", lineHeight: 1.5 }}>
          Tìm phòng trọ an ninh, quán ăn hợp túi tiền, trao đổi sách giáo trình cũ và tụ điểm vui chơi quanh trường học của bạn.
        </p>

        {/* SEARCH BAR */}
        <div style={{ maxWidth: 620, margin: "0 auto", display: "flex", gap: 8, background: CARD, padding: 8, borderRadius: 16, boxShadow: "0 10px 30px rgba(22,25,46,0.09)", border: "1px solid #EAE6D9" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
            <Search size={19} color={SUBTEXT} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setTab("housing");
              }}
              placeholder="Tìm phòng trọ dưới 2 triệu, quán ăn ngon, giáo trình..."
              style={{ border: "none", outline: "none", fontSize: 14.5, width: "100%", background: "transparent" }}
            />
          </div>
          <button className="ul-btn" onClick={() => setTab("housing")} style={{ background: INK, color: "#fff", borderRadius: 12, padding: "12px 24px", fontWeight: 600, fontSize: 14.5, display: "flex", alignItems: "center", gap: 6 }}>
            <span>Tìm kiếm</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* QUICK TAGS */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14, flexWrap: "wrap", fontSize: 12.5, color: SUBTEXT }}>
          <span>Gợi ý nhanh:</span>
          {["Phòng dưới 2 triệu", "Gần Bách Khoa", "Cơm tấm 25k", "Giáo trình Giải tích", "Cyber net 24/7"].map((tag) => (
            <span
              key={tag}
              onClick={() => {
                setQuery(tag);
                setTab("housing");
              }}
              style={{ color: INK, fontWeight: 600, cursor: "pointer", background: "rgba(0,0,0,0.05)", padding: "2px 8px", borderRadius: 6 }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORIES - CORKBOARD */}
      <SectionTitle subtitle="Khám phá ngay các dịch vụ sinh viên cần thiết">
        Danh mục dịch vụ sinh viên
      </SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {categories.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              className="ul-card"
              onClick={() => setTab(c.id)}
              style={{
                background: CARD,
                borderRadius: 14,
                padding: "22px 14px",
                textAlign: "center",
                cursor: "pointer",
                transform: `rotate(${rotations[i % rotations.length]})`,
                boxShadow: "0 6px 18px rgba(22,25,46,0.06)",
                border: "1px solid #ECE7D8",
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: c.color + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <Icon size={24} color={c.color === MARIGOLD ? "#8A5B00" : c.color} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: SUBTEXT }}>{c.desc}</div>
            </div>
          );
        })}
      </div>

      {/* NEARBY HOUSING */}
      <SectionTitle
        subtitle="Phòng trọ xác thực, an ninh quanh trường học"
        action={
          <button className="ul-btn" onClick={() => setTab("housing")} style={{ background: "transparent", color: CORAL, fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 4 }}>
            Xem tất cả trọ ({housingList.length}) <ChevronRight size={16} />
          </button>
        }
      >
        Phòng trọ gần bạn nhất
      </SectionTitle>
      <CardRow>
        {housingList.slice(0, 5).map((h) => (
          <PlaceCard key={h.id} item={h} type="housing" favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />
        ))}
      </CardRow>

      {/* FOOD */}
      <SectionTitle
        subtitle="Quán cơm, trà sữa, cafe học tập ngon rẻ quanh trường"
        action={
          <button className="ul-btn" onClick={() => setTab("food")} style={{ background: "transparent", color: TEAL, fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 4 }}>
            Xem quán ăn ({foodList.length}) <ChevronRight size={16} />
          </button>
        }
      >
        Được sinh viên yêu thích & đánh giá cao
      </SectionTitle>
      <CardRow>
        {foodList.map((f) => (
          <FoodCard key={f.id} item={f} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />
        ))}
      </CardRow>

      {/* MARKET */}
      <SectionTitle
        subtitle="Tiết kiệm chi phí với đồ dùng & sách vở pass lại từ các anh chị khóa trên"
        action={
          <button className="ul-btn" onClick={() => setTab("market")} style={{ background: "transparent", color: INK, fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 4 }}>
            Vào Chợ sinh viên ({marketList.length}) <ChevronRight size={16} />
          </button>
        }
      >
        Tin đăng mua bán đồ cũ mới nhất
      </SectionTitle>
      <CardRow>
        {marketList.map((p) => (
          <ProductCard key={p.id} item={p} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />
        ))}
      </CardRow>

      {/* STUDY BANNER */}
      <div style={{ marginTop: 40, background: "linear-gradient(135deg, #16192E 0%, #2A3158 100%)", borderRadius: 16, padding: "28px 32px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,193,69,0.2)", color: MARIGOLD, padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
            <BookOpen size={13} /> Góc học tập 24CT1
          </div>
          <h3 className="ul-h" style={{ fontSize: 22, margin: "0 0 6px" }}>Kho tài liệu ôn thi & Tìm bạn cùng tiến</h3>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>Tải giáo trình, xem đề thi mẫu các môn đại cương & chuyên ngành miễn phí 100%.</p>
        </div>
        <button
          className="ul-btn"
          onClick={() => setTab("study")}
          style={{ background: MARIGOLD, color: INK, padding: "12px 22px", borderRadius: 12, fontWeight: 700, fontSize: 14 }}
        >
          Khám phá Góc học tập
        </button>
      </div>
    </div>
  );
}

// --- CARDS ---
function PlaceCard({ item, type, favorites, toggleFav, setDetail }) {
  const key = `${type}-${item.id}`;
  return (
    <div className="ul-card" style={{ background: CARD, borderRadius: 14, overflow: "hidden", border: "1px solid #ECE7D8", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }} onClick={() => setDetail({ ...item, type })}>
      <div style={{ position: "relative" }}>
        <Placeholder seed={item.img || item.name} text="Phòng Trọ UniLife" />
        <FavButton active={!!favorites[key]} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} />
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg="rgba(22,25,46,0.85)" color="#fff">{item.area}</Badge>
        </div>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6, lineHeight: 1.35, minHeight: 40 }}>{item.name}</div>
        <div style={{ fontSize: 15, color: CORAL, fontWeight: 800, marginBottom: 8 }}>{item.price}<span style={{ color: SUBTEXT, fontWeight: 400, fontSize: 12 }}>/tháng</span></div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: "1px dashed #EAE6D9" }}>
          <span style={{ fontSize: 12.5, color: SUBTEXT, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} color={CORAL} /> {item.distance}</span>
          <StarRow rating={item.rating} />
        </div>
      </div>
    </div>
  );
}

function FoodCard({ item, favorites, toggleFav, setDetail }) {
  const key = `food-${item.id}`;
  return (
    <div className="ul-card" style={{ background: CARD, borderRadius: 14, overflow: "hidden", border: "1px solid #ECE7D8", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }} onClick={() => setDetail({ ...item, type: "food" })}>
      <div style={{ position: "relative" }}>
        <Placeholder seed={item.img} text={item.name} />
        <FavButton active={!!favorites[key]} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} />
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg={TEAL} color="#fff">{item.cat}</Badge>
        </div>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: TEAL }}>{item.price}</span>
          <StarRow rating={item.rating} />
        </div>
        <div style={{ marginTop: "auto", fontSize: 12, color: SUBTEXT, display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px dashed #EAE6D9" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={12} color={TEAL} />{item.distance}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={12} />{item.hours.split(" - ")[0]}</span>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ item, favorites, toggleFav, setDetail }) {
  const key = `market-${item.id}`;
  return (
    <div className="ul-card" style={{ background: CARD, borderRadius: 14, overflow: "hidden", border: "1px solid #ECE7D8", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }} onClick={() => setDetail({ ...item, type: "market" })}>
      <div style={{ position: "relative" }}>
        <Placeholder seed={item.img} text={item.name} />
        <FavButton active={!!favorites[key]} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} />
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg="rgba(0,0,0,0.75)" color="#fff">{item.cond}</Badge>
        </div>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.35, minHeight: 38 }}>{item.name}</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: CORAL, marginBottom: 8 }}>{item.price}</div>
        <div style={{ marginTop: "auto", fontSize: 12, color: SUBTEXT, display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px dashed #EAE6D9" }}>
          <span>{item.seller}</span>
          <span>{item.loc}</span>
        </div>
      </div>
    </div>
  );
}

function EntCard({ item, favorites, toggleFav, setDetail }) {
  const key = `ent-${item.id}`;
  const Icon = item.icon;
  return (
    <div className="ul-card" style={{ background: CARD, borderRadius: 14, overflow: "hidden", border: "1px solid #ECE7D8", cursor: "pointer" }} onClick={() => setDetail({ ...item, type: "entertainment" })}>
      <div style={{ position: "relative" }}>
        <div style={{ height: 140, background: "linear-gradient(135deg, #7F77DD20, #7F77DD40)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={38} color="#534AB7" />
        </div>
        <FavButton active={!!favorites[key]} onClick={(e) => { e.stopPropagation(); toggleFav(key); }} />
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <Badge bg="#534AB7" color="#fff">{item.cat}</Badge>
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#534AB7" }}>{item.price}</span>
          <StarRow rating={item.rating} />
        </div>
        <div style={{ fontSize: 12, color: SUBTEXT, display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px dashed #EAE6D9" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={12} color="#534AB7" />{item.distance}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={12} />{item.hours}</span>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ active, label, onClick, icon: Icon }) {
  return (
    <button
      className="ul-btn"
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
        background: active ? INK : CARD, color: active ? "#fff" : INK,
        border: `1px solid ${active ? INK : "#E0DCD0"}`,
      }}
    >
      {Icon && <Icon size={14} />} {label}
    </button>
  );
}

// --- HOUSING VIEW ---
function HousingView({ data, favorites, toggleFav, filters, setFilters, priceMax, setPriceMax, query, setQuery, setDetail, onOpenAddModal }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>Tìm phòng trọ sinh viên</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Có {data.length} phòng trọ phù hợp với tiêu chí của bạn</p>
        </div>
        <button
          className="ul-btn"
          onClick={onOpenAddModal}
          style={{ background: CORAL, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
        >
          <Plus size={16} /> Đăng tin cho thuê trọ
        </button>
      </div>

      {/* SEARCH INPUT */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={18} color={SUBTEXT} style={{ position: "absolute", left: 14 }} />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên phòng, đường, quận hoặc khu vực quanh trường..."
            style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 12, border: "1px solid #E0DCD0", fontSize: 14, outline: "none", background: CARD }}
          />
          {query && (
            <X size={16} color={SUBTEXT} onClick={() => setQuery("")} style={{ position: "absolute", right: 14, cursor: "pointer" }} />
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background: CARD, padding: "14px 16px", borderRadius: 14, border: "1px solid #ECE7D8", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: INK, display: "flex", alignItems: "center", gap: 4 }}>
          <SlidersHorizontal size={14} /> Tiện ích:
        </span>
        <FilterChip icon={Fan} active={filters.ac} label="Máy lạnh" onClick={() => setFilters((f) => ({ ...f, ac: !f.ac }))} />
        <FilterChip icon={WashingMachine} active={filters.washer} label="Máy giặt" onClick={() => setFilters((f) => ({ ...f, washer: !f.washer }))} />
        <FilterChip icon={Wifi} active={filters.wifi} label="Wifi miễn phí" onClick={() => setFilters((f) => ({ ...f, wifi: !f.wifi }))} />
        <FilterChip icon={Bike} active={filters.parking} label="Chỗ giữ xe" onClick={() => setFilters((f) => ({ ...f, parking: !f.parking }))} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto", fontSize: 13.5, color: SUBTEXT }}>
          <span>Mức giá tối đa: <b style={{ color: CORAL, fontSize: 15 }}>{priceMax} triệu</b></span>
          <input
            type="range" min="1" max="5" step="0.2" value={priceMax}
            onChange={(e) => setPriceMax(parseFloat(e.target.value))}
            style={{ accentColor: CORAL, cursor: "pointer" }}
          />
        </div>
      </div>

      {/* LISTINGS */}
      {data.length === 0 ? (
        <EmptyState text="Không tìm thấy phòng phù hợp với bộ lọc hiện tại. Thử tăng mức giá hoặc giảm bớt tiêu chí tiện ích." />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {data.map((h) => <PlaceCard key={h.id} item={h} type="housing" favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />)}
        </div>
      )}
    </div>
  );
}

// --- FOOD VIEW ---
function FoodView({ data, favorites, toggleFav, setDetail }) {
  const [cat, setCat] = useState("Tất cả");
  const cats = ["Tất cả", "Cơm", "Bún", "Trà sữa", "Cafe", "Ăn vặt"];
  const filtered = cat === "Tất cả" ? data : data.filter((f) => f.cat === cat);

  return (
    <div style={{ paddingTop: 24 }}>
      <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Quán ăn & Cà phê sinh viên</h1>
      <p style={{ color: SUBTEXT, fontSize: 14, marginBottom: 18 }}>Địa điểm ẩm thực ngon, sạch, đảm bảo vệ sinh và giá cả hợp lý cho sinh viên</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {cats.map((c) => <FilterChip key={c} active={cat === c} label={c} onClick={() => setCat(c)} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
        {filtered.map((f) => <FoodCard key={f.id} item={f} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />)}
      </div>
    </div>
  );
}

// --- MARKET VIEW ---
function MarketView({ data, favorites, toggleFav, setDetail, onOpenAddModal }) {
  const [cat, setCat] = useState("Tất cả");
  const cats = ["Tất cả", "Sách", "Đồ công nghệ", "Phương tiện", "Dụng cụ học tập", "Nội thất", "Gia dụng"];
  const filtered = cat === "Tất cả" ? data : data.filter((p) => p.cat === cat);

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>Chợ sinh viên & Trao đổi đồ cũ</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Thanh lý giáo trình, laptop, xe đạp, đồ dùng học tập giá sinh viên</p>
        </div>
        <button
          className="ul-btn"
          onClick={onOpenAddModal}
          style={{ background: CORAL, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
        >
          <Plus size={16} /> Đăng bán đồ cũ
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, margin: "18px 0 24px", flexWrap: "wrap" }}>
        {cats.map((c) => <FilterChip key={c} active={cat === c} label={c} onClick={() => setCat(c)} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
        {filtered.map((p) => <ProductCard key={p.id} item={p} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />)}
      </div>
    </div>
  );
}

// --- ENTERTAINMENT VIEW ---
function EntertainmentView({ data, favorites, toggleFav, setDetail }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Tụ điểm vui chơi & Giải trí</h1>
      <p style={{ color: SUBTEXT, fontSize: 14, marginBottom: 24 }}>Xả stress sau giờ học và các kỳ thi căng thẳng cùng bạn bè</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 18 }}>
        {data.map((e) => <EntCard key={e.id} item={e} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />)}
      </div>
    </div>
  );
}

// --- STUDY VIEW ---
function StudyView({ data, setStudyList, showToast }) {
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState("Tài liệu ôn tập");
  const [docDesc, setDocDesc] = useState("");

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!docTitle) return;
    const newDoc = {
      id: Date.now(),
      title: docTitle,
      author: "Phan Trí Đức (24CT1)",
      downloads: 1,
      rating: 5.0,
      type: docType,
      date: "Vừa xong",
      desc: docDesc || "Tài liệu học tập chia sẻ cho sinh viên."
    };
    setStudyList([newDoc, ...data]);
    setShowAddDoc(false);
    setDocTitle("");
    setDocDesc("");
    showToast("Đã chia sẻ tài liệu học tập mới thành công!");
  };

  return (
    <div style={{ paddingTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>Góc học tập & Trao đổi đồ án</h1>
          <p style={{ color: SUBTEXT, fontSize: 14, margin: 0 }}>Kho tài liệu, đề thi, slide ôn tập và diễn đàn ghép nhóm học tập</p>
        </div>
        <button
          className="ul-btn"
          onClick={() => setShowAddDoc(true)}
          style={{ background: "#378ADD", color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}
        >
          <Plus size={16} /> Chia sẻ tài liệu
        </button>
      </div>

      {showAddDoc && (
        <form onSubmit={handleAddDoc} className="animate-fade-in" style={{ background: CARD, border: "1px solid #ECE7D8", borderRadius: 14, padding: 18, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, margin: "0 0 12px" }}>Chia sẻ tài liệu mới</h3>
          <div style={{ display: "grid", gap: 10, maxWidth: 600 }}>
            <input
              required
              placeholder="Tên tài liệu / Tiêu đề tìm nhóm..."
              value={docTitle} onChange={(e) => setDocTitle(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <select
                value={docType} onChange={(e) => setDocType(e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, flex: 1 }}
              >
                <option value="Tài liệu ôn tập">Tài liệu ôn tập</option>
                <option value="Đề thi mẫu">Đề thi mẫu</option>
                <option value="Sơ đồ tư duy">Sơ đồ tư duy</option>
                <option value="Ghép nhóm đồ án">Ghép nhóm đồ án</option>
              </select>
            </div>
            <textarea
              placeholder="Mô tả tóm tắt nội dung tài liệu..."
              rows={2}
              value={docDesc} onChange={(e) => setDocDesc(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="ul-btn" onClick={() => setShowAddDoc(false)} style={{ background: "#EAE6D9", padding: "8px 16px", borderRadius: 8, fontSize: 13 }}>Hủy</button>
              <button type="submit" className="ul-btn" style={{ background: "#378ADD", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Đăng tài liệu</button>
            </div>
          </div>
        </form>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {data.map((item) => (
          <div key={item.id} className="ul-card" style={{ background: CARD, borderRadius: 14, padding: 18, border: "1px solid #ECE7D8", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "#378ADD18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileText size={22} color="#378ADD" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Badge bg="#E8F2FA" color="#266FB5">{item.type}</Badge>
                  <span style={{ fontSize: 12, color: SUBTEXT }}>{item.date}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: INK }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: SUBTEXT, margin: "0 0 8px", maxWidth: 680 }}>{item.desc}</p>
                <div style={{ fontSize: 12, color: SUBTEXT, display: "flex", gap: 12 }}>
                  <span>Tác giả: <b>{item.author}</b></span>
                  <span>·</span>
                  <span>{item.downloads} lượt tải</span>
                  <span>·</span>
                  <StarRow rating={item.rating} size={12} />
                </div>
              </div>
            </div>
            <button
              className="ul-btn"
              onClick={() => showToast(`Đang tải file: ${item.title} (PDF demo)`)}
              style={{ background: INK, color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13, flexShrink: 0 }}
            >
              Tải tài liệu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- FAVORITES VIEW ---
function FavoritesView({ housingList, foodList, marketList, entertainmentList, favorites, toggleFav, setDetail, setTab }) {
  const allFavItems = useMemo(() => {
    const items = [];
    housingList.forEach((h) => {
      if (favorites[`housing-${h.id}`]) items.push({ ...h, type: "housing" });
    });
    foodList.forEach((f) => {
      if (favorites[`food-${f.id}`]) items.push({ ...f, type: "food" });
    });
    marketList.forEach((m) => {
      if (favorites[`market-${m.id}`]) items.push({ ...m, type: "market" });
    });
    entertainmentList.forEach((e) => {
      if (favorites[`ent-${e.id}`]) items.push({ ...e, type: "entertainment" });
    });
    return items;
  }, [housingList, foodList, marketList, entertainmentList, favorites]);

  return (
    <div style={{ paddingTop: 24 }}>
      <h1 className="ul-h" style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Danh sách yêu thích đã lưu</h1>
      <p style={{ color: SUBTEXT, fontSize: 14, marginBottom: 24 }}>Bạn đã lưu lại {allFavItems.length} mục để tham khảo sau</p>

      {allFavItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: SUBTEXT }}>
          <Heart size={36} color={CORAL} style={{ opacity: 0.5, marginBottom: 12 }} />
          <div style={{ fontSize: 16, fontWeight: 600, color: INK, marginBottom: 6 }}>Chưa có mục nào được lưu</div>
          <p style={{ fontSize: 14, maxWidth: 360, margin: "0 auto 18px" }}>Bấm vào biểu tượng trái tim ở bất kỳ phòng trọ, quán ăn hay đồ dùng nào để lưu lại tại đây.</p>
          <button className="ul-btn" onClick={() => setTab("housing")} style={{ background: INK, color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 14 }}>
            Khám phá phòng trọ ngay
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {allFavItems.map((item) => {
            if (item.type === "housing") return <PlaceCard key={`fav-h-${item.id}`} item={item} type="housing" favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />;
            if (item.type === "food") return <FoodCard key={`fav-f-${item.id}`} item={item} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />;
            if (item.type === "market") return <ProductCard key={`fav-m-${item.id}`} item={item} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />;
            if (item.type === "entertainment") return <EntCard key={`fav-e-${item.id}`} item={item} favorites={favorites} toggleFav={toggleFav} setDetail={setDetail} />;
            return null;
          })}
        </div>
      )}
    </div>
  );
}

// --- ADMIN VIEW ---
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

function AdminView({ housingList, foodList, marketList, showToast }) {
  const [active, setActive] = useState("Users");
  const [users, setUsers] = useState([
    { id: 1, name: "Phan Trí Đức", role: "Admin / Kỹ sư", status: "Active", email: "triduc.24ct1@dau.edu.vn" },
    { id: 2, name: "Nguyễn Văn A", role: "Sinh viên", status: "Active", email: "vana@student.edu.vn" },
    { id: 3, name: "Trần Thị B (Chủ trọ)", role: "Chủ nhà", status: "Active", email: "b_chutro@gmail.com" },
    { id: 4, name: "Lê Văn C (Spam bán hàng)", role: "Người bán", status: "Banned", email: "c_spammer@yahoo.com" },
    { id: 5, name: "Phạm Thị D", role: "Sinh viên", status: "Active", email: "d_sinhvien@gmail.com" },
  ]);

  const toggleUserStatus = (id) => {
    setUsers(users.map((u) => {
      if (u.id === id) {
        const newStatus = u.status === "Active" ? "Banned" : "Active";
        showToast(`Đã cập nhật trạng thái người dùng thành: ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
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
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: PAPER, textAlign: "left" }}>
                    <th style={{ padding: "10px 16px", fontWeight: 600, color: SUBTEXT }}>Họ tên</th>
                    <th style={{ padding: "10px 16px", fontWeight: 600, color: SUBTEXT }}>Email</th>
                    <th style={{ padding: "10px 16px", fontWeight: 600, color: SUBTEXT }}>Vai trò</th>
                    <th style={{ padding: "10px 16px", fontWeight: 600, color: SUBTEXT }}>Trạng thái</th>
                    <th style={{ padding: "10px 16px", fontWeight: 600, color: SUBTEXT }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((r) => (
                    <tr key={r.id} style={{ borderTop: "1px solid #ECE7D8" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>{r.name}</td>
                      <td style={{ padding: "12px 16px", color: SUBTEXT }}>{r.email}</td>
                      <td style={{ padding: "12px 16px" }}>{r.role}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <Badge bg={r.status === "Active" ? "#E1F5EE" : "#FCEBEB"} color={r.status === "Active" ? "#085041" : "#791F1F"}>
                          {r.status === "Active" ? "Hoạt động" : "Bị khóa"}
                        </Badge>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <button
                          className="ul-btn"
                          onClick={() => toggleUserStatus(r.id)}
                          style={{
                            background: r.status === "Active" ? "#FCEBEB" : "#E1F5EE",
                            color: r.status === "Active" ? "#791F1F" : "#085041",
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600
                          }}
                        >
                          {r.status === "Active" ? "Khóa tài khoản" : "Mở khóa"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {active === "Housing" && (
            <div style={{ padding: 16 }}>
              <div style={{ marginBottom: 12, fontSize: 13, color: SUBTEXT }}>Danh sách {housingList.length} phòng trọ đã kiểm duyệt hiển thị trên sàn:</div>
              {housingList.map((h) => (
                <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F0ECE0" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{h.name}</div>
                    <div style={{ fontSize: 12, color: SUBTEXT }}>{h.price} · {h.address}</div>
                  </div>
                  <Badge bg="#E1F5EE" color="#085041">Đã kiểm duyệt</Badge>
                </div>
              ))}
            </div>
          )}

          {active === "Marketplace" && (
            <div style={{ padding: 16 }}>
              <div style={{ marginBottom: 12, fontSize: 13, color: SUBTEXT }}>Danh sách {marketList.length} tin đăng chợ đồ cũ sinh viên:</div>
              {marketList.map((m) => (
                <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F0ECE0" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: SUBTEXT }}>{m.price} · Người đăng: {m.seller} ({m.phone})</div>
                  </div>
                  <Badge bg="#E8F2FA" color="#266FB5">Đang hiển thị</Badge>
                </div>
              ))}
            </div>
          )}

          {active === "Food" && (
            <div style={{ padding: 16 }}>
              <div style={{ marginBottom: 12, fontSize: 13, color: SUBTEXT }}>Danh sách {foodList.length} quán ăn đã xác minh vệ sinh & giá:</div>
              {foodList.map((f) => (
                <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F0ECE0" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: SUBTEXT }}>{f.cat} · {f.price} · {f.address}</div>
                  </div>
                  <Badge bg="#FFF0D4" color="#8A5B00">Uy tín</Badge>
                </div>
              ))}
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

// --- DETAIL MODAL ---
function DetailModal({ item, onClose, favorites, toggleFav, onContact, showToast }) {
  const key = `${item.type}-${item.id}`;
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState(reviewsSample);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const rev = {
      user: "Bạn (Sinh viên)",
      rating: newRating,
      comment: newComment.trim(),
      date: "Vừa xong"
    };
    setReviews([rev, ...reviews]);
    setNewComment("");
    showToast("Cảm ơn bạn đã gửi đánh giá xác thực!");
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 18, maxWidth: 540, width: "100%", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
        <div style={{ position: "relative" }}>
          <Placeholder seed={item.img || item.name} height={210} text={item.name} />
          <button onClick={onClose} className="ul-btn" style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
            <h2 className="ul-h" style={{ fontSize: 20, margin: 0, fontWeight: 700, lineHeight: 1.3 }}>{item.name}</h2>
            <button onClick={() => toggleFav(key)} className="ul-btn" style={{ background: "none", flexShrink: 0 }}>
              <Heart size={24} fill={favorites[key] ? CORAL : "none"} color={favorites[key] ? CORAL : INK} />
            </button>
          </div>

          {/* RATING */}
          {item.rating && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <StarRow rating={item.rating} size={16} />
              {item.reviews && <span style={{ fontSize: 13, color: SUBTEXT }}>({item.reviews} sinh viên đã đánh giá)</span>}
            </div>
          )}

          {/* BADGES */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {item.price && <Badge bg="#FFE9C2" color="#8A5B00">{item.price}{item.area ? "/tháng" : ""}</Badge>}
            {item.area && <Badge bg="#EEEDFE" color="#3C3489">Diện tích: {item.area}</Badge>}
            {item.cond && <Badge bg="#E1F5EE" color="#085041">Tình trạng: {item.cond}</Badge>}
            {item.hours && <Badge bg="#FAECE7" color="#712B13">Giờ mở cửa: {item.hours}</Badge>}
            {item.tag && <Badge bg="#E0F2FE" color="#0369A1">{item.tag}</Badge>}
          </div>

          {/* ADDRESS & HOST */}
          {item.address && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: SUBTEXT, marginBottom: 8 }}>
              <MapPin size={16} color={CORAL} />
              <span>{item.address} · Cách bạn <b>{item.distance}</b></span>
            </div>
          )}

          {item.host && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: SUBTEXT, marginBottom: 8 }}>
              <Users size={16} color={TEAL} />
              <span>Chủ phòng: <b>{item.host}</b></span>
            </div>
          )}

          {item.seller && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: SUBTEXT, marginBottom: 8 }}>
              <Users size={16} color={TEAL} />
              <span>Người bán: <b>{item.seller}</b> ({item.loc})</span>
            </div>
          )}

          {/* DESCRIPTION */}
          {item.desc && (
            <div style={{ background: PAPER, padding: "12px 14px", borderRadius: 10, margin: "14px 0", fontSize: 13.5, lineHeight: 1.5, color: INK }}>
              {item.desc}
            </div>
          )}

          {/* HOUSING AMENITIES */}
          {(item.ac || item.washer || item.wifi || item.parking) && (
            <div style={{ margin: "16px 0", padding: "12px", border: "1px solid #ECE7D8", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: INK }}>Tiện ích phòng trọ:</div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {item.ac && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Fan size={16} color={TEAL} /> Có máy lạnh</span>}
                {item.washer && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><WashingMachine size={16} color={TEAL} /> Máy giặt dùng chung</span>}
                {item.wifi && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Wifi size={16} color={TEAL} /> Wifi tốc độ cao</span>}
                {item.parking && <span style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Bike size={16} color={TEAL} /> Nhà để xe rộng</span>}
              </div>
            </div>
          )}

          {/* REVIEWS SECTION */}
          <div style={{ borderTop: "1px solid #ECE7D8", marginTop: 18, paddingTop: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Đánh giá từ cộng đồng sinh viên</span>
              <span style={{ fontSize: 12, color: SUBTEXT }}>{reviews.length} đánh giá</span>
            </div>

            {/* REVIEW LIST */}
            <div style={{ display: "grid", gap: 10, maxHeight: 180, overflowY: "auto", marginBottom: 14 }}>
              {reviews.map((r, i) => (
                <div key={i} style={{ background: PAPER, padding: "10px 12px", borderRadius: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{r.user}</span>
                    <span style={{ fontSize: 11.5, color: SUBTEXT }}>{r.date}</span>
                  </div>
                  <StarRow rating={r.rating} size={12} />
                  <p style={{ fontSize: 13, color: INK, margin: "4px 0 0" }}>{r.comment}</p>
                </div>
              ))}
            </div>

            {/* ADD REVIEW FORM */}
            <form onSubmit={handleAddReview} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select
                value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))}
                style={{ padding: "8px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13, background: CARD }}
              >
                <option value={5}>5 ★</option>
                <option value={4}>4 ★</option>
                <option value={3}>3 ★</option>
                <option value={2}>2 ★</option>
                <option value={1}>1 ★</option>
              </select>
              <input
                placeholder="Viết nhận xét của bạn về địa điểm này..."
                value={newComment} onChange={(e) => setNewComment(e.target.value)}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13 }}
              />
              <button type="submit" className="ul-btn" style={{ background: INK, color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                Gửi
              </button>
            </form>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={() => onContact(item)}
            className="ul-btn"
            style={{ width: "100%", marginTop: 18, background: CORAL, color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 6px 18px rgba(255,93,62,0.3)" }}
          >
            <Phone size={17} /> Liên hệ ngay (Gọi điện & Chat Zalo)
          </button>
        </div>
      </div>
    </div>
  );
}

// --- CONTACT MODAL ---
function ContactModal({ item, onClose, showToast }) {
  const phone = item.phone || "0905.123.456";
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 420, width: "100%", padding: 24, textAlign: "center" }}>
        <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,93,62,0.12)", color: CORAL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <Phone size={24} />
        </div>
        <h3 className="ul-h" style={{ fontSize: 20, margin: "0 0 6px" }}>Liên hệ: {item.name}</h3>
        <p style={{ color: SUBTEXT, fontSize: 13.5, margin: "0 0 20px" }}>Kết nối trực tiếp không qua trung gian môi giới</p>

        <div style={{ background: PAPER, padding: 14, borderRadius: 12, marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: SUBTEXT, marginBottom: 4 }}>Số điện thoại / Zalo:</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: CORAL }}>{phone}</div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <button
            className="ul-btn"
            onClick={() => showToast(`Đang thực hiện cuộc gọi tới: ${phone}`)}
            style={{ background: INK, color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <Phone size={16} /> Gọi điện thoại ngay
          </button>
          <button
            className="ul-btn"
            onClick={() => showToast(`Đang mở Zalo kết bạn với số: ${phone}`)}
            style={{ background: "#0068FF", color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <MessageCircle size={16} /> Nhắn tin qua Zalo
          </button>
          <button
            className="ul-btn"
            onClick={onClose}
            style={{ background: "transparent", color: SUBTEXT, padding: "8px", fontSize: 13 }}
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
}

// --- ADD MARKET MODAL ---
function AddMarketModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cond, setCond] = useState("Đã dùng - tốt");
  const [cat, setCat] = useState("Sách");
  const [seller, setSeller] = useState("Phan Trí Đức (24CT1)");
  const [loc, setLoc] = useState("Ký túc xá ĐH Bách Khoa");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    onAdd({
      id: Date.now(),
      name,
      price: price.includes("đ") ? price : `${price}đ`,
      cond,
      cat,
      seller,
      phone: "0909.888.999",
      loc,
      desc: desc || "Sản phẩm sinh viên còn sử dụng rất tốt.",
      img: `user_${Date.now()}`
    });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 480, width: "100%", padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="ul-h" style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>Đăng bán đồ cũ sinh viên</h2>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tên sản phẩm *</label>
            <input required placeholder="Ví dụ: Giáo trình Giải tích 1, Laptop cũ..." value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Giá bán (VNĐ) *</label>
              <input required placeholder="50.000đ" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Danh mục</label>
              <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, background: CARD }}>
                <option value="Sách">Sách & Giáo trình</option>
                <option value="Đồ công nghệ">Đồ công nghệ</option>
                <option value="Phương tiện">Phương tiện</option>
                <option value="Dụng cụ học tập">Dụng cụ học tập</option>
                <option value="Nội thất">Bàn ghế & Nội thất</option>
                <option value="Gia dụng">Đồ gia dụng</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tình trạng</label>
              <select value={cond} onChange={(e) => setCond(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, background: CARD }}>
                <option value="Mới 100%">Mới 100%</option>
                <option value="Đã dùng - như mới">Đã dùng - như mới</option>
                <option value="Đã dùng - tốt">Đã dùng - tốt</option>
                <option value="Đã dùng - khá">Đã dùng - khá</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Khu vực</label>
              <input value={loc} onChange={(e) => setLoc(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Mô tả chi tiết</label>
            <textarea rows={3} placeholder="Mô tả phụ kiện đi kèm, thời gian sử dụng..." value={desc} onChange={(e) => setDesc(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" className="ul-btn" onClick={onClose} style={{ background: "#EAE6D9", padding: "10px 18px", borderRadius: 10, fontSize: 14 }}>Hủy</button>
            <button type="submit" className="ul-btn" style={{ background: CORAL, color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700 }}>Đăng bán ngay</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- ADD HOUSING MODAL ---
function AddHousingModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [priceNum, setPriceNum] = useState(2.0);
  const [area, setArea] = useState("22m²");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("500m");
  const [ac, setAc] = useState(true);
  const [washer, setWasher] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [parking, setParking] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address) return;
    onAdd({
      id: Date.now(),
      name,
      price: `${priceNum} triệu`,
      priceNum: parseFloat(priceNum),
      area,
      address,
      distance,
      rating: 5.0,
      reviews: 1,
      ac,
      washer,
      wifi,
      parking,
      phone: "0908.777.666",
      host: "Chủ trọ mới đăng ký",
      desc: "Phòng trọ mới cập nhật trên UniLife, liên hệ để xem phòng trực tiếp.",
      img: `new_room_${Date.now()}`
    });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 500, width: "100%", padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="ul-h" style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>Đăng tin phòng trọ cho thuê</h2>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tiêu đề phòng trọ *</label>
            <input required placeholder="Ví dụ: Phòng trọ ban công gần ĐH Kiến Trúc..." value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Giá thuê (Triệu/tháng) *</label>
              <input required type="number" step="0.1" value={priceNum} onChange={(e) => setPriceNum(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Diện tích</label>
              <input value={area} onChange={(e) => setArea(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Địa chỉ chi tiết *</label>
            <input required placeholder="Số nhà, tên đường, phường, quận..." value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }} />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Tiện nghi có sẵn:</label>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 13 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} /> Máy lạnh
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="checkbox" checked={washer} onChange={(e) => setWasher(e.target.checked)} /> Máy giặt
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="checkbox" checked={wifi} onChange={(e) => setWifi(e.target.checked)} /> Wifi
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="checkbox" checked={parking} onChange={(e) => setParking(e.target.checked)} /> Chỗ để xe
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" className="ul-btn" onClick={onClose} style={{ background: "#EAE6D9", padding: "10px 18px", borderRadius: 10, fontSize: 14 }}>Hủy</button>
            <button type="submit" className="ul-btn" style={{ background: CORAL, color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700 }}>Đăng phòng ngay</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- NOTIFICATIONS MODAL ---
function NotificationModal({ onClose }) {
  const notifs = [
    { title: "Ưu đãi sinh viên K24!", desc: "Giảm ngay 20% tại Cafe Học Bài Góc Ký Túc Xá khi xuất trình thẻ sinh viên.", time: "10 phút trước", unread: true },
    { title: "Phòng trọ mới đăng gần bạn", desc: "Chung cư mini Thủ Đức giá 3.2 triệu vừa cập nhật thêm 1 phòng trống tầng 3.", time: "1 giờ trước", unread: true },
    { title: "Tin nhắn chợ đồ cũ", desc: "Minh Anh đã phản hồi yêu cầu mua Giáo trình Giải tích 1 của bạn.", time: "Hôm qua", unread: false }
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 440, width: "100%", padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 17 }}>
            <Bell size={18} color={CORAL} /> Thông báo sinh viên
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={18} /></button>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {notifs.map((n, i) => (
            <div key={i} style={{ background: n.unread ? "rgba(255,193,69,0.12)" : PAPER, padding: 12, borderRadius: 10, borderLeft: n.unread ? `3px solid ${MARIGOLD}` : "3px solid transparent" }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: INK, marginBottom: 2 }}>{n.title}</div>
              <div style={{ fontSize: 12.5, color: SUBTEXT, marginBottom: 4 }}>{n.desc}</div>
              <div style={{ fontSize: 11, color: "#8A5B00", fontWeight: 500 }}>{n.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- CHAT MODAL ---
function ChatModal({ onClose, showToast }) {
  const [messages, setMessages] = useState([
    { sender: "other", text: "Chào bạn! Bạn cần hỏi về phòng trọ hay giáo trình sinh viên ạ?", time: "14:20" },
    { sender: "me", text: "Dạ em muốn hỏi phòng trọ Xanh gần ĐHBK còn phòng trống không ạ?", time: "14:22" },
    { sender: "other", text: "Phòng đó còn 1 phòng tầng 2 thoáng mát lắm em nhé, giá 1.8tr/tháng có wifi miễn phí.", time: "14:23" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "me", text: input.trim(), time: "Vừa xong" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, {
        sender: "other",
        text: "Cảm ơn bạn đã nhắn tin! Chủ trọ / người bán sẽ phản hồi trực tiếp cho bạn qua số Zalo ngay nhé.",
        time: "Vừa xong"
      }]);
    }, 900);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 250, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: CARD, borderRadius: 16, maxWidth: 440, width: "100%", height: 500, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* HEADER */}
        <div style={{ padding: "14px 18px", background: INK, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>Hỗ trợ sinh viên UniLife</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Đang hoạt động</div>
            </div>
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none", color: "#fff" }}><X size={18} /></button>
        </div>

        {/* MESSAGES BODY */}
        <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, background: PAPER }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.sender === "me" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                background: m.sender === "me" ? INK : CARD,
                color: m.sender === "me" ? "#fff" : INK,
                padding: "10px 14px",
                borderRadius: m.sender === "me" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                fontSize: 13.5
              }}
            >
              <div>{m.text}</div>
              <div style={{ fontSize: 10.5, opacity: 0.6, textAlign: "right", marginTop: 4 }}>{m.time}</div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <form onSubmit={handleSend} style={{ padding: 12, background: CARD, borderTop: "1px solid #ECE7D8", display: "flex", gap: 8 }}>
          <input
            placeholder="Nhập nội dung tin nhắn..."
            value={input} onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #E0DCD0", fontSize: 13.5, outline: "none" }}
          />
          <button type="submit" className="ul-btn" style={{ background: CORAL, color: "#fff", padding: "10px 16px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

// --- EMPTY STATE ---
function EmptyState({ text }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: SUBTEXT, background: CARD, borderRadius: 16, border: "1px dashed #E0DCD0", margin: "20px 0" }}>
      <Search size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
      <div style={{ fontSize: 14.5, fontWeight: 500, maxWidth: 400, margin: "0 auto" }}>{text}</div>
    </div>
  );
}
