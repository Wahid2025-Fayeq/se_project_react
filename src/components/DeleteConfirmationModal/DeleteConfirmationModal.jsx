import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirmDelete }) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content modal__content_type_delete">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>

        <p className="modal__delete-text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>

        <button
          type="button"
          className="modal__delete-confirm"
          onClick={onConfirmDelete}
        >
          Yes, delete item
        </button>

        <button
          type="button"
          className="modal__delete-cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
