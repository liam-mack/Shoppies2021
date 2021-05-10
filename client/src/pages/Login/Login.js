/* eslint-disable */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser, useAuthDispatch } from "../../context";
import "./Login.scss";

// Login component using auth context established in context folder
// Rendered component itself is fairly rudimentary but functional
function Login() {
  const [alert, setAlert] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = userInput;
    setAlert("");

    if (!username || !password) {
      setAlert("Please fill all fields!");
      return;
    }

    try {
      const res = await loginUser(dispatch, userInput);
      if (!res.username) {
        setAlert("Login failed. Please try again!");
        return;
      }
      setAlert("Login successful!");
      history.push("/home");
    } catch (error) {
      setAlert("Login failed. Please try again!");
      console.log(error);
    }
  };

  const toggleVis = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="home">
      <form className="loginForm">
        <h1 className="title">SH<i className="fas fa-award" />PPIES</h1>
        <p className="login-desc text-center">
          If you already have a ticket, enter your information below. Otherwise reserve your spot at the Box Office.
        </p>
        <div>
          <label htmlFor="username">
            Guest Name:
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Guest"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <i className="fas fa-eye" onClick={toggleVis} />
          </label>
        </div>

        <div className="formBtn">
          <button name="login" className="loginBtn" type="submit" onClick={handleLogin}>
            <i className="fas fa-door-open" /> <span>Enter</span>
          </button>
          <Link to="/signup">
            <button name="signup" className="loginBtn" type="button">
              <i className="fas fa-ticket-alt" /> <span>Box Office</span>
            </button>
          </Link>
        </div>

        {alert && <h5 className="text-center">{alert}</h5>}
      </form>
    </div>
  );
}

export default Login;
