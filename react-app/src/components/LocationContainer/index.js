import { getLocation } from "../../store/locations";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./LocationContainer.css";
import CommentContainer from "../CommentContainer";
import Modal from "react-modal";

const LocationContainer = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useSelector(state => state.locations);
  const sessionUser = useSelector(state => state.session.user);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "1.5em",
      backgroundColor: "rgba(254, 58, 158, .7)",
      borderRadius: "2px",
      border: "none",
      width: "40%",
      boxSizing: "border-box",
    },
    overlay: {
      // backgroundColor: "transparent",
      backgroundColor: "rgba(0, 0, 0, .6)",
      zIndex: "100",
    },
  };

  const getLocationLocal = async () => {
    await dispatch(getLocation(locationId));
    setLoaded(true);
  };

  useEffect(() => {
    getLocationLocal();
  }, []);

  if (!loaded) return <span>Loading</span>;

  return (
    <>
      <div className="location-container">
        {location.user_id === sessionUser.id && (
          <button className="location-edit-btn" onClick={() => setShowModal(true)}>
            Edit Location
          </button>
        )}
        <div className="location-pic-container">
          <img className="location-art-img" src={location.photos[0].url} alt="art" />
        </div>
        <div className="location-info-container">
          {location.title.length > 0 && <h2 className="location-title">{location.title}</h2>}
          {location.artist.length > 0 && (
            <p className="location-artist">
              Artwork by <span className="location-artist-name">{location.artist}</span>
            </p>
          )}
          {location.description.length > 0 && (
            <p className="location-description">Description: {location.description}</p>
          )}
          <p className="location-address">{location.street_address}</p>
          <p className="location-address">
            {location.city}, {location.state} {location.zip_code}
          </p>
          <CommentContainer />
        </div>
        <div className="location-map-container">
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.street_address},${location.city},${location.state}&zoom=14&size=640x320&maptype=roadmap&markers=color:0xFE3A9E%7C${location.lat},${location.long}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
            alt="map"
          />
        </div>
      </div>
      <Modal style={customStyles} isOpen={showModal}>
        <button className="btn__x" onClick={() => setShowModal(false)}>
          <i className="fas fa-times"></i>
        </button>
        <form>
          <input type="text" />
        </form>
      </Modal>
    </>
  );
};

export default LocationContainer;
