import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, resetNewLocation } from "../../store/locations";
import CommentContainer from "../CommentContainer";
import LocationEditModal from "../LocationEditModal";
import Footer from "../Footer";
import "./LocationContainer.css";

const LocationContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [updateContainer, setUpdateContainer] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  const location = useSelector(state => state.locations.location);

  const { locationId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocationLocal = async () => {
      await dispatch(getLocation(locationId));
      dispatch(resetNewLocation());
      setLoaded(true);
    };
    getLocationLocal();
  }, [updateContainer, dispatch, locationId]);

  if (!loaded) return <span>Loading</span>;

  return (
    <>
     <div className="main">
        <div className="location-container">

          <article className="location-container-left">
              <section className="location-container-left-top">
                  {location.title.length > 0 &&
                    <h1 className="location-title">
                      {location.title.toUpperCase()}
                    </h1>
                  }
                  {location.artist.length > 0 &&
                    <h2 className="location-artist">
                      artist <span className="location-artist-name">{location.artist.toLowerCase()}</span>
                    </h2>
                  }
              </section>
              <div className="location-container-left-middle">
                <img
                  className="location-art-img"
                  src={location.photos[0].url}
                  alt={location.name}
                />
              </div>
              <section className="location-container-left-bottom">
                <div className="location-address-container">
                  <p className="location-address">
                    {location.street_address}
                  </p>
                  <p className="location-address">
                    {location.city}, {location.state} {location.zip_code}
                  </p>
                </div>
                <div className="location-map-image">
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.street_address},${location.city},${location.state}&zoom=14&size=640x320&maptype=roadmap&markers=color:0xFE3A9E%7C${location.lat},${location.long}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
                    alt="map"
                  />
                </div>
              </section>
            </article>

          <article className="location-container-right">
            <section className="location-container-right-comments">
              <CommentContainer />
            </section>
          </article>

        </div>
      </div>
      <Footer bottomOfPage={true} />
    </>
  );
};

export default LocationContainer;
