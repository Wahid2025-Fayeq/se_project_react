import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherData, handleCardClick }) {
  if (!weatherData) return null;
  const filteredItems = defaultClothingItems.filter(
    (item) => item.weather === weatherData.type,
  );
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onCardClick={handleCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
