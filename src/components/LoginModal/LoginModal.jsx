import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: "",
        password: "",
      });
      setLoginError(false);
    }
  }, [isOpen]);

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setLoginError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(formData)
      .then(() => {
        setLoginError(false);
      })
      .catch(() => {
        setLoginError(true);
      });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      switchText="or Register"
      onSwitchClick={onRegisterClick}
      isFormValid={isFormValid}
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
      {loginError && (
        <p className="modal__error-message">Incorrect email or password</p>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
