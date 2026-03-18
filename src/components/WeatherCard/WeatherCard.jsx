import "./WeatherCard.css";
import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../utils/context/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData) {
    return null;
  }

  const isDay = weatherData.isDay;
  const condition = weatherData.condition;

  const filteredOptions = weatherOptions.filter((option) => {
    return option.day === isDay && option.condition === condition;
  });

  const weatherOption =
    filteredOptions.length > 0
      ? filteredOptions[0]
      : defaultWeatherOptions[isDay ? "day" : "night"];

  const displayedTemp =
    currentTemperatureUnit === "F"
      ? weatherData?.temp?.F
      : weatherData?.temp?.C;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {displayedTemp}&deg;{currentTemperatureUnit}
      </p>

      {weatherOption && (
        <img
          src={weatherOption.url}
          alt={`Card showing ${weatherOption.day ? "day" : "night"} ${weatherOption.condition}`}
          className="weather-card__image"
        />
      )}
    </section>
  );
}

export default WeatherCard;
