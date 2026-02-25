import { useState } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";

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
      <div className="header__left">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <p className="header__date-location">
          {currentDate}, {city}
        </p>
      </div>

      <nav
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_mobile-open" : ""
        }`}
      >
        {isMobileMenuOpened && (
          <button
            type="button"
            className="header__nav-close"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            X
          </button>
        )}
        <button
          type="button"
          className="header__add-button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>

        <div className="header__user">
          <p className="header__username">Terrence Tegegne</p>

          <img
            src={avatar}
            alt="User avatar"
            className="header__avatar-image"
          />
        </div>
      </nav>

      {/* MOBILE MENU TOGGLE BUTTON */}
      <button
        type="button"
        className="header__menu-button"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpened ? "✕" : "☰"}
      </button>
    </header>
  );
}

export default Header;
