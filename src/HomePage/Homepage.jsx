import React from "react";
import Header from "../Components/Header/Header";
import Welcome from "../Components/Welcome/Welcome";
import { useNavigate } from "react-router-dom";

function Homepage(props) {
  const [Data, setData] = React.useState(props.savedData);
  const [userName, setUserName] = React.useState(props.currentUser.username);
  const [userData, setUserData] = React.useState(props.currentUser);
  const [currentUser, setCurrentUser] = React.useState(props.currentUser);
  const navigate = useNavigate();
  React.useEffect(() => {
    setData(props.savedData);
    setUserName(props.currentUser.username);
    setUserData(props.currentUser);
  }, []);
  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  function goDashboard() {
    navigate(`/Dashboard/${props.currentUser.id}`);
  }
  return (
    <div className="Homepage">
      <Header
        Data={Data}
        userName={userName}
        userData={userData}
        logOut={props.logOut}
        goDashboard={goDashboard}
      />
      <Welcome Data={Data} userName={userName} userData={userData} />
    </div>
  );
}

export default Homepage;
