import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useform";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const isFormValid = values.name.trim() !== "" && values.avatar.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
