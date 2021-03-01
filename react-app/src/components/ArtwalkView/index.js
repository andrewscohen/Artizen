import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { deleteOneArtwalk } from "../../store/artwalks";
import Directions from "../RouteMap";
import * as artwalkActions from "../../store/artwalks";
import mapStyle from "../Maps/mapStyle";
import "./ArtwalkView.css";

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
    height: "400px",
    width: "1000px",
    // borderRadius: "5px 0 0 5px",
  };

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
  };

  const handleDelete = id => {
    dispatch(deleteOneArtwalk(id));
    history.push("/dashboard");
  };

  if (currentArtwalk && locationsArray) {
    return (
      <>
        {currentArtwalk && (
          <div className="main">
            <h1>{currentArtwalk.name}</h1>
            <h2>
              {locationsArray[0].city}, {locationsArray[0].state}
            </h2>
            <div className="">
              <Directions
                className="map"
                locationsArray={locationsArray}
                mapContainerStyle={mapContainerStyle}
                options={options}
              />
            </div>
            <button onClick={() => handleDelete(currentArtwalk.id)}>Delete Artwalk</button>
          </div>
        )}
      </>
    );
  }
  return <span>Loading</span>;
}
