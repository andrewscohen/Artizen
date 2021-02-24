import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import ArtwalkContainer from "../ArtwalkContainer"
import * as artwalkActions from "../../store/artwalks"
import "./UserProfile.css"


export default function UserProfile() {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const artwalks = useSelector(state => state.artwalks)
  const artwalksArray = Object.values(artwalks);

  useEffect(() => {
    dispatch(artwalkActions.getUserArtwalks(sessionUser.id))
  }, [dispatch, sessionUser, change]);


  return (
    <>
    <h1>User Profile {sessionUser.id}</h1>
    {artwalksArray.length > 0 &&
      <div>
        {artwalksArray.map(artwalk => {
          return (
            <div key={artwalk.id}>
              {artwalk.name}
            </div>
            )
          })
        }
      </div>
    }
    </>
  )
}
