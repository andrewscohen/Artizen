import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import ArtwalkContainer from "../ArtwalkContainer";
import * as artwalkActions from "../../store/artwalks";
import "./UserProfile.css";

export default function UserProfile() {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const [artwalks, setArtwalks] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const { userArtwalks } = useSelector(state => state.artwalks);
  // console.log("These are the artwalks", userArtwalks)
  let artwalksArray = Object.values(userArtwalks);

  useEffect(() => {
    dispatch(artwalkActions.getUserArtwalks(sessionUser.id));
  }, [dispatch, sessionUser, change]);

  const showArtwalks = () => {
    setArtwalks(true)
  }

  const showLocations = () => {
    setArtwalks(false)
  }

  // useEffect(()=> {
  //   setLoaded(true)
  // }, [artwalksArray])

  // if (!loaded) return <span>Loading</span>;

  return (
    <div className="main">
      <div className="profile_nav">
        <h1 className="profile_title">Welcome, {sessionUser.first_name}!</h1>
        <div className="profile_nav-links">
          <button className="profile_nav-btn" onClick={showArtwalks}>Your Art Walks</button>
          <button className="profile_nav-btn" onClick={showLocations}>Your Art Locations</button>
        </div>
      </div>
      {artwalksArray.length > 0 && (
        <div className="user_main">
          {artwalksArray.map(artwalk => {
            return <ArtwalkContainer artwalk={artwalk} change={change} setChange={setChange} />;
          })}
        </div>
      )}
    </div>
  );
}
