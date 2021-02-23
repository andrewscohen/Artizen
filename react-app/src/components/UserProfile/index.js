import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ArtwalkContainer from "../ArtwalkContainer"
import "./UserProfile.css"


export default function UserProfile({sessionUser}) {
  // const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  // useEffect(() => {
  //   dispatch(artwalkActions.getUserArtwalks(sessionUser.id))
  // }, [dispatch, sessionUser.id, change]);


  return (
    <h1>User Profile</h1>
  )
}
