import { getLocation, resetNewLocation } from "../../store/locations";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./LocationContainer.css";
import CommentContainer from "../CommentContainer";
import LocationEditModal from "../LocationEditModal";
import Footer from "../Footer";

const LocationContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { locationId } = useParams();
  const location = useSelector(state => state.locations.location);
  const [loaded, setLoaded] = useState(false);
  const [updateContainer, setUpdateContainer] = useState(false);
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    const getLocationLocal = async () => {
      const locationTry = await dispatch(getLocation(locationId));
      if (locationTry.errors) {
        history.push("/dashboard")
      }
      dispatch(resetNewLocation());
      setLoaded(true);
    };
    getLocationLocal();
  }, [updateContainer, dispatch, locationId, history]);

  if (!loaded) return <span>Loading</span>;


  // if (location && location === null) return (
  //   <>
  //   {console.log("hit the thing")}
  //   <Redirect to="/dashboard" />
  //   </>
  // );

  return (
    <>
      {/* <div className="main no-overflow"> */}
        <div className="location-container">
          <div className="location-left">
              <img className="location-art-img" src={location.photos[0].url} alt="art" />
          </div>
          <div className="location-right">
              <div className="location-info-container">
                <div className="location-info-top">
                  {location.title.length > 0 && <h2 className="location-title artlocation-title">{location.title}</h2>}
                  {location.user_id === sessionUser.id && (
                    <LocationEditModal setUpdateContainer={setUpdateContainer} userId={sessionUser.id} location={location} />
                    )}
                </div>
              {location.artist.length > 0 && (
                <p className="location-artist">
                  Artist: <span className="location-artist-name">{location.artist}</span>
                </p>
              )}
              {location.description.length > 0 && (
                <p className="location-description">{location.description}</p>
              )}
              <div className="location-address-info">
                <div className="address-container">
                  <p className="visit-text">Visit at:</p>
                  <h3 className="artlocation-address">
                    {location.street_address}
                    <div>
                      {location.city}, {location.state} {location.zip_code}
                    </div>
                  </h3>
                </div>
                <div className="location-map-container">
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.street_address},${location.city},${location.state}&zoom=14&size=300x200&maptype=roadmap&markers=color:0xFE3A9E%7C${location.lat},${location.long}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
                    alt="map"
                  />
                </div>
              </div>
            </div>
            <CommentContainer />
          </div>
        </div>
      {/* </div> */}
      <Footer bottomOfPage={true} />
    </>
  );
};

export default LocationContainer;
