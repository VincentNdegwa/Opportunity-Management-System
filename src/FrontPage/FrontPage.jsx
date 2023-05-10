import React from "react";
import "./FrontPage.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Data from "../Data";
import Homepage from "../HomePage/Homepage";
import Dashboard from "../Components/Dashboard/Dashboard";

function FrontPage() {
  const [login, setLogin] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  // const [accError, setAccError] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedData, setSavedData] = React.useState([]);
  const [access, setAccess] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));
    setSavedData(localData || Data);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("data", JSON.stringify(savedData));
  }, [savedData, currentUser]);

  function goToLogin() {
    setLogin(true);
  }
  function goToCreate() {
    setLogin(false);
  }

  function logOut() {
    setCurrentUser({});
    navigate("/");
  }

  function signIn(event) {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const userpassword = event.target.elements.userpassword.value;
    // console.log("Username and password submitted:", username, userpassword);
    // console.log(savedData);
    const defaultUser = savedData.find(
      (item) => item.username === username && item.password === userpassword
    );
    setCurrentUser(defaultUser);
    if (Object.keys(defaultUser).length > 0) {
      navigate(`/user/${currentUser.id}`);
    } else {
      navigate("/");
    }
  }

  React.useEffect(() => {
    // console.log("Current user found:", currentUser);
    if (!currentUser || Object.keys(currentUser).length === 0) {
      setPasswordError(true);
      setAccess(false);
    } else {
      setAccess(true);
      setUserId(currentUser.id);
    }
  }, [currentUser]);

  // if (access) {
  //   navigate(`/user/${currentUser.id}`);
  //   console.log("access is true");
  // } else {
  //   navigate("/");
  //   console.log("access if false");
  // }

  function createAccount(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password1 = event.target.elements.password1.value;
    const password2 = event.target.elements.password2.value;
    if (password1 === password2) {
      setError(false);
      const newUser = {
        id: Date.now(),
        username: name,
        password: password1,
        email: email,
        admin: true,
        userAcc: [],
      };

      const updateData = [...savedData, newUser];
      setSavedData(updateData);
      setUserId(newUser.id);
      setCurrentUser(newUser);

      navigate(`/user/${newUser.id}`);
    } else {
      setError(true);
    }
  }

  const Front = () => {
    if (login) {
      return (
        <div className="form-container">
          <div className="form-holder">
            <form onSubmit={signIn}>
              <p className="pass-no-match">
                {passwordError === false
                  ? " password or username didn't match"
                  : " "}
              </p>
              <label>UserName:</label>
              <br />
              <input type="text" placeholder="Mike" name="username" /> <br />
              <label>Password:</label>
              <br />
              <input type="password" name="userpassword" />
              <br />
              <button className="normal-buttons" type="submit">
                Login
              </button>
              <br />
              <small>
                You don't have an account?
                <button className="small-button" onClick={goToCreate}>
                  create account
                </button>
              </small>
            </form>
          </div>
        </div>
      );
    } else
      return (
        <div className="form-container">
          <div className="form-holder">
            <form onSubmit={createAccount}>
              <label>UserName:</label>
              <br />
              <input type="text" placeholder="Mike" name="name" /> <br />
              <label>Email:</label>
              <br />
              <input type="email" placeholder="name@gmail.com" name="email" />
              <br />
              <label>New Password:</label>
              <br />
              <input type="password" name="password1" />
              <br />
              <label>Confirm Password:</label>
              <br />
              <input type="password" name="password2" />
              <br />
              <p className="pass-no-match">
                {error ? " password didn't match" : " "}
              </p>
              <button className="normal-buttons" type="submit">
                Create Account
              </button>
              <br />
              <small>
                You have an account?
                <button className="small-button" onClick={goToLogin}>
                  Login
                </button>
              </small>
            </form>
          </div>
        </div>
      );
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="front-page">
              <Front />
            </div>
          }
        />
        <Route
          // path={access ? `/user/:${userId}` : `/`}
          path="/user/:id"
          element={
            <Homepage
              access={access}
              currentUser={currentUser}
              userId={userId}
              savedData={savedData}
              logOut={logOut}
            />
          }
        />
        <Route
          path="/Dashboard/:id"
          element={
            <Dashboard
              currentUser={currentUser}
              userId={userId}
              savedData={savedData}
              logOut={logOut}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default FrontPage;
