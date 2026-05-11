import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useform";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setLoginError(false);
    }
  }, [isOpen, resetForm]);

  const isFormValid =
    values.email.trim() !== "" && values.password.trim() !== "";

  const handleInputChange = (e) => {
    handleChange(e);

    setLoginError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(values)
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
          value={values.email}
          onChange={handleInputChange}
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
          value={values.password}
          onChange={handleInputChange}
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
