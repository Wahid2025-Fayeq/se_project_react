import { useEffect } from "react";
import closeIcon from "../../assets/closeIcon.svg";

function Modal({ name, isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlay}
    >
      <div className={name === "preview" ? "modal__preview" : "modal__content"}>
        {children}

        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
      </div>
    </div>
  );
}

export default Modal;
