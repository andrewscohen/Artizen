import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as locationActions from "../../store/locations";
import "./ArtLocationContainer.css";


export default function ArtLocationContainer({ location, change, setChange }) {
  const history = useHistory();
  const dispatch = useDispatch();


  const handleDelete = async (event) => {
    event.stopPropagation();
    console.log(location.id)
    await dispatch(locationActions.deleteOneLocation(location.id))
      .then(() =>  setChange((change) => !change))
  };

    return (
        <div className="artlocation-container">
          <Link className="link" to={`/locations/${location.id}`}>
            <img className="artlocation-image" src={location.photos[0].url}/>
            <div className="artlocation-container__info">
              {location.title && <h2 className="header artlocation-title">{location.title}</h2>}
              {location.artist && <h3 className="header artlocation-artist">{location.artist}</h3>}
              <h3 className="artlocation-address">
                {location.street_address}
                <div>
                {location.city}, {location.state}
                </div>
                {location.zip_code}
              </h3>
            </div>
          </Link>
          <button className="trash" onClick={(event) => handleDelete(event)}><i className="far fa-trash-alt"></i></button>
        </div>
    );
}
