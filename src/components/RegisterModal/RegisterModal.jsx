import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: "",
        password: "",
        name: "",
        avatar: "",
      });
    }
  }, [isOpen]);

  const isFormValid =
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.name.trim() !== "" &&
    formData.avatar.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      switchText="or Log In"
      onSwitchClick={onLoginClick}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
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
          value={formData.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
