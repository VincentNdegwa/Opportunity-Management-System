import React from "react";
import "./Welcome.css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function Welcome(props) {
  //   console.log(props.userData.username);
  return (
    <div className="welcome">
      <div className="welcome-container">
        <div className="welcome-holder">
          <h1>
            Welcome {props.userData.username}
            {props.userData.admin ? <AiFillStar /> : ""}
          </h1>
          <div className="welcome-get-started">
            <Link to={`/Dashboard/${props.userData.id}`}>
              <button className="get-started">
                <h5>Get started</h5>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
