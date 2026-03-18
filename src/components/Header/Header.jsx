import { useState } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import closeIcon from "../../assets/closeIcon.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import menuIcon from "../../assets/menuIcon.png";
function Header({ weatherData, handleAddClick }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

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

          <button
            type="button"
            className="header__add-button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>

          <NavLink to="/profile" className="header__profile-link">
            <div className="header__user">
              <p className="header__username">Terrence Tegegne</p>
              
              <img
                src={avatar}
                alt="User avatar"
                className="header__avatar-image"
              />
            </div>
          </NavLink>
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
