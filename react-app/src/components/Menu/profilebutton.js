import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./menu.css";

export default function ProfileButton({ setAuthenticated }) {
  const [showMenu, setShowMenu] = useState(false);

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
        <div className="dropdown">
          <li className="dropdown__li dropdown__header dropdown__header--background">User Name to Go Here</li>
          <li className="dropdown__li dropdown__header--email dropdown__header--background">User Email to go here</li>
          <li className="dropdown__li">
            <Link to="/dashboard">
              <button className="btn--dropdown">Dashboard</button>
            </Link>
          </li>
          <li className="dropdown__li">
            <Link to="/locations/new">
              <button className="btn--dropdown">Add an Art Location</button>
            </Link>
          </li>
          <li className="dropdown__li">
            <Link to="/artwalks/new">
              <button className="btn--dropdown">Create an Art Walk</button>
            </Link>
          </li>
          <li className="dropdown__li">
            <LogoutButton className="btn--dropdown" setAuthenticated={setAuthenticated} />
          </li>
        </div>
      )}
    </>
  );
}
