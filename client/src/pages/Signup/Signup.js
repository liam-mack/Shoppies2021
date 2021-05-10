/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../../utils/API";

// Handles user signup
// Rendered component is very similar to Login --> refactor and combine
function SignUp() {
  const [alert, setAlert] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const { username, password } = userInput;
    if (!(username && password)) {
      setAlert("Username and password must be filled");
      return;
    }
    setAlert("Purchase Successful!");
    try {
      await API.signup(userInput);
      history.push("/");
    } catch (error) {
      console.log(error);
      setAlert("Sorry, signup request unsuccessful. Please try again!");
      setInterval(() => setAlert(null), 3000);
    }
  };

  const toggleVis = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="home">
      <form className="loginForm">
        <h1 className="title"> Box Office <i className="fas fa-ticket-alt" /></h1>
        <p className="login-desc text-center">
          Please enter your name and an identifying password before entry.
        </p>
        <div>
          <label htmlFor="username">
            Enter Name:
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
          <Link to="/">
            <button name="back" className="loginBtn" type="button">
              <i className="fas fa-long-arrow-alt-left" /> Back
            </button>
          </Link>
          <button
            name="signup"
            className="loginBtn"
            type="button"
            onClick={handleClick}
          >
            <i className="fa fa-shopping-cart" /> Buy Ticket
          </button>
        </div>

        {alert && <h5 className="text-center">{alert}</h5>}
      </form>
    </div>
  );
}

export default SignUp;
