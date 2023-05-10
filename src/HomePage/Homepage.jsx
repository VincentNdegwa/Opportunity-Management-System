import React from "react";
import Header from "../Components/Header/Header";
import Welcome from "../Components/Welcome/Welcome";
import { useNavigate } from "react-router-dom";

function Homepage(props) {
  // const [Data, setData] = React.useState(props.savedData);
  // const [userName, setUserName] = React.useState(props.currentUser.username);
  // const [userData, setUserData] = React.useState(props.currentUser);
  const [currentUser, setCurrentUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   setData(props.savedData);
  //   setUserName(props.currentUser.username);
  //   setUserData(props.currentUser);
  // }, [props.savedData, props.currentUser.username, props.currentUser]);
  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    // setCurrentUser(JSON.parse(localStorage.getItem("user")));
  });
  function goDashboard() {
    navigate(`/Dashboard/${props.currentUser.id}`);
  }
  return (
    <div className="Homepage">
      <Header
        Data={props.savedData}
        userName={props.currentUser.username}
        userData={props.currentUser}
        logOut={props.logOut}
        goDashboard={goDashboard}
      />
      <Welcome
        Data={props.savedData}
        userName={props.currentUser.username}
        userData={props.currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default Homepage;
