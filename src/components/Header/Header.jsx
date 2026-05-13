import { useContext, useState } from "react";
import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logo from "../../assets/Logo.svg";
import closeIcon from "../../assets/closeIcon.svg";
import menuIcon from "../../assets/menuIcon.png";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import { NavLink } from "react-router-dom";

function Header({
  weatherData,
  handleAddClick,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const city = weatherData?.city || "Your city";

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <NavLink to="/">
            <img src={logo} alt="WTWR logo" className="header__logo" />
          </NavLink>

          <p className="header__date-location">
            {currentDate}, {city}
          </p>
        </div>

        <nav
          className={`header__nav ${
            isMobileMenuOpened ? "header__nav_mobile-open" : ""
          }`}
        >
          <ToggleSwitch />

          {isMobileMenuOpened && (
            <button
              type="button"
              className="header__nav-close"
              onClick={toggleMobileMenu}
            >
              <img
                src={closeIcon}
                alt="Close"
                className="header__nav-close-icon"
              />
            </button>
          )}

          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="header__add-button"
                onClick={handleAddClick}
              >
                + Add clothes
              </button>

              <NavLink to="/profile" className="header__profile-link">
                <div className="header__user">
                  <p className="header__username">
                    {currentUser?.name || "User"}
                  </p>

                  {currentUser?.avatar || currentUser?.avatarUrl ? (
                    <img
                      src={currentUser.avatar}
                      alt="User avatar"
                      className="header__avatar-image"
                    />
                  ) : (
                    <div className="header__avatar-placeholder">
                      {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </NavLink>
            </>
          ) : (
            <div className="header__auth-buttons">
              <button
                type="button"
                className="header__signup-btn"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>

              <button
                type="button"
                className="header__login-btn"
                onClick={onLoginClick}
              >
                Log In
              </button>
            </div>
          )}
        </nav>
      </div>

      <button
        type="button"
        className="header__menu-button"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
      >
        <img
          src={isMobileMenuOpened ? closeIcon : menuIcon}
          alt="Menu"
          className="header__menu-icon"
        />
      </button>
    </header>
  );
}

export default Header;
