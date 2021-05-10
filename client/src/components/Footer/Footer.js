import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

// Footer Component using react-router links to redirect whilst maintaining state
function Footer() {
  return (
    <div className="footer-container">
      {/* <div className="footer-links">
        <div className="footer-link-wrapper">
          <Link to="/home">
            <h2>Home</h2>
          </Link>
          <Link to="/search">
            <h2>Search</h2>
          </Link>
          <Link to="/nominated">
            <h2>Nominations</h2>
          </Link>
          <Link to="/awards">
            <h2>Awards</h2>
          </Link>
          <Link to="/contact">
            <h2>Contact</h2>
          </Link>
          <Link to="/">
            <h2>Logout</h2>
          </Link>
        </div>
      </div> */}

      <div className="footer-socials">
        <div className="footer-logo">
          <img src="/images/logo.gif" alt="Shoppies Logo" className="footerLogo" />
        </div>
        <div className="footer-socials-wrapper">
          <small className="footer-rights">Copyright © 2021 Shoppy Awards</small>
          <br />
          <small className="footer-rights">All Rights Reserved.</small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/facebook"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fa fa-facebook-square" />
            </Link>
            <Link
              className="social-icon-link linkedin"
              to="/linkedin"
              target="_blank"
              aria-label="linkedIn"
            >
              <i className="fa fa-linkedin" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/twitter"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fa fa-twitter" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
