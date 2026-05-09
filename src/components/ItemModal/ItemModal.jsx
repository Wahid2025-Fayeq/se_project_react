import { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/closeIcon.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, onDeleteClick }) {
  const isOpen = activeModal === "preview";
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !card || !card.imageUrl) return null;

  const isOwner = card.owner === currentUser?._id;

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
          {isOwner && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={onDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
