import React from "react";
import "./Header.css";
import { AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";

function Header(props) {
  const [clicked, setClicked] = React.useState(false);
  //   console.log(props);

  function menuClick() {
    setClicked(!clicked);
  }

  return (
    <div className="Header">
      <div className="header-container">
        <div className="header-holder">
          <div className="header-item">
            <h1>Logo</h1>
          </div>
        </div>
        <div className="menu" onClick={menuClick}>
          <AiOutlineMenu />
        </div>
      </div>
      <div className="Navbar-Element<">
        <div
          className={clicked ? "navbar-conatiner-active" : "navbar-conatiner"}
        >
          <div className="navbar-holder">
            <ul className="navbar-items">
              <li onClick={props.goDashboard}>
                <div className="navbar-icon">
                  <RxDashboard />
                </div>
                Dashboard
              </li>

              <li>
                <div className="navbar-icon">
                  <AiOutlineMessage />
                </div>
                Contact
              </li>
              <li onClick={props.logOut}>
                <div className="navbar-icon">
                  <CiLogout />
                </div>
                {props.userData.username}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
