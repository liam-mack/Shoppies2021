/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavTabs.scss";

// Navbar component, utilizing useState and useEffect hooks to handle clicks and responsiveness

function NavTabs() {
  const [button, setButton] = useState(true);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  useEffect(() => {
    showHamburger();
  }, []);

  const closeHamburger = () => setClick(false);
  const showHamburger = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showHamburger);

  // Nav-menu active status is determined by setClick useState hook
  return (
    <>
      <div className="navbar">
        <div className="navbar-container container">
        <Link to="/home" className="navbar-logo" onClick={closeHamburger}>
          <img height={50} src="/images/logo.gif" alt="logo" />
        </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeHamburger}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-links" onClick={closeHamburger}>
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/nominated"
                className="nav-links"
                onClick={closeHamburger}
              >
                Nominations
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/awards" className="nav-links" onClick={closeHamburger}>
                Awards
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-links"
                onClick={closeHamburger}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeHamburger}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavTabs;
