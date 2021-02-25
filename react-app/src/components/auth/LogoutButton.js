import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../services/auth";
import { userLogout } from "../../store/session"
import "./LogoutButton.css"


const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await logout();
    dispatch(userLogout());
    setAuthenticated(false);
  };

  return <button className="logout-button" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
