// import "./WeatherCard.css";
// import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";
// function WeatherCard({ weatherData }) {
//   const filteredOptions = weatherOptions.filter((option) => {
//     return (
//       option.day === weatherData.isDay &&
//       option.condition === weatherData.condition
//     );
//   });
//   let weatherOption;
//   if (filteredOptions.length === 0) {
//     weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
//   } else {
//     weatherOption = filteredOptions[0];
//   }

//   return (
//     <section className="weather-card">
//       <p className="weather-card__temp">{weatherData?.temp?.F}&deg;</p>
//       <img
//         src={weatherOption?.url}
//         alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
//           weatherOption?.condition
//         } weather`}
//         className="weather-card__image"
//       />
//     </section>
//   );
// }
// export default WeatherCard;
import "./WeatherCard.css";
import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return null;
  }

  const isDay = weatherData.isDay;
  const condition = weatherData.condition;

  console.log("WeatherCard received weatherData:", weatherData);

  const filteredOptions = weatherOptions.filter((option) => {
    return option.day === isDay && option.condition === condition;
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    const key = isDay ? "day" : "night";
    weatherOption = defaultWeatherOptions[key];
  } else {
    weatherOption = filteredOptions[0];
  }

  const tempF = weatherData?.temp?.F ?? "--";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{tempF}&deg;F </p>
      {weatherOption && (
        <img
          src={weatherOption.url}
          alt={`Card showing ${weatherOption.day ? "day" : "night"}time ${
            weatherOption.condition
          } weather`}
          className="weather-card__image"
        />
      )}
    </section>
  );
}

export default WeatherCard;
