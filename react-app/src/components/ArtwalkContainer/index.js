import { Link } from "react-router-dom";
import Directions from "../RouteMap";
import mapStyle from "../Maps/mapStyle";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as artwalkActions from "../../store/artwalks";
import "./ArtwalkContainer.css";


export default function ArtwalkContainer({ artwalk, change, setChange }) {
  const locationsArray = Object.values(artwalk.locations);
  const history = useHistory();
  const dispatch = useDispatch();

  const mapContainerStyle = {
    height: "200px",
    width: "300px",
    borderRadius: "5px 5px 0 0",
    zoomControl: false,
  };

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
    gestureHandling: "none",
  };

  const handleDelete = async (id) => {
    console.log(id)
    await dispatch(artwalkActions.deleteOneArtwalk(id))
      .then(() =>  setChange((change) => !change))
  };

  if (locationsArray.length) {
    return (
      <>
        <Link className="link" to={`/artwalks/${artwalk.id}`}>
          <div className="artwalk-container">
            {/* <img
            src={`https://maps.googleapis.com/maps/api/staticmap?size=350x200&maptype=roadmap&markers=color:0xFE3A9E%7C${coordinateString}&path=${pathenc}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
            alt="map"
          /> */}
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
          </div>
        </Link>
        <button onClick={() => handleDelete(artwalk.id)}>Delete Artwalk</button>
      </>
    );
  } else {
    return "";
  }
}
