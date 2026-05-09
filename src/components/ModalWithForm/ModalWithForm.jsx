import "./ModalWithForm.css";
import closeIcon from "../../assets/closeIcon.svg";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  switchText,
  onSwitchClick,
  isFormValid,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}

          <div className="modal__buttons">
            <button
              type="submit"
              className={`modal__submit ${
                isFormValid ? "modal__submit_active" : ""
              }`}
            >
              {buttonText}
            </button>
            <button
              type="button"
              className="modal__switch-btn"
             
              onClick={onSwitchClick}
            >
              {switchText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
