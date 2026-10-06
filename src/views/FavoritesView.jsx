import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { SUBTEXT, CORAL, INK } from "../data/theme";
import { PlaceCard } from "../components/cards/PlaceCard";
import { FoodCard } from "../components/cards/FoodCard";
import { ProductCard } from "../components/cards/ProductCard";
import { EntCard } from "../components/cards/EntCard";

export function FavoritesView({ housingList, foodList, marketList, entertainmentList, favorites, toggleFav, setDetail, setTab }) {
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
