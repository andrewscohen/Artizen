
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Directions from '../RouteMap'
import * as artwalkActions from "../../store/artwalks"
import mapStyle from "../Maps/mapStyle";
import "./ArtwalkView.css"

export default function ArtwalkView() {
  const { artwalkId } = useParams();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { currentArtwalk } = useSelector(state => state.artwalks);
  console.log("This is the current artwalk", currentArtwalk)
  // let coordinates = useRef([])
  // console.log("These are the coordinates", coordinates.current)

  useEffect(() => {
    dispatch(artwalkActions.getOneArtwalk(artwalkId));
    console.log("dispatched thunk")
    // setLoaded(true);
  }, [dispatch, artwalkId])

  let locationsArray = currentArtwalk.locations || [];
  console.log("This is the locations array", locationsArray)

  // useEffect(() => {
  //   coordinates.current = locationsArray.map(location => {
  //     return {lat: location.lat, lng: location.long}
  //   }) || [];
  // }, [locationsArray])


  // if (Object.keys(artwalk).length > 0) {
  //   locationsArray = artwalk.locations;
  //   coordinates = locationsArray.map(location => {
  //     return {lat: location.lat, lng: location.long}
  //   })
  // }

  const mapContainerStyle = {
    height: "400px",
    width: "1000px",
    // borderRadius: "5px 0 0 5px",
  }

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
  };

  if (!locationsArray.length) return <span>Loading</span>;


    return (
      <>
        {locationsArray.length > 0 &&
        <>
          <h1>{currentArtwalk.name}</h1>
          <h2>{locationsArray[0].city}, {locationsArray[0].state}</h2>
          <div className="">
            <Directions className="map" locationsArray={locationsArray} mapContainerStyle={mapContainerStyle} options={options}/>
          </div>
        </>
        }
      </>
    )
}
