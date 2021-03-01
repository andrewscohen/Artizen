import { Link } from "react-router-dom";
import Directions from "../RouteMap";
import mapStyle from "../Maps/mapStyle";
import { useDispatch } from "react-redux";
import * as artwalkActions from "../../store/artwalks";
import "./ArtwalkContainer.css";


export default function ArtwalkContainer({ artwalk, change, setChange }) {
  const locationsArray = Object.values(artwalk.locations);
  const dispatch = useDispatch();

  const mapContainerStyle = {
    height: "200px",
    width: "300px",
    borderRadius: "3px 3px 0 0",
    zoomControl: false,
  };

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
    gestureHandling: "none",
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    await dispatch(artwalkActions.deleteOneArtwalk(artwalk.id))
      .then(() =>  setChange((change) => !change))
  };

  if (locationsArray.length) {
    return (
        <div className="artwalk-container">
          <Link className="link" to={`/artwalks/${artwalk.id}`}>
            <Directions
              className="map"
              locationsArray={locationsArray}
              mapContainerStyle={mapContainerStyle}
              options={options}
            />
            <div className="artwalk-container__info">
              <h2 className="header artwalk-title">{artwalk.name}</h2>
              <h3 className="artwalk-city">
                {locationsArray[0].city}, {locationsArray[0].state}
              </h3>
            </div>
          </Link>
          <button className="trash" onClick={(event) => handleDelete(event)}><i className="far fa-trash-alt"></i></button>
        </div>
    );
  } else {
    return "";
  }
}
