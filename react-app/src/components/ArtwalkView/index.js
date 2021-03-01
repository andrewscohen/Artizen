import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Directions from "../RouteMap";
import * as artwalkActions from "../../store/artwalks";
import mapStyle from "../Maps/mapStyle";
import ArtCard from "../ArtCard/ArtCard.js"
import "./ArtwalkView.css"

export default function ArtwalkView() {
  const history = useHistory();
  const { artwalkId } = useParams();
  const dispatch = useDispatch();
  const locationsArray = useSelector(state => state.artwalks.currentArtwalk.locations);
  const currentArtwalk = useSelector(state => state.artwalks.currentArtwalk);

  useEffect(() => {
    dispatch(artwalkActions.getOneArtwalk(artwalkId));
    console.log("dispatched thunk");
  }, [dispatch, artwalkId]);

  const mapContainerStyle = {
    height: "375px",
    width: "100%",
  }

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
  };

  const handleDelete = (id) => {
    console.log(id)
    dispatch(artwalkActions.deleteOneArtwalk(id))
    .then(history.push("/dashboard"));
    };

  if (currentArtwalk && locationsArray) {
    return (
      <>
        {currentArtwalk &&
        <div className="main">
          <div className="artwalk-map">
            <Directions className="map" locationsArray={locationsArray} mapContainerStyle={mapContainerStyle} options={options}/>
          </div>
          <h1>{currentArtwalk.name}</h1>
          <h2>{locationsArray[0].city}, {locationsArray[0].state}</h2>
          <button onClick={() => handleDelete(currentArtwalk.id)}>Delete Artwalk</button>
          {locationsArray.map(location => {
            return (<ArtCard location={location}/>)
          })}
        </div>
        }
      </>
    );
  }
  return <span>Loading</span>;
}
