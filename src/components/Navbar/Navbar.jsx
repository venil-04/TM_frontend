import React, { useState, useContext } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { AuthContext } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authentication = useContext(AuthContext);
console.log("auth context",authentication)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <nav className="user-navbar">
      <div className="user-navbar__logo">
        <img src={logo} alt="" />
      </div>
      <ul
        className={`${
          isMenuOpen ? "user-navbar__links--active" : "user-navbar__links "
        }`}
      >
        <li className="user-navbar__item">
          <a href="/" className="user-navbar__link">
            Home
          </a>
        </li>
        <li className="user-navbar__item">
          <a href="/tickets" className="user-navbar__link">
            Buy Ticket
          </a>
        </li>
        <li className="user-navbar__item">
          <a href="/ticket/sell" className="user-navbar__link">
            Sell Ticket
          </a>
        </li>
        <li className="user-navbar__item">
           
          <a href="/profile" className="user-navbar__link">
            Profile 
          </a>
        </li>
        <li className="user-navbar__item">
          <a href="#" className="user-navbar__link">
            Support
          </a>
        </li>

        {!authentication.isAuthenticated ? (
          <li className="user-navbar__item">
            <a href="/login" className="user-navbar__link">
              Login
            </a>
          </li>
        ) : (
          <li className="user-navbar__item" onClick={()=>{authentication.logout()}}>Logout</li>
        )}
      </ul>
      <button
        className="user-navbar__toggle"
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <span className="user-navbar__toggle-bar"></span>
        <span className="user-navbar__toggle-bar"></span>
        <span className="user-navbar__toggle-bar"></span>
      </button>
    </nav>
  );
};

export default Navbar;
