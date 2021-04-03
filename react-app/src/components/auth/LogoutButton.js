import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/auth";
import { userLogout } from "../../store/session"
import "./LogoutButton.css"


const LogoutButton = ({setAuthenticated, setDisplay}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    setDisplay(true);
    history.push("/");
    dispatch(userLogout());
  };

  return <button className="logout-button" onClick={onLogout}><i className="fas fa-minus btn--dropdown-icon" />Logout</button>;
};

export default LogoutButton;
