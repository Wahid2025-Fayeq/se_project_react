import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddItemClick,
  onEditProfileClick,
  onLogout,
  onCardLike,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onAddItemClick={onAddItemClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
