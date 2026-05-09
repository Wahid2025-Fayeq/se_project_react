import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";

import { apikey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModalm.jsx";
import * as auth from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null, C: null },
    city: "",
    condition: "",
    isDay: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "user-id-1",
    name: "Wahid",
    avatar: "",
  });
  const [activeModal, setActiveModal] = useState("");

  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleEditProfieleClick = () => {
    setActiveModal("edit-profile");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then(() => {
        return handleLogin({ email, password });
      })
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    return auth.login({ email, password }).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setCurrentUser(res.user);
      closeActiveModal();
    });
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(_id, token)
        .then((updatedItem) => {
          setClothingItems((items) =>
            items.map((item) => (item._id === _id ? updatedItem : item)),
          );
        })
        .catch(console.error);
    } else {
      removeCardLike(_id, token)
        .then((updatedItem) => {
          setClothingItems((items) =>
            items.map((item) => (item._id === _id ? updatedItem : item)),
          );
        })
        .catch(console.error);
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }, resetForm) => {
    const token = localStorage.getItem("jwt");

    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };
  const handleUpdateUser = ({ name, avatar }, resetForm) => {
    const token = localStorage.getItem("jwt");

    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);

        closeActiveModal();
      })
      .catch(console.error);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("jwt");

    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id),
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error.message);

          setUserCoordinates({
            latitude: 38.658707,
            longitude: -77.257919,
          });
        },
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");

      setUserCoordinates({
        latitude: 38.658707,
        longitude: -77.257919,
      });
    }
  }, []);

  useEffect(() => {
    if (!userCoordinates) return;

    getWeather(userCoordinates, apikey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        if (filteredData) {
          setWeatherData(filteredData);
        }
      })
      .catch((err) => {
        console.error("Weather fetch error:", err);
      });
  }, [userCoordinates]);

  useEffect(() => {
    getItems()
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || [];
        setClothingItems([...items].reverse());
      })
      .catch((err) => {
        console.error("Items fetch error:", err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddItemClick={handleAddClick}
                      onEditProfileClick={handleEditProfieleClick}
                      onLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={handleAddItemSubmit}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            onConfirmDelete={handleConfirmDelete}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onRegisterClick={handleRegisterClick}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
