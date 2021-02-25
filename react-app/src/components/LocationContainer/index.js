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

  // if (!location.length) return <span>Loading</span>;

  return (
    <div className="location-container">
      <div className="location-pic-container">
        <img className="location-art-img" src={location.photos[0].url} alt="art" />
        <img src="https://i.stack.imgur.com/yh9h3.png" alt="map" />
      </div>
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
      <div className="location-comment-container">
        <h2 className="location-comment-header">Comments</h2>
        <p className="location-comment">Wow. What a masterpiece!</p>
        <p className="location-comment">Truly one of the most inspiring pieces of art I've ever seen</p>
        <p className="location-comment">Wow. What a masterpiece!</p>
        <p className="location-comment">Truly one of the most inspiring pieces of art I've ever seen</p>
        <p className="location-comment">Wow. What a masterpiece!</p>
        <p className="location-comment">Truly one of the most inspiring pieces of art I've ever seen</p>
        <p className="location-comment">Wow. What a masterpiece!</p>
        <p className="location-comment">Truly one of the most inspiring pieces of art I've ever seen</p>
        <p className="location-comment">Wow. What a masterpiece!</p>
        <p className="location-comment">Truly one of the most inspiring pieces of art I've ever seen</p>
      </div>
    </div>
  );
};

export default LocationContainer;
