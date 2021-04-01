import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { getAllLocations } from "../../store/locations";
import "@reach/combobox/styles.css";
import "./Map.css";
import Locate from "./Locate";
import Search from "./Search";
import mapStyle from "./mapStyle";
import DisplayWindow from "./DisplayWindow";

const mapContainerStyle = {
  height: "calc(100vh - 6em)",
  width: "100%",
  float: "right",
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 30.260528863705016,
  lng: -97.74073530134736,
};

export default function Gmap() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [showDisplayWindow, setShowDisplayWindow] = useState(false);
  const locations = useSelector(state => Object.values(state.locations.allLocations));

  useEffect(() => {
    dispatch(getAllLocations());
  }, [dispatch]);

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  function handleMarkerClick(location) {
    setSelected(location);
    setShowDisplayWindow(true);
  }

  return (
    <div className="map-container main">
      <div className="map-btns-and-display">
        <div className="map-btn-container">
          <Locate panTo={panTo} />
          <Search panTo={panTo} />
        </div>
        {showDisplayWindow && (
          <DisplayWindow
            setShowDisplayWindow={setShowDisplayWindow}
            setSelected={setSelected}
            selected={selected}
          />
        )}
      </div>
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
              icon={{
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20),
                url: location.photos[0].url,
              }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}
      </GoogleMap>
    </div>
  );
}
