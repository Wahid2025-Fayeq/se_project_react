import "./ModalWithForm.css";

import Modal from "../Modal/Modal";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  switchText,
  onSwitchClick,
  isFormValid,
}) {
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>

      <form onSubmit={onSubmit} className="modal__form">
        {children}

        <div className="modal__buttons">
          <button
            type="submit"
            className={`modal__submit ${
              isFormValid ? "modal__submit_active" : ""
            }`}
            disabled={!isFormValid}
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
    </Modal>
  );
}

export default ModalWithForm;
