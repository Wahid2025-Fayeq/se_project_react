import { useState, useMemo } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const resetForm = () => {
    setValues(initialValues);
  };
  return { values, resetForm, handleChange };
}

export function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required.";
        } else if (value.length < 1) {
          error = "Name must be at least 1 character.";
        } else if (value.length > 30) {
          error = "Name must be no more than 30 characters.";
        }
        break;
      case "imageUrl":
        if (!value.trim()) {
          error = "Image URL is required.";
        } else {
          try {
            new URL(value);
          } catch {
            error = "Please enter a valid URL.";
          }
        }
        break;
      case "weather":
        if (!value) {
          error = "Please select a weather type.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      newErrors[key] = error;
    });
    setErrors(newErrors);
    return newErrors;
  };

  const isValid = useMemo(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const hasValues = Object.values(values).every((value) => value !== "");
    return !hasErrors && hasValues;
  }, [values, errors]);

  return {
    values,
    errors,
    isValid,
    resetForm,
    handleChange,
    validateAllFields,
  };
}
