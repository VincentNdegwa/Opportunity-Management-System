import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiOutlineMessage, AiFillHome } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

function DashHeader(props) {
  return (
    <div className="Header">
      <div className="header-container">
        <div className="header-holder">
          <div className="header-item">
            <h1>Logo</h1>
          </div>
        </div>
        <div className="menu">
          <AiOutlineMenu onClick={props.menuClick} />
          <div className="add-icon" onClick={props.setPopUp}>
            <BsFillPlusSquareFill />
            <p>Add Account</p>
          </div>
        </div>
      </div>
      <div className="Navbar-Element">
        <div
          className={
            props.clicked ? "navbar-conatiner-active" : "navbar-conatiner"
          }
        >
          <div className="navbar-holder">
            <ul className="navbar-items">
              <li onClick={props.goHome}>
                <div className="navbar-icon">
                  <AiFillHome />
                </div>
                Home
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
                {props.currentUser.username}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashHeader;
