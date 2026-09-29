// src/data/mockData.js
// Dữ liệu ban đầu cho hệ thống UniLife

export const initialUsers = [
  {
    id: 1,
    name: "Phan Trí Đức",
    email: "admin@unilife.vn",
    password: "admin",
    role: "Admin",
    status: "Active",
    phone: "0905.111.222",
    createdAt: "20/08/2026",
    avatar: "PTD"
  },
  {
    id: 2,
    name: "Nguyễn Văn An (K24)",
    email: "an.student@dau.edu.vn",
    password: "123",
    role: "Sinh viên",
    status: "Active",
    phone: "0905.333.444",
    createdAt: "22/08/2026",
    avatar: "NA"
  },
  {
    id: 3,
    name: "Cô Tư Quản Trọ (Bách Khoa)",
    email: "cotu.tro@gmail.com",
    password: "123",
    role: "Chủ trọ",
    status: "Active",
    phone: "0905.123.456",
    createdAt: "24/08/2026",
    avatar: "CT"
  },
  {
    id: 4,
    name: "Trần Thị Mai (Đăng ký mới)",
    email: "mai.k24@dau.edu.vn",
    password: "123",
    role: "Sinh viên",
    status: "Pending", // Chờ Admin phê duyệt
    phone: "0912.888.777",
    createdAt: "Hôm nay, 19:40",
    avatar: "TM"
  },
  {
    id: 5,
    name: "Bác Sáu (Chủ Chung cư mini)",
    email: "bacsau.tro@gmail.com",
    password: "123",
    role: "Chủ trọ",
    status: "Pending", // Chờ Admin phê duyệt
    phone: "0934.999.000",
    createdAt: "Hôm nay, 20:05",
    avatar: "BS"
  }
];

