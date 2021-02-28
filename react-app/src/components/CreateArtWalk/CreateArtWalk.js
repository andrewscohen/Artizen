import React, {useEffect, useState} from "react";
import {GoogleMap, Marker, InfoWindow} from "@react-google-maps/api";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import {getAllLocations} from "../../store/locations";
import mapStyle from "../Maps/mapStyle.js"
import Locate from '../Maps/Locate';
import Search from '../Maps/Search';
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
    const [artWalkName, setArtWalkName] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [markers, setMarkers] = React.useState([]);
    const [artWalkList, setArtWalkList] = useState();
    const [selected, setSelected] = React.useState(null);


    const dispatch = useDispatch();
    const locations = useSelector((state) => state.locations.locations)

    useEffect(() => {
        dispatch(getAllLocations());
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


    const addToWalk = (e) => {
      if (!artWalkList){
        setArtWalkList([e.target.id])
        // setSelected(null)
        console.log("AFTER CLICK: ", artWalkList)

      }else{
      setArtWalkList([...artWalkList, e.target.id])
      setSelected(null)
      console.log("AFTER CLICK: ", artWalkList)
      }
    }

    // useEffect() => {
    //   setArtWalkList([])
    //   if
    //   const addToWalk(artWalkList => setArtWalkList([...artWalkList, ])
    // }

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
            <h1>New Art Walk: {artWalkName}</h1>
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
      >
            {locations && locations.map((location) => (
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

        </>
    )
}
