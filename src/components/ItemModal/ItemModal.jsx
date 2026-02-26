import "./ItemModal.css";
function ItemModal({ activeModal, card, onClose }) {
  const isOpen = activeModal === "preview";

  if (!card) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__preview">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="modal__close-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
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
