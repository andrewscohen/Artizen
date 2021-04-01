import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Modal from "react-modal";

// COMPONENT IMPORTS
import Footer from "../Footer";
import ArtCard from "../ArtCard/ArtCard";
import ArtLocationContainer from "../ArtLocationContainer";
import DisplayWindow from "../Maps/DisplayWindow"

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
  height: "100vh",
  width: "100%",
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

  const onClick = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const addToWalk = async e => {
    const id = e.target.id.toString();
    const location = allLocations[id];
    setShowDisplayWindow(false);
    setArtWalkList(artWalkList => [...artWalkList, location]);
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

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  return (
    <>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={onClick}
        >
          <form className='create-modal-form' onSubmit={onClick}>
              <div className='create-modal-top-row'>
                <h1>Name Your Art Walk</h1>
                <button className="btn__x" onClick={onClick}>
                    <i className="fas fa-times"/>
                </button>
             </div>
             <div>
                <input
                  type='text'
                  placeholder='i.e. "Artsy Stroll"'
                  value={artWalkName}
                  onChange={(e) => setArtWalkName(e.target.value)}
                />
              </div>
              <div className='create-modal-enter'>
                <button
                  type="submit"
                  disabled={artWalkName.length ? false : true}
                >
                  Enter
                </button>
              </div>
          </form>
      </Modal >
      <div className="main" style={{overflow: "hidden" }}>
        <div className="artMapPageContainer">
          <div id="artWalkCardListContainer">
            <div className="artWalkTitleContainer">
              <h1>New Art Walk: <br/>{artWalkName}</h1>
              {!artWalkName.length ? (
                <button type="button" className="btn-main" onClick={openModal}>
                  Name Your Art Walk
                </button>
              ) : (
                <button type="submit" className="btn-main" disabled={!artWalkList.length || artWalkList.length > 10} onClick={handleSubmit}>
                  Get Walkin!
                </button>
              )}
            </div>
            {artWalkList.length > 10 && <h2>You have added too many artwalks</h2>}
            <div className="artWalkCardList">
              {artWalkList &&
                artWalkList.map(location => (
                  <div className="artWalkCard" key={location.id}>
                    <ArtCard
                      location={location}
                      artWalkList={artWalkList}
                      setArtWalkList={setArtWalkList}
                      />
                  </div>
                ))}
            </div>
          </div>
          <div className="allArtMapContainer">
            {/* {showDisplayWindow && (
              <DisplayWindow
                setShowDisplayWindow={setShowDisplayWindow}
                setSelected={setSelected}
                selected={selected}
                addToWalk={addToWalk}
                id="artwalkListDisplayWindow"
              />
            )} */}
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
                        setShowDisplayWindow(true);
                      }}
                      icon={{
                        url: location.photos[0].url,
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }}
                      onLoad={onMapLoad}
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
