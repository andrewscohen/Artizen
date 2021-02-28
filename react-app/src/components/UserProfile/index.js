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
  const { userArtwalks } = useSelector(state => state.artwalks)
  // console.log("These are the artwalks", userArtwalks)
  let artwalksArray = Object.values(userArtwalks);


  useEffect(() => {
    dispatch(artwalkActions.getUserArtwalks(sessionUser.id));
  }, [dispatch, sessionUser]);

  // useEffect(()=> {
  //   setLoaded(true)
  // }, [artwalksArray])

  // if (!loaded) return <span>Loading</span>;

  return (
    <div className="main">
      <h1>User Profile {sessionUser.id}</h1>
      {artwalksArray.length > 0 &&
      <div className="user_main">
        {artwalksArray.map(artwalk => {
          return (
            <ArtwalkContainer artwalk={artwalk} />
            )
          })
        }
      </div>
    }
    </div>
  )
}
