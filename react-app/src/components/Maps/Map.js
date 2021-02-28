import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getAllLocations } from "../../store/locations";
import Locate from "./Locate";
import Search from "./Search";
import "@reach/combobox/styles.css";
import mapStyle from "./mapStyle";
import "./Map.css";

const libraries = ["places"];
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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);

  useEffect(() => {
    dispatch(getAllLocations());
  }, []);

  const onMapClick = React.useCallback(e => {
    setMarkers(current => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  function handleMarkerClick(location) {
    setSelected(location);
    setShowDisplayWindow(true);
  }

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="map-container">
      <div className="map-btns-and-display">
        <div className="map-btn-container">
          <Locate panTo={panTo} />
          <Search panTo={panTo} />
        </div>
        {showDisplayWindow && (
          <div className="map-display-window">
            <h1>{selected !== null && selected.street_address}</h1>
          </div>
        )}
      </div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
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
