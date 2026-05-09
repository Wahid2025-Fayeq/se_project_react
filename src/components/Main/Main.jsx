import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({
  weatherData,
  clothingItems = [],
  handleCardClick,
  onCardClick,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const displayedTemp =
    currentTemperatureUnit === "F"
      ? weatherData?.temp?.F
      : weatherData?.temp?.C;

  const filteredItems = clothingItems.filter((item) => {
    return item.weather === weatherData?.type;
  });

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayedTemp}&deg;{currentTemperatureUnit} / You may want
          to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
