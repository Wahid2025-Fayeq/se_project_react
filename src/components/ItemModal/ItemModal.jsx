import { useContext } from "react";
import "./ItemModal.css";
import Modal from "../Modal/Modal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, onDeleteClick }) {
  const isOpen = activeModal === "preview";

  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !card || !card.imageUrl) return null;

  const isOwner =
    card.owner === currentUser?._id || card.owner?._id === currentUser?._id;

  return (
    <Modal name="preview" isOpen={isOpen} onClose={onClose}>
      <div className="modal__image-container">
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div>
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwner && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={() => onDeleteClick(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
