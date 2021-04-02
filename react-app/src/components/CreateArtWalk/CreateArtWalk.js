import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Modal from "react-modal";

// COMPONENT IMPORTS
import Footer from "../Footer";
import ArtCard from "../ArtCard/ArtCard";
import DisplayWindow from "../Maps/DisplayWindow";

// CSS/STYING IMPORTS
import "@reach/combobox/styles.css";
import "../ArtCard/artcard.css";
import "./createArtWalk.css";
import mapStyle from "../Maps/mapStyle.js";

// REDUX STORE IMPORTS
import * as locationActions from "../../store/locations";
import * as artWalkActions from "../../store/artwalks";

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
    borderRadius: "5px",
    border: "none",
    width: "400px",
    boxSizing: "border-box",
  },
  overlay: {
    // backgroundColor: "transparent",
    backgroundColor: "rgba(0, 0, 0, .8)",
    zIndex: "100",
  },
};

const mapContainerStyle = {
  height: "calc(100vh - 7em)",
  width: "100%",
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 30.27057,
  lng: -97.74307,
};

export default function CreateArtWalk() {
  const { allLocations } = useSelector(state => state.locations);
  const [artWalkName, setArtWalkName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [artWalkList, setArtWalkList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showDisplayWindow, setShowDisplayWindow] = useState(false);

  const locations = useSelector(state => Object.values(state.locations.allLocations));
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const mapRef = useRef();

  useEffect(() => {
    if (!loaded) {
      dispatch(locationActions.getAllLocations());
      setLoaded(true);
    }
  }, [dispatch, loaded]);

  const onOutsideClick = () => {
    if (artWalkName.length > 0) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const addToWalk = async e => {
    const id = e.target.id.toString();
    const location = allLocations[id];
    if (artWalkList.includes(location) === true) {
      return;
    } else {
      setShowDisplayWindow(false);
      setArtWalkList(artWalkList => [...artWalkList, location]);
      setSelected(null);
    }
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

  const handleArtWalkNameChange = e => {
    setArtWalkName(e.target.value);
  };

  const handleKeypress = e => {
    if (e.charCode === 13) {
      handleArtWalkNameSubmit();
    }
  };

  const handleArtWalkNameSubmit = e => {
    setArtWalkName(artWalkName);
    setIsOpen(false);
  };

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  return (
    <>
      <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={onOutsideClick}>
        <form className="create-modal-form">
          <div className="create-modal-top-row">
            <h1>Name Your Art Walk</h1>
            <button className="btn__x" onClick={onOutsideClick}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder='i.e. "Artsy Stroll"'
              value={artWalkName}
              onChange={handleArtWalkNameChange}
              onKeyPress={handleKeypress}
              id="artWalkInput"
            />
          </div>
          <div className="create-modal-enter">
            <button
              type="submit"
              disabled={artWalkName.length ? false : true}
              id="artWalkBtn"
              onClick={handleArtWalkNameSubmit}
            >
              Enter
            </button>
          </div>
        </form>
      </Modal>
      <div className="main" style={{ overflow: "hidden" }}>
        <div className="artMapPageContainer">
          <div id="artWalkCardListContainer">
            <div className="artWalkTitleContainer">
              <h1>
                New Art Walk: <br />
                {artWalkName}
              </h1>
              {!artWalkName.length ? (
                <button type="button" className="btn-main" onClick={openModal}>
                  Name Your Art Walk
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-main"
                  disabled={artWalkList.length < 2 || artWalkList.length > 10}
                  onClick={handleSubmit}
                >
                  Get Walkin!
                </button>
              )}
            </div>
            {artWalkName && (
              <button type="button" className="btn-main" onClick={openModal}>
                Edit Name
              </button>
            )}
            {artWalkName.length && artWalkList.length < 1 ? (
              <div>Click a location on the map to add it to your walk</div>
            ) : null}
            {artWalkList.length > 10 && <h2>You have added too many artwalks</h2>}
            <div className="artWalkCardList">
              {artWalkList &&
                artWalkList.map(location => (
                  <div className="artWalkCard" key={location.id}>
                    <ArtCard location={location} artWalkList={artWalkList} setArtWalkList={setArtWalkList} />
                  </div>
                ))}
            </div>
          </div>
          <div className="allArtMapContainer">
            {showDisplayWindow && (
              <DisplayWindow
                setShowDisplayWindow={setShowDisplayWindow}
                setSelected={setSelected}
                selected={selected}
                addToWalk={addToWalk}
                artWalkList={artWalkList}
                stickToRight={true}
                id="artwalkListDisplayWindow"
              />
            )}
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={13}
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
                      setShowDisplayWindow(true);
                    }}
                    icon={{
                      url: location.photos[0].url,
                      scaledSize: new window.google.maps.Size(40, 40),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(20, 20),
                    }}
                    onLoad={onMapLoad}
                  />
                ))}
            </GoogleMap>
          </div>
        </div>
      </div>
      <Footer bottomOfPage={true} />
    </>
  );
}
