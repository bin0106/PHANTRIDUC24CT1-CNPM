import React, { useState } from "react";
import { X, Upload, Image as ImageIcon, Link as LinkIcon, Check, Plus, Fan, WashingMachine, Wifi, Bike } from "lucide-react";
import { sampleImages } from "../data/mockData";

export default function AddLocationModal({ isOpen, onClose, onAddPlace, showToast, defaultType = "housing" }) {
  const [type, setType] = useState(defaultType); // 'housing', 'food', 'market', 'entertainment'

  // Common Fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("300m");
  const [phone, setPhone] = useState("0905.888.999");
  const [desc, setDesc] = useState("");

  // Specific Fields
  const [area, setArea] = useState("20m²");
  const [foodCat, setFoodCat] = useState("Cơm");
  const [foodHours, setFoodHours] = useState("06:30 - 21:00");
  const [marketCond, setMarketCond] = useState("Mới 98%");
  const [marketCat, setMarketCat] = useState("Sách");
  const [entCat, setEntCat] = useState("Gaming/Net");

  // Amenities
  const [ac, setAc] = useState(true);
  const [washer, setWasher] = useState(true);
  const [wifiState, setWifiState] = useState(true);
  const [parking, setParking] = useState(true);

  // Image Upload State
  const [imageMode, setImageMode] = useState("sample"); // 'upload', 'url', 'sample'
  const [imageUrl, setImageUrl] = useState(sampleImages[0].url);
  const [imagePreview, setImagePreview] = useState(sampleImages[0].url);

  if (!isOpen) return null;

  // Handle local file upload (FileReader)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Vui lòng chỉ chọn tệp hình ảnh (JPG, PNG, WebP)!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setImagePreview(base64);
      setImageUrl(base64);
      showToast("Tải ảnh từ máy lên thành công!");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Vui lòng nhập tên địa điểm!");
      return;
    }

    const finalImage = imagePreview || imageUrl || "";

    const newItem = {
      id: Date.now(),
      name: name.trim(),
      price: price.trim() || (type === "housing" ? "2.0 triệu" : "25.000đ"),
      priceNum: parseFloat(price) || 2.0,
      address: address.trim() || "Gần cổng trường Đại học",
      distance: distance.trim() || "400m",
      phone: phone.trim() || "0905.123.456",
      desc: desc.trim() || "Địa điểm mới đăng tải xác thực cho sinh viên.",
      imageUrl: finalImage,
      likes: 1,
      rating: 5.0,
      reviewsList: [
        { id: Date.now() + 1, user: "UniLife Moderator", rating: 5, comment: "Địa điểm đã được xác minh cơ bản trên hệ thống.", date: "Vừa xong" }
      ]
    };

    if (type === "housing") {
      newItem.area = area;
      newItem.ac = ac;
      newItem.washer = washer;
      newItem.wifi = wifiState;
      newItem.parking = parking;
      newItem.host = "Chủ trọ mới";
    } else if (type === "food") {
      newItem.cat = foodCat;
      newItem.hours = foodHours;
      newItem.tag = "Mới mở";
    } else if (type === "market") {
      newItem.cond = marketCond;
      newItem.cat = marketCat;
      newItem.seller = "Sinh viên UniLife";
      newItem.loc = address || "Khu vực Ký túc xá";
    } else if (type === "entertainment") {
      newItem.cat = entCat;
      newItem.hours = "08:00 - 23:00";
    }

    onAddPlace(type, newItem);
    showToast(`Đã thêm thành công: "${newItem.name}" vào danh sách!`);
    onClose();
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(22,25,46,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-modal-in" style={{ background: "#FFFFFF", borderRadius: 18, maxWidth: 540, width: "100%", maxHeight: "90vh", overflowY: "auto", padding: 24, boxShadow: "0 20px 45px rgba(0,0,0,0.25)" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(14,124,102,0.12)", color: "#0E7C66", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={20} />
            </div>
            <div>
              <h2 className="ul-h" style={{ fontSize: 19, margin: 0, fontWeight: 700 }}>Thêm địa điểm / nội dung mới</h2>
              <span style={{ fontSize: 12, color: "#6B6A63" }}>Đăng thông tin kèm hình ảnh thực tế</span>
            </div>
          </div>
          <button onClick={onClose} className="ul-btn" style={{ background: "none" }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          
          {/* LOẠI HÌNH ĐỊA ĐIỂM */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Chọn phân mục đăng *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {[
                { id: "housing", label: "Phòng trọ" },
                { id: "food", label: "Quán ăn" },
                { id: "market", label: "Chợ đồ cũ" },
                { id: "entertainment", label: "Vui chơi" }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  style={{
                    padding: "8px 6px",
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    background: type === t.id ? "#16192E" : "#F6F4EE",
                    color: type === t.id ? "#fff" : "#16192E"
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* TÊN ĐỊA ĐIỂM */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
              Tên địa điểm / Tên sản phẩm *
            </label>
            <input
              required
              placeholder={type === "housing" ? "Ví dụ: Phòng trọ ban công thoáng mát..." : type === "food" ? "Ví dụ: Quán cơm Niêu sinh viên..." : "Nhập tên địa điểm..."}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            />
          </div>

          {/* GIÁ & DIỆN TÍCH / DANH MỤC */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
                {type === "housing" ? "Giá thuê (triệu/tháng) *" : "Mức giá (VNĐ) *"}
              </label>
              <input
                required
                placeholder={type === "housing" ? "Ví dụ: 2.2 triệu" : "Ví dụ: 30.000đ"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
              />
            </div>

            {type === "housing" && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Diện tích</label>
                <input
                  placeholder="22m²"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
                />
              </div>
            )}

            {type === "food" && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Phân loại món</label>
                <select
                  value={foodCat}
                  onChange={(e) => setFoodCat(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, background: "#fff" }}
                >
                  <option value="Cơm">Cơm phần / Cơm tấm</option>
                  <option value="Bún">Bún / Phở / Mì</option>
                  <option value="Trà sữa">Trà sữa / Trà đào</option>
                  <option value="Cafe">Cà phê học bài</option>
                  <option value="Ăn vặt">Ăn vặt vỉa hè</option>
                </select>
              </div>
            )}

            {type === "market" && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tình trạng đồ</label>
                <select
                  value={marketCond}
                  onChange={(e) => setMarketCond(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, background: "#fff" }}
                >
                  <option value="Mới 100%">Mới 100%</option>
                  <option value="Mới 98%">Mới 98%</option>
                  <option value="Đã dùng - tốt">Đã dùng - tốt</option>
                </select>
              </div>
            )}

            {type === "entertainment" && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Loại hình</label>
                <select
                  value={entCat}
                  onChange={(e) => setEntCat(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14, background: "#fff" }}
                >
                  <option value="Gaming/Net">Phòng máy Gaming / Net</option>
                  <option value="Karaoke Mini">Karaoke / Music Box</option>
                  <option value="Bida">Câu lạc bộ Bida</option>
                  <option value="Thể thao">Sân thể thao / Cầu lông</option>
                </select>
              </div>
            )}
          </div>

          {/* ĐỊA CHỈ & KHOẢNG CÁCH & SĐT */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Địa chỉ chi tiết</label>
              <input
                placeholder="Số nhà, ngõ/hẻm, tên đường..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Cách trường</label>
              <input
                placeholder="Ví dụ: 350m"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Số điện thoại liên hệ *</label>
            <input
              required
              placeholder="09xx.xxx.xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            />
          </div>

          {/* TIỆN NGHI RIÊNG CHO PHÒNG TRỌ */}
          {type === "housing" && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Tiện nghi phòng trọ:</label>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 13 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} /> Có máy lạnh
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <input type="checkbox" checked={washer} onChange={(e) => setWasher(e.target.checked)} /> Máy giặt chung
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <input type="checkbox" checked={wifiState} onChange={(e) => setWifiState(e.target.checked)} /> Wifi miễn phí
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <input type="checkbox" checked={parking} onChange={(e) => setParking(e.target.checked)} /> Có chỗ để xe
                </label>
              </div>
            </div>
          )}

          {/* KHU VỰC THÊM HÌNH ẢNH (UPLOAD HOẶC URL HOẶC MẪU) */}
          <div style={{ border: "1px solid #E0DCD0", borderRadius: 12, padding: 14, background: "#FAF9F5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <label style={{ fontSize: 13.5, fontWeight: 700, color: "#16192E", display: "flex", alignItems: "center", gap: 6 }}>
                <ImageIcon size={16} color="#0E7C66" /> Thêm hình ảnh thực tế
              </label>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  type="button"
                  onClick={() => setImageMode("sample")}
                  style={{ padding: "4px 8px", borderRadius: 6, fontSize: 11.5, fontWeight: 600, border: "none", cursor: "pointer", background: imageMode === "sample" ? "#16192E" : "#EAE6D9", color: imageMode === "sample" ? "#fff" : "#16192E" }}
                >
                  Ảnh mẫu đẹp
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  style={{ padding: "4px 8px", borderRadius: 6, fontSize: 11.5, fontWeight: 600, border: "none", cursor: "pointer", background: imageMode === "upload" ? "#16192E" : "#EAE6D9", color: imageMode === "upload" ? "#fff" : "#16192E" }}
                >
                  Tải ảnh từ máy
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  style={{ padding: "4px 8px", borderRadius: 6, fontSize: 11.5, fontWeight: 600, border: "none", cursor: "pointer", background: imageMode === "url" ? "#16192E" : "#EAE6D9", color: imageMode === "url" ? "#fff" : "#16192E" }}
                >
                  Dán link ảnh
                </button>
              </div>
            </div>

            {/* PREVIEW ẢNH ĐÃ CHỌN */}
            {imagePreview && (
              <div style={{ position: "relative", marginBottom: 12, borderRadius: 10, overflow: "hidden", height: 140, background: "#EAE6D9" }}>
                <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 6, left: 8, background: "rgba(0,0,0,0.65)", color: "#fff", padding: "2px 8px", borderRadius: 6, fontSize: 11 }}>
                  ✓ Đã chọn ảnh hiển thị
                </div>
              </div>
            )}

            {/* OPTION 1: CHỌN ẢNH MẪU */}
            {imageMode === "sample" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
                {sampleImages.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => { setImagePreview(s.url); setImageUrl(s.url); }}
                    style={{
                      height: 52,
                      borderRadius: 8,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: imagePreview === s.url ? "2px solid #FF5D3E" : "1px solid #E0DCD0",
                      position: "relative"
                    }}
                    title={s.name}
                  >
                    <img src={s.url} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {imagePreview === s.url && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(255,93,62,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={14} color="#fff" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* OPTION 2: UPLOAD FILE TỪ MÁY */}
            {imageMode === "upload" && (
              <div>
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #0E7C66", borderRadius: 10, padding: 16, cursor: "pointer", background: "#fff" }}>
                  <Upload size={24} color="#0E7C66" style={{ marginBottom: 6 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0E7C66" }}>Bấm vào đây để chọn tệp ảnh từ máy tính</span>
                  <span style={{ fontSize: 11.5, color: "#6B6A63" }}>Hỗ trợ JPG, PNG, WebP (Tự động chuyển đổi lưu trữ)</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
                </label>
              </div>
            )}

            {/* OPTION 3: NHẬP URL */}
            {imageMode === "url" && (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  placeholder="https://example.com/hinh-anh.jpg"
                  value={imageUrl}
                  onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value); }}
                  style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 13 }}
                />
              </div>
            )}
          </div>

          {/* MÔ TẢ */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Mô tả thêm</label>
            <textarea
              rows={2}
              placeholder="Thông tin thêm về giờ giấc, an ninh, tiện ích quanh khu vực..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E0DCD0", fontSize: 14 }}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" className="ul-btn" onClick={onClose} style={{ background: "#EAE6D9", padding: "10px 18px", borderRadius: 10, fontSize: 14 }}>
              Hủy
            </button>
            <button type="submit" className="ul-btn" style={{ background: "#0E7C66", color: "#fff", padding: "10px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700 }}>
              Lưu & Hiển thị ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
