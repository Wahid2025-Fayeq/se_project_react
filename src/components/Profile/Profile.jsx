import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddItemClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onAddItemClick={onAddItemClick}
      />
    </section>
  );
}
