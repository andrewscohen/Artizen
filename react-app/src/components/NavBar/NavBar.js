import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../SearchBar/SearchBar';
import LoginModal from "../LoginModal/LoginModal"
import "./Navbar.css"

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            <i class="fas fa-home"></i>
          </NavLink>
        </li>
      </ul>
      <ul className="search-bar-container">
        <li>
          <SearchBar className="search-bar" />
        </li>
      </ul>
        {
          !authenticated ?
          <ul className="login-nav-buttons">
            <li>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </li>
            <li id="sign-up-button">
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </li>
            <li>
              <LoginModal setAuthenticated={setAuthenticated} />
            </li>
          </ul>
          :
          <ul>
            <li>
              <LogoutButton setAuthenticated={setAuthenticated} />
            </li>
          </ul>
        }
    </nav>
  );
}

export default NavBar;