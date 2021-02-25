import { getLocation } from "../../store/locations";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./LocationContainer.css";

const LocationContainer = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const location = useSelector(state => state.locations);

  useEffect(() => {
    dispatch(getLocation(locationId));
  }, [dispatch, locationId]);

  // if (!location.length) return null;

  return (
    <div className="location-container">
      <img style={{ maxWidth: "500px" }} src={location.photos[0].url} alt="art" />
      {location.title.length > 0 && <h2>{location.title}</h2>}
      <p>Description: {location.description}</p>
      {location.artist.length > 0 && (
        <p>
          Artwork by <span className="artist">{location.artist}</span>
        </p>
      )}
      <p>{location.street_address}</p>
      <p>
        {location.city}, {location.state} {location.zip_code}
      </p>
    </div>
  );
};

export default LocationContainer;
