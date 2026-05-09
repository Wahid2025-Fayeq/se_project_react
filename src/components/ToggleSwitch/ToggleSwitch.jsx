import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext,
  );
  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
      />
      <span className="toggle-switch__slider"></span>
      <span
        // style={{ color: `${currentTemperatureUnit === "F" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_F ${
          currentTemperatureUnit === "F" ? "toggle-switch__text_active" : ""
        }`}
      >
        F
      </span>
      <span
        // style={{ color: `${currentTemperatureUnit === "C" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_C ${
          currentTemperatureUnit === "C" ? "toggle-switch__text_active" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}
