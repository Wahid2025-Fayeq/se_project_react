import { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="user avatar"
            className="sidebar__avatar-image"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__link"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>

        <button type="button" className="sidebar__link" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}