export const sampleImages = [
  { id: "img1", name: "Phòng trọ ban công sáng", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80" },
  { id: "img2", name: "Phòng gác lửng đúc sạch sẽ", url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80" },
  { id: "img3", name: "Ký túc xá SleepBox cao cấp", url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80" },
  { id: "img4", name: "Quán cơm tấm thơm ngon", url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" },
  { id: "img5", name: "Cà phê máy lạnh học bài", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" },
  { id: "img6", name: "Trà sữa sinh viên", url: "https://images.unsplash.com/photo-1558857563-b37cf5a8a65e?auto=format&fit=crop&w=600&q=80" },
  { id: "img7", name: "Sách giáo trình đại học", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" },
  { id: "img8", name: "Laptop đồ họa sinh viên", url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80" },
  { id: "img9", name: "Cyber Gaming Center 240Hz", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" },
  { id: "img10", name: "Sân thể thao cầu lông", url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80" }
];

export const initialHousing = [
  {
    id: 1,
    name: "Phòng trọ Xanh - gần ĐH Bách Khoa & Kiến Trúc",
    price: "1.8 triệu",
    priceNum: 1.8,
    area: "20m²",
    address: "Khu vực cổng phụ ĐH Bách Khoa, TP.HCM",
    distance: "350m",
    rating: 4.8,
    likes: 42,
    ac: true,
    washer: false,
    wifi: true,
    parking: true,
    phone: "0905.123.456",
    host: "Cô Tư Quản Trọ",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    desc: "Phòng mới sơn sửa sạch sẽ, giờ giấc tự do, có gác lửng đúc cao không chạm đầu, khu an ninh cao cho sinh viên.",
    reviewsList: [
      { id: 101, user: "Ngọc Hân (SV K24)", rating: 5, comment: "Phòng trọ rất sạch sẽ, an ninh tốt, cô chủ thân thiện như người nhà!", date: "2 ngày trước" },
      { id: 102, user: "Tấn Phát (SV K23)", rating: 4, comment: "Vị trí sát bên trường tiện đi bộ, đồ ăn quanh đây vừa túi tiền.", date: "1 tuần trước" }
    ]
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
    likes: 68,
    ac: true,
    washer: true,
    wifi: true,
    parking: true,
    phone: "0912.345.678",
    host: "Anh Hoàng BQL",
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
    desc: "Căn hộ mini cao cấp có khóa vân tay, camera 24/7, máy giặt riêng từng phòng, ban công thoáng gió.",
    reviewsList: [
      { id: 201, user: "Đức Trí (K23)", rating: 5, comment: "Phòng đẹp y hình, mạng wifi riêng rất mạnh để code bài tập.", date: "Hôm qua" }
    ]
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
    likes: 29,
    ac: false,
    washer: false,
    wifi: true,
    parking: true,
    phone: "0988.765.432",
    host: "Bác Năm",
    imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
    desc: "Phòng trọ mát mẻ yên tĩnh, điện nước giá nhà nước quy định cho sinh viên, chủ nhà hiền hậu.",
    reviewsList: [
      { id: 301, user: "Thùy Linh", rating: 4, comment: "Giá rẻ hợp túi tiền sv năm nhất mới lên thành phố.", date: "3 tuần trước" }
    ]
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
    likes: 35,
    ac: true,
    washer: true,
    wifi: true,
    parking: true,
    phone: "0934.567.890",
    host: "Chị Lan Anh",
    imageUrl: "",
    desc: "Tìm 1 bạn sinh viên ở ghép phòng master, đã có sẵn tủ lạnh, máy lạnh, bếp từ, chỉ cần dọn vali vào.",
    reviewsList: []
  }
];

export const initialFood = [
  {
    id: 1,
    name: "Cơm tấm Cô Ba - Đậm vị Sài Gòn",
    cat: "Cơm",
    price: "25.000đ - 35.000đ",
    rating: 4.8,
    likes: 112,
    distance: "180m",
    hours: "06:00 - 21:00",
    phone: "0901.234.567",
    address: "Hẻm 45 ĐH Bách Khoa",
    tag: "Quán ruột sinh viên",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    desc: "Cơm thêm miễn phí, trà đá free thoải mái, sườn ướp mật ong đậm đà nóng hổi.",
    reviewsList: [
      { id: 401, user: "Huy Hoàng", rating: 5, comment: "Cơm tấm sườn nướng siêu thơm, cô chủ cho thêm cơm không tính tiền!", date: "Hôm qua" }
    ]
  },
  {
    id: 2,
    name: "Trà sữa TocoToco & Đồ Ăn Vặt",
    cat: "Trà sữa",
    price: "22.000đ - 38.000đ",
    rating: 4.6,
    likes: 84,
    distance: "320m",
    hours: "08:00 - 22:30",
    phone: "0902.345.678",
    address: "12 Đại lộ Trường Đại Học",
    tag: "Giảm 20% thẻ SV",
    imageUrl: "https://images.unsplash.com/photo-1558857563-b37cf5a8a65e?auto=format&fit=crop&w=600&q=80",
    desc: "Không gian máy lạnh 2 tầng ngồi làm bài tập nhóm cực êm, ổ cắm điện trang bị tận bàn.",
    reviewsList: []
  },
  {
    id: 3,
    name: "Cafe 24/7 Góc Sinh Viên Học Bài",
    cat: "Cafe",
    price: "20.000đ - 32.000đ",
    rating: 4.7,
    likes: 95,
    distance: "150m",
    hours: "24/24 Tất cả các ngày",
    phone: "0904.567.890",
    address: "Góc ngã ba khu Ký Túc Xá",
    tag: "Chuyên cày Deadline",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
    desc: "Mở xuyên đêm cho mùa đồ án, wifi cáp quang 300Mbps, không gian tĩnh lặng có khu vực thảo luận nhóm riêng.",
    reviewsList: [
      { id: 501, user: "Phương Mai", rating: 5, comment: "Cứ đến tuần thi cuối kỳ là mình cắm trại ở đây cả đêm, nước uống ngon giá mềm.", date: "4 ngày trước" }
    ]
  }
];

export const initialMarket = [
  {
    id: 1,
    name: "Bộ Giáo trình Giải tích 1 & 2 + Bài tập có giải",
    price: "45.000đ",
    cond: "Đã dùng - 95%",
    seller: "Nguyễn Minh Anh (K23)",
    phone: "0918.234.567",
    loc: "Ký túc xá ĐHQG",
    cat: "Sách",
    likes: 31,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    desc: "Sách còn rất mới, đã highlight các dạng bài trọng tâm hay ra đề thi giữa kỳ và cuối kỳ.",
    reviewsList: []
  },
  {
    id: 2,
    name: "Laptop Dell Inspiron 15 Core i5 16GB RAM mượt",
    price: "7.800.000đ",
    cond: "Đã dùng - 90%",
    seller: "Trần Quốc Huy (K22)",
    phone: "0919.345.678",
    loc: "Q.5, gần ĐH Sư Phạm",
    cat: "Đồ công nghệ",
    likes: 54,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    desc: "Máy dùng vẽ AutoCAD, Photoshop và code web rất tốt, pin còn 3-4 tiếng, tặng kèm túi chống sốc.",
    reviewsList: []
  }
];

export const initialEntertainment = [
  {
    id: 1,
    name: "CyberCore Gaming Center Pro 240Hz",
    cat: "Gaming/Net",
    price: "8.000đ - 12.000đ/giờ",
    rating: 4.8,
    likes: 88,
    distance: "350m",
    hours: "Mở 24/7 cả ngày đêm",
    phone: "028.3888.999",
    address: "Số 15 Đường số 3, gần làng ĐH",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    desc: "Dàn máy RTX 4060, ghế gaming êm ái, phòng máy lạnh không khói thuốc, menu đồ ăn đêm phong phú.",
    reviewsList: []
  },
  {
    id: 2,
    name: "Sân Cầu Lông Sinh Viên Trẻ",
    cat: "Thể thao",
    price: "50.000đ - 70.000đ/giờ",
    rating: 4.9,
    likes: 62,
    distance: "900m",
    hours: "05:30 - 22:30",
    phone: "0940.334.466",
    address: "Nhà thi đấu ĐH Bách Khoa",
    tag: "Ưu đãi sinh viên",
    imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
    desc: "Mặt thảm chuẩn thi đấu, đèn LED chống chói mắt, có cho thuê vợt và bán cầu giá rẻ cho sinh viên.",
    reviewsList: []
  }
];

export const initialStudy = [
  {
    id: 1,
    title: "Tài liệu & Đề cương ôn thi môn Công Nghệ Phần Mềm (CNPM)",
    author: "Phan Trí Đức (24CT1)",
    downloads: 420,
    rating: 5.0,
    likes: 76,
    type: "Tài liệu ôn tập",
    date: "Hôm qua",
    imageUrl: "",
    desc: "Tổng hợp toàn bộ kiến thức: Mô hình Agile/Scrum, thiết kế Use Case, sơ đồ lớp, quy trình kiểm thử và câu hỏi vấn đáp.",
    reviewsList: [
      { id: 601, user: "Tuấn Anh", rating: 5, comment: "Đề cương bám rất sát câu hỏi vấn đáp của thầy cô, ôn trúng tủ 9 điểm!", date: "Hôm qua" }
    ]
  },
  {
    id: 2,
    title: "Tuyển tập 10 đề thi Giải Tích 1 có lời giải chi tiết",
    author: "CLB Gia Sư Áo Xanh",
    downloads: 820,
    rating: 4.8,
    likes: 91,
    type: "Đề thi mẫu",
    date: "3 ngày trước",
    imageUrl: "",
    desc: "Đầy đủ dạng bài giới hạn, đạo hàm, tích phân suy rộng và chuỗi số bám sát ma trận đề thi các năm.",
    reviewsList: []
  }
];
