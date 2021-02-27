import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Directions from '../RouteMap'
import "./ArtwalkView.css"

export default function ArtwalkView() {
  const { artwalkId } = useParams();
  const artwalk = useSelector(state => state.artwalks.currentArtwalk);
  const locationsArray = Object.values(artwalk.locations);

  const coordinates = locationsArray.map(location => {
    return {lat: location.lat, lng: location.long}
  })

  const mapContainerStyle = {
    height: "500px",
    width: "500px",
    // borderRadius: "5px 0 0 5px",
  }

  if (locationsArray.length) {
    return (
    <>
    <h1>{artwalk.name}</h1>
    <h2>{locationsArray[0].city}, {locationsArray[0].state}</h2>
    <div className="artwalk-container">
      <Directions className="map" coordinates={coordinates} mapContainerStyle={mapContainerStyle}/>
      <div className="artwalk-container__info">
      </div>
    </div>
    </>
  )
}
}
