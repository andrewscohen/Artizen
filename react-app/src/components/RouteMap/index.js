import React from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

import Locate from '../Maps/Locate';
import Search from '../Maps/Search';

import mapStyle from "../Maps/mapStyle";



export default function Directions({coordinates}) {
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
    libraries ,
  });
  const mapContainerStyle = {
    height: "200px",
    width: "400px",
  };
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
    search: false,
  };
  const center = coordinates[0];
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

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
      {/* <Marker position={{lat: 30.275528863705016, lng: -97.74073530134736}}/> */}
      </GoogleMap>
    </div>
  );
}
