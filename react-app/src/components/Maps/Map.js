import React from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

import Locate from './Locate';
import Search from './Search';
import "@reach/combobox/styles.css";
import mapStyle from "./mapStyle";

const libraries = ["places"];
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



export default function Gmap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
    libraries ,
  });
  const [markers, setMarkers] = React.useState([]);

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

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


  return (
    <div>
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
      <Marker position={{lat: 30.275528863705016, lng: -97.74073530134736}}/>
      </GoogleMap>
    </div>
  );
}
