import React, { useEffect, useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import * as locationActions from "../../store/locations";
import * as artWalkActions from "../../store/artwalks";

import mapStyle from "../Maps/mapStyle.js";
import ArtCard from "../ArtCard/ArtCard.js";
import "../ArtCard/artcard.css";
import "./creatArtWalk.css";
import "@reach/combobox/styles.css";
import Footer from "../Footer";

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

const mapContainerStyle = {
  height: "88vh",
  width: "80vw",
  // marginLeft: "20em",
  float: "left",
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 30.275528863705016,
  lng: -97.74073530134736,
};

export default function CreateArtWalk() {
  const { allLocations } = useSelector(state => state.locations);
  const [artWalkName, setArtWalkName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [artWalkList, setArtWalkList] = useState([]);
  const [selected, setSelected] = useState(null);

  const locations = useSelector(state => Object.values(state.locations.allLocations));
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!loaded) {
      dispatch(locationActions.getAllLocations());
      setLoaded(true);
    }
  }, [dispatch, loaded]);

  const onClick = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const addToWalk = async e => {
    const id = e.target.id.toString();
    const location = allLocations[id];
    setArtWalkList(artWalkList => [...artWalkList, location]);
    console.log("ARTWALK LIST: ", artWalkList)
    setSelected(null);
  };



  const handleSubmit = async e => {
    e.preventDefault();
    const res = await dispatch(
      artWalkActions.createArtWalk({
        artWalkList,
        user_id: sessionUser.id,
        artWalkName,
      })
    );
    history.push(`/artwalks/${res.id}`);
  };

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  return (
    <>
      <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={onClick}>
        <form onSubmit={onClick}>
          <div>
            <h2>Create A Name For Your Walk</h2>
            <input
              type="text"
              placeholder="Art Walk Name"
              value={artWalkName}
              onChange={e => setArtWalkName(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" disabled={artWalkName.length ? false : true}>
              Enter
            </button>
          </div>
        </form>
      </Modal>
      <div className="main">
        <div className="artMapPageContainer">
          <div id="artWalkCardList">
            <h1>New Art Walk: {artWalkName}</h1>
            {!artWalkName.length ? (
              <button type="button" onClick={openModal}>
                Step 1: Create A Name For Your Walk
              </button>
            ) : (
              <button type="submit" disabled={!artWalkList.length || artWalkList.length > 10} onClick={handleSubmit}>
                Get Walkin!
              </button>
            )}

            {artWalkList.length > 10 && <h2>You have added too many artwalks</h2>}
            {artWalkList &&
              artWalkList.map(location => (
                <div className="artWalkCard">
                  {console.log(location)}
                  <ArtCard
                    location={location}
                    artWalkList={artWalkList}
                    setArtWalkList={setArtWalkList}
                  />
                </div>
              ))}
          </div>
          <div className="allArtMapContainer">
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              options={options}
              onLoad={onMapLoad}
            >
              {locations.length > 0 &&
                locations.map(location => (
                  <Marker
                    key={location.id}
                    position={{ lat: location.lat, lng: location.long }}
                    onClick={() => {
                      setSelected(location);
                    }}
                    icon={{
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                    }}
                  />
                ))}
              {selected && (
                <InfoWindow
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                  position={{ lat: selected.lat, lng: selected.long }}
                >
                  <div>
                    <img src={selected.photos[0].url} alt="wallArt" style={{ height: "300px", width: "300px" }} />
                    <p>
                      <b>
                        Address: {selected.street_address}, {selected.city}, {selected.state}, {selected.zip_code}
                      </b>
                    </p>
                    <button id={selected.id} onClick={addToWalk}>
                      Add to Walk
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
      <Footer bottomOfPage={true} />
    </>
  );
}
