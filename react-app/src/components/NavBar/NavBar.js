import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ProfileButton from "../Menu/profilebutton";
import LoginModal from "../LoginModal/AuthModal";
import { ReactComponent as Logo } from "./artizen_logo.svg";

import "./Navbar.css";

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
              <Logo id="logo"/>
          </NavLink>
        </li>
      </ul>
      <ul className="search-bar-container">
        <li>
          <SearchBar className="search-bar" />
        </li>
      </ul>
      {!authenticated ? (
        <ul className="login-nav-buttons">
          <li>
            <LoginModal setAuthenticated={setAuthenticated} />
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <ProfileButton setAuthenticated={setAuthenticated} />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
