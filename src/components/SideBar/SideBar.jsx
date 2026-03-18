import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__divider"></div>

      <div className="sidebar__user">
        <img src={avatar} alt="user avatar" className="sidebar__avatar-image" />

        <div className="sidebar__info">
          <p className="sidebar__username">Terrence Tegegne</p>

          <button type="button" className="sidebar__link sidebar__link_mobile">
            Change profile data
          </button>

          <button type="button" className="sidebar__link sidebar__link_mobile">
            Log out
          </button>
        </div>
      </div>

      <div className="sidebar__divider"></div>
    </div>
  );
}
