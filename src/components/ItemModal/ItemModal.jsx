import "./ItemModal.css";
import closeIcon from "../../assets/closeIcon.svg";

function ItemModal({ activeModal, card, onClose, onDeleteClick }) {
  const isOpen = activeModal === "preview";

  if (!isOpen || !card || !card.imageUrl) return null;

  return (
    <div className="modal modal_is-opened">
      <div className="modal__preview">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__preview-image"
        />

        <div className="modal__preview-caption">
          <div>
            <h2 className="modal__item-name">{card.name}</h2>
            <p className="modal__item-weather">Weather: {card.weather}</p>
          </div>

          <button
            type="button"
            className="modal__delete-button"
            onClick={onDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
