import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom'
import {GoogleMap, Marker, InfoWindow} from "@react-google-maps/api";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import * as locationActions from "../../store/locations";
import * as artWalkActions from "../../store/artwalks";

import mapStyle from "../Maps/mapStyle.js";
import ArtCard from "../ArtCard/ArtCard.js";
import './creatArtWalk.css';
import "@reach/combobox/styles.css";

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "1.5em",
      backgroundColor: "rgba(254, 58, 158, .7)",
      borderRadius: "2px",
      border: "none",
      width: "40%",
      boxSizing: "border-box",

    },
    overlay : {
        // backgroundColor: "transparent",
        backgroundColor: "rgba(0, 0, 0, .6)",
        zIndex: "100",
    }
  };

const mapContainerStyle = {
  height: "70vh",
  width: "70vw",
  float: "right"
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



export default function CreateArtWalk(){
    const {allLocations} = useSelector((state) => state.locations)
    const locations = useSelector((state) => Object.values(state.locations.allLocations));
    const sessionUser = useSelector((state) => state.session.user);

    const [newArtWalk, setNewArtWalk] = useState(false)
    const [artWalkName, setArtWalkName] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [markers, setMarkers] = React.useState([]);
    const [artWalkList, setArtWalkList] = useState([]);
    const [selected, setSelected] = React.useState(null);


    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(locationActions.getAllLocations());
        setLoaded(true)
        }, [dispatch]);


    const onClick = () => {
        setShowModal(false)
    }

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
          ...current,
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
          },
        ]);
      }, []);


    const addToWalk = async (e) => {
      const id = (e.target.id - 1).toString();
      const location = locations[id]
      setArtWalkList(artWalkList => [...artWalkList, location])
      setSelected(null)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const res = await dispatch(artWalkActions.createArtWalk({
        artWalkList,
        user_id: sessionUser.id,
        artWalkName
      }))
      history.push(`/artwalks/${res.id}`)
    }

      const mapRef = React.useRef();
      const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
      }, []);

      const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
      }, []);

  return (
    <>
     
      <Modal style={customStyles} isOpen={showModal}>
          <form onSubmit={onClick}>
              <div>
                  <h2>Create A Name For Your Walk</h2>
                  <input
                  type='text'
                  placeholder='Art Walk Name'
                  value={artWalkName}
                  onChange={(e) => setArtWalkName(e.target.value)}
                  >
                  </input>
              </div>
              <div>
                  <button type="submit" disabled={artWalkName.length ? false : true}>Enter</button>
              </div>
          </form>
      </Modal>
      <div className="artMapPageContainer">
        <div className="artWalkCardList">
        <h1>New Art Walk: {artWalkName}</h1>
          {artWalkList.length > 10 && 
          <h2>You have added too many artwalks</h2>}
          {artWalkList && artWalkList.map((location) => (
            // HERE WE WANT TO RENDER A CONTAINER COMPONENT FOR THE LIST OF LOCATIONS
            // FOR EACH LOCATION IN ARRAY, CREATE JOINS RELATIONSHIP WITH NEW WALK BASED ON ID
            <div className='artWalkCard'>
              <ArtCard location={location}/>
            </div>
            ))
        }
            <button type="submit" disabled={!artWalkList.length || artWalkList.length > 10} onClick={handleSubmit}>Get Walkin!</button>

      </div>
      <div className="allArtMapContainer">
        <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
        >
        {locations.length > 0 && locations.map((location) => (
          <Marker
          key={location.id}
          position={{lat: location.lat, lng: location.long}}
          onClick={() => {
              setSelected(location);
          }}
          icon={{
              scaledSize: new window.google.maps.Size(30,30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
          />
        ))}

        {selected && (
          <InfoWindow
            onCloseClick={() => {
                setSelected(null);
            }}
            position={{lat: selected.lat, lng: selected.long}}
          >
            <div>
              <img src={selected.photos[0].url} alt='wallArt' style={{height: "300px", width: "300px"}}/>
              <p><b>Address: {selected.street_address}, {selected.city}, {selected.state}, {selected.zip_code}</b></p>
              <button id={selected.id} onClick={addToWalk}>Add to Walk</button>
            </div>
          </InfoWindow>
        )}
        </GoogleMap>
      </div>
    </div>
    </>
)
}
