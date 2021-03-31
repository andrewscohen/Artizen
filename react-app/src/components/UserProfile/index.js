import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArtwalkContainer from "../ArtwalkContainer";
import ArtLocationContainer from "../ArtLocationContainer";
import * as artwalkActions from "../../store/artwalks";
import * as locationActions from "../../store/locations";
import "./UserProfile.css";
import Footer from "../Footer";

export default function UserProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [change, setChange] = useState(false);
  const [artwalks, setArtwalks] = useState(true);
  // const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const { userArtwalks } = useSelector(state => state.artwalks);
  const { userLocations } = useSelector(state => state.locations);
  const showDelete = true;
  let artwalksArray = Object.values(userArtwalks);
  let locationsArray = Object.values(userLocations);

  useEffect(() => {
    dispatch(artwalkActions.getUserArtwalks(sessionUser.id));
    dispatch(locationActions.getUserLocations(sessionUser.id));
  }, [dispatch, sessionUser, change]);

  const showArtwalks = () => {
    setArtwalks(true);
  };

  const showLocations = () => {
    setArtwalks(false);
  };

  const newWalk = () => {
    history.push("/artwalks/add/new");
  };

  const newLocation = () => {
    history.push("/locations/add/new");
  };

  return (
    <div className="main">
      <div className="profile_nav">
        <h1 className="profile_title">Welcome, {sessionUser.first_name}!</h1>
        <div className="profile_nav-links">
          <button className={`profile_nav-btn ${artwalks ? "profile_nav-links--selected" : ""}`} onClick={showArtwalks}>
            Your Art Walks
          </button>
          <button
            className={`profile_nav-btn ${!artwalks ? "profile_nav-links--selected" : ""}`}
            onClick={showLocations}
          >
            Your Art Locations
          </button>
        </div>
      </div>
      {artwalks && (
        <>
          {artwalksArray.length === 0 && (
            <div className="no-data">
              <h2>You haven't created any art walks yet.</h2>
              <button className="login-btn" onClick={newWalk}>
                Create an Art Walk
              </button>
            </div>
          )}
          {artwalksArray.length > 0 && (
            <div className="user_main">
              {artwalksArray.map(artwalk => {
                return <ArtwalkContainer artwalk={artwalk} change={change} setChange={setChange} />;
              })}
            </div>
          )}
        </>
      )}
      {!artwalks && (
        <>
          {locationsArray.length === 0 && (
            <div className="no-data">
              <h2>You haven't created any art locations yet.</h2>
              <button className="login-btn" onClick={newLocation}>
                Create an Art Location
              </button>
            </div>
          )}
          {locationsArray.length > 0 && (
            <div className="user_main">
              {locationsArray.map(location => {
                return (
                  <ArtLocationContainer
                    showDelete={showDelete}
                    location={location}
                    change={change}
                    setChange={setChange}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
}
