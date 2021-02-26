import React, {useState} from "react";
import {GoogleMap, DirectionsService, DirectionsRenderer, useLoadScript, Marker} from "@react-google-maps/api";
import mapStyle from "../Maps/mapStyle";
import map_marker from "../images/map_marker.png"

export default function Directions({coordinates}) {
  const libraries = ["places"];
  const [response, setResponse] = useState(null);
  const [services, setServices] = useState(true)
  const waypoints = coordinates.slice(1, coordinates.length -1).map(location => {
    return {location, stopover: true};
  })

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
  const directionsCallback = (response) => {
    console.log("RESPONSE: ", response)

    if (response !== null) {
      if (response.status === 'OK') {
        setServices(false)
        setResponse(response)
      } else {
        console.log('RESPONSE NOT OK: ', response)
        }
      }
  }

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
        { services &&
              <DirectionsService
                options={{
                  destination: coordinates[coordinates.length - 1],
                  origin: coordinates[0],
                  waypoints: waypoints,
                  travelMode: "WALKING"
                }}
                callback={directionsCallback}
              />
        }
        {
          response !== null && (
            <DirectionsRenderer
              // required
              options={{
                directions: response
              }}
            />
          )
        }
      </GoogleMap>
    </div>
  );
}
