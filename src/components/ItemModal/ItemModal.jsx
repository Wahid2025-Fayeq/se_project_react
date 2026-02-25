import "./ItemModal.css";
function ItemModal({ activeModal, card, onClose }) {
  const isOpen = activeModal === "preview";

  if (!card) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__preview">
        <button type="button" className="modal__close" onClick={onClose}>
          ×
        </button>

        <img src={card.link} alt={card.name} className="modal__preview-image" />

        <div className="modal__preview-caption">
          <h2 className="modal__item-name">{card.name}</h2>
          <p className="modal__item-weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
