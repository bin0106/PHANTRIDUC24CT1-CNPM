import React from "react";
import { Sparkles, Search, ArrowRight, ChevronRight, BookOpen } from "lucide-react";
import { INK, CORAL, SUBTEXT, CARD, MARIGOLD, TEAL, categories, rotations } from "../data/theme";
import { SectionTitle } from "../components/common/SectionTitle";
import { CardRow } from "../components/common/CardRow";
import { PlaceCard } from "../components/cards/PlaceCard";
import { FoodCard } from "../components/cards/FoodCard";
import { ProductCard } from "../components/cards/ProductCard";

export function HomeView({ query, setQuery, setTab, favorites, toggleFav, setDetail, housingList, foodList, marketList, entertainmentList, studyList }) {
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
            <BookOpen size={13} /> Góc học tập sinh viên
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
