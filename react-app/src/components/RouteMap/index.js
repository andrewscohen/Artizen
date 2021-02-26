import React from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import mapStyle from "../Maps/mapStyle";
import map_marker from "../images/map_marker.png"

export default function Directions({coordinates}) {
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
    libraries ,
  });
  const mapContainerStyle = {
    height: "200px",
    width: "350px",
    borderRadius: "5px 0 0 5px",
  };
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
  };
  const center = coordinates[0];

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="map">
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {coordinates.map(coordinate => {
          return (
            <Marker key={coordinate.lat} position={coordinate} />
          )
        })}
      </GoogleMap>
    </div>
  );
}
