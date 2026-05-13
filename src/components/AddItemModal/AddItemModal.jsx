import { useState } from "react";
import { useFormWithValidation } from "../../hooks/useform";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedErrors, setSubmittedErrors] = useState({});

  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const {
    values,
    errors,
    handleChange,
    isValid,
    resetForm,
    validateAllFields,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();

    const validationErrors = validateAllFields();
    setSubmittedErrors(validationErrors);
    setIsSubmitted(true);

    const hasErrors = Object.values(validationErrors).some((err) => err !== "");
    if (!hasErrors) {
      onAddItem(values, resetForm);
      setIsSubmitted(false);
      setSubmittedErrors({});
    }
  }
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className={`modal__input ${submittedErrors.name || errors.name ? "modal__input_with-error" : ""}`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="30"
        />
        {(submittedErrors.name || errors.name) && (
          <span className="modal__error">
            {submittedErrors.name || errors.name}
          </span>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className={`modal__input ${submittedErrors.imageUrl || errors.imageUrl ? "modal__input_with-error" : ""}`}
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        {(submittedErrors.imageUrl || errors.imageUrl) && (
          <span className="modal__error">
            {submittedErrors.imageUrl || errors.imageUrl}
          </span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
        {(submittedErrors.weather || errors.weather) && (
          <span className="modal__error">
            {submittedErrors.weather || errors.weather}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
