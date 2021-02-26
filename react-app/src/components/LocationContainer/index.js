import { getLocation } from "../../store/locations";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./LocationContainer.css";
import CommentContainer from "../CommentContainer";

const LocationContainer = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const location = useSelector(state => state.locations);

  useEffect(async () => {
    await dispatch(getLocation(locationId));

    setLoaded(true);
  }, [dispatch, locationId]);

  if (!loaded) return <span>Loading</span>;

  return (
    <div className="location-container">
      <div className="location-pic-container">
        <img className="location-art-img" src={location.photos[0].url} alt="art" />
      </div>
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.street_address},${location.city},${location.state}&zoom=14&size=600x300&maptype=roadmap&markers=color:0xFE3A9E%7C${location.lat},${location.long}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
        alt="map"
      />
      {location.title.length > 0 && <h2 className="location-title">{location.title}</h2>}
      {location.artist.length > 0 && (
        <p className="location-artist">
          Artwork by <span className="location-artist-name">{location.artist}</span>
        </p>
      )}
      <p>Description: {location.description}</p>
      <p className="location-address">{location.street_address}</p>
      <p className="location-address">
        {location.city}, {location.state} {location.zip_code}
      </p>
      <CommentContainer />
    </div>
  );
};

export default LocationContainer;
