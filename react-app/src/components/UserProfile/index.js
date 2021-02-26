import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import ArtwalkContainer from "../ArtwalkContainer"
import * as artwalkActions from "../../store/artwalks"
import "./UserProfile.css"


export default function UserProfile() {
  const dispatch = useDispatch();
  // const [change, setChange] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const artwalks = useSelector(state => state.artwalks)
  const artwalksArray = Object.values(artwalks);

  useEffect(async () => {
    await dispatch(artwalkActions.getUserArtwalks(sessionUser.id))
    .then(setLoaded(true));
  }, [dispatch, sessionUser]);

  if (!loaded) return <span>Loading</span>;

  return (
    <>
    <h1>User Profile {sessionUser.id}</h1>
    {artwalksArray.length > 0 &&
      <div className="main user_main">
        {artwalksArray.map(artwalk => {
          return (
            <ArtwalkContainer artwalk={artwalk} />
            )
          })
        }
      </div>
    }
    </>
  )
}
