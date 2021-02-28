import React, { useEffect } from "react";
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

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="map-container">
      <div className="map-btn-container">
        <Locate panTo={panTo} />
        <Search panTo={panTo} />
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
        {/* <Marker position={{lat: 30.275528863705016, lng: -97.74073530134736}}/> */}
        {locations.length > 0 &&
          locations.map(location => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.long }}
              icon={{
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                url: location.photos[0].url,
              }}
            />
          ))}
      </GoogleMap>
    </div>
  );
}
