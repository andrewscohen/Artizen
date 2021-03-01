import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./menu.css";

export default function ProfileButton({ setAuthenticated, setDisplay }) {
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <button className="btn btn--hamburger" onClick={openMenu}>
        <i className="fas fa-bars"></i>
      </button>
      {showMenu && (
        <>
        <div className="dropdown">
          <div>
            <li className="dropdown__li dropdown__header--name dropdown__header--background">Welcome, {sessionUser.first_name}!</li>
          </div>
          <div>
            <li className="dropdown__li dropdown__header--email dropdown__header--background">{sessionUser.email}</li>
          </div>
          <div>
            <li className="dropdown__li">
              <Link to="/dashboard">
                <button className="btn--dropdown"><i className="fas fa-home btn--dropdown-icon"></i><p className="btn--dropdown-text">Dashboard</p></button>
              </Link>
            </li>
          </div>
          <div>
            <li className="dropdown__li">
              <Link to="/map">
                <button className="btn--dropdown"><i class="fas fa-globe-americas btn--dropdown-icon"></i><p className="btn--dropdown-text">Explore</p></button>
              </Link>
            </li>
          </div>
          <div>
            <li className="dropdown__li">
              <Link to="/locations/add/new">
                <button className="btn--dropdown"><i className="fas fa-plus btn--dropdown-icon"></i><p className="btn--dropdown-text">Add Art Location</p></button>
              </Link>
            </li>
          </div>
          <div>
            <li className="dropdown__li">
              <Link to="/artwalks/add/new">
              <button className="btn--dropdown"><i className="fas fa-plus btn--dropdown-icon"></i><p className="btn--dropdown-text">Create New Art Walk</p></button>
              </Link>
            </li>
          </div>
          <div>
            <li className="dropdown__li">
              <LogoutButton setAuthenticated={setAuthenticated} setDisplay={setDisplay} />
            </li>
          </div>
        </div>
        </>
      )}
    </>
  );
}
